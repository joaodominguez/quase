import { lists, getList, hotelsForList } from "../../../data/lists";
import HotelCard from "../../components/HotelCard";

export function generateStaticParams() {
  return lists.map((list) => ({ slug: list.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const list = getList(slug);
  if (!list) {
    return { title: "Lista" };
  }

  return {
    title: list.title,
    description: list.summary,
    alternates: { canonical: `/listas/${list.slug}/` },
  };
}

export default async function ListPage({ params }) {
  const { slug } = await params;
  const list = getList(slug);
  if (!list) {
    return (
      <main className="section">
        <p>Lista nao encontrada.</p>
      </main>
    );
  }

  const items = hotelsForList(list);

  return (
    <main>
      <header className="page-hero">
        <p className="eyebrow">{list.region}</p>
        <h1>{list.title}</h1>
        <p className="lead">{list.summary}</p>
      </header>
      <section className="section">
        <div className="hotel-grid">
          {items.map((hotel, index) => (
            <HotelCard hotel={hotel} index={index} key={hotel.slug} />
          ))}
        </div>
      </section>
    </main>
  );
}
