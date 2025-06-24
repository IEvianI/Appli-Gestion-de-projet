# Dockerfile

#############################################
# 1) Builder front (Vite)
#############################################
FROM node:18-alpine AS frontend-builder

WORKDIR /app

# 1.1) Copie package.json + lock  
COPY package*.json ./

# 1.2) Installe les dépendances JS  
RUN npm ci

# 1.3) Copie tout et build  
COPY . .
RUN npm run build

#############################################
# 2) Image PHP / Laravel
#############################################
FROM php:8.2-fpm-alpine

RUN apk update && apk add --no-cache nodejs npm

WORKDIR /var/www/html

# 2.1) Extensions système & PHP  
RUN apk add --no-cache \
      git \
      zip \
      unzip \
      libzip-dev \
      libpng-dev \
    && docker-php-ext-install pdo_mysql zip

# 2.2) Installer composer (depuis l’image officielle)  
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# 2.3) Copier le front assemblé  
COPY --from=frontend-builder /app/public ./public

# 2.4) Copier le reste de l’application  
COPY . .

# 2.5) Installer les dépendances PHP, générer la clé & créer le storage link  
RUN composer install --no-dev --optimize-autoloader \
 && php artisan key:generate --ansi \
 && php artisan storage:link

# 2.6) Exposer le port FPM  
EXPOSE 9000

CMD ["php-fpm"]
