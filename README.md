# quase.pt

Guia editorial de sítios em Portugal onde se entra em **água aquecida**.

## Stack (v3)

- **Next.js 16** com `output: "standalone"` (como o VagaSaúde)
- Dados em `data/sitios.json` (103 sítios); em produção, `DATA_DIR`
- CSS do design live em `styles/globals.css`
- Backoffice em `/admin` com Basic Auth (`ADMIN_USER` / `ADMIN_PASSWORD`)
- Deploy → Node em `127.0.0.1:3012`, Apache faz proxy

## Comandos

```bash
npm install
cp .env.example .env.local   # opcional em dev (sem auth se faltar ADMIN_*)
npm run check
npm run dev
npm run build
npm run deploy
```

## Backoffice

- `https://quase.pt/admin/` — visão geral, lista/edição de sítios, sistema
- Autenticação HTTP Basic (browser pede utilizador/palavra-passe)
- Gravações actualizam `sitios.json` e reflectem-se no site sem rebuild

## Estrutura

- `app/(site)/` — site público
- `app/admin/` — backoffice
- `app/api/admin/` — API do backoffice
- `components/` — Header, Indice, Cartao, Ficha, AdminShell, …
- `data/sitios.json` — fonte de verdade (ou `DATA_DIR` em produção)
- `proxy.js` — Basic Auth no `/admin`
- `public/fotos/` — imagens CC
