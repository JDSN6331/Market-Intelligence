import { 
  COMPETITORS, 
  PRODUCTS_CATALOG, 
  COMMERCIAL_CAMPAIGNS, 
  FAIR_EVENTS, 
  INTELLIGENCE_ALERTS, 
  SWOT_MATRIX, 
  STRATEGIC_KPIS,
  COFFEE_PRICE_DEFAULT 
} from './data';
import { ProductItem } from './types';

// ==========================================================================
// ESTADO REATIVO DA APLICAÇÃO
// ==========================================================================
interface AppState {
  currentCoffeePrice: number;
  selectedCategory: string;
  selectedCompetitor: string;
  searchQuery: string;
  selectedProductModal: ProductItem | null;
  isDarkMode: boolean;
  userCooxupePrices: Record<string, number>;
}

const savedCoffee = localStorage.getItem('cooxupe_coffee_price');
const savedTheme = localStorage.getItem('cooxupe_theme');
const savedUserPrices = localStorage.getItem('cooxupe_user_prices');

let parsedUserPrices: Record<string, number> = {};
try {
  if (savedUserPrices) {
    parsedUserPrices = JSON.parse(savedUserPrices);
  }
} catch (e) {
  parsedUserPrices = {};
}

const state: AppState = {
  currentCoffeePrice: savedCoffee ? parseFloat(savedCoffee) : COFFEE_PRICE_DEFAULT,
  selectedCategory: 'all',
  selectedCompetitor: 'all',
  searchQuery: '',
  selectedProductModal: null,
  // Padrão Executivo: TEMA NOTURNO (dark), a menos que o usuário tenha escolhido explicitamente 'light'
  isDarkMode: savedTheme !== 'light',
  userCooxupePrices: parsedUserPrices
};

// ==========================================================================
// FORMATAÇÃO E HELPERS
// ==========================================================================
function formatCurrency(val: number): string {
  return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function formatBags(val: number): string {
  return `${val.toFixed(2)} sc`;
}

// ==========================================================================
// INICIALIZAÇÃO
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  setupTheme();
  setupNavigationTabs();
  renderStrategicKpis();
  renderCockpitOverview();
  renderProductsCatalog();
  setupBarterSimulator();
  renderCommercialCampaigns();
  renderFairEvents();
  renderSwotMatrix();
  setupSearchAndFilters();
  setupModalEvents();
  setupExportButtons();
  setupSyncModal();
  fetchLiveDollarRate();
});

// ==========================================================================
// GERENCIAMENTO DE TEMA (CLARO / NOTURNO — PADRÃO NOTURNO)
// ==========================================================================
function setupTheme(): void {
  const btnTheme = document.getElementById('btn-theme-toggle');
  const themeIcon = document.getElementById('theme-icon');

  if (state.isDarkMode) {
    document.body.classList.add('dark-mode');
    if (themeIcon) {
      themeIcon.className = 'fi fi-rr-moon';
    }
  } else {
    document.body.classList.remove('dark-mode');
    if (themeIcon) {
      themeIcon.className = 'fi fi-rr-sun';
    }
  }

  btnTheme?.addEventListener('click', () => {
    state.isDarkMode = !state.isDarkMode;
    document.body.classList.toggle('dark-mode', state.isDarkMode);
    localStorage.setItem('cooxupe_theme', state.isDarkMode ? 'dark' : 'light');
    if (themeIcon) {
      themeIcon.className = state.isDarkMode ? 'fi fi-rr-moon' : 'fi fi-rr-sun';
    }
  });
}

// ==========================================================================
// NAVEGAÇÃO ENTRE ABAS
// ==========================================================================
function setupNavigationTabs(): void {
  const tabs = document.querySelectorAll<HTMLButtonElement>('.nav-tab');
  const panes = document.querySelectorAll<HTMLElement>('.tab-pane');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetTabId = tab.dataset.tab;
      if (!targetTabId) return;

      tabs.forEach(t => t.classList.remove('active'));
      panes.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      const targetPane = document.getElementById(`tab-${targetTabId}`);
      if (targetPane) {
        targetPane.classList.add('active');
      }
    });
  });

  const btnAlertAction = document.getElementById('btn-view-alert-action');
  btnAlertAction?.addEventListener('click', () => {
    const swotTab = document.querySelector<HTMLButtonElement>('.nav-tab[data-tab="swot"]');
    swotTab?.click();
  });
}

// ==========================================================================
// KPIS ESTRATÉGICOS COM LEGENDA EXPLICATIVA E METODOLOGIA COMPLETA
// ==========================================================================
function renderStrategicKpis(): void {
  const kpiGrid = document.querySelector<HTMLElement>('.kpi-grid');
  if (!kpiGrid) return;

  kpiGrid.innerHTML = STRATEGIC_KPIS.map(kpi => `
    <div class="kpi-card" id="${kpi.id}">
      <div class="kpi-top-row">
        <span class="kpi-title">${kpi.title}</span>
        <div class="kpi-icon-bubble">
          <i class="${getKpiIcon(kpi.id)}"></i>
        </div>
      </div>

      <div class="kpi-value-row">
        <span class="kpi-value">${kpi.value}</span>
        <span class="kpi-unit">${kpi.unit}</span>
        <span class="badge-trend ${kpi.trendType}">${kpi.trend}</span>
      </div>

      <div class="kpi-bar-bg">
        <div class="kpi-bar-fill" style="width: ${kpi.barPercent}%; background: ${kpi.barColor || 'var(--agri-primary)'};"></div>
      </div>

      <!-- CAIXA DE AUDITORIA, LEGENDA E FONTE EXPLICATIVA -->
      <div class="kpi-audit-box">
        <div class="kpi-def-block">
          <strong><i class="fi fi-rr-info"></i> O que representa:</strong>
          <span>${kpi.whatItRepresents}</span>
        </div>

        <div class="kpi-method-block">
          <strong style="color: var(--text-secondary); display: block; margin-bottom: 2px;">
            <i class="fi fi-rr-settings-sliders"></i> Como foi extraído (Metodologia):
          </strong>
          <span>${kpi.howItWasExtracted}</span>
        </div>

        <div class="kpi-source-footer">
          <div class="kpi-source-name" title="${kpi.sourceInfo.sourceName}">
            <i class="fi fi-rr-document"></i>
            <span>Fonte: <strong>${kpi.sourceInfo.sourceName.substring(0, 32)}...</strong></span>
          </div>
          <span class="kpi-audit-badge" title="Canal: ${kpi.sourceInfo.competitorChannel} | Data: ${kpi.sourceInfo.collectionDate}">
            ${kpi.sourceInfo.auditLevel} &bull; ${kpi.sourceInfo.collectionDate}
          </span>
        </div>
      </div>
    </div>
  `).join('');
}

function getKpiIcon(id: string): string {
  switch (id) {
    case 'kpi-icp': return 'fi fi-rr-chart-line-up';
    case 'kpi-barter': return 'fi fi-rr-arrows-repeat';
    case 'kpi-cpr': return 'fi fi-rr-engine-warning';
    case 'kpi-femagri': return 'fi fi-rr-badge-leaf';
    default: return 'fi fi-rr-chart-pie-alt';
  }
}

