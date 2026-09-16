# Rotina Operacional e Governança de Atualização de Dados
## Painel de Inteligência Competitiva — Cooxupé (Comercial Insumos)

Este documento estabelece o fluxo operacional, a periodicidade, as responsabilidades e os métodos técnicos para manter o **Cockpit de Inteligência Competitiva da Cooxupé** sempre atualizado, confiável e auditável.

---

## 🎯 1. Objetivos da Rotina
1. Garantir que a diretoria e os gestores comerciais tenham acesso a **preços reais e vigentes** praticados pelos principais concorrentes nas praças de atuação da cooperativa (Sul de Minas, Cerrado Mineiro e Média Mogiana).
2. Manter a **relação de troca (Barter)** alinhada à cotação oficial da saca de café arábica e ao dólar.
3. Fornecer aos RTVs (Representantes Técnicos de Vendas) e gerentes de núcleos **contra-estratégias práticas** antes que o cooperado feche compras com cooperativas congêneres (Cocatrel, Coopercitrus, Minasul) ou revendas multinacionais.
4. Manter a **credibilidade executiva** do painel com 100% de rastreabilidade de fontes e auditoria.

---

## 👥 2. Matriz de Responsabilidades (RACI)

| Papel | Responsáveis | Atribuições |
| :--- | :--- | :--- |
| **Coleta de Campo** | RTVs, Consultores Técnicos e Compradores dos 32 Núcleos | Identificar ofertas de concorrentes, coletar encartes, propostas de balcão e condições levadas pelos cooperados. |
| **Saneamento & Análise** | Analista de Inteligência de Mercado (Comercial Insumos) | Validar documentos, checar especificações técnicas equivalentes na Cooxupé, tabular preços e calcular paridades. |
| **Validação Comercial** | Gerência Comercial de Insumos / Máquinas | Validar o veredito estratégico, definir diretrizes táticas de defesa e aprovar a atualização. |
| **Governança & TI** | Administrador do Painel / TI Cooxupé | Manter o deploy no Easypanel (Hostinger VPS) e gerenciar acessos e integrações. |

---

## 📅 3. Cronograma Semanal de Inteligência de Mercado

| Dia da Semana | Horário | Etapa | Ação Operacional |
| :--- | :--- | :--- | :--- |
| **Segunda-feira** | 08:00 - 12:00 | **Coleta Descentralizada** | Consultores dos núcleos reportam novas campanhas rivais, encartes de feiras e cotações de balcão via formulário padrão. |
| **Segunda-feira** | 14:00 - 17:00 | **Triagem & Auditoria** | O Analista de Mercado filtra as informações com alto grau de confiabilidade e atribui os níveis de auditoria. |
| **Terça-feira** | 09:00 - 11:00 | **Paridade & Barter** | Cruzamento com a cotação oficial da saca de café arábica fechada na Mesa de Operações da Cooxupé e Dólar PTAX. |
| **Terça-feira** | 14:00 - 15:30 | **Comitê de Insumos** | Apresentação rápida para a Gerência Comercial e definição das *Contra-Estratégias* para os RTVs. |
| **Quarta-feira** | 08:00 | **Publicação no Painel** | Atualização do Cockpit (Cotações, Novos Produtos, Alertas Críticos e Matriz SWOT). |
| **Sexta-feira** | 16:30 | **Fechamento & Benchmark** | Avaliação do impacto das contra-estratégias no volume de vendas da semana na Cooxupé. |

---

## 🛠️ 4. Métodos Práticos para Atualizar o Painel

Você dispõe de **3 métodos flexíveis**, do modo visual e rápido ao modo automatizado de produção:

### Método 1: Atualização Rápida pelo Navegador (Zero Código)
*Ideal para ajustes diários das cotações de Café e testes rápidos de dados.*

1. No topo da tela do painel, clique no botão **"Cotações & Dados"** (ícone de engrenagem/atualização).
2. **Cotação do Café Arábica (BRL/sc):**
   - Digite o novo valor da saca praticado pela Cooxupé no dia (ex.: `1850.00`).
   - Clique em **"Salvar Cotação"**.
   - O painel recalcula instantaneamente toda a relação de troca (barter) em sacas de café para adubos, defensivos e tratores, gravando no navegador (`localStorage`).
3. **Cotação do Dólar:**
   - É consultada automaticamente ao vivo via API do Banco Central / AwesomeAPI. Você pode clicar em **"Atualizar Cotação do Dólar Agora"** para forçar nova requisição.
