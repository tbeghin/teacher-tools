FROM nginx:alpine
COPY ./dist/teacherTools/ ./usr/share/nginx/html
