# Plano de backoffice

## Decisao recomendada

Criar o backoffice em **Laravel + Filament**, mantendo o **frontend publico em
Next.js**.

Motivos:

- o servidor ja tem PHP 8.3, `pdo_sqlite`, `sqlite3`, `gd`, `fileinfo` e MySQL;
- Filament da-nos CRUD, login, tabelas, filtros, uploads e formularios ricos sem
  construir tudo de raiz;
- e adequado para gerir muitos alojamentos/reviews como a referencia do
  Instagram;
- permite manter o site publico Next.js leve, rapido e exportavel como estatico;
- nao mexe no projecto existente em `/var/www/quase/mundial`.

## Estrutura no servidor

```text
/var/www/quase/
  index.html
  _next/
  uploads/
    stays/
  mundial/

/var/www/quase-backoffice/
  app/
  bootstrap/
  config/
  database/
  public/
  resources/
  routes/
  storage/
  vendor/

/var/www/quase-data/
  quase.sqlite
```

Notas:

- `uploads/` fica publico para servir imagens no site;
- a base de dados fica fora da web root em `/var/www/quase-data`;
- segredos ficam no `.env` de `/var/www/quase-backoffice`, que nao e commitado;
- o backoffice e servido em `https://quase.pt/admin`;
- `/var/www/quase/mundial` continua intocado.

## Autenticacao

MVP:

- login Filament em `/admin`;
- utilizadores Laravel;
- passwords com hash Laravel;
- sessoes e CSRF geridos por Laravel;
- restricao opcional por dominio de email com `QUASE_ADMIN_EMAIL_DOMAIN`.

Mais tarde:

- 2FA;
- varios utilizadores;
- perfis: admin, editor, colaborador;
- registo de actividade.

## Modelo de dados inicial

### `stays`

Representa cada alojamento/review.

```sql
CREATE TABLE stays (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  region TEXT NOT NULL,
  location TEXT,
  stay_type TEXT,
  status TEXT NOT NULL DEFAULT 'draft',
  excerpt TEXT,
  review_body TEXT,
  ideal_for TEXT,
  highlights JSON,
  practical JSON,
  price_range TEXT,
  official_url TEXT,
  affiliate_url TEXT,
  booking_url TEXT,
  seo_title TEXT,
  seo_description TEXT,
  published_at TIMESTAMP,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
```

Estados:

- `draft` - em preparacao;
- `review` - pronto para rever;
- `published` - visivel no site;
- `archived` - retirado sem apagar historico.

### `stay_images`

```sql
CREATE TABLE stay_images (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  stay_id INTEGER NOT NULL,
  path TEXT NOT NULL,
  alt_text TEXT,
  credit TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL,
  FOREIGN KEY (stay_id) REFERENCES stays(id) ON DELETE CASCADE
);
```

### Futuro: `regions` e `collections`

Para paginas como "Herdades no Alentejo", "Boutique hoteis no Douro",
"Escapadinhas romanticas" ou "Perto do mar".

```sql
CREATE TABLE collections (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  intro TEXT,
  seo_title TEXT,
  seo_description TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
```

### `collection_stays`

```sql
CREATE TABLE collection_stays (
  collection_id INTEGER NOT NULL,
  stay_id INTEGER NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (collection_id, stay_id),
  FOREIGN KEY (collection_id) REFERENCES collections(id) ON DELETE CASCADE,
  FOREIGN KEY (stay_id) REFERENCES stays(id) ON DELETE CASCADE
);
```

## Campos editoriais por alojamento

Cada ficha deve permitir editar:

- nome;
- slug;
- regiao;
- localidade;
- tipo: herdade, boutique hotel, quinta, casa de campo, turismo rural, etc.;
- resumo curto;
- review editorial;
- "ideal para";
- destaques;
- informacao pratica:
  - piscina;
  - restaurante;
  - spa;
  - pet-friendly;
  - estacionamento;
  - familia/criancas;
  - distancia da praia/cidade;
- links:
  - site oficial;
  - afiliado;
  - Booking/Travelpayouts/outro parceiro;
