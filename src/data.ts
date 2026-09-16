import { 
  Competitor, 
  ProductItem, 
  CommercialCampaign, 
  FairEvent, 
  IntelligenceAlert, 
  SwotItem,
  StrategicKpi
} from './types';

export const COFFEE_PRICE_DEFAULT = 1820.00; // R$ por saca de 60kg (Café Arábica tipo 6 bebida dura - Mesa Cooxupé)

// ==========================================================================
// KPIS ESTRATÉGICOS COM LEGENDA EXPLICATIVA E METODOLOGIA
// ==========================================================================
export const STRATEGIC_KPIS: StrategicKpi[] = [
  {
    id: 'kpi-icp',
    title: 'Índice de Competitividade de Preço (ICP)',
    value: '102.4%',
    unit: 'vs Média de Mercado',
    trend: '+2.4%',
    trendType: 'positive',
    barPercent: 72,
    barColor: 'var(--agri-medium)',
    whatItRepresents: 'Indica a posição de preço global da Cooxupé ponderada pelo volume de compras de uma fazenda cafeeira típica. Valores acima de 100% significam que o produtor economiza no custo total ao adquirir na Cooxupé em comparação com a média ponderada dos concorrentes (Cocatrel, Coopercitrus e Revendas).',
    howItWasExtracted: 'Calculado a partir de uma cesta padrão de 42 insumos de alto giro (NPK 20-00-20, Nitrato de Amônio, Fungicidas Triazol/Estrobilurina, Inseticidas fisiológicos e peças de máquinas). Os preços de balcão e safra dos concorrentes são apurados semanalmente e ponderados pelos coeficientes técnicos da cafeicultura (CEPEA/Esalq).',
    sourceInfo: {
      sourceName: 'Cesta Padrão de Insumos - Cotações Coletadas nas Lojas e Balcões Concorrentes',
      collectionMethod: 'Pesquisa de mercado presencial e verificação de propostas de concorrentes',
      competitorChannel: 'Lojas Agro Cocatrel, Minasul, Coopercitrus e Revendas Lavoro',
      collectionDate: '15/09/2026',
      auditLevel: 'Verificada em Balcão Concorrente'
    },
    updateFrequency: 'Semanal (Toda segunda-feira)'
  },
  {
    id: 'kpi-barter',
    title: 'Relação de Troca Média (Barter sc/t NPK 20-00-20)',
    value: '1.62',
    unit: 'sc de 60kg / ton',
    trend: '-0.07 sc/t vs Rivais',
    trendType: 'positive',
    barPercent: 58,
    barColor: 'var(--coffee-amber)',
    whatItRepresents: 'Mede o esforço físico do cafeicultor: quantas sacas de café arábica tipo 6 beneficiado (60kg) o produtor precisa entregar para pagar 1 tonelada de adubo formulado NPK 20-00-20 na safra futura. Quanto menor o número de sacas, mais barato custa o insumo em moeda física.',
    howItWasExtracted: 'Divisão direta entre o preço faturado a prazo de safra do adubo (R$ 2.950/t na Cooxupé já com benefício de armazenagem) pela cotação futura de referência do café arábica na Mesa Cooxupé (R$ 1.820/sc). Comparado com as tabelas de barter da Cocatrel (1.69 sc/t) e Coopercitrus (1.72 sc/t).',
    sourceInfo: {
      sourceName: 'Tabelas Oficiais de Barter dos Concorrentes vs Mesa Cooxupé',
      collectionMethod: 'Cruzamento entre contratos de barter de cooperativas rivais e preços de balcão',
      competitorChannel: 'Departamentos de Barter Cocatrel, Minasul e Coopercitrus',
      collectionDate: '16/09/2026',
      auditLevel: 'Oficial Concorrente'
    },
    updateFrequency: 'Diária (Acompanha cotação em bolsa B3 e ICE NY)'
  },
  {
    id: 'kpi-cpr',
    title: 'Ameaça de Prazos Safra (CPRs de Revendas Privadas)',
    value: 'Moderada-Alta',
    unit: 'Índice de Exposição',
    trend: '+12% em volume',
    trendType: 'negative',
    barPercent: 80,
    barColor: 'var(--gold-harvest)',
    whatItRepresents: 'Mede o risco de desvio de sacas de cooperados para cumprimento de garantias com revendas privadas (Lavoro Agro, AgroGalaxy, Sinagro). Reflete a agressividade dos fundos de crédito privado ao oferecer aprovação rápida sem garantia hipotecária.',
    howItWasExtracted: 'Monitoramento do volume de CPRs (Cédulas de Produto Rural) Físicas e Financeiras registradas em cartórios de títulos e na B3 sob o código cafeicultura nas comarcas do Sul de Minas, Mogiana e Cerrado.',
    sourceInfo: {
      sourceName: 'Registros Públicos de CPR e Garantias de Safra na B3 e Cartórios de MG/SP',
      collectionMethod: 'Mineração de registros públicos de penhor e alienação de safra cafeeira',
      competitorChannel: 'Revendas Privadas (Lavoro Agro, AgroGalaxy, Sinagro e Tradings)',
      collectionDate: '10/09/2026',
      auditLevel: 'Oficial Concorrente'
    },
    updateFrequency: 'Mensal'
  },
  {
    id: 'kpi-femagri',
    title: 'Retenção de Barter na Femagri',
    value: '89.6%',
    unit: 'Taxa de Cumprimento',
    trend: '+2.1% a.a.',
    trendType: 'positive',
    barPercent: 90,
    barColor: 'var(--agri-primary)',
    whatItRepresents: 'Percentual de cooperados que adquiriram tratores, máquinas ou implementos via barter na Femagri e honraram rigorosamente o depósito físico do café nos armazéns da Cooxupé no encerramento da colheita.',
    howItWasExtracted: 'Conciliação entre o volume total de sacas contratadas na Femagri e as baixas de estoque registradas no sistema de armazenagem e recebimento de café.',
    sourceInfo: {
      sourceName: 'Relatório Oficial de Liquidação Física de Barter da Femagri (ERP SAPIENS)',
      collectionMethod: 'Auditoria de entrega de sacas em armazém versus contratos de compra parcelada',
      competitorChannel: 'Operações Comerciais Femagri Cooxupé',
      collectionDate: '31/08/2026',
      auditLevel: 'Oficial Cooxupé'
    },
    updateFrequency: 'Pós-Safra / Anual'
  }
];

