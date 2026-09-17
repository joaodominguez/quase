# Cutover / wipe quase.pt (SPA pivot)

## 2026-09-17 — pivot SPA

### Mantido

- Dominio `quase.pt` / `www.quase.pt`
- DNS + Cloudflare
- Certificado Let's Encrypt
- Redirect `/mundial` → `https://mundial.quase.pt`
- Vhost `mundial.quase.pt` (`DocumentRoot /var/www/mundial`)

### Backup

No servidor, pasta tipica:

```text
/root/backups/quase-wipe-YYYYMMDD-HHMMSS/
  quase.sql.gz
  quase-app.tgz
  quase.pt.conf
  quase.pt-le-ssl.conf
```

Caminho do ultimo backup: `/root/backups/quase-wipe-latest.path`

### Alteracoes

1. App Laravel em `/var/www/quase` arquivada para `/var/www/quase-legacy-YYYYMMDD`
2. Base MySQL `quase` esvaziada (tables dropped) apos dump
3. Novo site estatico Next.js em `/var/www/quase`
4. Apache `DocumentRoot` → `/var/www/quase` (ja nao `/var/www/quase/public`)
5. Aliases Filament/admin removidos do vhost

### Deploy

```bash
npm run build
./scripts/deploy.sh
```

Actualizar vhosts a partir de `server/apache-quase.pt.conf` e
`server/apache-quase.pt-le-ssl.conf`, depois `apache2ctl configtest && systemctl reload apache2`.