// ==========================================================================
// ABA 1: COCKPIT EXECUTIVO & ALERTAS (SEM BARRA DE ROLAGEM DESNECESSÁRIA)
// ==========================================================================
function renderCockpitOverview(): void {
  // 1. Alerta Crítico no Topo
  const topAlert = INTELLIGENCE_ALERTS.find(a => a.severity === 'critico') || INTELLIGENCE_ALERTS[0];
  const alertTitleEl = document.getElementById('top-alert-title');
  const alertDescEl = document.getElementById('top-alert-desc');

  if (alertTitleEl && topAlert) alertTitleEl.textContent = topAlert.title;
  if (alertDescEl && topAlert) alertDescEl.textContent = topAlert.description;

  // 2. Lista de Concorrentes Monitorados com Fonte
  const compListEl = document.getElementById('competitors-cockpit-list');
  if (compListEl) {
    compListEl.innerHTML = COMPETITORS.map(comp => `
      <div class="comp-item-card">
        <div class="comp-header-row">
          <div class="comp-main-info">
            <div class="comp-badge-color" style="background-color: ${comp.badgeColor};"></div>
            <div class="comp-name-box">
              <h4>${comp.name}</h4>
              <div class="comp-hq-text">
                <i class="fi fi-rr-marker"></i> ${comp.headquarters} &bull; ${comp.mainRegions.join(', ')}
              </div>
            </div>
          </div>
          <span class="comp-share-badge">
            Insumos: ${comp.marketShareEstimate.insumos}% | Máquinas: ${comp.marketShareEstimate.maquinario}%
          </span>
        </div>
        <div class="comp-source-row">
          <span><i class="fi fi-rr-document"></i> <strong>Canal Ofertante:</strong> ${comp.sourceInfo.competitorChannel}</span>
          <span class="kpi-audit-badge">${comp.sourceInfo.auditLevel} &bull; ${comp.sourceInfo.collectionDate}</span>
        </div>
      </div>
    `).join('');
  }

  // 3. Feed de Ocorrências Comerciais - Exibição limpa e completa
  const alertsFeedEl = document.getElementById('alerts-feed-list');
  if (alertsFeedEl) {
    alertsFeedEl.innerHTML = INTELLIGENCE_ALERTS.map(alert => `
      <div class="alert-feed-item ${alert.severity}">
        <div class="alert-item-header">
          <span class="alert-comp-tag">${alert.competitorName}</span>
          <span class="alert-date-tag"><i class="fi fi-rr-calendar"></i> ${alert.date}</span>
        </div>
        <h4 class="alert-item-title">${alert.title}</h4>
        <p class="alert-item-desc">${alert.description}</p>
        <div class="alert-action-badge">
          <i class="fi fi-rr-shield-check"></i> <strong>Diretriz Comercial para Gestores:</strong> ${alert.suggestedAction}
        </div>
        <div class="alert-source-tag">
          <i class="fi fi-rr-document"></i> <strong>Origem da Ocorrência Concorrente:</strong> ${alert.source} &bull; <em>(${alert.methodology})</em>
        </div>
      </div>
    `).join('');
  }
}