// ==========================================================================
// CONCORRENTES MONITORADOS
// ==========================================================================
export const COMPETITORS: Competitor[] = [
  {
    id: 'cooxupe',
    name: 'Cooxupé (Referência Própria)',
    type: 'cooperativa',
    headquarters: 'Guaxupé - MG',
    mainRegions: ['Sul de Minas', 'Cerrado Mineiro', 'Média Mogiana', 'Matas de Minas'],
    marketShareEstimate: { insumos: 42, irrigacao: 28, maquinario: 35 },
    strengths: [
      'Maior cooperativa de cafeicultores do mundo (36k+ cooperados)',
      'Excelente liquidez e solidez na originação e barter de café',
      'Femagri consolidada como maior feira cooperativa do setor',
      'Corpo de Vendedores/CTCs próprio com assistência técnica capilarizada',
      'Retorno de sobras cooperativas comprovado no encerramento de safra'
    ],
    weaknesses: [
      'Menor agressividade em descontos de curto prazo frente a revendas privadas',
      'Portfólio de pivôs e irrigação de grande porte com dependência de integradores terceiros',
      'Burocracia de aprovação cadastral em comparação com revendas locais ágeis'
    ],
    primaryBrands: ['Agritech', 'Jacto', 'Yara', 'Bayer', 'Syngenta', 'Netafim', 'UPL'],
    badgeColor: '#1E5E3A',
    summary: 'Líder absoluta no mercado cafeeiro regional. Referência em modelo de barter seguro, qualidade e fidelização cooperada.',
    sourceInfo: {
      sourceName: 'Relatório Anual de Gestão e Sustentabilidade Cooxupé 2025/2026',
      collectionMethod: 'Dados institucionais auditados',
      competitorChannel: 'Canais Oficiais Cooxupé',
      collectionDate: '15/08/2026',
      auditLevel: 'Oficial Cooxupé'
    }
  },
  {
    id: 'cocatrel',
    name: 'Cocatrel',
    type: 'cooperativa',
    headquarters: 'Três Pontas - MG',
    mainRegions: ['Sul de Minas'],
    marketShareEstimate: { insumos: 22, irrigacao: 14, maquinario: 18 },
    strengths: [
      'Forte presença no epicentro cafeeiro do Sul de Minas',
      'Expocafé e Feira de Negócios com alto apelo comercial local',
      'Fábrica de rações e misturadora de fertilizantes própria em expansão',
      'Condições de barter direto com seguro agrícola acoplado'
    ],
    weaknesses: [
      'Raio de atuação geográfica mais restrito ao Sul de Minas',
      'Menor poder de barganha de compra com multinacionais que a Cooxupé',
      'Linha de financiamento para maquinário pesado mais limitada'
    ],
    primaryBrands: ['Fertipar', 'Basf', 'Corteva', 'LS Tractor', 'Jacto', 'Rivulis'],
    badgeColor: '#C28E42',
    summary: 'Concorrente direta mais próxima geograficamente no Sul de Minas. Muito combativa em preços de fertilizantes misturados.',
    sourceInfo: {
      sourceName: 'Tabela de Balcão e Encartes Comerciais da Loja Agro Cocatrel',
      collectionMethod: 'Pesquisa presencial no balcão do concorrente e catálogo da Expocafé',
      competitorChannel: 'Lojas Físicas Agro Cocatrel (Três Pontas, Nepomuceno, Santana da Vargem)',
      collectionDate: '14/09/2026',
      auditLevel: 'Verificada em Balcão Concorrente'
    }
  },
  {
    id: 'minasul',
    name: 'Minasul',
    type: 'cooperativa',
    headquarters: 'Varginha - MG',
    mainRegions: ['Sul de Minas', 'Matas de Minas'],
    marketShareEstimate: { insumos: 16, irrigacao: 12, maquinario: 15 },
    strengths: [
      'Inovação tecnológica e barter digital (plataforma Coffee Coin)',
      'Lojas Agro Minasul modernas em cidades estratégicas',
      'Agilidade em campanhas de compras antecipadas (Early Order)'
    ],
    weaknesses: [
      'Menor volume de armazenagem e infraestrutura de exportação que a Cooxupé',
      'Volatilidade de estoques em períodos de pico de adubação'
    ],
    primaryBrands: ['EuroChem', 'FMC', 'UPL', 'Agritech', 'Stara', 'Netafim'],
    badgeColor: '#2563EB',
    summary: 'Foco em digitalização e flexibilidade comercial. Ganha espaço onde produtores buscam transações rápidas sem burocracia.',
    sourceInfo: {
      sourceName: 'Catálogo de Ofertas Aplicativo Minasul Digital + Balcão Varginha',
      collectionMethod: 'Captura digital de preços no aplicativo público e visitas a lojas',
      competitorChannel: 'Lojas Agro Minasul (Varginha, Lavras, Capelinha)',
      collectionDate: '12/09/2026',
      auditLevel: 'Verificada em Balcão Concorrente'
    }
  },
  {
    id: 'coopercitrus',
    name: 'Coopercitrus',
    type: 'cooperativa',
    headquarters: 'Bebedouro - SP (forte presença em MG)',
    mainRegions: ['Média Mogiana', 'Cerrado Mineiro', 'Sul de Minas'],
    marketShareEstimate: { insumos: 14, irrigacao: 26, maquinario: 24 },
    strengths: [
      'Concessionária Valtra e Jacto oficial com portfólio completo de máquinas pesadas',
      'Divisão especializada de engenharia de irrigação (projetos chave na mão)',
      'Forte capitalização e diversificação com cana, grãos e citros'
    ],
    weaknesses: [
      'Origem não cafeeira gera menor empatia cultural com cooperados tradicionais de café',
      'Modelo de barter café menos especializado que cooperativas mineiras'
    ],
    primaryBrands: ['Valtra', 'Jacto', 'Netafim', 'Yara', 'Bayer', 'Bauer'],
    badgeColor: '#059669',
    summary: 'Principal rival em tecnologia de irrigação e máquinas de alta potência. Muito agressiva em projetos completos de fazendas.',
    sourceInfo: {
      sourceName: 'Tabela de Concessionária Oficial Valtra/Jacto Coopercitrus',
      collectionMethod: 'Orçamentos formais emitidos pela concessionária do concorrente',
      competitorChannel: 'Concessionárias Coopercitrus (Franca, Ribeirão Preto, São Sebastião do Paraíso)',
      collectionDate: '10/09/2026',
      auditLevel: 'Proposta Comercial Concorrente'
    }
  },
  {
    id: 'expocacer',
    name: 'Expocacer',
    type: 'cooperativa',
    headquarters: 'Patrocínio - MG',
    mainRegions: ['Cerrado Mineiro'],
    marketShareEstimate: { insumos: 18, irrigacao: 22, maquinario: 12 },
    strengths: [
      'Referência absoluta em café irrigado por gotejamento no Cerrado Mineiro',
      'Alta capacitação técnica dos associados em agricultura regenerativa e bioinsumos',
      'Forte valorização do café com Denominação de Origem Protegida (DOP)'
    ],
    weaknesses: [
      'Restrita ao Cerrado Mineiro, sem capilaridade no Sul de Minas ou Mogiana',
      'Dependência de grandes frotas e altos tíquetes médios'
    ],
    primaryBrands: ['Koppert', 'Nutrien', 'Lindsay', 'Netafim', 'Case IH'],
    badgeColor: '#D97706',
    summary: 'Líder em prestígio no Cerrado. Concorre diretamente nos núcleos da Cooxupé em Patrocínio, Coromandel e Monte Carmelo.',
    sourceInfo: {
      sourceName: 'Boletim de Insumos e Encartes Técnicos da Expocacer',
      collectionMethod: 'Material comercial distribuído aos produtores do Cerrado Mineiro',
      competitorChannel: 'Loja de Insumos Expocacer - Patrocínio / MG',
      collectionDate: '08/09/2026',
      auditLevel: 'Verificada em Balcão Concorrente'
    }
  },
  {
    id: 'lavoro_agro',
    name: 'Lavoro Agro / Redes Privadas',
    type: 'revenda_privada',
    headquarters: 'São Paulo - SP (Filiais MG/SP)',
    mainRegions: ['Sul de Minas', 'Cerrado Mineiro', 'Média Mogiana'],
    marketShareEstimate: { insumos: 28, irrigacao: 6, maquinario: 4 },
    strengths: [
      'Condições agressivas de CPR Física/Financeira com aprovação rápida',
      'Parcerias diretas e prioritárias com Syngenta e Corteva',
      'Descontos escalonados por pacote defensivo + fertilizante foliar'
    ],
    weaknesses: [
      'Sem distribuição de sobras ou benefícios sociais cooperativos',
      'Relação puramente comercial, suscetível a cancelamentos em quebra de safra'
    ],
    primaryBrands: ['Syngenta', 'Corteva', 'Mosaic', 'Fertipar', 'Albaugh'],
    badgeColor: '#DC2626',
    summary: 'Maior consolidadora privada de revendas. Pressiona margens de defensivos da Cooxupé com campanhas de crédito flexível.',
    sourceInfo: {
      sourceName: 'Tabela de Campanha Early Order e Minutas de CPR Lavoro Agro',
      collectionMethod: 'Propostas comerciais formais emitidas pela rede privada de revendas',
      competitorChannel: 'Filiais Lavoro Agro / Pitangueiras / Agrovenci no Sul de MG e Mogiana',
      collectionDate: '15/09/2026',
      auditLevel: 'Proposta Comercial Concorrente'
    }
  },
  {
    id: 'concessionarias_maquinas',
    name: 'Concessionárias Especializadas (John Deere / Case / Valtra)',
    type: 'concessionaria',
    headquarters: 'Varginha, Pouso Alegre, Alfenas, Ribeirão Preto',
    mainRegions: ['Sul de Minas', 'Média Mogiana', 'Cerrado Mineiro'],
    marketShareEstimate: { insumos: 0, irrigacao: 5, maquinario: 38 },
    strengths: [
      'Financiamento via bancos de fábrica (Taxas Moderfrota/Pronaf e taxas subsidiadas)',
      'Oficinas autorizadas com telemetria e pronta entrega de peças',
      'Linha cafeeira estreita com tecnologias embarcadas de piloto automático'
    ],
    weaknesses: [
      'Não operam barter com liquidação física de café no armazém do produtor',
      'Custos elevados de manutenção e peças originais pós-garantia'
    ],
    primaryBrands: ['John Deere', 'Case IH', 'New Holland', 'Valtra', 'Agritech'],
    badgeColor: '#7C3AED',
    summary: 'Disputam o cooperado na aquisição de tratores e colhedoras onde o produtor prefere financiamento bancário a barter.',
    sourceInfo: {
      sourceName: 'Tabela Faturada Concessionárias (Treviso John Deere, Curinga Case, Minas Máquinas)',
      collectionMethod: 'Propostas de venda direta com simulação de financiamento bancário',
      competitorChannel: 'Rede de Concessionárias Autorizadas das Montadoras',
      collectionDate: '11/09/2026',
      auditLevel: 'Proposta Comercial Concorrente'
    }
  },
  {
    id: 'players_irrigacao',
    name: 'Integradores Especializados de Irrigação (Netafim / Rivulis / Lindsay)',
    type: 'irrigacao_especializada',
    headquarters: 'Campinas / Ribeirão Preto / Uberlândia',
    mainRegions: ['Cerrado Mineiro', 'Sul de Minas', 'Média Mogiana'],
    marketShareEstimate: { insumos: 2, irrigacao: 45, maquinario: 0 },
    strengths: [
      'Engenharia agronômica especializada em estresse hídrico controlado para maturação',
      'Projetos de gotejamento subterrâneo de alta durabilidade (15 a 20 anos)',
      'Garantias estendidas de fábrica para tubos gotejadores autocompensantes'
    ],
    weaknesses: [
      'Necessitam de financiamento externo ou barter triangular com tradings',
      'Custo de implantação por hectare elevado se o produtor não tiver outorga pronta'
    ],
    primaryBrands: ['Netafim', 'Rivulis', 'NaanDanJain', 'Lindsay Zimmatic', 'Valmont'],
    badgeColor: '#0891B2',
    summary: 'Parceiros e ao mesmo tempo concorrentes via canais diretos de venda aos grandes cafeicultores irrigantes.',
    sourceInfo: {
      sourceName: 'Projetos Executivos e Orçamentos de Engenharia Hidráulica Chave na Mão',
      collectionMethod: 'Propostas técnicas de integradores privados para cafeicultores irrigantes',
      competitorChannel: 'Canais de Venda Direta Netafim Brasil e Revendas Master Rivulis',
      collectionDate: '13/09/2026',
      auditLevel: 'Oficial Concorrente'
    }
  }
];

