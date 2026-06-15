#!/usr/bin/env bash
set -euo pipefail

REMOTE_HOST="${REMOTE_HOST:-91.99.167.243}"
REMOTE_USER="${REMOTE_USER:-root}"
REMOTE_PATH="${REMOTE_PATH:-/var/www/quase-backoffice/}"

cd "$(dirname "${BASH_SOURCE[0]}")/.."

rsync -avz --delete --chown=root:www-data \
  --exclude "/.env" \
  --exclude "/vendor/" \
  --exclude "/node_modules/" \
  --exclude "/storage/app/" \
  --exclude "/storage/framework/cache/" \
  --exclude "/storage/framework/sessions/" \
  --exclude "/storage/framework/views/" \
  --exclude "/storage/logs/" \
  backoffice/ \
  "${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_PATH}"

ssh "${REMOTE_USER}@${REMOTE_HOST}" "cd '${REMOTE_PATH}' && composer install --no-dev --optimize-autoloader && php artisan migrate --force && php artisan filament:assets && php artisan optimize:clear && php artisan optimize"
