FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .

ARG VITE_QUIZ_API_URL=http://localhost:3000
ARG VITE_RESULTS_API_URL=http://localhost:3001

ENV VITE_QUIZ_API_URL=${VITE_QUIZ_API_URL}
ENV VITE_RESULTS_API_URL=${VITE_RESULTS_API_URL}

RUN npm run build

FROM nginx:1.29.3-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]