// ==========================================================================
// ABA 2: CATÁLOGO DE PRODUTOS DOS CONCORRENTES
// ==========================================================================
function renderProductsCatalog(): void {
  const container = document.getElementById('products-catalog-grid');
  const countBadge = document.getElementById('products-count-badge');
  if (!container) return;

  const filtered = PRODUCTS_CATALOG.filter(prod => {
    if (state.selectedCategory !== 'all' && prod.category !== state.selectedCategory) {
      return false;
    }
    if (state.selectedCompetitor !== 'all' && prod.competitorId !== state.selectedCompetitor) {
      return false;
    }
    if (state.searchQuery.trim() !== '') {
      const q = state.searchQuery.toLowerCase();
      const matchName = prod.name.toLowerCase().includes(q);
      const matchBrand = prod.brandPartner.toLowerCase().includes(q);
      const matchSpecs = prod.specs.toLowerCase().includes(q);
      const matchComp = prod.competitorName.toLowerCase().includes(q);
      if (!matchName && !matchBrand && !matchSpecs && !matchComp) return false;
    }
    return true;
  });

  if (countBadge) {
    countBadge.textContent = `Exibindo ${filtered.length} produto${filtered.length === 1 ? '' : 's'}`;
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 48px 20px; color: var(--text-muted);">
        <i class="fi fi-rr-search" style="font-size: 2.5rem; display: block; margin-bottom: 12px; color: var(--agri-primary);"></i>
        <h3>Nenhum produto encontrado com os filtros selecionados.</h3>
        <p>Tente ajustar a busca ou limpar os filtros de categoria e concorrente.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(prod => {
    const compObj = COMPETITORS.find(c => c.id === prod.competitorId);
    const badgeColor = compObj ? compObj.badgeColor : '#4A5568';
    const dynamicBarterSc = prod.priceTable.cashPrice / state.currentCoffeePrice;

    return `
      <div class="product-card" data-product-id="${prod.id}">
        <div>
          <div class="prod-top-meta">
            <span class="prod-category-pill ${prod.category}">
              <i class="${getCategoryIcon(prod.category)}"></i> ${prod.category.toUpperCase()}
            </span>
            <span class="prod-competitor-badge" style="background-color: ${badgeColor};" title="Empresa Ofertante: ${prod.competitorName}">
              ${prod.competitorName}
            </span>
          </div>

          <h3 class="prod-title">${prod.name}</h3>
          <div class="prod-brand-partner">
            <i class="fi fi-rr-box"></i> Marca / Fabricante: <strong>${prod.brandPartner}</strong>
          </div>

          <p class="prod-specs">${prod.specs}</p>
        </div>

        <div>
          <div class="prod-pricing-box">
            <div class="pricing-row">
              <span class="pricing-lbl">Preço Concorrente (À Vista):</span>
              <span class="pricing-val">${formatCurrency(prod.priceTable.cashPrice)}</span>
            </div>
            <div class="pricing-row">
              <span class="pricing-lbl">Prazo Safra Concorrente:</span>
              <span class="pricing-val" style="font-size: 0.95rem; font-weight: 600;">
                ${formatCurrency(prod.priceTable.harvestTermPrice)}
              </span>
            </div>
            <div class="pricing-barter">
              <span>Equivalente em Café:</span>
              <span class="barter-highlight-tag">
                <i class="fi fi-rr-coffee"></i> ${formatBags(dynamicBarterSc)}
              </span>
            </div>
          </div>

          <!-- RASTREABILIDADE CLARA DO CONCORRENTE -->
          <div class="prod-source-card-box">
            <strong><i class="fi fi-rr-document"></i> Origem da Cotação do Concorrente:</strong>
            <span>${prod.dataSource.sourceName}</span>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 4px; font-size: 0.72rem; color: var(--text-muted);">
              <span><strong>Canal:</strong> ${prod.dataSource.competitorChannel}</span>
              <span class="kpi-audit-badge">${prod.dataSource.auditLevel} &bull; ${prod.dataSource.collectionDate}</span>
            </div>
          </div>

          <!-- BENCHMARK ESTRATÉGICO PARA OS GESTORES COOXUPÉ -->
          <div class="prod-verdict-box">
            <strong><i class="fi fi-rr-shield-check"></i> Benchmark / Análise Comercial Cooxupé:</strong><br>
            ${prod.comparisonVsCooxupe.strategicVerdict}
          </div>

          <div class="prod-card-actions">
            <button class="btn-card-details btn-open-modal" data-id="${prod.id}">
              <i class="fi fi-rr-eye"></i> Detalhes Técnicos & Auditoria
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  document.querySelectorAll<HTMLButtonElement>('.btn-open-modal').forEach(btn => {
    btn.addEventListener('click', () => {
      const prodId = btn.dataset.id;
      const found = PRODUCTS_CATALOG.find(p => p.id === prodId);
      if (found) {
        openProductModal(found);
      }
    });
  });
}

function getCategoryIcon(cat: string): string {
  switch (cat) {
    case 'insumos': return 'fi fi-rr-plant-growth';
    case 'irrigacao': return 'fi fi-rr-bottle-droplet';
    case 'maquinario': return 'fi fi-rr-gears';
    default: return 'fi fi-rr-boxes';
  }
}

// ==========================================================================
// ABA 3: RADAR DE PREÇOS & SIMULADOR DE BARTER
// ==========================================================================
function setupBarterSimulator(): void {
  const priceInput = document.getElementById('coffee-price-input') as HTMLInputElement;
  const priceRange = document.getElementById('coffee-price-range') as HTMLInputElement;
  const tickerCoffeeEl = document.getElementById('ticker-coffee-price');

  function updateCoffeePrice(newVal: number) {
    state.currentCoffeePrice = newVal;
    if (priceInput) priceInput.value = newVal.toString();
    if (priceRange) priceRange.value = newVal.toString();
    
    // Atualiza todas as instâncias do café no ticker contínuo
    document.querySelectorAll('.ticker-coffee-val').forEach(el => {
      el.textContent = formatCurrency(newVal) + ' / sc';
    });
    if (tickerCoffeeEl) tickerCoffeeEl.textContent = formatCurrency(newVal) + ' / sc';

    renderBarterHighlights();
    renderPricesTable();
    renderProductsCatalog();
  }

  priceInput?.addEventListener('input', () => {
    const val = parseFloat(priceInput.value);
    if (!isNaN(val) && val >= 500) {
      updateCoffeePrice(val);
    }
  });

  priceRange?.addEventListener('input', () => {
    const val = parseFloat(priceRange.value);
    if (!isNaN(val)) {
      updateCoffeePrice(val);
    }
  });

  renderBarterHighlights();
  renderPricesTable();
}

interface BarterHighlightItem {
  id: string;
  title: string;
  category: string;
  competitorPrice: number;
  competitorName: string;
  unit: string;
  sourceNote: string;
  suggestedExample: number;
}

const BARTER_ITEMS: BarterHighlightItem[] = [
  {
    id: 'adubo-npk',
    title: '1 Tonelada Adubo NPK 20-00-20',
    category: 'Insumos / Fertilizantes',
    competitorPrice: 2780,
    competitorName: 'Cocatrel',
    unit: 'tonelada',
    sourceNote: 'Cotação de Balcão na Loja Agro Cocatrel Três Pontas (14/09/2026)',
    suggestedExample: 2710
  },
  {
    id: 'irrigacao-gotejo',
    title: '1 Hectare Gotejamento Cafeeiro',
    category: 'Irrigação / Netafim',
    competitorPrice: 18500,
    competitorName: 'Integradores Diretos',
    unit: 'hectare',
    sourceNote: 'Proposta Direta Netafim Brasil Projeto 45 ha Cerrado (12/09/2026)',
    suggestedExample: 17900
  },
  {
    id: 'trator-75cv',
    title: 'Trator Cafeeiro 75 cv (Agritech vs LS)',
    category: 'Maquinário / Trator Estreito',
    competitorPrice: 219000,
    competitorName: 'LS Tractor (Cocatrel)',
    unit: 'unidade',
    sourceNote: 'Tabela Comercial Concessionária LS Cocatrel (07/09/2026)',
    suggestedExample: 195000
  },
  {
    id: 'colhedora-jacto',
    title: 'Colhedora Cafeeira Jacto KTR 3500',
    category: 'Maquinário / Colheita',
    competitorPrice: 420000,
    competitorName: 'Concessionária Direta',
    unit: 'unidade',
    sourceNote: 'Orçamento da Concessionária Autorizada Jacto Varginha (10/09/2026)',
    suggestedExample: 414000
  }
];

function buildBarterBadgeHtml(item: BarterHighlightItem, userPrice: number | undefined, coffeePrice: number): string {
  const hasUserPrice = typeof userPrice === 'number' && userPrice > 0;
  if (!hasUserPrice) {
    return `
      <div class="barter-argument-badge waiting">
        <i class="fi fi-rr-edit"></i>
        <div>
          <strong>Digite o Preço Cooxupé:</strong>
          Informe no campo acima o valor praticado no seu núcleo (ou clique em <button type="button" class="btn-quick-sample" data-item-id="${item.id}" data-sample="${item.suggestedExample}">exemplo: R$ ${item.suggestedExample.toLocaleString('pt-BR')}</button>) para calcular a economia em sacas.
        </div>
      </div>
    `;
  }

  const scCompetitor = item.competitorPrice / coffeePrice;
  const scCooxupe = userPrice / coffeePrice;
  const diffSc = scCompetitor - scCooxupe;
  const diffReais = item.competitorPrice - userPrice;
  const isCooxupeCheaper = diffSc > 0.005;
  const isIdentical = Math.abs(diffSc) <= 0.005;

  if (isIdentical) {
    return `
      <div class="barter-argument-badge neutral">
        <i class="fi fi-rr-check"></i>
        <div>
          <strong>Paridade Equivalente:</strong>
          Mesma exigência em café (${formatBags(scCooxupe)}). Vendedor/CTC deve explorar sobras cooperativas e segurança de armazenagem.
        </div>
      </div>
    `;
  } else if (isCooxupeCheaper) {
    return `
      <div class="barter-argument-badge advantage">
        <i class="fi fi-rr-check-circle"></i>
        <div>
          <strong>Vantagem Cooxupé para o Vendedor/CTC:</strong>
          O cooperado economiza <strong>${formatBags(diffSc)}</strong> (${formatCurrency(diffReais)}) comprando na Cooxupé!
        </div>
      </div>
    `;
  } else {
    return `
      <div class="barter-argument-badge alert">
        <i class="fi fi-rr-info"></i>
        <div>
          <strong>Atenção Comercial:</strong>
          Mercado cotando <strong>${formatBags(Math.abs(diffSc))}</strong> a menos (${formatCurrency(Math.abs(diffReais))}). Vendedor/CTC deve contra-atacar com sobras anuais (3% a 5%) e frete CIF.
        </div>
      </div>
    `;
  }
}

function updateSingleBarterCard(itemId: string): void {
  const card = document.querySelector(`.barter-stat-card[data-item-id="${itemId}"]`);
  if (!card) return;

  const item = BARTER_ITEMS.find(i => i.id === itemId);
  if (!item) return;

  const coffeePrice = state.currentCoffeePrice;
  const userPrice = state.userCooxupePrices[itemId];
  const hasUserPrice = typeof userPrice === 'number' && userPrice > 0;

  const scValEl = card.querySelector('.cooxupe-sc-val');
  const subValEl = card.querySelector('.cooxupe-sub-val');
  const badgeContainer = card.querySelector('.barter-badge-container');

  if (scValEl) {
    if (hasUserPrice) {
      scValEl.textContent = formatBags(userPrice / coffeePrice);
      scValEl.classList.remove('text-muted');
      scValEl.classList.add('text-green');
    } else {
      scValEl.textContent = '-- sc';
      scValEl.classList.remove('text-green');
      scValEl.classList.add('text-muted');
    }
  }

  if (subValEl) {
    subValEl.textContent = hasUserPrice ? 'necessárias na Cooxupé' : 'digite o preço da Cooxupé';
  }

  if (badgeContainer) {
    badgeContainer.innerHTML = buildBarterBadgeHtml(item, userPrice, coffeePrice);

    // Reanexa listener caso o botão de exemplo tenha sido renderizado
    const sampleBtn = badgeContainer.querySelector<HTMLButtonElement>('.btn-quick-sample');
    sampleBtn?.addEventListener('click', () => {
      const sampleVal = parseFloat(sampleBtn.dataset.sample || '0');
      if (sampleVal > 0) {
        state.userCooxupePrices[itemId] = sampleVal;
        try {
          localStorage.setItem('cooxupe_user_prices', JSON.stringify(state.userCooxupePrices));
        } catch (e) {}
        const inputEl = card.querySelector<HTMLInputElement>(`#input-price-${itemId}`);
        if (inputEl) inputEl.value = sampleVal.toString();
        updateSingleBarterCard(itemId);
      }
    });
  }
}

