#!/usr/bin/env bash
set -euo pipefail
set -a
# Prefer shared production env; fall back to release .env
if [ -f /var/www/quase/.env.production ]; then
  # shellcheck disable=SC1091
  source /var/www/quase/.env.production
elif [ -f /var/www/quase/current/.env ]; then
  # shellcheck disable=SC1091
  source /var/www/quase/current/.env
fi
set +a
cd /var/www/quase/current
exec /usr/bin/node server.js
