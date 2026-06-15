# Estrategia de conteudo

## Referencias editoriais

- Instagram: <https://www.instagram.com/bestportugalhotels_/>
- Website/feed publico associado: <https://www.bestportugalhotels.com/en/>
- Seed Instagram extraida: [`data/reference/bestportugalhotels-instagram.json`](../data/reference/bestportugalhotels-instagram.json)
- Leads publicos extraidos: [`data/reference/bestportugalhotels-public-leads.json`](../data/reference/bestportugalhotels-public-leads.json)

Esta conta deve servir como referencia visual e editorial para o tipo de
alojamentos a mapear quando forem criadas as listas e fichas do Quase.pt.

Notas importantes:

- usar apenas como inspiracao e pesquisa inicial;
- nao copiar fotografias, textos, captions ou estrutura proprietaria;
- confirmar sempre informacao em fontes oficiais do alojamento;
- preferir imagens licenciadas, fornecidas pelo alojamento ou produzidas pelo
  projecto;
- identificar links afiliados quando existirem.

## Crawl inicial

O Instagram directo nao devolve dados completos sem login e pode aplicar rate
limits. O crawler usa apenas fontes publicas:

- feed publico embebido no site `bestportugalhotels.com`;
- pagina publica de hoteis;
- sitemap publico de portfolio/hoteis.

Comando:

```bash
npm run crawl:bph-public
```

Campos guardados:

- URL do post/reel;
- data;
- handle do alojamento;
- categoria indicada;
- localizacao indicada;
- preco de referencia quando existe;
- URL publico da ficha no Best Portugal Hotels quando existe;
- URLs de portfolio publico quando existem;
- URL de imagem apenas como referencia;
- legenda apenas como referencia.

Estas referencias servem para descobrir potenciais alojamentos; nao devem ser
publicadas como review sem confirmacao manual e autorizacao/licenca de imagens.

## Tipo de alojamentos a procurar

O foco deve estar em sitios com personalidade, especialmente:

- herdades e montes alentejanos;
- turismo rural de pequena escala;
- boutique hoteis independentes;
- casas de campo com design cuidado;
- quintas no Douro, Minho e regioes vinicolas;
- refugios perto do mar, serras ou aldeias historicas;
- alojamentos com boa fotografia, arquitectura, paisagem ou historia.

## Criterios para futura seleccao

Cada alojamento deve responder a perguntas simples:

1. Porque e especial?
2. Para quem e ideal?
3. O que existe perto?
4. Qual e o ambiente: romantico, familiar, design, natureza, luxo discreto?
5. Tem pontos praticos relevantes: piscina, restaurante, spa, estacionamento,
   pet-friendly, acessos, isolamento?
6. Ha forma de reserva afiliada ou parceria directa?

## Possiveis formatos

- "10 herdades para desligar no Alentejo"
- "Boutique hoteis pequenos em Portugal que parecem secretos"
- "Refugios para uma escapadinha romantica"
- "Quintas e casas de campo no Norte"
- "Sitios bonitos perto do mar sem ambiente de resort"
- "Alojamentos portugueses para oferecer como presente"
