// Tipos e Interfaces do Painel de Inteligência Competitiva Cooxupé

export type Category = 'insumos' | 'irrigacao' | 'maquinario';

export type SubCategory =
  // Insumos
  | 'fertilizantes'
  | 'defensivos_quimicos'
  | 'bioinsumos'
  | 'foliares'
  // Irrigação
  | 'gotejamento'
  | 'microaspersao'
  | 'pivo_central'
  | 'automacao'
  // Maquinário
  | 'tratores_cafeeiros'
  | 'colhedoras'
  | 'pulverizadores'
  | 'recolhedoras'
  | 'pos_colheita';

export type CompetitorType = 
  | 'cooperativa'
  | 'revenda_privada'
  | 'concessionaria'
  | 'irrigacao_especializada';

export type Region = 'Sul de Minas' | 'Cerrado Mineiro' | 'Média Mogiana' | 'Matas de Minas';

export interface DataSourceInfo {
  sourceName: string;         // Nome do canal / documento de cotação do concorrente
  collectionMethod: string;   // Como o dado foi extraído no mercado
  competitorChannel: string;  // Canal oficial do concorrente (loja, concessionária, encarte)
  collectionDate: string;     // Data da coleta
  auditLevel: 'Oficial Concorrente' | 'Verificada em Balcão Concorrente' | 'Proposta Comercial Concorrente' | 'Oficial Cooxupé';
}

export interface StrategicKpi {
  id: string;
  title: string;
  value: string;
  unit: string;
  trend: string;
  trendType: 'positive' | 'negative' | 'neutral';
  barPercent: number;
  barColor?: string;
  whatItRepresents: string;    // O que representa (definição clara)
  howItWasExtracted: string;   // Como a informação foi extraída (metodologia)
  sourceInfo: DataSourceInfo;  // Fonte oficial detalhada
  updateFrequency: string;     // Frequência de atualização
}

export interface Competitor {
  id: string;
  name: string;
  type: CompetitorType;
  headquarters: string;
  mainRegions: Region[];
  marketShareEstimate: {
    insumos: number;     // % estimado
    irrigacao: number;   // % estimado
    maquinario: number;  // % estimado
  };
  strengths: string[];
  weaknesses: string[];
  primaryBrands: string[];
  badgeColor: string;
  summary: string;
  sourceInfo: DataSourceInfo;
  // Campos do Dossiê Estratégico
  foundationYear?: number;
  historyOverview?: string;
  modusOperandi?: string;
  targetAudience?: string;
  keyThreat?: string;
  tacticalDefense?: string;
  businessModelPillars?: string[];
}

export interface ProductItem {
  id: string;
  name: string;
  category: Category;
  subCategory: SubCategory;
  competitorId: string;
  competitorName: string;
  brandPartner: string;
  specs: string;
  targetCulture: string;
  priceTable: {
    cashPrice: number;       // Preço à vista do concorrente (R$)
    harvestTermPrice: number;// Preço a prazo safra do concorrente (R$)
    unit: string;            // 'ton', 'litro', 'unidade', 'metro/ha'
    barterCoffeeSc: number;  // Relação de troca estimada (sc/unidade)
  };
  specialOffer?: {
    tag: string;
    discountPercent: number;
    description: string;
    validUntil: string;
  };
  comparisonVsCooxupe: {
    cooxupeEquivalent: string;
    cooxupePriceDiffPercent: number; // Positivo = concorrente mais caro, Negativo = concorrente mais barato
    strategicVerdict: string;
  };
  warrantyOrSupport: string;
  dataSource: DataSourceInfo; // Rastreabilidade do canal do concorrente
}

export interface CommercialCampaign {
  id: string;
  competitorId: string;
  competitorName: string;
  title: string;
  category: Category | 'geral';
  campaignType: 'Early Order' | 'Barter Safra' | 'Feira/Evento' | 'Combinação Pacote' | 'Taxa Zero/Subsidiada';
  threatLevel: 'alta' | 'media' | 'baixa';
  validity: string;
  terms: string;
  benefits: string[];
  cooxupeCounterStrategy: string;
  dataSource: DataSourceInfo;
}

export interface FairEvent {
  id: string;
  name: string;
  organizer: string;
  location: string;
  period: string;
  focus: string[];
  competitorsPresent: string[];
  cooxupeStrategy: string;
  historicalVolume: string;
  keyTacticsObserved: string[];
  dataSource: DataSourceInfo;
}

export interface IntelligenceAlert {
  id: string;
  date: string;
  severity: 'critico' | 'atencao' | 'informativo';
  category: Category;
  competitorName: string;
  title: string;
  description: string;
  impactScore: number;
  suggestedAction: string;
  source: string;
  methodology: string;
}

export interface SwotItem {
  id: string;
  type: 'forca' | 'fraqueza' | 'oportunidade' | 'ameaca';
  pillar: Category | 'corporativo';
  title: string;
  details: string;
  tacticalDirective: string;
  sourceOrBasis: string;
}