function renderBarterHighlights(): void {
  const container = document.getElementById('barter-highlights-cards');
  if (!container) return;

  const coffeePrice = state.currentCoffeePrice;

  container.innerHTML = BARTER_ITEMS.map(item => {
    const scCompetitor = item.competitorPrice / coffeePrice;
    const userPrice = state.userCooxupePrices[item.id];
    const hasUserPrice = typeof userPrice === 'number' && userPrice > 0;
    const scCooxupe = hasUserPrice ? userPrice / coffeePrice : null;

    return `
      <div class="barter-stat-card" data-item-id="${item.id}">
        <div class="barter-card-header">
          <span class="barter-card-cat"><i class="fi fi-rr-tag"></i> ${item.category}</span>
          <div class="barter-card-title">${item.title}</div>
        </div>

        <div class="barter-sides-grid">
          <!-- BASE CONCORRENTE (O QUE O MERCADO PEDE) -->
          <div class="barter-side competitor">
            <div class="barter-side-label">
              <i class="fi fi-rr-shop"></i> Mercado (${item.competitorName})
            </div>
            <div class="barter-side-price">${formatCurrency(item.competitorPrice)} / ${item.unit}</div>
            <div class="barter-side-sc" title="Sacas exigidas pelo concorrente">
              ${formatBags(scCompetitor)}
            </div>
            <span class="barter-side-sub">exigidas pelo concorrente</span>
          </div>

          <!-- OFERTA COOXUPÉ (CAMPO EDITÁVEL PARA O VENDEDOR/CTC) -->
          <div class="barter-side cooxupe">
            <div class="barter-side-label">
              <i class="fi fi-rr-shield-check"></i> Condição Cooxupé
            </div>
            <div class="cooxupe-input-box">
              <label for="input-price-${item.id}">Preço no Núcleo (${item.unit}):</label>
              <div class="input-inline-flex">
                <span class="currency-prefix-sm">R$</span>
                <input 
                  type="number" 
                  id="input-price-${item.id}" 
                  class="cooxupe-dynamic-input" 
                  data-item-id="${item.id}" 
                  placeholder="0,00" 
                  step="10" 
                  min="0"
                  value="${hasUserPrice ? userPrice : ''}"
                />
              </div>
            </div>
            <div class="barter-side-sc cooxupe-sc-val ${hasUserPrice ? 'text-green' : 'text-muted'}" title="Sacas calculadas na Cooxupé">
              ${scCooxupe !== null ? formatBags(scCooxupe) : '-- sc'}
            </div>
            <span class="barter-side-sub cooxupe-sub-val">${hasUserPrice ? 'necessárias na Cooxupé' : 'digite o preço da Cooxupé'}</span>
          </div>
        </div>

        <!-- DIRETRIZ COMPARATIVA PARA O VENDEDOR/CTC -->
        <div class="barter-badge-container">
          ${buildBarterBadgeHtml(item, userPrice, coffeePrice)}
        </div>

        <div class="barter-source-footnote">
          <i class="fi fi-rr-document"></i> <strong>Preço Base do Concorrente:</strong> ${item.sourceNote}
        </div>
      </div>
    `;
  }).join('');

  // Event listeners para os inputs de preço digitados pelo Vendedor/CTC
  container.querySelectorAll<HTMLInputElement>('.cooxupe-dynamic-input').forEach(input => {
    input.addEventListener('input', () => {
      const itemId = input.dataset.itemId;
      if (!itemId) return;

      const rawVal = parseFloat(input.value);
      if (!isNaN(rawVal) && rawVal > 0) {
        state.userCooxupePrices[itemId] = rawVal;
      } else {
        delete state.userCooxupePrices[itemId];
      }

      try {
        localStorage.setItem('cooxupe_user_prices', JSON.stringify(state.userCooxupePrices));
      } catch (e) {}

      updateSingleBarterCard(itemId);
    });
  });

  // Event listeners para botões de exemplo rápido
  container.querySelectorAll<HTMLButtonElement>('.btn-quick-sample').forEach(btn => {
    btn.addEventListener('click', () => {
      const itemId = btn.dataset.itemId;
      const sampleVal = parseFloat(btn.dataset.sample || '0');
      if (itemId && sampleVal > 0) {
        state.userCooxupePrices[itemId] = sampleVal;
        try {
          localStorage.setItem('cooxupe_user_prices', JSON.stringify(state.userCooxupePrices));
        } catch (e) {}
        const inputEl = container.querySelector<HTMLInputElement>(`#input-price-${itemId}`);
        if (inputEl) inputEl.value = sampleVal.toString();
        updateSingleBarterCard(itemId);
      }
    });
  });
}

