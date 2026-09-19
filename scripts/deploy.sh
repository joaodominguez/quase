#!/usr/bin/env bash
set -euo pipefail

REMOTE_HOST="${REMOTE_HOST:-91.99.167.243}"
REMOTE_USER="${REMOTE_USER:-root}"
REMOTE_PATH="${REMOTE_PATH:-/var/www/quase/}"

cd "$(dirname "${BASH_SOURCE[0]}")/.."

if [ ! -d out ]; then
  echo "Missing ./out. Run npm run build first." >&2
  exit 1
fi

RSYNC_ARGS=(-avz --delete --chown=www-data:www-data
  -e "ssh -o StrictHostKeyChecking=no"
  out/
  "${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_PATH}")

if command -v sshpass >/dev/null 2>&1 && [ -n "${SSHPASS:-}" ]; then
  sshpass -e rsync "${RSYNC_ARGS[@]}"
else
  rsync "${RSYNC_ARGS[@]}"
fi