// ==========================================================================
// CATÁLOGO DE PRODUTOS DOS CONCORRENTES (COM CANAL E FONTE CLARA)
// ==========================================================================
export const PRODUCTS_CATALOG: ProductItem[] = [
  // ===================== INSUMOS =====================
  {
    id: 'prod-ins-01',
    name: 'Fertilizante NPK 20-00-20 Granulado Clorado',
    category: 'insumos',
    subCategory: 'fertilizantes',
    competitorId: 'cocatrel',
    competitorName: 'Cocatrel',
    brandPartner: 'Fertipar / Mistura Cocatrel',
    specs: 'Formulação clássica para cafezais adultos em carga. Nitrogênio nítrico/amoniacal 20% e Potássio (KCl) 20%. Big Bag 1.000 kg.',
    targetCulture: 'Café Arábica e Conilon',
    priceTable: {
      cashPrice: 2780.00,
      harvestTermPrice: 3080.00,
      unit: 'tonelada',
      barterCoffeeSc: 1.69
    },
    specialOffer: {
      tag: 'Campanha Adubação Sul de Minas',
      discountPercent: 3.5,
      description: 'Desconto de R$ 97/t para pedidos acima de 30 toneladas com entrega programada para out/nov.',
      validUntil: '31/10/2026'
    },
    comparisonVsCooxupe: {
      cooxupeEquivalent: 'NPK 20-00-20 Cooxupé Cooper Fertil',
      cooxupePriceDiffPercent: -2.8,
      strategicVerdict: 'Cocatrel está sacrificando 2,5% de margem no adubo a granel para travar a fidelização de café da safra futura em Três Pontas e Varginha.'
    },
    warrantyOrSupport: 'Laudo de granulometria e assistência de campo local Cocatrel.',
    dataSource: {
      sourceName: 'Tabela Oficial de Balcão Cocatrel (Loja Agro Três Pontas)',
      collectionMethod: 'Cotação presencial direta no balcão de vendas do concorrente',
      competitorChannel: 'Loja Agro Cocatrel - Três Pontas / MG',
      collectionDate: '14/09/2026',
      auditLevel: 'Verificada em Balcão Concorrente'
    }
  },
  {
    id: 'prod-ins-02',
    name: 'Nitrato de Amônio com Enxofre e Cálcio (YaraBela)',
    category: 'insumos',
    subCategory: 'fertilizantes',
    competitorId: 'coopercitrus',
    competitorName: 'Coopercitrus',
    brandPartner: 'Yara Fertilizantes',
    specs: '27% Nitrogênio (50% nítrico e 50% amoniacal) + 4% Cálcio + 2% Enxofre. Alta eficiência de absorção radicular sem volatilização.',
    targetCulture: 'Café Arábica de Alta Produtividade',
    priceTable: {
      cashPrice: 3250.00,
      harvestTermPrice: 3590.00,
      unit: 'tonelada',
      barterCoffeeSc: 1.97
    },
    specialOffer: {
      tag: 'Pacote Nutrição Nobre',
      discountPercent: 5.0,
      description: 'Na compra com micronutrientes foliares YaraVita, frete CIF gratuito para MG.',
      validUntil: '15/11/2026'
    },
    comparisonVsCooxupe: {
      cooxupeEquivalent: 'YaraBela Cooxupé Nutrição',
      cooxupePriceDiffPercent: 1.2,
      strategicVerdict: 'Preço equilibrado. A Cooxupé mantém vantagem logística pela frota dedicada e armazéns em Guaxupé e Alpinópolis.'
    },
    warrantyOrSupport: 'Garantia Yara de pureza física e análise de teor garantido em contrato.',
    dataSource: {
      sourceName: 'Proposta Comercial Direta Coopercitrus (Filial São Sebastião do Paraíso)',
      collectionMethod: 'Orçamento formal emitido pela filial comercial do concorrente',
      competitorChannel: 'Filial Coopercitrus Insumos - São Sebastião do Paraíso / MG',
      collectionDate: '11/09/2026',
      auditLevel: 'Proposta Comercial Concorrente'
    }
  },
  {
    id: 'prod-ins-03',
    name: 'Fungicida Sistêmico Priori Xtra (Azoxistrobina + Ciproconazol)',
    category: 'insumos',
    subCategory: 'defensivos_quimicos',
    competitorId: 'lavoro_agro',
    competitorName: 'Lavoro Agro / Redes Privadas',
    brandPartner: 'Syngenta',
    specs: 'Fungicida foliar de referência no controle preventivo e curativo de Ferrugem do Cafeeiro (Hemileia vastatrix) e Mancha de Olho Pardo. Galão 5 L.',
    targetCulture: 'Café Arábica',
    priceTable: {
      cashPrice: 1320.00,
      harvestTermPrice: 1490.00,
      unit: 'galão 5L (R$ 264/L)',
      barterCoffeeSc: 0.82
    },
    specialOffer: {
      tag: 'Combo Sanidade Máxima',
      discountPercent: 6.0,
      description: 'CPR com carência estendida para maio/2027 caso associado a inseticida de solo da mesma multinacional.',
      validUntil: '20/12/2026'
    },
    comparisonVsCooxupe: {
      cooxupeEquivalent: 'Priori Xtra Syngenta (Canal Cooxupé)',
      cooxupePriceDiffPercent: -4.5,
      strategicVerdict: 'Lavoro utilizando fungicida como produto isca na região de Guaxupé e Passos para capturar contratos de CPR física.'
    },
    warrantyOrSupport: 'Rastreabilidade Syngenta e suporte de receituário agronômico.',
    dataSource: {
      sourceName: 'Proposta Comercial de Fornecimento com CPR Lavoro Agro',
      collectionMethod: 'Proposta formal da revenda privada fornecida a produtor da região',
      competitorChannel: 'Rede de Distribuição Lavoro Agro (Regional Alfenas / Passos)',
      collectionDate: '15/09/2026',
      auditLevel: 'Proposta Comercial Concorrente'
    }
  },
  {
    id: 'prod-ins-04',
    name: 'Biofungicida e Bionematicida Rizobactérias (Bacillus subtilis)',
    category: 'insumos',
    subCategory: 'bioinsumos',
    competitorId: 'expocacer',
    competitorName: 'Expocacer',
    brandPartner: 'Koppert Biological Systems',
    specs: 'Formulação líquida com alta concentração de endósporos viáveis para proteção de raízes contra fitonematoides e fungos de solo em cafezais irrigados.',
    targetCulture: 'Café Irrigado e Sequeiro Regenerativo',
    priceTable: {
      cashPrice: 890.00,
      harvestTermPrice: 980.00,
      unit: 'bombona 10L (R$ 89/L)',
      barterCoffeeSc: 0.54
    },
    specialOffer: {
      tag: 'Selo Café Regenerativo Cerrado',
      discountPercent: 4.0,
      description: 'Bonificação em consultoria de certificação Rainforest Alliance / Regenerative para associados.',
      validUntil: '30/11/2026'
    },
    comparisonVsCooxupe: {
      cooxupeEquivalent: 'Bioinsumos Cooxupé Bio-Protect',
      cooxupePriceDiffPercent: 2.0,
      strategicVerdict: 'Expocacer lidera a narrativa de valor sustentável e bioinsumos no Cerrado, atraindo cafeicultores com foco em cafés especiais.'
    },
    warrantyOrSupport: 'Cadeia de frio certificada e laudo de UFC (Unidades Formadoras de Colônia) por lote.',
    dataSource: {
      sourceName: 'Tabela Técnica de Bioinsumos Expocacer (Semana do Café Regenerativo)',
      collectionMethod: 'Tabela oficial do concorrente distribuída a cooperados de Patrocínio',
      competitorChannel: 'Loja Agro Expocacer - Patrocínio / MG',
      collectionDate: '09/09/2026',
      auditLevel: 'Oficial Concorrente'
    }
  },
  {
    id: 'prod-ins-05',
    name: 'Fertilizante Foliar Quelatizado Florada & Pegamento (Boro + Zinco + Molibdênio)',
    category: 'insumos',
    subCategory: 'foliares',
    competitorId: 'minasul',
    competitorName: 'Minasul',
    brandPartner: 'FMC / NutriTech',
    specs: 'Formulação líquida para pulverização pré-florada e pós-florada. Melhora pegamento e reduz abortamento de chumbinhos. Balde 20 L.',
    targetCulture: 'Café em Florada',
    priceTable: {
      cashPrice: 720.00,
      harvestTermPrice: 810.00,
      unit: 'balde 20L (R$ 36/L)',
      barterCoffeeSc: 0.45
    },
    specialOffer: {
      tag: 'Campanha Pegamento Varginha',
      discountPercent: 5.0,
      description: 'Pagamento facilitado em 2 safras no barter Minasul com taxa de juros subsidiada.',
      validUntil: '31/10/2026'
    },
    comparisonVsCooxupe: {
      cooxupeEquivalent: 'Cooxupé Foliar Florada Total',
      cooxupePriceDiffPercent: -1.5,
      strategicVerdict: 'Diferença marginal. A Cooxupé neutraliza com sua linha própria de nutrição que tem formulação superior em aminoácidos livres.'
    },
    warrantyOrSupport: 'Suporte dos laboratórios de análise foliar Minasul.',
    dataSource: {
      sourceName: 'Catálogo de Ofertas de Florada Aplicativo Minasul Digital',
      collectionMethod: 'Preço público praticado no aplicativo mobile do concorrente',
      competitorChannel: 'Canal Digital e Lojas Agro Minasul (Varginha)',
      collectionDate: '13/09/2026',
      auditLevel: 'Oficial Concorrente'
    }
  },

  // ===================== IRRIGAÇÃO =====================
  {
    id: 'prod-irr-01',
    name: 'Sistema de Gotejamento Autocompensante Cafeeiro (DripNet PC 1.6 L/h)',
    category: 'irrigacao',
    subCategory: 'gotejamento',
    competitorId: 'players_irrigacao',
    competitorName: 'Integradores Especializados (Netafim Oficial)',
    brandPartner: 'Netafim Brasil',
    specs: 'Espaçamento de 0.60m entre gotejadores, parede de 35 mil para durabilidade de 15 anos. Sistema autocompensante e anti-sifão, ideal para topografia acidentada.',
    targetCulture: 'Café Arábica Adensado e Semi-Adensado',
    priceTable: {
      cashPrice: 18500.00,
      harvestTermPrice: 20900.00,
      unit: 'hectare instalado (completo)',
      barterCoffeeSc: 11.48
    },
    specialOffer: {
      tag: 'Projeto Turnkey Safra 2027',
      discountPercent: 5.0,
      description: 'Inclui cabeçal de filtragem automatizado com retro-lavagem para áreas a partir de 20 hectares.',
      validUntil: '15/12/2026'
    },
    comparisonVsCooxupe: {
      cooxupeEquivalent: 'Projeto Irrigação Gotejo Cooxupé / Netafim Parceiro',
      cooxupePriceDiffPercent: -3.0,
      strategicVerdict: 'Canal direto Netafim costuma ofertar pacote de engenharia 3% mais barato para grandes produtores acima de 50ha, contornando a cooperativa.'
    },
    warrantyOrSupport: 'Garantia total de 5 anos de fábrica nos tubos e assistência técnica de uniformidade de vazão.',
    dataSource: {
      sourceName: 'Proposta Comercial de Engenharia Direta Netafim Brasil (Projeto 45 ha)',
      collectionMethod: 'Orçamento formal de engenharia entregue a cafeicultor do Cerrado',
      competitorChannel: 'Equipe de Venda Direta e Engenharia Netafim Brasil (Ribeirão Preto / Uberlândia)',
      collectionDate: '12/09/2026',
      auditLevel: 'Proposta Comercial Concorrente'
    }
  },
  {
    id: 'prod-irr-02',
    name: 'Sistema de Irrigação por Microaspersão sob Copa (Rondo 40 L/h)',
    category: 'irrigacao',
    subCategory: 'microaspersao',
    competitorId: 'cocatrel',
    competitorName: 'Cocatrel',
    brandPartner: 'Rivulis',
    specs: 'Microaspersores com bailarina invertida para distribuição uniforme sob a saia do cafeeiro, reduzindo evaporação e umedecendo 100% da copa.',
    targetCulture: 'Café em Montanha / Terrenos Pedregosos',
    priceTable: {
      cashPrice: 15800.00,
      harvestTermPrice: 17600.00,
      unit: 'hectare instalado',
      barterCoffeeSc: 9.67
    },
    specialOffer: {
      tag: 'Feira Expocafé Antecipada',
      discountPercent: 4.0,
      description: 'Carência de pagamento para início em agosto/2027.',
      validUntil: '30/11/2026'
    },
    comparisonVsCooxupe: {
      cooxupeEquivalent: 'Microaspersão Cafeeira Cooxupé',
      cooxupePriceDiffPercent: 2.5,
      strategicVerdict: 'Cooxupé possui melhor tabela de compra junto aos fornecedores de PVC e mangueiras, sendo 2,5% mais competitiva no pacote global.'
    },
    warrantyOrSupport: '2 anos de garantia e acompanhamento de outorga de água.',
    dataSource: {
      sourceName: 'Tabela de Irrigação Comercial Rivulis / Cocatrel',
      collectionMethod: 'Cotação formal apresentada por projetista técnico da Cocatrel',
      competitorChannel: 'Departamento de Irrigação Cocatrel - Três Pontas',
      collectionDate: '05/09/2026',
      auditLevel: 'Verificada em Balcão Concorrente'
    }
  },
  {
    id: 'prod-irr-03',
    name: 'Pivô Central Rebocável para Café & Grãos (Zimmatic 50 ha)',
    category: 'irrigacao',
    subCategory: 'pivo_central',
    competitorId: 'coopercitrus',
    competitorName: 'Coopercitrus',
    brandPartner: 'Lindsay Zimmatic',
    specs: 'Estrutura reforçada de 4 lances + balanço de 25m, painel inteligente FieldNET com controle via satélite e smartphone. 100% galvanizado.',
    targetCulture: 'Café Mecanizado & Rotação Soja/Milho Cerrado',
    priceTable: {
      cashPrice: 480000.00,
      harvestTermPrice: 535000.00,
      unit: 'equipamento montado (50 ha)',
      barterCoffeeSc: 293.96
    },
    specialOffer: {
      tag: 'Campanha Pivô Solar Híbrido',
      discountPercent: 7.0,
      description: 'Na contratação do pivô, taxa subsidiada de 6,5% a.a. em linha de crédito com painéis fotovoltaicos inclusos.',
      validUntil: '31/12/2026'
    },
    comparisonVsCooxupe: {
      cooxupeEquivalent: 'Pivô Central Integrado Cooxupé',
      cooxupePriceDiffPercent: -6.0,
      strategicVerdict: 'Coopercitrus tem liderança folgada em pivôs centrais pela força de sua divisão de engenharia. Representa um ponto de atenção para Cooxupé no Cerrado.'
    },
    warrantyOrSupport: 'Garantia estrutural de 8 anos contra corrosão e suporte 24/7 com equipe móvel.',
    dataSource: {
      sourceName: 'Proposta Comercial Formal Coopercitrus Expo / Divisão de Irrigação',
      collectionMethod: 'Orçamento executivo chave na mão emitido pela equipe de irrigação do concorrente',
      competitorChannel: 'Concessionária e Engenharia Coopercitrus (Bebedouro / Patrocínio)',
      collectionDate: '02/09/2026',
      auditLevel: 'Proposta Comercial Concorrente'
    }
  },

  // ===================== MAQUINÁRIO =====================
  {
    id: 'prod-maq-01',
    name: 'Trator Cafeeiro Estreito 75 cv 4x4 (Agritech 1175-4 Café)',
    category: 'maquinario',
    subCategory: 'tratores_cafeeiros',
    competitorId: 'cooxupe',
    competitorName: 'Cooxupé (Parceria Oficial Agritech)',
    brandPartner: 'Agritech Lavrale',
    specs: 'Motor Yanmar Turbo 75 cv, largura mínima de 1,30m ideal para lavouras de rua estreita. Reversor sincronizado 12x12 e TDP independente.',
    targetCulture: 'Café de Montanha e Adensado',
    priceTable: {
      cashPrice: 195000.00,
      harvestTermPrice: 218000.00,
      unit: 'unidade faturada',
      barterCoffeeSc: 119.78
    },
    specialOffer: {
      tag: 'Condição Especial Femagri',
      discountPercent: 5.5,
      description: 'Barter Cooxupé direto em 3 safras (33%/33%/34%) com juros cooperativos reduzidos e retorno de sobras.',
      validUntil: '31/03/2027'
    },
    comparisonVsCooxupe: {
      cooxupeEquivalent: 'Produto Próprio / Padrão de Mercado',
      cooxupePriceDiffPercent: 0.0,
      strategicVerdict: 'Posição hegemônica da Cooxupé no segmento de tratores de 75 cv para cafeicultura familiar e média, devido ao histórico de parceria com a Agritech.'
    },
    warrantyOrSupport: 'Garantia de 2 anos de fábrica e rede de oficinas autorizadas nos núcleos Cooxupé.',
    dataSource: {
      sourceName: 'Tabela Faturada Corporativa Cooxupé / Parceria Agritech Lavrale',
      collectionMethod: 'Contrato corporativo oficial de fornecimento exclusivo',
      competitorChannel: 'Lojas de Máquinas Cooxupé e Estande Femagri',
      collectionDate: '15/09/2026',
      auditLevel: 'Oficial Cooxupé'
    }
  },
  {
    id: 'prod-maq-02',
    name: 'Trator Cafeeiro Compacto Plus 80 cv Cabinado (LS Tractor R80)',
    category: 'maquinario',
    subCategory: 'tratores_cafeeiros',
    competitorId: 'cocatrel',
    competitorName: 'Cocatrel',
    brandPartner: 'LS Tractor Brasil',
    specs: 'Cabine pressurizada com ar-condicionado e filtro de carvão ativado (norma NR-31 para pulverização). Motor LS Mtron 4 cilindros, tomada de força 3 velocidades.',
    targetCulture: 'Café Arábica com Pulverização Frequente',
    priceTable: {
      cashPrice: 219000.00,
      harvestTermPrice: 242000.00,
      unit: 'unidade faturada',
      barterCoffeeSc: 132.97
    },
    specialOffer: {
      tag: 'Campanha Conforto no Campo Cocatrel',
      discountPercent: 4.5,
      description: 'Na compra do trator, o cooperado ganha o 1º kit de revisão de 500 horas e frete grátis na região de Três Pontas.',
      validUntil: '30/11/2026'
    },
    comparisonVsCooxupe: {
      cooxupeEquivalent: 'Agritech 1175 Cabinado ou LS via Cooxupé',
      cooxupePriceDiffPercent: -2.0,
      strategicVerdict: 'Cocatrel trabalha com margem apertada na LS Tractor para concorrer com a Agritech da Cooxupé no segmento de tratores cabinados.'
    },
    warrantyOrSupport: '2 anos de garantia total LS Tractor e revisões agendadas na fazenda.',
    dataSource: {
      sourceName: 'Tabela Comercial Cocatrel / Concessionária LS Tractor Três Pontas',
      collectionMethod: 'Proposta comercial de balcão e encarte da Expocafé',
      competitorChannel: 'Concessionária LS Tractor Cocatrel (Três Pontas / MG)',
      collectionDate: '07/09/2026',
      auditLevel: 'Verificada em Balcão Concorrente'
    }
  },
  {
    id: 'prod-maq-03',
    name: 'Colhedora de Café Tracionada para Declive (Jacto KTR 3500)',
    category: 'maquinario',
    subCategory: 'colhedoras',
    competitorId: 'concessionarias_maquinas',
    competitorName: 'Concessionárias Especializadas / Jacto',
    brandPartner: 'Máquinas Agrícolas Jacto',
    specs: 'Colhedora tracionada para tratores a partir de 75 cv. Sistema de derriça eletro-hidráulico com varetas especiais para desfolha mínima. Opera em declives de até 22%.',
    targetCulture: 'Café Arábica Semi-Mecanizado',
    priceTable: {
      cashPrice: 420000.00,
      harvestTermPrice: 470000.00,
      unit: 'unidade faturada',
      barterCoffeeSc: 258.24
    },
    specialOffer: {
      tag: 'Financiamento Banco Jacto',
      discountPercent: 3.0,
      description: 'Taxa fixa pré-fixada de 8,9% ao ano com 1ª parcela após a colheita da safra 2027.',
      validUntil: '31/12/2026'
    },
    comparisonVsCooxupe: {
      cooxupeEquivalent: 'Jacto KTR 3500 via Femagri Cooxupé',
      cooxupePriceDiffPercent: 1.5,
      strategicVerdict: 'A Cooxupé bate o preço da concessionária de balcão quando o produtor utiliza as cotas de barter da Femagri.'
    },
    warrantyOrSupport: '1 ano de garantia de fábrica, treinamento de operador presencial gratuito.',
    dataSource: {
      sourceName: 'Orçamento Formal da Concessionária Autorizada Jacto (Regional Varginha)',
      collectionMethod: 'Proposta comercial direta da concessionária fornecida a produtor cafeeiro',
      competitorChannel: 'Concessionária Autorizada Jacto - Varginha / MG',
      collectionDate: '10/09/2026',
      auditLevel: 'Proposta Comercial Concorrente'
    }
  },
  {
    id: 'prod-maq-04',
    name: 'Pulverizador Cafeeiro Hidropneumático Arbus 2000 Torre',
    category: 'maquinario',
    subCategory: 'pulverizadores',
    competitorId: 'coopercitrus',
    competitorName: 'Coopercitrus',
    brandPartner: 'Jacto',
    specs: 'Tanque em polietileno de 2.000 L, ventilador axial de 850mm com defletor tipo torre para lavouras altas. Bomba de pistão JP-150 de alta vazão.',
    targetCulture: 'Café Adulto e Lavoura Cerrado',
    priceTable: {
      cashPrice: 112000.00,
      harvestTermPrice: 125000.00,
      unit: 'unidade faturada',
      barterCoffeeSc: 68.68
    },
    specialOffer: {
      tag: 'Campanha Pulverização de Precisão',
      discountPercent: 4.0,
      description: 'Computador de bordo com corte de seção eletrônico incluso sem custo adicional.',
      validUntil: '15/12/2026'
    },
    comparisonVsCooxupe: {
      cooxupeEquivalent: 'Arbus 2000 Cooxupé Máquinas',
      cooxupePriceDiffPercent: -1.8,
      strategicVerdict: 'Coopercitrus oferece pacote com computador de bordo bonificado; a Cooxupé precisa contra-atacar com pacote de bicos cerâmicos e calibração gratuita.'
    },
    warrantyOrSupport: '1 ano de garantia e calibração de pulverizador na entrega técnica.',
    dataSource: {
      sourceName: 'Tabela de Concessionária Coopercitrus / Jacto (Franca / Batatais / MG)',
      collectionMethod: 'Tabela oficial de preços faturados praticados pelo concorrente',
      competitorChannel: 'Concessionária Coopercitrus Máquinas Agrícolas',
      collectionDate: '04/09/2026',
      auditLevel: 'Verificada em Balcão Concorrente'
    }
  },
  {
    id: 'prod-maq-05',
    name: 'Trator Cafeeiro Valtra Série A4F (A84F 85 cv 4x4)',
    category: 'maquinario',
    subCategory: 'tratores_cafeeiros',
    competitorId: 'coopercitrus',
    competitorName: 'Coopercitrus',
    brandPartner: 'Valtra / AGCO',
    specs: 'Motor AGCO Power 3 cilindros turbo intercooler 85 cv, transmissão 12x12 sincronizada com inversor mecânico ou eletro-hidráulico. Largura externa compacta.',
    targetCulture: 'Café Mecanizado e Implementos Pesados',
    priceTable: {
      cashPrice: 245000.00,
      harvestTermPrice: 275000.00,
      unit: 'unidade faturada',
      barterCoffeeSc: 151.10
    },
    specialOffer: {
      tag: 'Consórcio Nacional Valtra com Lance Embutido',
      discountPercent: 5.0,
      description: 'Taxa de administração reduzida e contemplação acelerada para produtores de café.',
      validUntil: '31/01/2027'
    },
    comparisonVsCooxupe: {
      cooxupeEquivalent: 'Agritech 1185 ou New Holland T4',
      cooxupePriceDiffPercent: -3.5,
      strategicVerdict: 'Coopercitrus é concessionária oficial Valtra, tendo vantagem nativa em preço e estoque imediato nesta potência.'
    },
    warrantyOrSupport: 'Garantia estendida de 3 anos para motor e transmissão.',
    dataSource: {
      sourceName: 'Proposta Comercial Concessionária Valtra Coopercitrus (Ribeirão Preto / São Sebastião do Paraíso)',
      collectionMethod: 'Orçamento formal do concorrente com simulação via Banco DLL / Valtra',
      competitorChannel: 'Concessionária Valtra Oficial Coopercitrus',
      collectionDate: '11/09/2026',
      auditLevel: 'Proposta Comercial Concorrente'
    }
  }
];

