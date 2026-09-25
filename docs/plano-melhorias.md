# Plano de melhorias — quase.pt

Estado de referência (2026-09-20): 103 sítios live, Next standalone + `/admin`, SEO (JSON-LD + sitemap) em produção.

Gaps de dados: **36** fotos · **45** preços · **63** Instagram · **58** Booking · **7** temperaturas medidas · **103** reviews desk.

---

## 1. Conteúdo e catálogo (maior impacto editorial)

### 1.1 Fotos CC em falta (67 sítios)
- Prioridade: hotéis com Booking e páginas de tráfego (Furnas, Douro, Madeira, Alentejo).
- Fluxo: Openverse / Wikimedia → `scripts/ingest-foto.mjs` → crédito obrigatório.
- Não inventar; se não houver CC, manter placeholder de categoria.

### 1.2 Preços (58 sem preço fixo)
- Termas: preço de entrada no site oficial (manual + `set-preco.mjs`).
- Hotéis: só preço “a partir de” se fonte estável; senão manter “preço na Booking”.
- Motéis: preço por período só com fonte oficial.

### 1.3 Instagram / site oficial
- 40 sem IG (maioria motéis): só acrescentar se o handle estiver no site oficial e passar HEAD.
- Completar `oficialUrl` onde ainda falta.

### 1.4 Lista editorial «escadinhas / beira-mar»
- Nova lista em `/listas/` (Areias, Noah, e pares editoriais) — **não** nova categoria de filtro.
- Critério explícito na página (escadinha / acesso directo à água).

### 1.5 Reviews
- Reviews desk já cobrem os 103; próxima iteração: visitas reais (quando existirem) a substituir a nota de transparência sítio a sítio.

---

## 2. Produto e UX

### 2.1 Mapa
- Já empilhado no mobile; melhorar legenda táctil e deep-link `?id=` → abrir balão.
- Opcional: filtro de categoria no mapa (sem cards).

### 2.2 Índice / filtros
- Manter filtros leves; evitar sticky gigante no mobile (já corrigido).
- Contagem “X de 103” sempre visível ao filtrar.

### 2.3 Ficha
- Bloco EV mais claro quando `carregador=perto` (distância).
- CTA Booking vs site oficial: hierarquia já ok; testar CTR.

### 2.4 Performance percetível
- Lazy das fotos do índice; `fetchpriority` na hero da ficha quando há imagem.
- Evitar layout shift nas capas.

---

## 3. Backoffice

### 3.1 Curto prazo (já útil)
- Filtro “sem foto / sem preço / sem IG” (já existe) + export CSV.
- Histórico simples: `updatedAt` por sítio ao gravar.

### 3.2 Médio prazo
- Upload de foto no admin (grava em `public/fotos/` + actualiza JSON).
- Botão “validar Instagram” (HEAD) a partir do admin.
- Diff antes de gravar (mostrar campos alterados).

### 3.3 Operação
- Systemd unit em vez de só tmux (restart no boot).
- Backup diário de `/var/www/quase/data/sitios.json`.
- Rotação da `ADMIN_PASSWORD` documentada.

---

## 4. SEO e descoberta

### 4.1 Feito
- Sitemap 121 URLs, robots, JSON-LD (WebSite, ItemList, Hotel/Motel/DaySpa, breadcrumbs), OG por página.

### 4.2 Seguir
- Search Console: submeter sitemap; monitorizar cobertura e rich results.
- OG image default do site (quando ficha sem foto).
- FAQPage só onde houver FAQ real (ex. como-escolhemos) — sem inventar.

### 4.3 Conteúdo hub
- Leads das hubs já editoriais; reforçar H2 únicos se o GSC mostrar canibalização entre hubs e listas.

---

## 5. Engenharia e deploy

### 5.1 Dados
- `DATA_DIR` é a fonte de verdade em produção; sync periódico repo ← servidor (ou o inverso) para não divergir do git.
- `npm run check` no CI do PR.

### 5.2 Infra
- Apache `ProxyPass` + standalone: documentar cutover em `docs/`.
- Healthcheck `GET /` + alerta se o processo Node cair.
- Cloudflare: cache rules — HTML dinâmico sem cache agressivo; `/fotos/` com TTL longo.

### 5.3 Qualidade
- Teste smoke pós-deploy (home, ficha, sitemap, `/admin` → 401).
- Snapshot HTML de referência actualizar quando o design estabilizar.

---

## 6. Monetização e afiliados (cuidado editorial)

- Manter transparência na ficha (“ligação de afiliado”).
- Auditoria periódica dos 58 links CJ → Booking (`aid` correcto).
- Não empurrar Booking em termas sem alojamento.

---

## Ordem sugerida

| Ordem | Item | Esforço | Impacto |
|------:|------|---------|---------|
| 1 | Fotos CC nos hotéis com mais tráfego | médio | alto |
| 2 | Preços de termas + hotéis estáveis | baixo–médio | alto |
| 3 | Lista escadinhas/beira-mar | baixo | médio |
| 4 | Systemd + backup `sitios.json` | baixo | alto (ops) |
| 5 | Sync dados prod ↔ git | baixo | alto (ops) |
| 6 | Admin: updatedAt + upload foto | médio | médio |
| 7 | Mapa deep-link + filtro | baixo | médio |
| 8 | GSC + OG default | baixo | médio |
| 9 | Instagram restantes (só verificáveis) | contínuo | baixo–médio |

---

## Fora de âmbito (por agora)

- App nativa / conta de utilizador / favoritos sync.
- Filament/Laravel (o admin Next chega).
- Scraping de preços Booking (ToS + volatilidade).
- Inventar visitas, reviews ou redes sociais.

## Progresso (2026-09-25)

- Lista **escadinhas-beira-mar** publicada
- Deep-link mapa `?id=`
- Admin: `updatedAt` + upload de foto CC
- Ops: unit systemd + script backup `sitios.json`
- Foto CC: Torre de Gomariz (Wikimedia). Demais hotéis sem CC fiável ficam por preencher.
