import Link from "next/link";
import { motels } from "../../data/motels";
import MotelCard from "../components/MotelCard";

export const metadata = {
  title: "Motéis",
  description:
    "Guia editorial de motéis em Portugal: suítes, privacidade, estadias curtas e sites oficiais.",
  alternates: { canonical: "/moteis/" },
};

export default function MoteisPage() {
  return (
    <main>
      <div className="wrap page-head">
        <p className="kicker">Motéis</p>
        <h1>Suítes, privacidade, tempo teu</h1>
        <p>
          Área aparte das reviews de spa: motéis com suítes privadas, estacionamento e
          estadias por horas ou noite. Fichas com link para o site oficial sempre que
          existir.
        </p>
        <p className="page-head-note">
          Conteúdo editorial adulto e discreto — preços e tipologias mudam; confirma no
          motel.{" "}
          <Link href="/reviews/">Voltar às reviews de spa →</Link>
        </p>
      </div>
      <section className="section">
        <div className="wrap">
          <div className="card-grid">
            {motels.map((motel) => (
              <MotelCard motel={motel} key={motel.slug} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
