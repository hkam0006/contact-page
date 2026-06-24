FROM node:22-alpine AS build

WORKDIR /app

COPY package.json ./
COPY apps/api/package.json apps/api/package.json
COPY apps/web/package.json apps/web/package.json
RUN npm install

COPY . .
RUN npm run prisma:generate --workspace @contact-demo/api
RUN npm run build --workspace @contact-demo/api

FROM node:22-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production

COPY --from=build /app/package.json ./package.json
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/apps/api ./apps/api

EXPOSE 3001
CMD ["sh", "-c", "npm run db:push --workspace @contact-demo/api && npm run start:prod --workspace @contact-demo/api"]