- galeria;
- creditos das imagens;
- SEO title/description;
- estado de publicacao.

## Upload de fotos

Regras:

- upload via Filament `FileUpload`;
- guardar no disk `stays`, que aponta para `/var/www/quase/uploads`;
- aceitar imagens;
- guardar caminho em `stay_images.path`;
- completar `alt_text`, `credit` e `sort_order` por imagem.

```text
/uploads/stays/nome-da-imagem.webp
```

Fase seguinte:

- gerar thumbnails;
- converter para WebP;
- dimensoes recomendadas:
  - cover: 1600 x 1100;
  - card: 900 x 700;
  - thumb: 420 x 320.

## Fluxo editorial

1. Criar alojamento em `draft`.
2. Adicionar texto, links e fotos.
3. Passar para `review`.
4. Rever texto, creditos e links afiliados.
5. Publicar.
6. O site publico passa a mostrar apenas `published`.

## Site publico Next.js

O frontend publico deve ser Next.js para suportar muitas reviews, coleccoes e
paginas de alojamento com boa estrutura.

No MVP, ha duas opcoes:

### Opcao A - Next.js export estatico

O backoffice grava dados em SQLite e gera um JSON publico ou um export de dados
para o build Next.js:

```text
/data/stays.json
/ficar/{slug}/index.html
/coleccoes/{slug}/index.html
```

Vantagem: rapido, seguro e simples de servir em Apache.

### Opcao B - Next.js dinamico com API

Manter um processo Node/Next no servidor e consultar dados por API.

Vantagem: conteudo actualiza sem rebuild.

Desvantagem: mais operacao no servidor.

Recomendacao inicial: **Opcao A - Next.js export estatico**, porque o site pode
crescer em numero de reviews sem exigir um processo Node permanente.

## Futuras rotas Next.js

```text
/                    homepage editorial
/ficar/              listagem de alojamentos
/ficar/{slug}/       review individual
/coleccoes/{slug}/   coleccoes editoriais
/regioes/{slug}/     paginas por regiao
```

## Seguranca minima antes de publicar o admin

- criar o primeiro utilizador Filament apenas com password forte;
- manter `.env` fora do repositorio;
- nao commitar passwords;
- usar `APP_ENV=production` e `APP_DEBUG=false`;
- usar `APP_URL=https://quase.pt`;
- definir `ASSET_URL=/admin` se necessario para assets sob o alias Apache;
- manter `DB_DATABASE=/var/www/quase-data/quase.sqlite`;
- manter `STAYS_UPLOADS_PATH=/var/www/quase/uploads`;
- deixar Laravel/Filament gerir sessoes e CSRF;
- preparar backups da SQLite;
- restringir permissões:

```bash
chown -R root:www-data /var/www/quase-backoffice
chown -R www-data:www-data /var/www/quase-backoffice/storage /var/www/quase-backoffice/bootstrap/cache
chown -R www-data:www-data /var/www/quase/uploads /var/www/quase-data
chmod 750 /var/www/quase-data
```

## Backups

Backup diario recomendado:

```bash
tar -czf /root/backups/quase-$(date +%Y%m%d).tar.gz \
  /var/www/quase-data/quase.sqlite \
  /var/www/quase/uploads \
  /var/www/quase-backoffice/.env
```

## Fases de implementacao

### Fase 1 - MVP admin

- login/logout;
- criar/editar/listar alojamentos;
- upload de capa e galeria;
- estados `draft`, `review`, `published` e `archived`;
- campos de links oficiais/afiliados/Booking;
- SEO por alojamento.

### Fase 2 - Conteudo publico

- pagina de listagem de alojamentos;
- pagina individual de alojamento;
- coleccoes;
- SEO por ficha.

### Fase 3 - Monetizacao

- campos especificos por parceiro afiliado;
- aviso automatico de afiliados;
- tracking de cliques;
- relatorios simples.

### Fase 4 - Escala editorial

- varios utilizadores;
- revisoes;
- calendario editorial;
- importacao CSV;
- thumbnails e optimizacao de imagens.
