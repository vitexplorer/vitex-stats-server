FROM nginx:1.21
COPY nginx-default.conf /etc/nginx/conf.d/default.conf
COPY dist/vitex-stats /usr/share/nginx/html
