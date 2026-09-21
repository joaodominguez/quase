import { CAT_LABEL, CAT_CLASS, precoLabel, precoFallback } from "../lib/sitios-meta";

export default function Cartao({ sitio }) {
  const cat = CAT_LABEL[sitio.categoria] || sitio.categoria;
  const catClass = CAT_CLASS[sitio.categoria] || "cat-hotel";
  const preco = precoLabel(sitio);
  const fallback = precoFallback(sitio);
  const href = sitio.url || "#";

  return (
    <li className="cartao" data-id={sitio.id}>
      <figure className={`capa${sitio.imagem ? " tem-foto" : ""} ${!sitio.imagem ? catClass : ""}`}>
        {sitio.imagem ? (
          <>
            <img src={sitio.imagem} alt={sitio.nome} loading="lazy" width="800" height="800" />
            <span className="cat">{cat}</span>
            {sitio.credito ? <span className="cred">{sitio.credito}</span> : null}
          </>
        ) : (
          <>
            <span className="cat">{cat}</span>
            <span className="nm">{sitio.nome}</span>
          </>
        )}
      </figure>
      <div className="cartao-corpo">
        <h3>
          <a className="cartao-link" href={href}>
            {sitio.nome}
          </a>
        </h3>
        <div className="cartao-onde">{sitio.onde?.split(",")[0]}</div>
        <p className="cartao-resumo">{sitio.resumo}</p>
        <div className="cartao-pe">
          {preco ? (
            <span className="preco">{preco}</span>
          ) : fallback ? (
            <span className="preco preco-falta">{fallback}</span>
          ) : null}
          {sitio.carregador && sitio.carregador !== "desconhecido" ? (
            <span className="ev" title={sitio.carregadorTexto || ""}>
              {sitio.carregador === "sim" ? "EV no sítio" : sitio.carregador === "perto" ? "EV perto" : "Sem EV"}
            </span>
          ) : null}
        </div>
      </div>
    </li>
  );
}
