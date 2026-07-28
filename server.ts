import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Helper for lazy Gemini initialization
  const getAi = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("GEMINI_API_KEY is not set. Features will fallback to smart automatic responses.");
      return null;
    }
    return new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  };

  // API Health Endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", env: process.env.NODE_ENV || "development" });
  });

  // Adaptive Re-planning Route
  app.post("/api/ai/replan", async (req, res) => {
    try {
      const { userName, missedCount, missedSubjects, daysUntilExam, hoursPerWeek, difficultAreas } = req.body;
      const ai = getAi();

      if (!ai) {
        // Fallback response if key is missing
        return res.json({
          message: `Sem problemas, ${userName || 'estudante'}! Movermos as ${missedCount || 'algumas'} tarefas acumuladas em ${missedSubjects?.join(', ') || 'matérias pendentes'} para os seus dias de maior disponibilidade. Seu ritmo foi reajustado mantendo os conteúdos de maior peso no ENEM em prioridade!`,
          tip: "Dica: Tente focar em sessões curtas de 25 minutos (Pomodoro) para retomar a consistência sem ansiedade.",
          success: true,
          fallback: true
        });
      }

      const prompt = `Você é o "Auxiliar de Estudos Trilha ENEM", um mentor de estudos altamente empático, motivador e estratégico para estudantes do vestibular ENEM (16-19 anos).
O estudante ${userName || 'estudante'} ficou sem concluir ${missedCount} item(ns) de estudo recentemente, principalmente nas áreas: ${missedSubjects?.join(', ') || 'geral'}.
Faltam ${daysUntilExam} dias para o ENEM e ele estuda ${hoursPerWeek}h por semana.
Suas áreas de maior dificuldade são: ${difficultAreas?.join(', ') || 'não informadas'}.

Gere uma resposta em JSON com 2 campos:
1) "message": Uma explicação curta (3 a 4 frases), muito acolhedora e motivadora (sem culpa nem tom punitivo), explicando como a trilha foi reorganizada para redistribuir os tópicos nos próximos dias sem sobrecarregá-lo.
2) "tip": Uma dica prática e acionável de estudo para o ENEM focada nas áreas acumuladas.

Responda APENAS em formato JSON válido com as chaves "message" e "tip".`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          temperature: 0.7,
        },
      });

      const jsonText = response.text || "{}";
      const parsed = JSON.parse(jsonText);

      return res.json({
        message: parsed.message || "Reorganizamos suas matérias pendentes para que você continue avançando rumo à sua nota no ENEM de forma equilibrada e sem estresse!",
        tip: parsed.tip || "Revisar exercícios resolvidos de anos anteriores ajuda a fixar os conceitos mais cobrados rapidamente.",
        success: true
      });
    } catch (error) {
      console.error("Error in /api/ai/replan:", error);
      res.json({
        message: "Reorganizamos sua grade mantendo as matérias de maior peso no ENEM como prioridade nos dias em que você tem mais tempo disponível!",
        tip: "Foque primeiro em compreender os conceitos fundamentais antes de tentar resolver questões complexas.",
        success: true,
        fallback: true
      });
    }
  });

  // Daily Motivation & Micro-tip Route
  app.post("/api/ai/motivation", async (req, res) => {
    try {
      const { userName, currentSubject, streakDays } = req.body;
      const ai = getAi();

      if (!ai) {
        return res.json({
          quote: "A consistência diária constrói o resultado do ENEM. Cada tópico concluído é um passo rumo à sua vaga!",
          actionTip: `Ao estudar ${currentSubject || 'sua matéria de hoje'}, tente explicar o conceito em voz alta com suas próprias palavras.`
        });
      }

      const prompt = `Crie uma frase motivadora curta e uma dica de estudo rápida para o estudante do ENEM ${userName || 'aluno'}.
Ele está em uma sequência de ${streakDays || 1} dia(s) de estudos e a matéria do dia é ${currentSubject || 'Geral'}.
Retorne em JSON com as chaves "quote" e "actionTip".`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          temperature: 0.8,
        },
      });

      const parsed = JSON.parse(response.text || "{}");
      return res.json({
        quote: parsed.quote || "Cada sessão de estudo aproxima você da sua aprovação no ENEM!",
        actionTip: parsed.actionTip || "Faça resumos em tópicos para memorizar conceitos chave."
      });
    } catch (error) {
      res.json({
        quote: "O segredo do ENEM não é estudar 12 horas em um dia, mas manter o ritmo firme todos os dias.",
        actionTip: "Resolva ao menos 3 questões do ENEM após ler o resumo teórico."
      });
    }
  });

  // Serve Vite in dev or static files in production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