function renderPricesTable(): void {
  const tbody = document.getElementById('prices-table-body');
  if (!tbody) return;

  const coffeePrice = state.currentCoffeePrice;

  tbody.innerHTML = PRODUCTS_CATALOG.map(prod => {
    const barterBags = prod.priceTable.cashPrice / coffeePrice;
    const diff = prod.comparisonVsCooxupe.cooxupePriceDiffPercent;
    const diffBadge = diff < 0 
      ? `<span class="badge-trend negative" title="Concorrente mais barato">${diff.toFixed(1)}%</span>`
      : diff > 0 
      ? `<span class="badge-trend positive" title="Concorrente mais caro">+${diff.toFixed(1)}%</span>`
      : `<span class="badge-trend neutral">0.0%</span>`;

    const tagLabel = diff < 0 
      ? 'Concorrente mais barato' 
      : diff > 0 
      ? 'Concorrente mais caro' 
      : 'Preço alinhado';

    const tagClass = diff < 0 ? 'cheaper' : diff > 0 ? 'expensive' : 'neutral';

    return `
      <tr>
        <td><strong>${prod.name}</strong><br><small class="text-muted">${prod.brandPartner}</small></td>
        <td><span class="prod-category-pill ${prod.category}"><i class="${getCategoryIcon(prod.category)}"></i> ${prod.category}</span></td>
        <td><strong>${prod.competitorName}</strong></td>
        <td><strong>${formatCurrency(prod.priceTable.cashPrice)}</strong> / ${prod.priceTable.unit}</td>
        <td>${formatCurrency(prod.priceTable.harvestTermPrice)}</td>
        <td><strong class="text-gold"><i class="fi fi-rr-coffee"></i> ${formatBags(barterBags)}</strong></td>
        <!-- COLUNA CLARA COM CANAL E ORIGEM DO CONCORRENTE -->
        <td class="table-source-cell">
          <strong>${prod.dataSource.competitorChannel}</strong>
          <div>${prod.dataSource.sourceName}</div>
          <span class="kpi-audit-badge">${prod.dataSource.auditLevel} &bull; ${prod.dataSource.collectionDate}</span>
        </td>
        <!-- COLUNA COMPLETA SEM RETICÊNCIAS COM POSICIONAMENTO E ANÁLISE -->
        <td class="table-verdict-cell">
          <div class="verdict-diff-row">
            ${diffBadge}
            <span class="verdict-tag ${tagClass}">${tagLabel}</span>
          </div>
          <div class="table-verdict-text">
            ${prod.comparisonVsCooxupe.strategicVerdict}
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

// ==========================================================================
// ABA 4: CAMPANHAS & CONDIÇÕES COMERCIAIS
// ==========================================================================
function renderCommercialCampaigns(): void {
  const container = document.getElementById('campaigns-list-grid');
  if (!container) return;

  container.innerHTML = COMMERCIAL_CAMPAIGNS.map(camp => `
    <div class="campaign-card">
      <div class="campaign-top-bar">
        <span class="threat-badge ${camp.threatLevel}">Ameaça ${camp.threatLevel.toUpperCase()}</span>
        <span class="camp-type-pill"><i class="fi fi-rr-tag"></i> ${camp.campaignType}</span>
      </div>

      <div>
        <h3 class="camp-title">${camp.title}</h3>
        <div class="camp-competitor-name">
          <i class="fi fi-rr-building"></i> Concorrente Promotor: <strong>${camp.competitorName}</strong> &bull; ${camp.validity}
        </div>
      </div>

      <p class="camp-terms"><strong>Condições Anunciadas:</strong> ${camp.terms}</p>

      <ul class="camp-benefits-list">
        ${camp.benefits.map(b => `<li><i class="fi fi-rr-check"></i> ${b}</li>`).join('')}
      </ul>

      <div class="counter-strategy-box">
        <strong><i class="fi fi-rr-shield-check"></i> Contra-Estratégia Recomendada para a Cooxupé:</strong>
        ${camp.cooxupeCounterStrategy}
      </div>

      <div class="camp-source-tag">
        <i class="fi fi-rr-document"></i> <strong>Canal Concorrente:</strong> ${camp.dataSource.competitorChannel} &bull; ${camp.dataSource.sourceName} (${camp.dataSource.collectionDate})
      </div>
    </div>
  `).join('');
}

// ==========================================================================
// ABA 5: FEIRAS & EVENTOS DO AGRO
// ==========================================================================
function renderFairEvents(): void {
  const container = document.getElementById('fairs-list-container');
  if (!container) return;

  container.innerHTML = FAIR_EVENTS.map(fair => `
    <div class="fair-card">
      <div class="fair-sidebar">
        <div class="fair-period-badge">
          <i class="fi fi-rr-calendar"></i> ${fair.period}
        </div>
        <h3 class="fair-name">${fair.name}</h3>
        <div class="fair-location">
          <i class="fi fi-rr-marker"></i> ${fair.location}
        </div>
        <div class="fair-volume-stat">
          <strong>Volume Comercial:</strong><br>${fair.historicalVolume}
        </div>
      </div>

      <div class="fair-main-content">
        <div>
          <span style="font-size: 0.72rem; text-transform: uppercase; font-weight: 700; color: var(--text-muted); display: block; margin-bottom: 6px;">Linhas em Foco:</span>
          <div class="fair-tags-group">
            ${fair.focus.map(f => `<span class="fair-tag">${f}</span>`).join('')}
          </div>
        </div>

        <div class="fair-cooxupe-box">
          <strong><i class="fi fi-rr-shield-check"></i> Posicionamento Estratégico Cooxupé:</strong>
          ${fair.cooxupeStrategy}
        </div>

        <div>
          <span style="font-size: 0.78rem; font-weight: 700; display: block; margin-bottom: 4px; color: var(--text-secondary);">
            Táticas dos Concorrentes Observadas no Evento:
          </span>
          <ul class="fair-tactics-list">
            ${fair.keyTacticsObserved.map(t => `<li><i class="fi fi-rr-exclamation"></i> ${t}</li>`).join('')}
          </ul>
        </div>

        <div class="fair-source-tag">
          <i class="fi fi-rr-document"></i> <strong>Fonte Oficial:</strong> ${fair.dataSource.sourceName} &bull; Canal: ${fair.dataSource.competitorChannel} (${fair.dataSource.collectionDate})
        </div>
      </div>
    </div>
  `).join('');
}

// ==========================================================================
// ABA 6: DIRETRIZES TÁTICAS & MATRIZ SWOT
// ==========================================================================
function renderSwotMatrix(): void {
  const forcasList = document.getElementById('swot-forcas-list');
  const fraquezasList = document.getElementById('swot-fraquezas-list');
  const oportunidadesList = document.getElementById('swot-oportunidades-list');
  const ameacasList = document.getElementById('swot-ameacas-list');

  function buildSwotItemHtml(item: typeof SWOT_MATRIX[0]) {
    return `
      <div class="swot-item-box">
        <div class="swot-item-title">${item.title}</div>
        <div class="swot-item-details">${item.details}</div>
        <div class="swot-item-action">
          <i class="fi fi-rr-arrow-right"></i> Diretriz para Vendedores/CTCs: ${item.tacticalDirective}
        </div>
        <div class="swot-item-source">
          <i class="fi fi-rr-document"></i> <strong>Base Documental:</strong> ${item.sourceOrBasis}
        </div>
      </div>
    `;
  }

  if (forcasList) {
    forcasList.innerHTML = SWOT_MATRIX.filter(i => i.type === 'forca').map(buildSwotItemHtml).join('');
  }
  if (fraquezasList) {
    fraquezasList.innerHTML = SWOT_MATRIX.filter(i => i.type === 'fraqueza').map(buildSwotItemHtml).join('');
  }
  if (oportunidadesList) {
    oportunidadesList.innerHTML = SWOT_MATRIX.filter(i => i.type === 'oportunidade').map(buildSwotItemHtml).join('');
  }
  if (ameacasList) {
    ameacasList.innerHTML = SWOT_MATRIX.filter(i => i.type === 'ameaca').map(buildSwotItemHtml).join('');
  }
}

// ==========================================================================
// FILTROS & BUSCA
// ==========================================================================
function setupSearchAndFilters(): void {
  const searchInput = document.getElementById('input-search-product') as HTMLInputElement;
  const catSelect = document.getElementById('filter-category-select') as HTMLSelectElement;
  const compSelect = document.getElementById('filter-competitor-select') as HTMLSelectElement;

  searchInput?.addEventListener('input', () => {
    state.searchQuery = searchInput.value;
    renderProductsCatalog();
  });

  catSelect?.addEventListener('change', () => {
    state.selectedCategory = catSelect.value;
    renderProductsCatalog();
  });

  compSelect?.addEventListener('change', () => {
    state.selectedCompetitor = compSelect.value;
    renderProductsCatalog();
  });

  if (catSelect) {
    setupCustomDropdown(catSelect, 'category');
  }
  if (compSelect) {
    setupCustomDropdown(compSelect, 'competitor');
  }

  // Fechar dropdowns customizados ao clicar fora ou pressionar ESC
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    if (!target.closest('.custom-dropdown')) {
      document.querySelectorAll('.custom-dropdown.open').forEach(d => d.classList.remove('open'));
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.custom-dropdown.open').forEach(d => d.classList.remove('open'));
    }
  });
}

function setupCustomDropdown(selectEl: HTMLSelectElement, type: 'category' | 'competitor'): void {
  const wrapper = selectEl.parentElement;
  if (!wrapper || wrapper.querySelector('.custom-dropdown')) return;

  wrapper.classList.add('has-custom-dropdown');

  const categoryIcons: Record<string, string> = {
    all: 'fi fi-rr-apps',
    insumos: 'fi fi-rr-plant-growth',
    irrigacao: 'fi fi-rr-bottle-droplet',
    maquinario: 'fi fi-rr-gears'
  };

  const compColorMap: Record<string, string> = {
    all: '#64748B',
    cocatrel: '#C28E42',
    coopercitrus: '#059669',
    minasul: '#2563EB',
    expocacer: '#7C3AED',
    lavoro_agro: '#DC2626',
    concessionarias_maquinas: '#EA580C',
    players_irrigacao: '#0284C7',
    cooxupe: '#1E5E3A'
  };

  const container = document.createElement('div');
  container.className = 'custom-dropdown';

  const currentOption = selectEl.options[selectEl.selectedIndex] || selectEl.options[0];

  const getIconHtml = (val: string) => {
    if (type === 'category') {
      const iconClass = categoryIcons[val] || 'fi fi-rr-boxes';
      return `<i class="${iconClass}"></i>`;
    } else {
      if (val === 'all') return `<i class="fi fi-rr-building"></i>`;
      const color = compColorMap[val] || '#4A5568';
      return `<span class="custom-dropdown-dot" style="background-color: ${color};"></span>`;
    }
  };

  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'custom-dropdown-btn';
  btn.innerHTML = `
    <span class="custom-dropdown-label">
      ${getIconHtml(currentOption.value)}
      <span class="custom-dropdown-text">${currentOption.textContent}</span>
    </span>
    <i class="fi fi-rr-angle-small-down custom-dropdown-chevron"></i>
  `;

  const menu = document.createElement('div');
  menu.className = 'custom-dropdown-menu';

  Array.from(selectEl.options).forEach(opt => {
    const item = document.createElement('div');
    const isSelected = opt.value === selectEl.value;
    item.className = `custom-dropdown-item ${isSelected ? 'active' : ''}`;
    item.dataset.value = opt.value;
    item.innerHTML = `
      <div class="custom-dropdown-item-left">
        ${getIconHtml(opt.value)}
        <span>${opt.textContent}</span>
      </div>
      ${isSelected ? '<i class="fi fi-rr-check custom-dropdown-check"></i>' : ''}
    `;

    item.addEventListener('click', (e) => {
      e.stopPropagation();
      selectEl.value = opt.value;

      const labelEl = btn.querySelector('.custom-dropdown-label');
      if (labelEl) {
        labelEl.innerHTML = `${getIconHtml(opt.value)}<span class="custom-dropdown-text">${opt.textContent}</span>`;
      }

      menu.querySelectorAll('.custom-dropdown-item').forEach(el => {
        el.classList.remove('active');
        const check = el.querySelector('.custom-dropdown-check');
        if (check) check.remove();
      });
      item.classList.add('active');
      item.insertAdjacentHTML('beforeend', '<i class="fi fi-rr-check custom-dropdown-check"></i>');

      container.classList.remove('open');
      selectEl.dispatchEvent(new Event('change'));
    });

    menu.appendChild(item);
  });

  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    document.querySelectorAll('.custom-dropdown.open').forEach(d => {
      if (d !== container) d.classList.remove('open');
    });
    container.classList.toggle('open');
  });

  container.appendChild(btn);
  container.appendChild(menu);
  wrapper.appendChild(container);
}

// ==========================================================================
// MODAL DE DETALHES TÉCNICOS & AUDITORIA DA FONTE
// ==========================================================================
function openProductModal(prod: ProductItem): void {
  const modal = document.getElementById('product-detail-modal');
  const catBadge = document.getElementById('modal-cat-badge');
  const title = document.getElementById('modal-product-title');
  const compName = document.getElementById('modal-competitor-name');
  const body = document.getElementById('modal-product-body');

  if (!modal || !catBadge || !title || !compName || !body) return;

  catBadge.textContent = prod.category.toUpperCase();
  title.textContent = prod.name;
  compName.textContent = `Empresa Concorrente Ofertante: ${prod.competitorName} | Fabricante: ${prod.brandPartner}`;

  const barterVal = prod.priceTable.cashPrice / state.currentCoffeePrice;

  body.innerHTML = `
    <div>
      <div class="modal-section-title">Especificações e Aplicação Agrícola</div>
      <p style="color: var(--text-secondary); line-height: 1.5;">${prod.specs}</p>
      <div style="font-size: 0.82rem; margin-top: 6px; color: var(--text-muted);">
        <strong>Culturas-Alvo:</strong> ${prod.targetCulture}
      </div>
    </div>

    <div>
      <div class="modal-section-title">Preços Praticados pelo Concorrente (Café a ${formatCurrency(state.currentCoffeePrice)}/sc)</div>
      <div class="modal-prices-grid">
        <div>
          <span style="font-size: 0.75rem; color: var(--text-muted); display: block;">Preço Concorrente (À Vista)</span>
          <strong style="font-size: 1.25rem; color: var(--text-primary);">${formatCurrency(prod.priceTable.cashPrice)}</strong>
          <span style="font-size: 0.75rem; color: var(--text-muted);">por ${prod.priceTable.unit}</span>
        </div>
        <div>
          <span style="font-size: 0.75rem; color: var(--text-muted); display: block;">Prazo Safra Concorrente</span>
          <strong style="font-size: 1.25rem; color: var(--text-primary);">${formatCurrency(prod.priceTable.harvestTermPrice)}</strong>
        </div>
        <div style="grid-column: 1 / -1; border-top: 1px dashed var(--glass-border-subtle); padding-top: 8px;">
          <span style="font-size: 0.78rem; color: var(--text-muted);">Equivalente Físico em Sacas de Café (60kg):</span>
          <strong style="font-size: 1.3rem; color: var(--coffee-amber); display: block;">
            <i class="fi fi-rr-coffee"></i> ${formatBags(barterVal)}
          </strong>
        </div>
      </div>
    </div>

    <!-- AUDITORIA DO CANAL CONCORRENTE -->
    <div class="modal-source-box">
      <strong><i class="fi fi-rr-document"></i> Rastreabilidade da Cotação do Concorrente (Auditoria)</strong>
      <div><strong>Canal Ofertante do Concorrente:</strong> ${prod.dataSource.competitorChannel}</div>
      <div><strong>Documento / Encarte:</strong> ${prod.dataSource.sourceName}</div>
      <div><strong>Método de Extração:</strong> ${prod.dataSource.collectionMethod}</div>
      <div style="display: flex; justify-content: space-between; margin-top: 6px; font-size: 0.78rem; color: var(--text-muted); border-top: 1px dashed rgba(217,155,38,0.3); padding-top: 4px;">
        <span><strong>Nível de Auditoria:</strong> ${prod.dataSource.auditLevel}</span>
        <span><strong>Data da Coleta:</strong> ${prod.dataSource.collectionDate}</span>
      </div>
    </div>

    ${prod.specialOffer ? `
      <div style="background: rgba(217, 155, 38, 0.1); border: 1px solid rgba(217, 155, 38, 0.3); border-radius: var(--radius-md); padding: 12px 16px;">
        <span style="font-size: 0.75rem; font-weight: 800; color: var(--gold-harvest); text-transform: uppercase;">
          <i class="fi fi-rr-tag"></i> Oferta Especial Vigente no Concorrente: ${prod.specialOffer.tag}
        </span>
        <p style="font-size: 0.85rem; color: var(--text-primary); margin-top: 4px;">${prod.specialOffer.description}</p>
        <span style="font-size: 0.72rem; color: var(--text-muted);">Válido até: ${prod.specialOffer.validUntil}</span>
      </div>
    ` : ''}

    <div style="background: var(--agri-tint); border-left: 4px solid var(--agri-primary); border-radius: 0 var(--radius-md) var(--radius-md) 0; padding: 14px 16px;">
      <strong style="color: var(--agri-primary); font-size: 0.88rem; display: block; margin-bottom: 4px;">
        <i class="fi fi-rr-shield-check"></i> Benchmark e Análise Estratégica Cooxupé
      </strong>
      <p style="font-size: 0.84rem; color: var(--text-secondary); line-height: 1.4;">
        ${prod.comparisonVsCooxupe.strategicVerdict}
      </p>
      <div style="font-size: 0.78rem; margin-top: 8px; color: var(--text-muted);">
        <strong>Produto Equivalente na Linha Cooxupé:</strong> ${prod.comparisonVsCooxupe.cooxupeEquivalent}
      </div>
    </div>

    <div style="font-size: 0.8rem; color: var(--text-muted);">
      <i class="fi fi-rr-award"></i> <strong>Garantia e Pós-Venda do Concorrente:</strong> ${prod.warrantyOrSupport}
    </div>
  `;

  modal.classList.remove('hidden');
}

function setupModalEvents(): void {
  const modal = document.getElementById('product-detail-modal');
  const btnClose = document.getElementById('btn-close-modal');
  const btnCloseAction = document.getElementById('btn-modal-close-action');

  function closeModal() {
    modal?.classList.add('hidden');
  }

  btnClose?.addEventListener('click', closeModal);
  btnCloseAction?.addEventListener('click', closeModal);

  modal?.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}

// ==========================================================================
// EXPORTAÇÕES (CSV AUDITÁVEL)
// ==========================================================================
function setupExportButtons(): void {
  const btnQuickExport = document.getElementById('btn-quick-export');
  const btnExportCsv = document.getElementById('btn-export-prices-csv');

  btnQuickExport?.addEventListener('click', () => {
    window.print();
  });

  btnExportCsv?.addEventListener('click', exportPricesToCsv);
}

function exportPricesToCsv(): void {
  const headers = [
    'Produto Concorrente',
    'Linha',
    'Concorrente Ofertante',
    'Marca Parceira',
    'Preco a Vista (R$)',
    'Preco Safra (R$)',
    'Unidade',
    `Equivalente em Cafe (sc a R$ ${state.currentCoffeePrice.toFixed(2)})`,
    'Canal Oficial Concorrente',
    'Documento / Origem da Cotacao',
    'Metodo de Extracao no Mercado',
    'Data da Coleta',
    'Nivel de Auditoria',
    'Posicionamento de Preco & Analise vs Cooxupe'
  ];

  const rows = PRODUCTS_CATALOG.map(p => {
    const sc = (p.priceTable.cashPrice / state.currentCoffeePrice).toFixed(2);
    return [
      `"${p.name.replace(/"/g, '""')}"`,
      `"${p.category}"`,
      `"${p.competitorName.replace(/"/g, '""')}"`,
      `"${p.brandPartner.replace(/"/g, '""')}"`,
      p.priceTable.cashPrice.toFixed(2),
      p.priceTable.harvestTermPrice.toFixed(2),
      `"${p.priceTable.unit}"`,
      sc,
      `"${p.dataSource.competitorChannel.replace(/"/g, '""')}"`,
      `"${p.dataSource.sourceName.replace(/"/g, '""')}"`,
      `"${p.dataSource.collectionMethod.replace(/"/g, '""')}"`,
      `"${p.dataSource.collectionDate}"`,
      `"${p.dataSource.auditLevel}"`,
      `"${p.comparisonVsCooxupe.strategicVerdict.replace(/"/g, '""')}"`
    ].join(';');
  });

  const csvContent = '\uFEFF' + [headers.join(';'), ...rows].join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `Cooxupe_Inteligencia_Concorrencia_${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// ==========================================================================
// ==========================================================================
// COTAÇÃO DO DÓLAR AO VIVO (API PÚBLICA BANCO CENTRAL / AWESOMEAPI)
// ==========================================================================
async function fetchLiveDollarRate(notifyUser: boolean = false): Promise<void> {
  const syncDollarDisplay = document.getElementById('sync-dollar-display');
  const syncDollarTimestamp = document.getElementById('sync-dollar-timestamp');
  const feedbackEl = document.getElementById('dollar-api-feedback');
  const btnRefresh = document.getElementById('btn-refresh-dollar-api') as HTMLButtonElement | null;

  if (notifyUser && btnRefresh) {
    btnRefresh.disabled = true;
    btnRefresh.innerHTML = '<i class="fi fi-rr-spinner animate-spin"></i> Consultando...';
  }

  if (notifyUser && feedbackEl) {
    feedbackEl.style.display = 'flex';
    feedbackEl.className = 'api-feedback-box loading';
    feedbackEl.innerHTML = '<i class="fi fi-rr-spinner animate-spin"></i> Conectando à API do Banco Central / AwesomeAPI...';
  }

  try {
    const res = await fetch('https://economia.awesomeapi.com.br/last/USD-BRL');
    if (!res.ok) throw new Error('Falha na resposta da API');
    const data = await res.json();
    const usdBrl = data.USDBRL;
    if (usdBrl && usdBrl.bid) {
      const bid = parseFloat(usdBrl.bid);
      const pct = parseFloat(usdBrl.pctChange);
      const formatted = bid.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
      const trendStr = `${pct >= 0 ? '+' : ''}${pct.toFixed(2)}%`;
      const timeStr = new Date().toLocaleTimeString('pt-BR');
      
      // Atualiza todas as ocorrências de cotação do dólar no ticker contínuo
      document.querySelectorAll('.ticker-dollar-val').forEach(el => {
        el.textContent = formatted;
      });
      document.querySelectorAll('.ticker-dollar-trend').forEach(el => {
        el.textContent = trendStr;
        el.className = `badge-trend ticker-dollar-trend ${pct >= 0 ? 'positive' : 'negative'}`;
      });

      if (syncDollarDisplay) syncDollarDisplay.textContent = formatted;
      if (syncDollarTimestamp) {
        syncDollarTimestamp.textContent = `Atualizado às ${timeStr} via Banco Central / AwesomeAPI`;
      }

      if (notifyUser && feedbackEl) {
        feedbackEl.style.display = 'flex';
        feedbackEl.className = 'api-feedback-box success';
        feedbackEl.innerHTML = `<i class="fi fi-rr-check"></i> Cotação do Dólar Comercial atualizada com sucesso: <strong>${formatted} (${trendStr})</strong> obtida via API às ${timeStr}.`;
      }
    }
  } catch (err) {
    console.warn('API externa offline, mantendo valor padrão de referência:', err);
    document.querySelectorAll('.ticker-dollar-val').forEach(el => {
      el.textContent = 'R$ 5,42';
    });
    if (syncDollarDisplay) syncDollarDisplay.textContent = 'R$ 5,42 (Referência)';

    if (notifyUser && feedbackEl) {
      feedbackEl.style.display = 'flex';
      feedbackEl.className = 'api-feedback-box error';
      feedbackEl.innerHTML = `<i class="fi fi-rr-exclamation"></i> Não foi possível consultar a API externa no momento. Mantida cotação anterior (R$ 5,42) em cache com segurança.`;
    }
  } finally {
    if (btnRefresh) {
      btnRefresh.disabled = false;
      btnRefresh.innerHTML = '<i class="fi fi-rr-refresh"></i> Consultar API Agora';
    }
  }
}

// ==========================================================================
// MODAL DE GOVERNANÇA, COTAÇÕES E IMPORTAÇÃO/EXPORTAÇÃO DE DADOS
// ==========================================================================
function setupSyncModal(): void {
  const modal = document.getElementById('sync-data-modal');
  const btnOpen = document.getElementById('btn-open-sync-modal');
  const btnClose = document.getElementById('btn-close-sync-modal');
  const btnCloseFooter = document.getElementById('btn-close-sync-footer');
  const btnSaveCoffee = document.getElementById('btn-save-coffee-rate');
  const modalCoffeeInput = document.getElementById('modal-coffee-input') as HTMLInputElement;
  const btnRefreshDollar = document.getElementById('btn-refresh-dollar-api');
  const btnExportJson = document.getElementById('btn-export-full-json');
  const inputImportJson = document.getElementById('input-import-json') as HTMLInputElement;
  const btnReset = document.getElementById('btn-reset-default-data');

  if (modalCoffeeInput) {
    modalCoffeeInput.value = state.currentCoffeePrice.toString();
  }

  function openSyncModal() {
    if (modalCoffeeInput) modalCoffeeInput.value = state.currentCoffeePrice.toString();
    const feedbackEl = document.getElementById('dollar-api-feedback');
    if (feedbackEl) feedbackEl.style.display = 'none';
    modal?.classList.remove('hidden');
  }

  function closeSyncModal() {
    modal?.classList.add('hidden');
  }

  btnOpen?.addEventListener('click', openSyncModal);
  btnClose?.addEventListener('click', closeSyncModal);
  btnCloseFooter?.addEventListener('click', closeSyncModal);

  btnRefreshDollar?.addEventListener('click', () => {
    fetchLiveDollarRate(true);
  });

  btnSaveCoffee?.addEventListener('click', () => {
    if (modalCoffeeInput) {
      const val = parseFloat(modalCoffeeInput.value);
      if (!isNaN(val) && val >= 500) {
        state.currentCoffeePrice = val;
        localStorage.setItem('cooxupe_coffee_price', val.toString());
        
        const priceInput = document.getElementById('coffee-price-input') as HTMLInputElement;
        const priceRange = document.getElementById('coffee-price-range') as HTMLInputElement;
        const tickerCoffeeEl = document.getElementById('ticker-coffee-price');
        if (priceInput) priceInput.value = val.toString();
        if (priceRange) priceRange.value = val.toString();
        if (tickerCoffeeEl) tickerCoffeeEl.textContent = formatCurrency(val) + ' / sc';

        // Atualiza todas as ocorrências do café no ticker contínuo
        document.querySelectorAll('.ticker-coffee-val').forEach(el => {
          el.textContent = formatCurrency(val) + ' / sc';
        });

        renderBarterHighlights();
        renderPricesTable();
        renderProductsCatalog();
        
        const feedbackEl = document.getElementById('dollar-api-feedback');
        if (feedbackEl) {
          feedbackEl.style.display = 'flex';
          feedbackEl.className = 'api-feedback-box success';
          feedbackEl.innerHTML = `<i class="fi fi-rr-check"></i> Cotação do Café Arábica salva: <strong>${formatCurrency(val)} / sc</strong>. Paridades de Barter recalculadas em todo o painel!`;
        }
      }
    }
  });

  // Exportar Base Completa em JSON
  btnExportJson?.addEventListener('click', () => {
    const fullData = {
      version: '1.0.0',
      exportedAt: new Date().toISOString(),
      coffeePriceReference: state.currentCoffeePrice,
      strategicKpis: STRATEGIC_KPIS,
      competitors: COMPETITORS,
      productsCatalog: PRODUCTS_CATALOG,
      commercialCampaigns: COMMERCIAL_CAMPAIGNS,
      fairEvents: FAIR_EVENTS,
      intelligenceAlerts: INTELLIGENCE_ALERTS,
      swotMatrix: SWOT_MATRIX
    };

    const blob = new Blob([JSON.stringify(fullData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Cooxupe_Inteligencia_BaseCompleta_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  });

  // Importar Base Completa em JSON
  inputImportJson?.addEventListener('change', (e) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target?.result as string);
        if (imported.productsCatalog && Array.isArray(imported.productsCatalog)) {
          localStorage.setItem('cooxupe_custom_data', JSON.stringify(imported));
          alert('Base de inteligência importada com sucesso! O painel será atualizado.');
          window.location.reload();
        } else {
          alert('Arquivo JSON inválido. Certifique-se de usar o modelo exportado pelo próprio painel.');
        }
      } catch (err) {
        alert('Erro ao processar arquivo JSON: ' + (err as Error).message);
      }
    };
    reader.readAsText(file);
  });

  btnReset?.addEventListener('click', () => {
    if (confirm('Deseja restaurar as cotações e dados originais de referência?')) {
      localStorage.removeItem('cooxupe_coffee_price');
      localStorage.removeItem('cooxupe_custom_data');
      window.location.reload();
    }
  });
}
