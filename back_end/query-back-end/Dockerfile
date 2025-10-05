FROM node:20-bullseye AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM deps AS build
COPY tsconfig.json ./
COPY index.ts ./
COPY database ./database
COPY handlers ./handlers
COPY server ./server
COPY generated ./generated
COPY prisma ./prisma
RUN npx prisma generate 
RUN npm run build

FROM build AS prune
RUN npm prune --omit=dev

FROM public.ecr.aws/lambda/nodejs:20 AS runner
WORKDIR ${LAMBDA_TASK_ROOT}

COPY --from=prune /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma
CMD ["dist/server/serverless-server.handlers"]
