# quase.pt

Guia editorial de sítios em Portugal onde se entra em **água aquecida**.

## Stack (v3)

- **Next.js 16** com `output: "export"` (HTML estático)
- Dados em `data/sitios.json` (103 sítios)
- CSS do design live em `styles/globals.css`
- Deploy rsync → `/var/www/quase`

## Comandos

```bash
npm install
npm run check    # valida dados
npm run dev
npm run build    # gera ./out
npm run deploy   # build + rsync
```

## Estrutura

- `app/` — rotas (índice, fichas, hubs, listas, mapa)
- `components/` — Header, Indice/filtros, Cartao, Ficha, Logo
- `data/sitios.json` — fonte de verdade
- `public/fotos/` — imagens CC
- `snapshot-html/` — HTML de produção 2026-09-17 (referência)
- `archive/` — pivot Next anterior

## Logo

Propostas em `/logo-propostas/` (noindex). Opção A activa no header + favicon.
