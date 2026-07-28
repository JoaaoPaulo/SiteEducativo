export type SubjectArea = 
  | 'Linguagens e Códigos'
  | 'Matemática'
  | 'Ciências da Natureza'
  | 'Ciências Humanas'
  | 'Redação Nota 1000';

export type SubjectDifficulty = 'Preciso de Muita Ajuda' | 'Médio' | 'Domino Bem';

export type CheckInStatus = 'PENDENTE' | 'CONCLUIDO' | 'PARCIAL' | 'ATRASADO';

export type PaymentMethod = 'pix' | 'card' | 'boleto';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  examDate: string; // ISO date string e.g. "2026-11-08"
  hoursPerWeek: number;
  availableDays: string[]; // e.g. ['seg', 'ter', 'qua', 'qui', 'sex', 'sab']
  difficulties: Record<SubjectArea, SubjectDifficulty>;
  studiedTopicIds: string[]; // IDs of ENEM topics user already studied / masters
  isSubscribed: boolean;
  subscriptionPlan?: 'mensal' | 'anual';
  subscriptionDate?: string;
  magicLinkSent?: boolean;
}

export interface ResourceItem {
  id: string;
  type: 'video' | 'artigo' | 'exercicio';
  title: string;
  url: string;
  durationMinutes: number;
  provider: string; // e.g. "YouTube", "Khan Academy", "Brasil Escola", "G1 Enem"
}

export interface EnemMatrixTopic {
  id: string;
  area: SubjectArea;
  topic: string;
  subtopic: string;
  weight: 'ALTA' | 'MEDIA' | 'ESTRATEGICA'; // Incidence weight on ENEM
  weightScore: number; // 1-10
  estimatedMinutes: number;
  resources: ResourceItem[];
}

export interface TrailItem {
  id: string;
  weekNumber: number;
  dayOfWeek: string; // e.g. 'seg', 'ter'
  date: string; // YYYY-MM-DD
  topic: EnemMatrixTopic;
  isRevisionOnly?: boolean; // True if marked by student as already studied/mastered
  status: CheckInStatus;
  completedAt?: string;
  originalDate?: string; // set if replanned
  replannedCount?: number;
}

export interface StudyTrail {
  id: string;
  userId: string;
  createdAt: string;
  totalWeeks: number;
  totalItems: number;
  items: TrailItem[];
  capacityWarning?: string; // message if hours < ideal
  completedCount: number;
  missedCount: number;
}

export interface ReplanResult {
  message: string;
  tip: string;
  affectedCount: number;
  newDatesSummary: Array<{ topicTitle: string; oldDate: string; newDate: string }>;
}
