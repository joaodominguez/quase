#!/usr/bin/env bash
set -euo pipefail

REMOTE_HOST="${REMOTE_HOST:-91.99.167.243}"
REMOTE_USER="${REMOTE_USER:-root}"
REMOTE_PATH="${REMOTE_PATH:-/quase/}"

cd "$(dirname "${BASH_SOURCE[0]}")/.."

rsync -avz --delete \
  --exclude "/.git/" \
  --exclude "/scripts/" \
  --exclude "/mundial/" \
  ./ "${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_PATH}"
