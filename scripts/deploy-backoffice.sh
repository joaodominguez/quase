#!/usr/bin/env bash
set -euo pipefail

REMOTE_HOST="${REMOTE_HOST:-91.99.167.243}"
REMOTE_USER="${REMOTE_USER:-root}"
REMOTE_PATH="${REMOTE_PATH:-/var/www/quase-backoffice/}"

cd "$(dirname "${BASH_SOURCE[0]}")/.."

SSH_COMMAND="ssh"
if [ -n "${SSHPASS:-}" ] && command -v sshpass >/dev/null 2>&1; then
  SSH_COMMAND="sshpass -e ssh"
fi

rsync -avz --delete --chown=root:www-data \
  -e "$SSH_COMMAND" \
  --exclude "/.env" \
  --exclude "/.phpunit.result.cache" \
  --exclude "/vendor/" \
  --exclude "/node_modules/" \
  --exclude "/database/database.sqlite" \
  --exclude "/storage/app/" \
  --exclude "/storage/framework/cache/" \
  --exclude "/storage/framework/sessions/" \
  --exclude "/storage/framework/views/" \
  --exclude "/storage/logs/" \
  --exclude "/bootstrap/cache/*.php" \
  backoffice/ \
  "${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_PATH}"

$SSH_COMMAND "${REMOTE_USER}@${REMOTE_HOST}" "set -euo pipefail
mkdir -p /var/www/quase-data /var/www/quase/uploads '${REMOTE_PATH}/storage/app' '${REMOTE_PATH}/storage/framework/cache' '${REMOTE_PATH}/storage/framework/sessions' '${REMOTE_PATH}/storage/framework/views' '${REMOTE_PATH}/storage/logs' '${REMOTE_PATH}/bootstrap/cache'
touch /var/www/quase-data/quase.sqlite
cd '${REMOTE_PATH}'
composer install --no-dev --optimize-autoloader
if [ ! -f .env ]; then
  cp .env.example .env
  sed -i 's/^APP_ENV=.*/APP_ENV=production/' .env
  sed -i 's/^APP_DEBUG=.*/APP_DEBUG=false/' .env
  grep -q '^ASSET_URL=' .env || printf '\nASSET_URL=/admin\n' >> .env
  php artisan key:generate --force
fi
php artisan migrate --force
php artisan filament:assets
php artisan optimize:clear
php artisan optimize
chown -R root:www-data '${REMOTE_PATH}'
chown -R www-data:www-data '${REMOTE_PATH}/storage' '${REMOTE_PATH}/bootstrap/cache' /var/www/quase-data /var/www/quase/uploads
chmod 750 /var/www/quase-data
"
