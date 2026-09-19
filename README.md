# quase.pt

Guia editorial de sítios em Portugal onde se entra em **água aquecida**: termas, hotéis com piscina interior / termas, jacuzzi no quarto e motéis.

## Estado actual (produção)

O site live é **HTML estático** (não Next.js). O snapshot em produção (2026-09-17) está na raiz deste repositório:

- `index.html` — índice com 103 sítios + filtros
- `ficar/`, `termas/`, `moteis/` — fichas
- `mapa/`, `listas/`, hubs regionais
- `fotos/` — imagens CC
- `styles.*.css`, `indice.*.js`, `mapa.*.js`, `tema.*.js`
- `data/sitios.json` — dados estruturados extraídos do índice

## Deploy

```bash
REMOTE_HOST=91.99.167.243 ./scripts/deploy.sh
```

Sincroniza a raiz do repo para `/var/www/quase` (exclui `archive/`, `data/`, `scripts/`).

## Arquivo

`archive/nextjs-spa-pivot-20260917/` — pivot Next.js anterior (SPA/piscinas, ~12 hotéis), conservado para referência.

## Nota

O gerador que produziu este HTML ainda não está neste repo — só o output deployado. Próximo passo: recuperar/reconstruir o gerador a partir deste snapshot.
