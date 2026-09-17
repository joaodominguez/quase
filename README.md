# quase.pt

Guia editorial de **SPA e hoteis com piscina interior** em Portugal, Acores e Madeira.

## Stack

- Next.js static export (`output: "export"`)
- Conteudo em `data/hotels.js` e `data/lists.js`
- Deploy rsync para `/var/www/quase` no origin

## Comandos

```bash
npm install
npm run dev
npm run build
# deploy (requer SSH ao origin):
REMOTE_HOST=91.99.167.243 ./scripts/deploy.sh
```

## Wipe 2026-09-17

O CMS Laravel antigo (milhares de posts) foi arquivado. Ver `docs/server-cutover.md`.