4. **Exportar / Importar Base Completa:**
   - Clique em **"Exportar Base Completa (JSON)"** para baixar um arquivo com todos os dados atuais de inteligência de mercado.
   - Para carregar novos dados preparados, use **"Importar Arquivo JSON"**.

---

### Método 2: Atualização pelo Repositório Git / Easypanel (Recomendado para Produção)
*Ideal para a publicação semanal oficial da equipe de inteligência de mercado.*

Toda a base de dados do painel é centralizada e estritamente tipada no arquivo:
📂 `src/data.ts`

1. **Abra o arquivo `src/data.ts`** e altere ou adicione novas entradas:
   - **Produtos & Preços:** Atualize a lista `PRODUCTS_CATALOG`. Cada produto tem seu preço à vista, a prazo, data da coleta e canal oficial do concorrente.
   - **Campanhas Promocionais:** Atualize `COMMERCIAL_CAMPAIGNS` (Early order, feiras, bônus safra).
   - **Alertas Comerciais do Feed:** Atualize `INTELLIGENCE_ALERTS` com ocorrências urgentes para os gestores.
   - **Feiras & Eventos:** Atualize `FAIR_EVENTS` com as datas e volumes de eventos como Expocafé, Fenicafé e Feira Minasul.
   - **Matriz SWOT:** Atualize as diretrizes táticas em `SWOT_MATRIX`.
2. **Faça o commit e envie para o repositório Git:**
   ```bash
   git add src/data.ts
   git commit -m "chore(dados): atualizacao semanal concorrencia - semana 38/2026"
   git push origin main
   ```
3. **Deploy Automático no Easypanel (Hostinger VPS):**
   - O Easypanel detecta o `git push`, executa o build otimizado em menos de 1 minuto e recarrega os contêineres Docker sem qualquer indisponibilidade para os usuários!

---

### Método 3: Exportação em Planilha (CSV / Excel)
*Ideal para reuniões executivas e relatórios físicos da diretoria.*

1. Acesse a aba **"Radar de Preços & Simulador de Barter"**.
2. Clique no botão superior direito **"Exportar Tabela (CSV)"**.
3. O sistema gera um arquivo `.csv` codificado em UTF-8 com BOM (compatível com acentuação nativa no Microsoft Excel), contendo todas as colunas de auditoria:
   - Produto Concorrente
   - Fornecedor / Concorrente
   - Preço à Vista e Preço Safra
   - Equivalência em Sacas de Café (baseada na cotação do momento)
   - Canal Oficial do Concorrente (ex: Balcão Cocatrel Três Pontas)
   - Data da Coleta e Nível de Auditoria
   - Benchmark Estratégico Cooxupé

---

## 📋 5. Formulário Padrão de Coleta de Campo (Checklist para RTVs)

Para padronizar o envio de informações pelos consultores técnicos e compradores de núcleos, utilize o seguinte roteiro de 8 perguntas:

1. **Concorrente Ofertante:** (ex.: Cocatrel, Minasul, Coopercitrus, Revenda Privada X, Concessionária Y).
2. **Praça / Município:** (ex.: Guaxupé, Varginha, Alfenas, Franca, Patrocínio, Araguari).
3. **Linha do Produto:** [ ] Insumos (Adubos/Defensivos) | [ ] Irrigação | [ ] Maquinário Agrícola.
4. **Nome Comercial & Fabricante:** (ex.: Adubo YaraBela Nitromag / Yara).
5. **Preço Praticado:**
   - Preço à Vista (R$ por tonelada, litro ou unidade):
   - Preço a Prazo Safra (R$) e Data de Vencimento da CPR:
6. **Condição Comercial / Bonificação:** (ex.: Frete CIF incluso, desconto de 5% acima de 30 toneladas, prazo safra sem juros).
7. **Documento Comprobatório:** Anexar foto da cotação, proposta impressa, encarte promocional ou áudio/mensagem do cooperado.
8. **Nível de Confiança / Auditoria:**
   - `[AUDITADO]`: Com documento/proposta impressa em mãos.
   - `[VERBAL]`: Relatado por cooperado de confiança no balcão.
   - `[ESTIMADO]`: Levantamento de mercado com base em preços médios regionais.

---

## 🚀 6. Próximos Passos & Integrações Futuras (Evolução)

- **Integração Automática com Google Sheets:** Possibilidade de plugar uma planilha compartilhada onde os analistas digitam as cotações e o painel consome automaticamente via webhook.
- **Banco de Dados PostgreSQL no Easypanel:** Para histórico plurianual de evolução de preços de fertilizantes e maquinário agrícola.
- **Integração com ERP Cooxupé:** Consumo direto das cotações diárias de café fechadas pela cooperativa através de API interna.