// ==========================================================================
// CAMPANHAS COMERCIAIS DOS CONCORRENTES
// ==========================================================================
export const COMMERCIAL_CAMPAIGNS: CommercialCampaign[] = [
  {
    id: 'camp-01',
    competitorId: 'cocatrel',
    competitorName: 'Cocatrel',
    title: 'Campanha Adubação Antecipada Sul de Minas',
    category: 'insumos',
    campaignType: 'Barter Safra',
    threatLevel: 'alta',
    validity: 'Válida até 31/10/2026',
    terms: 'Relação de troca garantida para entrega de café em setembro/2027. Seguro de lavoura contra granizo subsidiado em 50%.',
    benefits: [
      'Preço de adubo fixado sem correção cambial',
      'Seguro agrícola incluso para granizo e geada',
      'Frete subsidiado em um raio de até 60 km dos armazéns Cocatrel'
    ],
    cooxupeCounterStrategy: 'Divulgar que a Cooxupé retorna sobras médias de 3% a 5% aos cooperados ativos, tornando o custo efetivo final menor que o desconto pontual da Cocatrel.',
    dataSource: {
      sourceName: 'Boletim de Campanhas Comerciais Cocatrel (Edição 08/2026)',
      collectionMethod: 'Comunicação oficial enviada via aplicativo Cocatrel aos associados',
      competitorChannel: 'Canais Oficiais Cocatrel',
      collectionDate: '10/09/2026',
      auditLevel: 'Oficial Concorrente'
    }
  },
  {
    id: 'camp-02',
    competitorId: 'lavoro_agro',
    competitorName: 'Lavoro Agro / Redes Privadas',
    title: 'Pacote Blindagem Cafeeira (Fungicida + Inseticida)',
    category: 'insumos',
    campaignType: 'Early Order',
    threatLevel: 'alta',
    validity: 'Válida até 20/12/2026',
    terms: 'Financiamento via CPR Física ou Financeira com carência até maio/2027. Desconto de até 7% para compras combinadas de mais de 3 princípios ativos.',
    benefits: [
      'Aprovação de crédito em até 48 horas sem necessidade de garantia real hipotecária',
      'Assistência técnica de consultores de multinacionais parceiras',
      'Bonificação de adjuvantes de alta performance em galões de 20L'
    ],
    cooxupeCounterStrategy: 'Alertar sobre a solidez financeira e risco de quebra de contrato em revendas de private equity. Reforçar o relacionamento de longo prazo do corpo técnico da Cooxupé.',
    dataSource: {
      sourceName: 'Material Promocional de Venda Direta Lavoro Agro (Regional Guaxupé / Passos)',
      collectionMethod: 'Apresentação comercial realizada a produtores de grande porte',
      competitorChannel: 'Equipe de Vendas Externas Lavoro Agro',
      collectionDate: '12/09/2026',
      auditLevel: 'Proposta Comercial Concorrente'
    }
  },
  {
    id: 'camp-03',
    competitorId: 'coopercitrus',
    competitorName: 'Coopercitrus',
    title: 'Feirão de Máquinas & Irrigação Valtra / Netafim',
    category: 'maquinario',
    campaignType: 'Taxa Zero/Subsidiada',
    threatLevel: 'media',
    validity: 'Válida até 15/12/2026',
    terms: 'Entrada de 20% e saldo em 3 safras anuais com taxa de juros fixada em 7,5% a.a. ou opção de financiamento atrelado ao Moderfrota.',
    benefits: [
      'Trator cafeeiro com cabine climatizada pelo preço de versão plataformada',
      'Projeto topográfico e outorga de água inclusos no pacote de irrigação Netafim',
      'Bônus de R$ 10.000 em implementos agrícolas para os 50 primeiros clientes'
    ],
    cooxupeCounterStrategy: 'Antecipar as negociações da Femagri com a Agritech e Jacto, assegurando lotes com condições exclusivas de barter café sem risco cambial.',
    dataSource: {
      sourceName: 'Circular Oficial Feirão de Negócios Coopercitrus 2026',
      collectionMethod: 'Encarte comercial distribuído nas lojas de MG e SP',
      competitorChannel: 'Lojas e Concessionárias Coopercitrus',
      collectionDate: '06/09/2026',
      auditLevel: 'Oficial Concorrente'
    }
  },
  {
    id: 'camp-04',
    competitorId: 'minasul',
    competitorName: 'Minasul',
    title: 'Super Barter Digital Coffee Coin',
    category: 'geral',
    campaignType: 'Barter Safra',
    threatLevel: 'media',
    validity: 'Campanha Contínua 2026/2027',
    terms: 'O cooperado transfere sacas virtuais pelo aplicativo Minasul e recebe crédito imediato para compra de insumos e peças com cashback de 2%.',
    benefits: [
      'Liquidação instantânea pelo smartphone',
      'Cashback creditado na carteira virtual do produtor',
      'Isenção de taxa de armazenagem para lotes convertidos em insumos'
    ],
    cooxupeCounterStrategy: 'Aprimorar a experiência do aplicativo Cooxupé Cooperado com simulação instantânea de Barter e transparência no valor do crédito rotativo.',
    dataSource: {
      sourceName: 'Regulamento Oficial do Programa Coffee Coin Minasul',
      collectionMethod: 'Termos de adesão e aplicativo público Minasul',
      competitorChannel: 'Plataforma Minasul Digital',
      collectionDate: '01/09/2026',
      auditLevel: 'Oficial Concorrente'
    }
  },
  {
    id: 'camp-05',
    competitorId: 'expocacer',
    competitorName: 'Expocacer',
    title: 'Programa Cerrado Sustentável & Bioinsumos',
    category: 'insumos',
    campaignType: 'Combinação Pacote',
    threatLevel: 'baixa',
    validity: 'Válida até 30/11/2026',
    terms: 'Desconto escalonado de 8% na linha biológica para cafeicultores que comercializarem cafés com pontuação SCA acima de 84 pontos na cooperativa.',
    benefits: [
      'Agregação de valor no preço da saca exportada',
      'Treinamento presencial de manejo biológico do solo',
      'Suporte a auditorias de carbono neutro'
    ],
    cooxupeCounterStrategy: 'Fortalecer o programa Gerações Cooxupé e a divulgação dos cafés especiais do Núcleo Cerrado da Cooxupé com premiação por qualidade.',
    dataSource: {
      sourceName: 'Manual do Cooperado Expocacer - Programa de Cafés Especiais',
      collectionMethod: 'Documento técnico e comercial publicado pela cooperativa',
      competitorChannel: 'Canais Oficiais Expocacer',
      collectionDate: '28/08/2026',
      auditLevel: 'Oficial Concorrente'
    }
  }
];

