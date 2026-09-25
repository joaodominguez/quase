export default function SiteFooter() {
  return (
    <footer className="rodape">
      <div className="col">
        <div className="grelha-pe">
          <div>
            <h2>Explorar</h2>
            <ul>
              <li><a href="/mapa/">Mapa</a></li>
              <li><a href="/termas/">Termas</a></li>
              <li><a href="/hoteis-com-termas/">Hotéis com termas</a></li>
              <li><a href="/hoteis-piscina-interior/">Hotéis com piscina interior</a></li>
              <li><a href="/jacuzzi-no-quarto/">Jacuzzi no quarto</a></li>
              <li><a href="/portugal/">Portugal continental</a></li>
              <li><a href="/acores/">Açores</a></li>
              <li><a href="/madeira/">Madeira</a></li>
              <li><a href="/moteis/">Motéis</a></li>
            </ul>
          </div>
          <div>
            <h2>Listas</h2>
            <ul>
              <li><a href="/listas/agua-quente-em-janeiro/">Onde há água quente em Portugal em janeiro</a></li>
              <li><a href="/listas/piscinas-interiores-portugal/">Hotéis com piscina interior aquecida em Portugal</a></li>
              <li><a href="/listas/spa-acores-madeira/">Spa e água quente nos Açores e na Madeira</a></li>
              <li><a href="/listas/spa-fim-de-semana/">Spa para um fim de semana</a></li>
              <li><a href="/listas/escadinhas-beira-mar/">Escadinhas e beira-mar</a></li>
            </ul>
          </div>
          <div>
            <h2>Informação</h2>
            <ul>
              <li><a href="/como-escolhemos/">Como escolhemos</a></li>
              <li><a href="/contacto/">Contacto</a></li>
              <li><a href="/privacidade/">Privacidade</a></li>
            </ul>
          </div>
        </div>
        <p className="fim">
          Guia independente de sítios onde se entra em água aquecida em Portugal. Ainda não
          visitámos nenhum: tudo o que aqui está foi verificado em fontes oficiais, com a data.
          As fotografias são do Wikimedia Commons, creditadas na própria imagem.
        </p>
      </div>
    </footer>
  );
}
