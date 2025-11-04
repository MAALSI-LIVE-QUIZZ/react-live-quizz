FROM nginx:1.29.3-alpine

# NPM RUN BUILD

# MODIFY ENV VALUES

COPY ./dist /usr/share/nginx/html
EXPOSE 80