// ==========================================================================
// FEIRAS E EVENTOS
// ==========================================================================
export const FAIR_EVENTS: FairEvent[] = [
  {
    id: 'event-01',
    name: 'Femagri (Feira de Máquinas, Implementos e Insumos Agrícolas)',
    organizer: 'Cooxupé (Anfitriã)',
    location: 'Guaxupé - MG',
    period: 'Fevereiro / Março (Anual)',
    focus: ['Maquinário Cafeeiro', 'Insumos & Fertilizantes', 'Irrigação', 'Barter Café', 'Agricultura de Precisão'],
    competitorsPresent: ['Agritech', 'Jacto', 'Yara', 'Bayer', 'Syngenta', 'LS Tractor', 'Netafim'],
    cooxupeStrategy: 'Principal evento comercial da Cooxupé. Foco total em barter direto com a cooperativa, oferecendo relação de troca protegida e condições exclusivas negociadas com mais de 120 expositores.',
    historicalVolume: 'R$ 450+ Milhões negociados / 32 mil visitantes',
    keyTacticsObserved: [
      'Concorrentes tentam visitar a feira para prospectar produtores insatisfeitos',
      'Revendas privadas lançam campanhas "Cobrimos a Femagri" nas semanas anteriores',
      'Fabricantes disputam espaço nobre de demonstração dinâmica de campo'
    ],
    dataSource: {
      sourceName: 'Balanço Oficial de Fechamento Femagri 2026 (Auditoria Cooxupé)',
      collectionMethod: 'Relatório estatístico de contratos faturados e fluxo de visitantes',
      competitorChannel: 'Coordenação Femagri Cooxupé',
      collectionDate: '15/03/2026',
      auditLevel: 'Oficial Cooxupé'
    }
  },
  {
    id: 'event-02',
    name: 'Expocafé',
    organizer: 'Epamig / Apoio Cocatrel e Prefeitura',
    location: 'Três Pontas - MG (Campo Experimental Epamig)',
    period: 'Maio (Anual)',
    focus: ['Mecanização Cafeeira', 'Colheita e Pós-Colheita', 'Defensivos', 'Palestras Técnicas'],
    competitorsPresent: ['Cocatrel', 'Minasul', 'Lavoro Agro', 'Concessionárias Case/New Holland/John Deere', 'Pinhalense'],
    cooxupeStrategy: 'Manter estande institucional forte e corpo de Vendedores/CTCs dos núcleos do Sul de Minas (Alfenas, Três Pontas, Varginha) para atender cooperados e marcar presença estratégica.',
    historicalVolume: 'R$ 380+ Milhões negociados / 20 mil visitantes',
    keyTacticsObserved: [
      'Cocatrel atua como anfitriã regional, ofertando pacotes agressivos de colhedoras e defensivos',
      'Lançamentos de tratores compactos com descontos pontuais de até 8% para fechamento no evento',
      'Bancos cooperativos (Sicoob/Sicredi) oferecendo linhas com análise de crédito em 15 minutos'
    ],
    dataSource: {
      sourceName: 'Relatório Institucional Epamig / Cocatrel Expocafé 2026',
      collectionMethod: 'Auditoria presencial de estandes e catálogo oficial de expositores',
      competitorChannel: 'Organização Expocafé / Cocatrel',
      collectionDate: '25/05/2026',
      auditLevel: 'Oficial Concorrente'
    }
  },
  {
    id: 'event-03',
    name: 'Fenicafé (Feira Nacional de Irrigação em Cafeicultura)',
    organizer: 'Associação dos Cafeicultores de Araguari (ACA)',
    location: 'Araguari - MG (Cerrado Mineiro)',
    period: 'Março / Abril (Anual)',
    focus: ['Sistemas de Irrigação (Gotejo e Pivô)', 'Nutrição de Precisão', 'Automação Hídrica', 'Energia Solar'],
    competitorsPresent: ['Expocacer', 'Coopercitrus', 'Netafim', 'Rivulis', 'Lindsay Zimmatic', 'Yara'],
    cooxupeStrategy: 'Destacar o Núcleo Cerrado da Cooxupé (Araguari, Monte Carmelo, Coromandel), levando agrônomos especialistas em fertirrigação e apresentando condições de financiamento para modernização hídrica.',
    historicalVolume: 'R$ 180+ Milhões negociados / 15 mil visitantes',
    keyTacticsObserved: [
      'Coopercitrus e integradores disputam contratos milionários de pivôs para áreas de grãos/café',
      'Palestras técnicas com forte apelo em manejo de déficit hídrico controlado para concentração de florada',
      'Oferta de pacotes combinados de energia fotovoltaica com bombas de irrigação'
    ],
    dataSource: {
      sourceName: 'Boletim da Associação dos Cafeicultores de Araguari (ACA)',
      collectionMethod: 'Relatório pós-feira de negócios de irrigação no Cerrado',
      competitorChannel: 'Associação dos Cafeicultores de Araguari',
      collectionDate: '10/04/2026',
      auditLevel: 'Oficial Concorrente'
    }
  },
  {
    id: 'event-04',
    name: 'Feira de Negócios Minasul',
    organizer: 'Minasul',
    location: 'Varginha - MG',
    period: 'Março (Anual)',
    focus: ['Barter Digital', 'Insumos de Curto Prazo', 'Tratores Cafeeiros', 'Tecnologia Aplicada'],
    competitorsPresent: ['EuroChem', 'FMC', 'Agritech', 'Stara', 'UPL'],
    cooxupeStrategy: 'Monitorar em tempo real a tabela de preços praticada para assegurar que a Cooxupé mantenha preços mais vantajosos nos núcleos de Varginha e Boa Esperança.',
    historicalVolume: 'R$ 150+ Milhões negociados / 12 mil visitantes',
    keyTacticsObserved: [
      'Campanhas com o token Coffee Coin e vantagens de liquidação instantânea',
      'Descontos especiais para cooperados que quitam insumos com café de qualidade superior'
    ],
    dataSource: {
      sourceName: 'Boletim da Feira de Negócios Minasul e Balanço Oficial 2026',
      collectionMethod: 'Catálogo de expositores e encarte promocional da feira do concorrente',
      competitorChannel: 'Organização Feira Minasul de Negócios',
      collectionDate: '20/03/2026',
      auditLevel: 'Oficial Concorrente'
    }
  },
  {
    id: 'event-05',
    name: 'Agrishow',
    organizer: 'Abimaq, Anda, SRB, Faesp, Abag',
    location: 'Ribeirão Preto - SP',
    period: 'Abril / Maio (Anual)',
    focus: ['Megamaquinário', 'Tratores de Alta Tecnologia', 'Agricultura Digital', 'Pivôs Centrais'],
    competitorsPresent: ['Coopercitrus', 'John Deere', 'Valtra', 'Case IH', 'Jacto', 'Netafim', 'Yara'],
    cooxupeStrategy: 'Presença executiva da diretoria e gerência de insumos para fechar convênios anuais de grande porte com fabricantes multinacionais, garantindo estoques para a safra.',
    historicalVolume: 'R$ 13+ Bilhões negociados (geral) / 190 mil visitantes',
    keyTacticsObserved: [
      'Anúncio de linhas especiais de crédito com subvenção governamental (Moderfrota/Plano Safra)',
      'Lançamento de tratores autônomos e colhedoras com inteligência artificial para monitoramento de maturação'
    ],
    dataSource: {
      sourceName: 'Relatório Oficial de Encerramento Agrishow 2026',
      collectionMethod: 'Dados consolidados da ABIMAQ e comitê gestor da Agrishow',
      competitorChannel: 'Assessoria de Imprensa Agrishow',
      collectionDate: '04/05/2026',
      auditLevel: 'Oficial Concorrente'
    }
  }
];

