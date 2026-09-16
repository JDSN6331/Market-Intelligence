# ==========================================================================
# DOCKERFILE MULTI-STAGE — PAINEL DE INTELIGÊNCIA COOXUPÉ
# Otimizado para Easypanel / Coolify / Hostinger VPS KVM2
# ==========================================================================

# ESTÁGIO 1: Build da aplicação TypeScript + Vite
FROM node:20-alpine AS builder

WORKDIR /app

# Copia arquivos de dependências
COPY package*.json ./

# Instala dependências de forma limpa e rápida
RUN npm ci

# Copia todo o código-fonte
COPY . .

# Executa o build de produção (gera a pasta dist/)
RUN npm run build

# ESTÁGIO 2: Servidor Web Nginx de Alta Performance (Imagem leve ~25MB)
FROM nginx:alpine AS runner

# Remove configuração padrão do Nginx
RUN rm -rf /etc/nginx/conf.d/*

# Copia configuração customizada para SPA (Single Page Application)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia os arquivos compilados do estágio anterior
COPY --from=builder /app/dist /usr/share/nginx/html

# Expõe a porta padrão HTTP
EXPOSE 80

# Comando de inicialização do Nginx
CMD ["nginx", "-g", "daemon off;"]
