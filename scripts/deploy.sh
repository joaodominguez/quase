#!/usr/bin/env bash
# Deploy quase (Next standalone) — padrão próximo do VagaSaúde.
set -euo pipefail

REMOTE_HOST="${REMOTE_HOST:-91.99.167.243}"
REMOTE_USER="${REMOTE_USER:-root}"
REMOTE_APP="${REMOTE_APP:-/var/www/quase}"
REMOTE_RELEASES="${REMOTE_RELEASES:-$REMOTE_APP/releases}"
KEEP_RELEASES="${KEEP_RELEASES:-5}"

cd "$(dirname "${BASH_SOURCE[0]}")/.."

if [ ! -f .next/standalone/server.js ]; then
  echo "Missing .next/standalone/server.js. Run npm run build first." >&2
  exit 1
fi

STAMP="$(date +%Y%m%d-%H%M%S)"
RELEASE_DIR="$REMOTE_RELEASES/$STAMP"

ssh_cmd() {
  if command -v sshpass >/dev/null 2>&1 && [ -n "${SSHPASS:-}" ]; then
    sshpass -e ssh -o StrictHostKeyChecking=no "$@"
  else
    ssh -o StrictHostKeyChecking=no "$@"
  fi
}

rsync_cmd() {
  if command -v sshpass >/dev/null 2>&1 && [ -n "${SSHPASS:-}" ]; then
    sshpass -e rsync "$@"
  else
    rsync "$@"
  fi
}

echo "==> Preparing remote release $STAMP"
ssh_cmd "${REMOTE_USER}@${REMOTE_HOST}" "mkdir -p '$RELEASE_DIR' '$REMOTE_APP/data' '$REMOTE_APP/shared' '$REMOTE_APP/public'"

# Seed data file once if missing
ssh_cmd "${REMOTE_USER}@${REMOTE_HOST}" \
  "test -f '$REMOTE_APP/data/sitios.json' || echo 'seed needed'" >/tmp/quase-seed-check
if grep -q "seed needed" /tmp/quase-seed-check; then
  echo "==> Seeding data/sitios.json"
  rsync_cmd -avz -e "ssh -o StrictHostKeyChecking=no" \
    data/sitios.json "${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_APP}/data/sitios.json"
fi

echo "==> Syncing standalone build"
rsync_cmd -avz --delete -e "ssh -o StrictHostKeyChecking=no" \
  .next/standalone/ "${REMOTE_USER}@${REMOTE_HOST}:${RELEASE_DIR}/"

echo "==> Syncing static assets"
rsync_cmd -avz -e "ssh -o StrictHostKeyChecking=no" \
  .next/static/ "${REMOTE_USER}@${REMOTE_HOST}:${RELEASE_DIR}/.next/static/"
rsync_cmd -avz --delete -e "ssh -o StrictHostKeyChecking=no" \
  public/ "${REMOTE_USER}@${REMOTE_HOST}:${RELEASE_DIR}/public/"

# Ensure data/ exists inside release (fallback) and copy repo JSON as build reference
rsync_cmd -avz -e "ssh -o StrictHostKeyChecking=no" \
  data/sitios.json "${REMOTE_USER}@${REMOTE_HOST}:${RELEASE_DIR}/data/sitios.json"

echo "==> Switching current → $STAMP"
ssh_cmd "${REMOTE_USER}@${REMOTE_HOST}" bash -s <<EOF
set -euo pipefail
ln -sfn '$RELEASE_DIR' '$REMOTE_APP/current'
# Keep Apache DocumentRoot content in sync for assets fallback / robots
if [ -d '$REMOTE_APP/public' ]; then
  rsync -a --delete '$RELEASE_DIR/public/' '$REMOTE_APP/public/' || true
fi
# Prune old releases
cd '$REMOTE_RELEASES'
ls -1dt */ 2>/dev/null | tail -n +$((KEEP_RELEASES + 1)) | xargs -r rm -rf
# Restart app
if [ -x '$REMOTE_APP/start.sh' ]; then
  # Kill previous node on the quase port if running via tmux
  tmux has-session -t quase-app 2>/dev/null && tmux kill-session -t quase-app || true
  tmux new-session -d -s quase-app '$REMOTE_APP/start.sh'
  echo "Started tmux session quase-app"
else
  echo "WARNING: $REMOTE_APP/start.sh missing — start manually" >&2
fi
EOF

echo "==> Deployed release $STAMP"