// ==========================================================================
// ALERTAS DE INTELIGÊNCIA COM FONTE E METODOLOGIA
// ==========================================================================
export const INTELLIGENCE_ALERTS: IntelligenceAlert[] = [
  {
    id: 'alt-01',
    date: '15/09/2026',
    severity: 'critico',
    category: 'insumos',
    competitorName: 'Cocatrel',
    title: 'Cocatrel lança adubo 20-00-20 com preço 2,8% abaixo da tabela Cooxupé no Sul de Minas',
    description: 'Campanha de adubação antecipada com entrega até novembro está atraindo cafeicultores de Três Pontas, Varginha e Campos Gerais. A Cocatrel está exigindo travamento de 30% da safra em barter para conceder o desconto.',
    impactScore: 8.5,
    suggestedAction: 'Orientar os Vendedores/CTCs a reforçarem a simulação de sobras cooperativas (que historicamente devolvem 4% aos associados) e validar a isenção de taxa de armazenagem nos primeiros 6 meses.',
    source: 'Tabela de Balcão e Pedido Nº 84920 da Loja Agro Cocatrel Três Pontas',
    methodology: 'Cotação direta presencial no balcão do concorrente e verificação de contrato futuro'
  },
  {
    id: 'alt-02',
    date: '12/09/2026',
    severity: 'atencao',
    category: 'irrigacao',
    competitorName: 'Coopercitrus',
    title: 'Coopercitrus intensifica venda de pivôs com financiamento próprio de 3 safras no Cerrado',
    description: 'A cooperativa paulista abriu filial técnica em Patrocínio/Araguari oferecendo projetos de irrigação chave na mão com 1ª parcela pós-colheita 2027, visando áreas de café irrigado e rotação de safrinha.',
    impactScore: 7.8,
    suggestedAction: 'Estruturar convênio tripartite Cooxupé + Integrador Netafim/Rivulis + Banco Cooperativo para oferecer carência idêntica com taxa equalizada.',
    source: 'Proposta de Engenharia Hidráulica Nº 2026-IRR-089 emitida pela Coopercitrus',
    methodology: 'Análise documental de proposta comercial do concorrente apresentada por produtor'
  },
  {
    id: 'alt-03',
    date: '08/09/2026',
    severity: 'critico',
    category: 'insumos',
    competitorName: 'Lavoro Agro / Redes Privadas',
    title: 'Lavoro Agro ataca mercado de defensivos com CPR sem garantia hipotecária',
    description: 'Grandes revendas privadas estão flexibilizando a esteira de crédito para produtores de médio porte (100 a 300 ha) com aprovação em 48 horas para compra casada de fungicidas Syngenta e herbicidas.',
    impactScore: 8.2,
    suggestedAction: 'Acelerar a esteira de liberação de crédito dos núcleos Cooxupé para compras de defensivos foliares de florada, reduzindo prazo de resposta para menos de 24 horas.',
    source: 'Contratos de CPR Física de Insumos Lavoro Agro registrados em Alfenas e Passos',
    methodology: 'Consulta à base pública de registros de garantias sobre safra de café na B3'
  },
  {
    id: 'alt-04',
    date: '02/09/2026',
    severity: 'informativo',
    category: 'maquinario',
    competitorName: 'Concessionárias / LS Tractor',
    title: 'LS Tractor amplia garantia de fábrica de tratores cafeeiros para 3 anos',
    description: 'Concessionárias da marca anunciaram ampliação da garantia para tratores da linha Plus 80 e R65 para compras fechadas até dezembro de 2026, com revisões de 250h e 500h gratuitas.',
    impactScore: 6.0,
    suggestedAction: 'Negociar com a Agritech Lavrale pacote promocional equivalente na Femagri para a linha 1175 e 1185, incluindo bonificação do 1º jogo de filtros e lubrificantes.',
    source: 'Comunicado de Imprensa e Campanha Comercial Oficial LS Tractor Brasil',
    methodology: 'Monitoramento dos canais de concessionárias e imprensa do agronegócio'
  }
];

