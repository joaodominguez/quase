# Quase.pt

Frontend Next.js do site principal de `quase.pt`: um guia editorial de
refugios especiais em Portugal, com foco em herdades, casas de campo, boutique
hoteis, turismo rural e pequenos projectos independentes.

## Estrutura

```text
.
├── app/
├── backoffice/
├── data/
├── public/
├── styles.css
├── next.config.mjs
└── package.json
```

O frontend usa Next.js com `output: "export"`. Em producao, o Apache serve os
ficheiros estaticos gerados em `out/`; nao e necessario manter um processo Node
a correr no servidor.

## Desenvolvimento

```bash
npm install
npm run dev
```

Build estatico:

```bash
npm run build
```

## Deploy para o servidor

O projecto deve ficar na raiz publica de `quase.pt`, dentro da pasta
`/var/www/quase` do servidor.

Importante:

- a pasta `/var/www/quase/mundial/` ja existe e pertence a outro subprojecto;
- nao apagar, mover, substituir ou sincronizar essa pasta;
- qualquer deploy por `rsync` deve excluir explicitamente `/mundial/`.

Exemplo seguro de sincronizacao depois do build, enviando apenas o conteudo de
`out/` e preservando `/mundial/`:

```bash
rsync -avz --delete \
  --exclude "/mundial/" \
  out/ root@91.99.167.243:/var/www/quase/
```

Tambem existe um script equivalente:

```bash
npm run deploy
```

Se o servidor web apontar directamente para `/var/www/quase`, a rota
`https://quase.pt/mundial/` continuara a funcionar desde que a pasta existente
seja mantida intacta.

O cutover do dominio e a configuracao Apache estao documentados em
[`docs/server-cutover.md`](docs/server-cutover.md). Existe tambem um template
de virtual host HTTP em [`server/apache-quase.pt.conf`](server/apache-quase.pt.conf)
e o vhost HTTPS em
[`server/apache-quase.pt-le-ssl.conf`](server/apache-quase.pt-le-ssl.conf).

## Afiliados

A homepage ja inclui um aviso editorial para futuras integracoes com
Travelpayouts, Booking, Expedia ou parcerias directas. Antes de activar links
de reserva reais, adicionar:

- identificacao clara de links afiliados;
- politica de privacidade;
- politica de cookies, caso exista tracking/analytics;
- consentimento RGPD quando necessario.

## Conteudo

As referencias editoriais e criterios para futuras listas de alojamentos estao
em [`docs/content-strategy.md`](docs/content-strategy.md).

Existe tambem um crawler de referencia para a conta/website Best Portugal Hotels:

```bash
npm run crawl:bph-instagram
```

O resultado fica em
[`data/reference/bestportugalhotels-instagram.json`](data/reference/bestportugalhotels-instagram.json).
Este ficheiro deve ser usado apenas para pesquisa editorial; imagens, captions e
dados devem ser confirmados nas fontes oficiais antes de publicar.

## Backoffice

O backoffice para gerir reviews, alojamentos, fotos e links afiliados vive em
[`backoffice/`](backoffice/) e usa Laravel + Filament. A arquitectura e notas de
deploy estao em [`docs/backoffice-plan.md`](docs/backoffice-plan.md).

Em desenvolvimento:

```bash
cd backoffice
composer install
php artisan migrate
php artisan serve
```

Em producao, o backoffice fica em `/var/www/quase-backoffice` e e servido em
`https://quase.pt/admin`.
