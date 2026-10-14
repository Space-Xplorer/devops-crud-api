FROM node:22-alpine
ENV NODE_ENV=production
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY index.js ./
COPY start.js ./
USER node
EXPOSE 5000
CMD ["node", "start.js"]
