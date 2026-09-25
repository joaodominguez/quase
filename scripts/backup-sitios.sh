#!/usr/bin/env bash
# Backup diário de sitios.json — instalar em cron no servidor.
set -euo pipefail
SRC="${DATA_FILE:-/var/www/quase/data/sitios.json}"
DEST_DIR="${BACKUP_DIR:-/var/www/quase/backups}"
KEEP="${KEEP_BACKUPS:-30}"
mkdir -p "$DEST_DIR"
stamp="$(date +%Y%m%d-%H%M%S)"
cp -a "$SRC" "$DEST_DIR/sitios-$stamp.json"
# prune
ls -1t "$DEST_DIR"/sitios-*.json 2>/dev/null | tail -n +"$((KEEP + 1))" | xargs -r rm -f
echo "backup ok $DEST_DIR/sitios-$stamp.json"
