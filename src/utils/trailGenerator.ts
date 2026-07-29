import { ENEM_MATRIX_TOPICS } from '../data/enemData';
import { UserProfile, StudyTrail, TrailItem, SubjectArea } from '../types';

const DAYS_MAP: Record<string, number> = {
  'dom': 0,
  'seg': 1,
  'ter': 2,
  'qua': 3,
  'qui': 4,
  'sex': 5,
  'sab': 6,
};

export function formatLocalDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function generateTrailForUser(user: UserProfile): StudyTrail {
  const today = user.createdAt ? new Date(user.createdAt) : new Date();
  // Alinhar ao início da semana (segunda-feira) para garantir dias em sequência padrão (Seg a Dom)
  const dayOfWeek = today.getDay();
  const diffDays = today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
  const now = new Date(today);
  now.setDate(diffDays);
  now.setHours(0, 0, 0, 0);

  const examDate = new Date(user.examDate);

  // Fallback if exam date is invalid or in the past
  const targetDate = isNaN(examDate.getTime()) || examDate <= now
    ? new Date(now.getTime() + 180 * 24 * 60 * 60 * 1000) // Default 6 months
    : examDate;

  // Calculate total weeks between now and exam
  const diffMs = targetDate.getTime() - now.getTime();
  const totalDays = Math.max(14, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
  const totalWeeks = Math.max(2, Math.ceil(totalDays / 7));

  // Sort ENEM topics based on weight and user difficulty
  const sortedTopics = [...ENEM_MATRIX_TOPICS].sort((a, b) => {
    const diffA = user.difficulties[a.area] === 'Preciso de Muita Ajuda' ? 3 : (user.difficulties[a.area] === 'Médio' ? 2 : 1);
    const diffB = user.difficulties[b.area] === 'Preciso de Muita Ajuda' ? 3 : (user.difficulties[b.area] === 'Médio' ? 2 : 1);

    const scoreA = a.weightScore * 10 + diffA * 5;
    const scoreB = b.weightScore * 10 + diffB * 5;

    return scoreB - scoreA;
  });

  // Calculate user total capacity
  const userAvailableDays = user.availableDays.length > 0 ? user.availableDays : ['seg', 'ter', 'qua', 'qui', 'sex'];
  const userHoursPerWeek = Math.max(2, user.hoursPerWeek || 12);
  const userMinutesPerStudyDay = Math.round((userHoursPerWeek * 60) / userAvailableDays.length);

  // Total topics available
  const items: TrailItem[] = [];
  let topicIndex = 0;

  // Move to next available study day
  for (let week = 1; week <= totalWeeks; week++) {
    for (let dayOffset = 0; dayOffset < 7; dayOffset++) {
      const studyDate = new Date(now.getTime() + ((week - 1) * 7 + dayOffset) * 24 * 60 * 60 * 1000);
      if (studyDate > targetDate) break;

      const dayName = getDayShortName(studyDate.getDay());
      if (userAvailableDays.includes(dayName)) {
        // Assign 1-2 topics for this day based on estimated duration
        let dayMinutesAllocated = 0;

        while (dayMinutesAllocated < userMinutesPerStudyDay && topicIndex < sortedTopics.length) {
          const currentTopic = sortedTopics[topicIndex];
          const isRevision = user.studiedTopicIds?.includes(currentTopic.id) ?? false;

          // If topic is marked as already studied, create revision-focused topic version
          const topicForTrail = isRevision
            ? {
                ...currentTopic,
                resources: [
                  {
                    id: `rev-ex-${currentTopic.id}`,
                    type: 'exercicio' as const,
                    title: `15 Questões do ENEM: ${currentTopic.topic}`,
                    url: `https://www.google.com/search?q=questoes+enem+${encodeURIComponent(currentTopic.topic)}`,
                    durationMinutes: 25,
                    provider: 'Banco de Questões ENEM'
                  },
                  {
                    id: `rev-art-${currentTopic.id}`,
                    type: 'artigo' as const,
                    title: `Flashcards e Resumo Rápido: ${currentTopic.subtopic}`,
                    url: currentTopic.resources[1]?.url || currentTopic.resources[0]?.url || 'https://brasilescola.uol.com.br',
                    durationMinutes: 15,
                    provider: 'Resumo de Fixação'
                  }
                ]
              }
            : currentTopic;

          items.push({
            id: `item-w${week}-${dayName}-${topicIndex}`,
            weekNumber: week,
            dayOfWeek: dayName,
            date: formatLocalDate(studyDate),
            topic: topicForTrail,
            isRevisionOnly: isRevision,
            status: 'PENDENTE',
            replannedCount: 0
          });

          dayMinutesAllocated += isRevision ? Math.round(currentTopic.estimatedMinutes * 0.7) : currentTopic.estimatedMinutes;
          topicIndex++;
        }

        // Loop topics if student has plenty of time until exam
        if (topicIndex >= sortedTopics.length) {
          topicIndex = 0; // Repeat high-weight topics for revision/drills
        }
      }
    }
  }

  // Capacity Warning check (RF-10)
  let capacityWarning: string | undefined = undefined;
  const totalRequiredMinutes = sortedTopics.reduce((acc, t) => acc + t.estimatedMinutes, 0);
  const totalUserCapacityMinutes = totalWeeks * userHoursPerWeek * 60;

  if (totalUserCapacityMinutes < totalRequiredMinutes) {
    const coveragePercent = Math.min(99, Math.round((totalUserCapacityMinutes / totalRequiredMinutes) * 100));
    capacityWarning = `Atenção: Com ${userHoursPerWeek}h/semana até a data da prova, sua trilha cobrirá ${coveragePercent}% do edital com foco absoluto nos tópicos de MAIOR PESO e incidência no ENEM!`;
  }

  return {
    id: `trail-${Date.now()}`,
    userId: user.id,
    createdAt: new Date().toISOString(),
    totalWeeks,
    totalItems: items.length,
    items,
    capacityWarning,
    completedCount: 0,
    missedCount: 0
  };
}

function getDayShortName(dayNum: number): string {
  const map = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab'];
  return map[dayNum] || 'seg';
}

export function formatDayFull(shortDay: string): string {
  const map: Record<string, string> = {
    'seg': 'Segunda-feira',
    'ter': 'Terça-feira',
    'qua': 'Quarta-feira',
    'qui': 'Quinta-feira',
    'sex': 'Sexta-feira',
    'sab': 'Sábado',
    'dom': 'Domingo'
  };
  return map[shortDay] || shortDay;
}

export function replanTrailItems(
  items: TrailItem[],
  user: UserProfile,
  startingFromDateStr: string
): TrailItem[] {
  const untouchedItems: TrailItem[] = [];
  const itemsToReschedule: TrailItem[] = [];

  items.forEach(item => {
    if (item.status === 'CONCLUIDO' || item.status === 'PARCIAL' || item.date < startingFromDateStr) {
      untouchedItems.push(item);
    } else {
      itemsToReschedule.push(item);
    }
  });

  if (itemsToReschedule.length === 0) return items;

  const userAvailableDays = user.availableDays.length > 0 ? user.availableDays : ['seg', 'ter', 'qua', 'qui', 'sex'];

  let currentDate = new Date(startingFromDateStr + 'T00:00:00');
  if (isNaN(currentDate.getTime())) {
    currentDate = new Date();
  }

  // Se a data inicial for anterior a hoje, começa a reagendar a partir de hoje
  const todayStr = formatLocalDate(new Date());
  if (startingFromDateStr < todayStr) {
    currentDate = new Date(todayStr + 'T00:00:00');
  }

  const rescheduledItems = itemsToReschedule.map(item => {
    while (true) {
      const dayName = getDayShortName(currentDate.getDay());
      if (userAvailableDays.includes(dayName)) {
        break;
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    const newDateStr = formatLocalDate(currentDate);
    const newDayOfWeek = getDayShortName(currentDate.getDay());

    const updated = {
      ...item,
      date: newDateStr,
      dayOfWeek: newDayOfWeek,
      status: 'PENDENTE' as const,
      replannedCount: (item.replannedCount || 0) + 1
    };

    currentDate.setDate(currentDate.getDate() + 1);
    return updated;
  });

  const sortedAll = [...untouchedItems, ...rescheduledItems].sort((a, b) => a.date.localeCompare(b.date));

  if (sortedAll.length === 0) return items;

  const firstItemDate = new Date(sortedAll[0].date + 'T00:00:00');

  return sortedAll.map(item => {
    const itemDate = new Date(item.date + 'T00:00:00');
    const diffMs = itemDate.getTime() - firstItemDate.getTime();
    const diffDays = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)));
    const weekNumber = Math.floor(diffDays / 7) + 1;
    return {
      ...item,
      weekNumber
    };
  });
}
