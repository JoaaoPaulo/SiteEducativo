import { EnemMatrixTopic } from '../types';

export const ENEM_MATRIX_TOPICS: EnemMatrixTopic[] = [
  // MATEMÁTICA E SUAS TECNOLOGIAS (Peso Elevado no ENEM)
  {
    id: 'mat-01',
    area: 'Matemática',
    topic: 'Matemática Básica',
    subtopic: 'Razão, Proporção e Regra de Três Simples e Composta',
    weight: 'ALTA',
    weightScore: 10,
    estimatedMinutes: 60,
    resources: [
      { id: 'r-m1-1', type: 'video', title: 'Videoaula: Razão, Proporção e Escalas no ENEM', url: 'https://www.youtube.com/results?search_query=razao+e+proporcao+enem', durationMinutes: 25, provider: 'YouTube / Professor Ferretto' },
      { id: 'r-m1-2', type: 'artigo', title: 'Resumo e Fórmulas de Regra de Três', url: 'https://brasilescola.uol.com.br/matematica/regra-de-tres.htm', durationMinutes: 15, provider: 'Brasil Escola' },
      { id: 'r-m1-3', type: 'exercicio', title: '10 Questões Resolvidas do ENEM sobre Proporção', url: 'https://descomplica.com.br/blog/matematica-basica-no-enem/', durationMinutes: 20, provider: 'Banco de Exercícios ENEM' }
    ]
  },
  {
    id: 'mat-02',
    area: 'Matemática',
    topic: 'Matemática Financeira',
    subtopic: 'Porcentagem, Juros Simples e Compostos',
    weight: 'ALTA',
    weightScore: 9,
    estimatedMinutes: 50,
    resources: [
      { id: 'r-m2-1', type: 'video', title: 'Como Resolver Porcentagem Rápido no ENEM', url: 'https://www.youtube.com/results?search_query=porcentagem+enem+ferretto', durationMinutes: 20, provider: 'YouTube' },
      { id: 'r-m2-2', type: 'artigo', title: 'Guia de Juros Compostos e Aumentos Sucessivos', url: 'https://mundoeducacao.uol.com.br/matematica/juros-compostos.htm', durationMinutes: 15, provider: 'Mundo Educação' },
      { id: 'r-m2-3', type: 'exercicio', title: 'Lista de Exercícios com Pegadinhas do ENEM', url: 'https://todamateria.com.br/exercicios-de-porcentagem/', durationMinutes: 15, provider: 'Toda Matéria' }
    ]
  },
  {
    id: 'mat-03',
    area: 'Matemática',
    topic: 'Geometria Plana',
    subtopic: 'Áreas de Figuras Planas (Triângulos, Círculos, Quadriláteros)',
    weight: 'ALTA',
    weightScore: 9,
    estimatedMinutes: 60,
    resources: [
      { id: 'r-m3-1', type: 'video', title: 'Áreas de Figuras Planas - Fórmulas e Macetes ENEM', url: 'https://www.youtube.com/results?search_query=geometria+plana+enem', durationMinutes: 25, provider: 'YouTube' },
      { id: 'r-m3-2', type: 'artigo', title: 'Resumo Ilustrado de Geometria Plana', url: 'https://brasilescola.uol.com.br/matematica/geometria-plana.htm', durationMinutes: 15, provider: 'Brasil Escola' },
      { id: 'r-m3-3', type: 'exercicio', title: 'Exercícios Comentados de Áreas de Terrenos no ENEM', url: 'https://projetomedicina.com.br/materias/matematica/geometria-plana/', durationMinutes: 20, provider: 'Projeto Medicina' }
    ]
  },
  {
    id: 'mat-04',
    area: 'Matemática',
    topic: 'Geometria Espacial',
    subtopic: 'Prismas, Cilindros, Capacidad e Volume',
    weight: 'ALTA',
    weightScore: 8,
    estimatedMinutes: 60,
    resources: [
      { id: 'r-m4-1', type: 'video', title: 'Volume e Capacidade (Litros) no ENEM', url: 'https://www.youtube.com/results?search_query=geometria+espacial+enem+volumes', durationMinutes: 25, provider: 'YouTube' },
      { id: 'r-m4-2', type: 'artigo', title: 'Conversão de m³ para Litros e Planificação', url: 'https://todamateria.com.br/geometria-espacial/', durationMinutes: 15, provider: 'Toda Matéria' }
    ]
  },
  {
    id: 'mat-05',
    area: 'Matemática',
    topic: 'Funções',
    subtopic: 'Função Afim (1º Grau) e Função Quadrática (2º Grau - Máximos e Mínimos)',
    weight: 'ALTA',
    weightScore: 8,
    estimatedMinutes: 60,
    resources: [
      { id: 'r-m5-1', type: 'video', title: 'Gráficos de Funções e Vértice da Parábola no ENEM', url: 'https://www.youtube.com/results?search_query=funcao+do+segundo+grau+enem', durationMinutes: 30, provider: 'YouTube' },
      { id: 'r-m5-2', type: 'exercicio', title: 'Questões Clássicas de Lucro Máximo e Vértice', url: 'https://brasilescola.uol.com.br/matematica/vertice-parabola.htm', durationMinutes: 20, provider: 'Brasil Escola' }
    ]
  },
  {
    id: 'mat-06',
    area: 'Matemática',
    topic: 'Estatística e Análise de Dados',
    subtopic: 'Média Aritmética e Ponderada, Moda, Mediana e Leitura de Gráficos',
    weight: 'ALTA',
    weightScore: 9,
    estimatedMinutes: 50,
    resources: [
      { id: 'r-m6-1', type: 'video', title: 'Média, Moda e Mediana Sem Errar no ENEM', url: 'https://www.youtube.com/results?search_query=estatistica+enem+media+moda+mediana', durationMinutes: 20, provider: 'YouTube' },
      { id: 'r-m6-2', type: 'exercicio', title: 'Interpretação de Gráficos e Tabelas ENEM', url: 'https://todamateria.com.br/exercicios-de-estatistica/', durationMinutes: 20, provider: 'Toda Matéria' }
    ]
  },
  {
    id: 'mat-07',
    area: 'Matemática',
    topic: 'Probabilidade e Análise Combinatória',
    subtopic: 'Princípio Fundamental da Contagem, Arranjo, Combinação e Probabilidade Condicional',
    weight: 'MEDIA',
    weightScore: 7,
    estimatedMinutes: 60,
    resources: [
      { id: 'r-m7-1', type: 'video', title: 'Diferença entre Arranjo e Combinação no ENEM', url: 'https://www.youtube.com/results?search_query=analise+combinatoria+enem', durationMinutes: 25, provider: 'YouTube' }
    ]
  },

  // CIÊNCIAS DA NATUREZA (Biologia, Química, Física)
  {
    id: 'nat-01',
    area: 'Ciências da Natureza',
    topic: 'Biologia - Ecologia',
    subtopic: 'Cadeias Alimentares, Ciclos Biogeoquímicos e Impactos Ambientais',
    weight: 'ALTA',
    weightScore: 10,
    estimatedMinutes: 50,
    resources: [
      { id: 'r-n1-1', type: 'video', title: 'Ecologia no ENEM: O Assunto Mais Cobrado em Biologia', url: 'https://www.youtube.com/results?search_query=ecologia+enem+biologia', durationMinutes: 25, provider: 'YouTube / Biologia Total' },
      { id: 'r-n1-2', type: 'artigo', title: 'Resumo: Eutrofização, Magnificação Trófica e Aquecimento Global', url: 'https://brasilescola.uol.com.br/biologia/ecologia.htm', durationMinutes: 15, provider: 'Brasil Escola' }
    ]
  },
  {
    id: 'nat-02',
    area: 'Ciências da Natureza',
    topic: 'Biologia - Citologia e Genética',
    subtopic: 'Organelas Celulares, Mitose/Meiose e Leis de Mendel',
    weight: 'ALTA',
    weightScore: 8,
    estimatedMinutes: 60,
    resources: [
      { id: 'r-n2-1', type: 'video', title: 'Resumo Prático de Organelas Celulares', url: 'https://www.youtube.com/results?search_query=citologia+organelas+enem', durationMinutes: 20, provider: 'YouTube' },
      { id: 'r-n2-2', type: 'exercicio', title: 'Questões de Cruzamento Genético e Heredogramas', url: 'https://todamateria.com.br/exercicios-de-genetica/', durationMinutes: 20, provider: 'Toda Matéria' }
    ]
  },
  {
    id: 'nat-03',
    area: 'Ciências da Natureza',
    topic: 'Química - Físico-Química e Meio Ambiente',
    subtopic: 'Estequiometria, Soluções, PH, Reações Endotérmicas e Exotérmicas',
    weight: 'ALTA',
    weightScore: 9,
    estimatedMinutes: 60,
    resources: [
      { id: 'r-n3-1', type: 'video', title: 'Passo a Passo Infalível de Estequiometria no ENEM', url: 'https://www.youtube.com/results?search_query=estequiometria+enem+quimica', durationMinutes: 30, provider: 'YouTube / Professor Michel' },
      { id: 'r-n3-2', type: 'artigo', title: 'Relações de Massa, Mol e Volume nas Reações', url: 'https://mundoeducacao.uol.com.br/quimica/calculos-estequiometricos.htm', durationMinutes: 15, provider: 'Mundo Educação' }
    ]
  },
  {
    id: 'nat-04',
    area: 'Ciências da Natureza',
    topic: 'Química - Química Orgânica',
    subtopic: 'Cadeias Carbônicas, Funções Orgânicas e Isomeria',
    weight: 'ALTA',
    weightScore: 8,
    estimatedMinutes: 50,
    resources: [
      { id: 'r-n4-1', type: 'video', title: 'Reconhecendo Funções Orgânicas no ENEM', url: 'https://www.youtube.com/results?search_query=funcoes+organicas+enem', durationMinutes: 25, provider: 'YouTube' }
    ]
  },
  {
    id: 'nat-05',
    area: 'Ciências da Natureza',
    topic: 'Física - Eletricidade e Circuitos',
    subtopic: 'Lei de Ohm, Circuitos em Série e Paralelo, Potência Elétrica',
    weight: 'ALTA',
    weightScore: 9,
    estimatedMinutes: 60,
    resources: [
      { id: 'r-n5-1', type: 'video', title: 'Circuitos Elétricos e Consumo de Energia no ENEM', url: 'https://www.youtube.com/results?search_query=circuitos+eletricos+enem+fisica', durationMinutes: 25, provider: 'YouTube / Ciência em Ação' },
      { id: 'r-n5-2', type: 'exercicio', title: 'Como Calcular o Valor da Conta de Luz em Questões do ENEM', url: 'https://brasilescola.uol.com.br/fisica/potencia-eletrica.htm', durationMinutes: 20, provider: 'Brasil Escola' }
    ]
  },
  {
    id: 'nat-06',
    area: 'Ciências da Natureza',
    topic: 'Física - Ondulatória e Termologia',
    subtopic: 'Equação Fundamental das Ondas, Fenômenos Ondulatórios, Calorimetria',
    weight: 'MEDIA',
    weightScore: 8,
    estimatedMinutes: 50,
    resources: [
      { id: 'r-n6-1', type: 'video', title: 'Ondulatória: V = λ . f e Fenômenos Ondulatórios', url: 'https://www.youtube.com/results?search_query=ondulatoria+enem', durationMinutes: 20, provider: 'YouTube' }
    ]
  },

  // CIÊNCIAS HUMANAS (História, Geografia, Filosofia, Sociologia)
  {
    id: 'hum-01',
    area: 'Ciências Humanas',
    topic: 'História do Brasil',
    subtopic: 'Brasil Colônia, Segundo Reinado, Era Vargas e Ditadura Militar',
    weight: 'ALTA',
    weightScore: 10,
    estimatedMinutes: 50,
    resources: [
      { id: 'r-h1-1', type: 'video', title: 'Era Vargas no ENEM: Estado Novo e Leis Trabalhistas', url: 'https://www.youtube.com/results?search_query=era+vargas+enem+historia', durationMinutes: 25, provider: 'YouTube / Historia Online' },
      { id: 'r-h1-2', type: 'artigo', title: 'Cronologia e Fatos Marcantes da Ditadura Militar', url: 'https://brasilescola.uol.com.br/historiab.htm', durationMinutes: 15, provider: 'Brasil Escola' }
    ]
  },
  {
    id: 'hum-02',
    area: 'Ciências Humanas',
    topic: 'Geografia Física e Ambiental',
    subtopic: 'Biomas Brasileiros (Cerrado, Caatinga, Amazônia), Climas e Geomorfologia',
    weight: 'ALTA',
    weightScore: 9,
    estimatedMinutes: 50,
    resources: [
      { id: 'r-h2-1', type: 'video', title: 'Biomas Brasileiros e Questões Ambientais no ENEM', url: 'https://www.youtube.com/results?search_query=biomas+brasileiros+enem+geografia', durationMinutes: 20, provider: 'YouTube' }
    ]
  },
  {
    id: 'hum-03',
    area: 'Ciências Humanas',
    topic: 'Geografia Agrária e Urbana',
    subtopic: 'Urbanização, Exodo Rural, Agropecuária e Impactos Socioespaciais',
    weight: 'ALTA',
    weightScore: 8,
    estimatedMinutes: 45,
    resources: [
      { id: 'r-h3-1', type: 'video', title: 'Geografia Urbana e Segregação Espacial no ENEM', url: 'https://www.youtube.com/results?search_query=geografia+urbana+enem', durationMinutes: 20, provider: 'YouTube' }
    ]
  },
  {
    id: 'hum-04',
    area: 'Ciências Humanas',
    topic: 'Filosofia e Sociologia',
    subtopic: 'Filosofia Antiga (Sócrates, Platão, Aristóteles), Iluminismo, Cidadania e Direitos Humanos',
    weight: 'ALTA',
    weightScore: 8,
    estimatedMinutes: 50,
    resources: [
      { id: 'r-h4-1', type: 'video', title: 'Contratualistas (Hobbes, Locke, Rousseau) no ENEM', url: 'https://www.youtube.com/results?search_query=contratualistas+enem+filosofia', durationMinutes: 20, provider: 'YouTube' }
    ]
  },

  // LINGUAGENS, CÓDIGOS E SUAS TECNOLOGIAS
  {
    id: 'lin-01',
    area: 'Linguagens e Códigos',
    topic: 'Interpretação de Texto e Semântica',
    subtopic: 'Funções da Linguagem, Coesão e Coerência, Denotação/Conotação e Figuras de Linguagem',
    weight: 'ALTA',
    weightScore: 10,
    estimatedMinutes: 45,
    resources: [
      { id: 'r-l1-1', type: 'video', title: 'Como Interpretar Textos do ENEM sem Cair em Pegadinhas', url: 'https://www.youtube.com/results?search_query=interpretacao+de+texto+enem', durationMinutes: 20, provider: 'YouTube / Noslen' },
      { id: 'r-l1-2', type: 'artigo', title: 'As 6 Funções da Linguagem Explicadas com Exemplos', url: 'https://brasilescola.uol.com.br/gramatica/funcoes-linguagem.htm', durationMinutes: 15, provider: 'Brasil Escola' }
    ]
  },
  {
    id: 'lin-02',
    area: 'Linguagens e Códigos',
    topic: 'Literatura Brasileira',
    subtopic: 'Modernismo (1ª, 2ª e 3ª Fases), Romantismo e Realismo (Machado de Assis)',
    weight: 'ALTA',
    weightScore: 8,
    estimatedMinutes: 50,
    resources: [
      { id: 'r-l2-1', type: 'video', title: 'Semana de Arte Moderna e Fases do Modernismo no ENEM', url: 'https://www.youtube.com/results?search_query=modernismo+enem+literatura', durationMinutes: 25, provider: 'YouTube' }
    ]
  },

  // REDAÇÃO NOTA 1000 (Fundamental no ENEM)
  {
    id: 'red-01',
    area: 'Redação Nota 1000',
    topic: 'Estrutura do Texto Dissertativo-Argumentativo',
    subtopic: 'Introdução, Tese Clara, Desenvolvimento com Repertório e Projeto de Texto',
    weight: 'ALTA',
    weightScore: 10,
    estimatedMinutes: 60,
    resources: [
      { id: 'r-r1-1', type: 'video', title: 'Esqueleto Infalível de Redação Nota 1000 para o ENEM', url: 'https://www.youtube.com/results?search_query=esqueleto+redacao+enem+nota+1000', durationMinutes: 25, provider: 'YouTube / Debora Aladim' },
      { id: 'r-r1-2', type: 'artigo', title: 'Guia Completo das 5 Competências da Redação do ENEM', url: 'https://g1.globo.com/educacao/enem/', durationMinutes: 15, provider: 'G1 Guia ENEM' }
    ]
  },
  {
    id: 'red-02',
    area: 'Redação Nota 1000',
    topic: 'Proposta de Intervenção Detalhada (Competência 5)',
    subtopic: 'Os 5 Elementos Obrigatórios: Agente, Ação, Meio/Modo, Efeito e Detalhamento',
    weight: 'ALTA',
    weightScore: 10,
    estimatedMinutes: 50,
    resources: [
      { id: 'r-r2-1', type: 'video', title: 'Como Garantir 200 Pontos na Proposta de Intervenção', url: 'https://www.youtube.com/results?search_query=proposta+de+intervencao+enem+competencia+5', durationMinutes: 20, provider: 'YouTube' },
      { id: 'r-r2-2', type: 'artigo', title: 'Exemplos de Agentes e Detalhamento sem Perder Pontos', url: 'https://brasilescola.uol.com.br/redacao/proposta-intervencao-enem.htm', durationMinutes: 15, provider: 'Brasil Escola' }
    ]
  }
];
