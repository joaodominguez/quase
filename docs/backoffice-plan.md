# Plano de backoffice

## Decisao recomendada

Criar um backoffice proprio, simples, em **PHP 8.3 + SQLite**, alojado no mesmo
servidor Apache, e manter o **frontend publico em Next.js**.

Motivos:

- o servidor ja tem PHP 8.3, `pdo_sqlite`, `sqlite3`, `gd`, `fileinfo` e MySQL;
- nao obriga a Node, Docker, Strapi, Directus ou WordPress nesta fase;
- e suficiente para gerir reviews, fotos, estados de publicacao e links
  afiliados;
- permite manter o site publico Next.js leve, rapido e exportavel como estatico;
- nao mexe no projecto existente em `/var/www/quase/mundial`.

## Estrutura no servidor

```text
/var/www/quase/
  index.html
  _next/
  uploads/
    stays/
      2026/
        nome-do-alojamento/
  admin/
    index.php
    login.php
    stays.php
    stay-edit.php
    media.php
    logout.php

/var/www/quase-data/
  quase.sqlite

/var/www/quase-private/
  config.php
```

Notas:

- `uploads/` fica publico para servir imagens no site;
- a base de dados fica fora da web root em `/var/www/quase-data`;
- segredos e hash da password ficam fora da web root em
  `/var/www/quase-private/config.php`;
- `/var/www/quase/mundial` continua intocado.

## Autenticacao

MVP:

- login em `/admin/`;
- sessao PHP;
- password guardada apenas como `password_hash`;
- `config.php` fora da web root;
- `SameSite=Lax`, `HttpOnly` e `Secure` nos cookies;
- logout manual;
- proteccao CSRF em formularios.

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
  highlights_json TEXT,
  practical_json TEXT,
  price_range TEXT,
  official_url TEXT,
  affiliate_url TEXT,
  booking_url TEXT,
  cover_image_id INTEGER,
  seo_title TEXT,
  seo_description TEXT,
  published_at TEXT,
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

### `regions`

Opcional no MVP, util quando a lista crescer.

```sql
CREATE TABLE regions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  intro TEXT,
  seo_title TEXT,
  seo_description TEXT
);
```

### `collections`

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

- aceitar apenas `jpg`, `jpeg`, `png`, `webp`;
- validar MIME real com `fileinfo`;
- limitar tamanho por upload;
- gerar nome seguro, sem depender do nome original;
- guardar por ano e slug:

```text
/uploads/stays/2026/herdade-exemplo/cover.webp
/uploads/stays/2026/herdade-exemplo/01.webp
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

- criar `/admin/` apenas depois de existir password forte;
- guardar config fora de `/var/www/quase`;
- nao commitar passwords;
- CSRF em todos os formularios;
- validar uploads por MIME e extensao;
- limitar tipos e tamanho de imagem;
- escapar todo o output HTML;
- preparar backups da SQLite;
- restringir permissões:

```bash
chown -R root:www-data /var/www/quase/admin
chown -R www-data:www-data /var/www/quase/uploads /var/www/quase-data
chmod 750 /var/www/quase-data /var/www/quase-private
```

## Backups

Backup diario recomendado:

```bash
tar -czf /root/backups/quase-$(date +%Y%m%d).tar.gz \
  /var/www/quase-data/quase.sqlite \
  /var/www/quase/uploads \
  /var/www/quase-private/config.php
```

## Fases de implementacao

### Fase 1 - MVP admin

- login/logout;
- criar/editar/listar alojamentos;
- upload de capa e galeria;
- estados `draft` e `published`;
- API/public listagem simples.

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
