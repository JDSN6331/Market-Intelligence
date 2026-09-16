# Painel de Inteligência Competitiva Cooxupé

Cockpit executivo e estratégico desenvolvido para fornecer aos gestores e à diretoria da **Cooxupé** uma visão 360° dos principais concorrentes nas praças do Sul de Minas, Cerrado Mineiro e Média Mogiana, com foco vertical em **Insumos** (fertilizantes e defensivos), **Irrigação** e **Maquinário Agrícola**.

---

## 🌾 Tecnologias e Design System

- **TypeScript** (Strict Mode): Tipagem estrita para todas as entidades de mercado, cotações, concorrentes e rastreabilidade documental (`DataSourceInfo`).
- **HTML5 Semântico**: Arquitetura em abas, acessibilidade e modais de auditoria técnica.
- **Vanilla CSS com Glassmorphism Avançado**: 
  - Fundo sofisticado com malha orgânica do agronegócio e gradientes radiais em camadas (verde floresta `#1E5E3A`, terroir de café `#4D2C1D` e ouro da colheita `#D99B26`).
  - Efeito **Glassmorphism** com `backdrop-filter: blur(16px)`, reflexo especular superior, elevação e brilho dinâmico ao passar o mouse (`hover glow`).
  - Suporte completo a **Modo Fazenda (Claro)** e **Modo Executivo (Noturno)**.
- **Biblioteca de Ícones [Flaticon](https://www.flaticon.com/br/)**: 100% dos ícones oriundos da biblioteca oficial Flaticon (UIcons CDN).
- **Rastreabilidade e Governança de Dados**:
  - **Legenda e Metodologia em cada KPI**: O que representa, como foi extraído e frequência de atualização.
  - **Fonte Documental em todos os preços**: Origem da cotação, responsável pelo levantamento, data e nível de auditoria.

---

## 🚜 Módulos do Painel

1. **Cockpit Executivo & Alertas em Tempo Real:**
   - KPIs de Competitividade de Preços (ICP Cooxupé vs Mercado).
   - Banner de alerta prioritário com diretriz comercial rápida.
   - Mapeamento dos 4 clusters concorrentes: *Cooperativas Congêneres* (Cocatrel, Minasul, Coopercitrus, Expocacer), *Revendas Privadas* (Lavoro Agro, AgroGalaxy), *Concessionárias de Maquinário* (John Deere, Case IH, Valtra, LS Tractor, Agritech) e *Integradores de Irrigação* (Netafim, Rivulis, Lindsay).
   - Feed de ocorrências comerciais com níveis de criticidade (Crítico, Atenção, Informativo).
   - Gráfico de barras de Market Share estimado por segmento regional.

2. **Catálogo & Comparador Técnico de Produtos:**
   - Filtros instantâneos por categoria (*Insumos*, *Irrigação*, *Maquinário*) e concorrente.
   - Busca em tempo real por nome comercial, princípio ativo ou parceiro de fábrica.
   - Cards analíticos com preços à vista, a prazo safra, equivalente em sacas de café e veredito estratégico frente à Cooxupé.
   - Modal com detalhamento técnico profundo, culturas-alvo, pós-venda e produto equivalente Cooxupé.

3. **Radar de Preços & Simulador de Barter (Relação de Troca em Café):**
   - Simulador interativo com ajuste em tempo real da cotação da saca de café arábica (R$/sc de 60 kg).
   - Recálculo dinâmico automático da quantidade de sacas necessárias para aquisição de adubos, irrigação e tratores na Cooxupé vs. concorrentes.
   - Tabela comparativa analítica com exportação em **CSV para Excel**.

4. **Campanhas Sazonais & Condições Comerciais:**
   - Monitoramento de ofertas de *Early Order*, *Barter Safra*, bonificações, prazos de CPR e taxas de juros subsidiadas praticadas por cada rival.
   - Indicação de contra-estratégias práticas para defesa dos cooperados da Cooxupé.

5. **Calendário de Feiras & Benchmark de Eventos:**
   - Benchmark da **Femagri (Cooxupé)** frente a **Expocafé (Cocatrel/Epamig)**, **Fenicafé (Araguari)**, **Feira Minasul**, **Agrishow** e **Coopercitrus Expo**.
   - Volume histórico movimentado e táticas comerciais observadas nos estandes rivais.

6. **Diretrizes Táticas (Matriz SWOT):**
   - Forças, Fraquezas, Oportunidades e Ameaças da Cooxupé organizadas por pilares operacionais.
   - Diretrizes táticas numeradas para aplicação imediata pelos consultores de campo (RTVs) e gerências regionais de núcleos.

---

## 🚀 Como Executar o Projeto Localmente

### Pré-requisitos
- Node.js (versão 18 ou superior)
- NPM instalado

### Passo a passo
1. Abra o terminal na pasta do projeto:
   ```bash
   cd "c:\Users\josed\OneDrive\Desktop\Temp\Concorrência"
   ```
2. Instale as dependências (caso não tenham sido instaladas):
   ```bash
   npm install
   ```
3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
4. Acesse no navegador:
   ```
   http://localhost:5173/
   ```

### Geração da Versão de Produção
Para compilar o código TypeScript e gerar os arquivos estáticos otimizados:
```bash
npm run build
```
Os arquivos prontos para publicação estarão disponíveis na pasta `dist/`.

---

## 🌐 Hospedagem em Produção (Hostinger VPS & Easypanel)
Consulte o guia passo a passo em [DEPLOY_EASYPANEL.md](DEPLOY_EASYPANEL.md) para subir a aplicação em contêiner Docker multi-stage Nginx no Easypanel com SSL automático.

---

## 📊 Rotina Operacional & Governança de Atualização
Consulte o manual de governança em [ROTINA_ATUALIZACAO.md](ROTINA_ATUALIZACAO.md) para o cronograma semanal de coleta de preços nos 32 núcleos, formulário de campo para os RTVs e métodos de atualização (via painel, planilha ou Git).
