# Quase.pt

Primeira versao estatica do site principal de `quase.pt`: um guia editorial
de refugios especiais em Portugal, com foco em herdades, casas de campo,
boutique hoteis, turismo rural e pequenos projectos independentes.

## Estrutura

```text
.
├── index.html
├── styles.css
├── script.js
├── robots.txt
└── sitemap.xml
```

Nao existem dependencias de build. O site pode ser servido directamente por
Nginx, Apache, Caddy ou outro servidor estatico.

## Deploy para o servidor

O projecto deve ficar na raiz publica de `quase.pt`, dentro da pasta
`/var/www/quase` do servidor.

Importante:

- a pasta `/var/www/quase/mundial/` ja existe e pertence a outro subprojecto;
- nao apagar, mover, substituir ou sincronizar essa pasta;
- qualquer deploy por `rsync` deve excluir explicitamente `/mundial/`.

Exemplo seguro de sincronizacao a partir da raiz deste repositorio, enviando
apenas os ficheiros publicos do site:

```bash
rsync -avz \
  index.html \
  styles.css \
  script.js \
  robots.txt \
  sitemap.xml \
  root@91.99.167.243:/var/www/quase/
```

Tambem existe um script equivalente:

```bash
./scripts/deploy.sh
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

## Backoffice

O plano recomendado para gerir reviews, alojamentos, fotos e links afiliados
esta em [`docs/backoffice-plan.md`](docs/backoffice-plan.md). A proposta inicial
e um backoffice simples em PHP 8.3 + SQLite, com base de dados e configuracao
fora da web root.
