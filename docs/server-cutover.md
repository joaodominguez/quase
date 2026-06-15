# Cutover de quase.pt

## Estado observado

Em 2026-06-15, o dominio `quase.pt` ainda nao serve o novo projecto:

- `quase.pt` resolve para Cloudflare;
- `http://quase.pt/` redirecciona para `https://quase.pt/`;
- `https://quase.pt/` redirecciona para `https://www.airluso.pt/`;
- a resposta HTTPS inclui `X-Redirect-By: WordPress`, o que indica que o
  redireccionamento esta a ser feito pela configuracao/site WordPress no origin;
- o origin responde como `Apache/2.4.58 (Ubuntu)`.

Isto significa que a mudanca principal deve ser feita no Apache/site config do
servidor, nao no DNS do repositorio.

## Objectivo

- `https://quase.pt/` deve servir os ficheiros estaticos em `/quase`;
- `https://quase.pt/mundial/` deve continuar a servir o projecto existente em
  `/quase/mundial/`;
- o redireccionamento para `www.airluso.pt` deve deixar de acontecer para
  `quase.pt`.

## Passos no servidor

1. Fazer backup da configuracao Apache actual:

   ```bash
   cp -a /etc/apache2/sites-available /root/apache-sites-available.backup.$(date +%Y%m%d%H%M%S)
   cp -a /etc/apache2/sites-enabled /root/apache-sites-enabled.backup.$(date +%Y%m%d%H%M%S)
   ```

2. Publicar os ficheiros do repositorio em `/quase`, excluindo sempre
   `/mundial/`:

   ```bash
   rsync -avz --delete \
     --exclude "/.git/" \
     --exclude "/scripts/" \
     --exclude "/mundial/" \
     ./ root@91.99.167.243:/quase/
   ```

3. Criar/actualizar o virtual host de `quase.pt` a partir de:

   ```text
   server/apache-quase.pt.conf
   ```

   Caminho recomendado no servidor:

   ```text
   /etc/apache2/sites-available/quase.pt.conf
   ```

4. Confirmar certificado HTTPS.

   Se ja existir certificado para `quase.pt`, preencher no vhost:

   ```apache
   SSLCertificateFile /etc/letsencrypt/live/quase.pt/fullchain.pem
   SSLCertificateKeyFile /etc/letsencrypt/live/quase.pt/privkey.pem
   Include /etc/letsencrypt/options-ssl-apache.conf
   ```

   Se nao existir, criar com Certbot:

   ```bash
   certbot --apache -d quase.pt -d www.quase.pt
   ```

5. Activar o site e validar:

   ```bash
   a2ensite quase.pt.conf
   apache2ctl configtest
   systemctl reload apache2
   ```

6. Se o redirect para `www.airluso.pt` continuar, procurar outra configuracao
   que esteja a apanhar `quase.pt` antes deste vhost:

   ```bash
   apache2ctl -S
   grep -R "quase.pt\\|airluso.pt" /etc/apache2/sites-available /etc/apache2/sites-enabled
   ```

   Desactivar apenas a regra/vhost antigo que associa `quase.pt` ao WordPress
   do Airluso. Nao alterar a pasta `/quase/mundial/`.

7. Purgar cache no Cloudflare se o comportamento antigo ficar em cache.

## Verificacao

Antes de depender da Cloudflare:

```bash
curl -I --resolve quase.pt:443:91.99.167.243 https://quase.pt/
curl -I --resolve quase.pt:443:91.99.167.243 https://quase.pt/mundial/
```

Depois:

```bash
curl -I https://quase.pt/
curl -I https://quase.pt/mundial/
```

Resultado esperado para a raiz:

- `https://quase.pt/` responde `200 OK`;
- nao existe `Location: https://www.airluso.pt/`;
- nao existe `X-Redirect-By: WordPress` na raiz do novo site.