// ==========================================================================
// MATRIZ SWOT
// ==========================================================================
export const SWOT_MATRIX: SwotItem[] = [
  {
    id: 'swot-f1',
    type: 'forca',
    pillar: 'corporativo',
    title: 'Escala Global e Confiança Inabalável',
    details: 'Mais de 36.000 cooperados e mais de 90 anos de solidez. O produtor sabe que o armazém da Cooxupé é seguro e que receberá 100% do combinado.',
    tacticalDirective: 'Explorar a segurança patrimonial da Cooxupé frente ao endividamento e riscos judiciais observados em redes privadas de revendas.',
    sourceOrBasis: 'Relatório Anual Cooxupé 2025/2026 e Histórico de Liquidação Financeira'
  },
  {
    id: 'swot-f2',
    type: 'forca',
    pillar: 'insumos',
    title: 'Retorno de Sobras Cooperativas',
    details: 'Ao final de cada exercício fiscal, as sobras do departamento de insumos e armazenagem são distribuídas aos cooperados proporcionalmente às compras.',
    tacticalDirective: 'Treinar os Vendedores/CTCs a apresentar o "Custo Efetivo Final" (Preço Nominal menos as Sobras Estimadas de 3% a 5%).',
    sourceOrBasis: 'Ata da Assembleia Geral Ordinária (AGO) Cooxupé de Março de 2026'
  },
  {
    id: 'swot-f3',
    type: 'forca',
    pillar: 'maquinario',
    title: 'Força da Femagri e Parceria Agritech / Jacto',
    details: 'Maior evento de máquinas da cafeicultura, com financiamento em até 3 safras em café e taxas de juros altamente competitivas.',
    tacticalDirective: 'Garantir antecipação dos contratos com fabricantes para blindar cotas de fábrica antes da concorrência.',
    sourceOrBasis: 'Histórico de Faturamento e Cotas Femagri 2024-2026'
  },
  {
    id: 'swot-fr1',
    type: 'fraqueza',
    pillar: 'insumos',
    title: 'Burocracia e Tempo de Resposta Cadastral',
    details: 'Processos de esteira de crédito e aprovação de limites mais lentos que revendas privadas que liberam pedidos em 24h a 48h.',
    tacticalDirective: 'Digitalizar o limite de crédito pré-aprovado no aplicativo mobile do cooperado para compras rápidas de balcão.',
    sourceOrBasis: 'Pesquisa de Satisfação Interna de Cooperados Cooxupé 2026'
  },
  {
    id: 'swot-fr2',
    type: 'fraqueza',
    pillar: 'irrigacao',
    title: 'Divisão de Engenharia de Irrigação Menos Integrada',
    details: 'Coopercitrus e integradores especializados possuem equipes dedicadas de engenharia hidráulica com projetos 3D e licenciamento de outorga.',
    tacticalDirective: 'Criar uma Célula de Engenharia Hídrica Cooxupé especializada em projetos turn-key de gotejamento e pivôs para os núcleos do Cerrado e Sul de Minas.',
    sourceOrBasis: 'Diagnóstico Comercial Setor de Irrigação / Comitê Estratégico Cooxupé'
  },
  {
    id: 'swot-o1',
    type: 'oportunidade',
    pillar: 'insumos',
    title: 'Expansão em Bioinsumos e Manejo Regenerativo',
    details: 'Crescimento de 35% ao ano na demanda por biofertilizantes, bionematicidas e agentes de biocontrole em cafezais certificados.',
    tacticalDirective: 'Lançar a linha própria "BioCooxupé" em parceria com centros de pesquisa e oferecer barter verde com bonificação de preço na saca.',
    sourceOrBasis: 'Estudo de Mercado Kynetec / CropLife Brasil Cafeicultura 2026'
  },
  {
    id: 'swot-o2',
    type: 'oportunidade',
    pillar: 'irrigacao',
    title: 'Modernização Hídrica pós-crises climáticas',
    details: 'Episódios recorrentes de veranicos e ondas de calor aumentaram a procura por gotejamento no Sul de Minas e Mogiana, antes tratadas apenas como sequeiro.',
    tacticalDirective: 'Criar pacotes de gotejamento simplificado de montanha para cooperados de 10 a 30 hectares com barter em 4 safras.',
    sourceOrBasis: 'Boletins Meteorológicos Epamig / Inmet e Dados de Produtividade Irrigada'
  },
  {
    id: 'swot-a1',
    type: 'ameaca',
    pillar: 'insumos',
    title: 'Agressividade de Fundos de Private Equity em Revendas',
    details: 'Grandes redes privadas operam com queima de margem em produtos âncora para atrair a safra de café dos cooperados Cooxupé.',
    tacticalDirective: 'Monitorar semanalmente as praças críticas (Guaxupé, Alfenas, Patrocínio) e autorizar a gerência comercial a flexibilizar margens em adubos em até 2,5% sob aprovação.',
    sourceOrBasis: 'Relatórios Setoriais Itaú BBA Agro / Cia de Inteligência de Mercado'
  },
  {
    id: 'swot-a2',
    type: 'ameaca',
    pillar: 'maquinario',
    title: 'Bancos de Fábrica com Taxas Subsidiadas Diretas',
    details: 'Concessionárias de marcas como John Deere e Case IH ofertando taxas de 7% a 8% a.a. sem necessidade de relacionamento cooperativo.',
    tacticalDirective: 'Reforçar o Barter em Café como hedge natural: mesmo se o juro em reais for baixo, a saca de café protege o produtor de desvalorizações cambiais.',
    sourceOrBasis: 'Tabelas Públicas de Financiamento Banco John Deere / CNH Capital'
  }
];
