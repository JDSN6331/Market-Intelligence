# Guia de Deploy no Easypanel (Hostinger VPS KVM2)

Este guia orienta o deploy em produção do **Painel de Inteligência Competitiva da Cooxupé** em uma **VPS KVM 2 da Hostinger** gerenciada pelo **Easypanel**.

---

## 🏗️ 1. Arquitetura do Deploy

- **Ambiente:** Docker Container multi-stage (Node.js 20 Alpine para build + Nginx Alpine para servir os arquivos estáticos).
- **Consumo de Memória:** ~25 MB RAM (extremamente leve, ocupa menos de 0,5% da sua VPS KVM 2 de 8 GB).
- **Porta Interna do Contêiner:** `80` (HTTP).
- **Certificado SSL:** Gerado e renovado automaticamente pelo Let's Encrypt através do Traefik nativo do Easypanel.

---

## 🚀 2. Passo a Passo no Easypanel

### Método A: Deploy Conectado ao GitHub / GitLab (Recomendado para CI/CD)

1. **Suba o projeto para o seu repositório Git** (GitHub, GitLab ou Gitea privado):
   ```bash
   git init
   git add .
   git commit -m "feat: painel de inteligência cooxupe v1.0"
   git branch -M main
   git remote add origin https://github.com/SEU_USUARIO/cooxupe-concorrencia.git
   git push -u origin main
   ```

2. **Acesse o seu Easypanel na Hostinger:**
   - Acesse `https://seu-ip-ou-dominio:3000` e faça login.

3. **Crie um Novo Projeto / Serviço:**
   - Clique em **+ New Project** e dê o nome: `cooxupe-inteligencia`.
   - Dentro do projeto, clique em **+ Service** e selecione **App**.
   - Dê um nome ao serviço: `painel-concorrencia`.

4. **Configure a Origem do Código (Source):**
   - Em **Source**, selecione **GitHub** (ou Git Repository).
   - Conecte sua conta ou informe o link do repositório: `https://github.com/SEU_USUARIO/cooxupe-concorrencia`.
   - Branch: `main`.
   - **Build Type:** Selecione **Dockerfile** (o Easypanel utilizará automaticamente o `Dockerfile` multi-stage que já deixamos pronto na raiz do projeto).

5. **Configuração de Portas e Domínio:**
   - Em **Domains**, adicione o domínio ou subdomínio desejado (ex.: `concorrencia.cooxupe.com.br` ou `painel.seudominio.com`).
   - Verifique se a porta configurada no Easypanel aponta para a porta do contêiner: `80`.
   - Ative a opção de **HTTPS / SSL Automático**.

6. **Deploy:**
   - Clique no botão **Deploy**.
   - O Easypanel irá baixar o repositório, executar o build do Vite (`npm run build`) e subir o servidor Nginx em menos de 1 minuto.
   - A cada novo `git push` na branch `main`, o Easypanel atualizará a aplicação automaticamente sem downtime!

---

### Método B: Deploy via Docker Compose no Easypanel

Caso prefira colar a configuração diretamente no Easypanel:
1. No Easypanel, crie um serviço do tipo **Docker Compose**.
2. Cole o conteúdo do arquivo `docker-compose.yml` que já deixamos pronto na raiz do projeto.
3. Configure o domínio e clique em **Deploy**.

---

## 🔒 3. Apontamento de DNS na Hostinger

Para que o seu domínio (ex.: `concorrencia.seudominio.com`) aponte para o Easypanel:
1. Acesse o painel da Hostinger -> **Gerenciador de DNS**.
2. Crie uma entrada do tipo **A**:
   - **Tipo:** `A`
   - **Nome / Host:** `concorrencia` (ou `@` se for domínio raiz)
   - **Aponta para:** `IP_DA_SUA_VPS_KVM2`
   - **TTL:** 14400 (ou padrão)
3. Aguarde alguns minutos para propagação do DNS. O Easypanel gerará o certificado SSL (cadeado verde) automaticamente.

---

## ⚡ 4. Manutenção e Reinicialização

- **Ver Logs em Tempo Real:** No Easypanel, acesse o serviço e clique na aba **Logs**.
- **Reiniciar Contêiner:** Clique no botão **Restart**.
- **Consumo de Recursos:** Monitore o uso de CPU e Memória na aba **Metrics** do Easypanel.
