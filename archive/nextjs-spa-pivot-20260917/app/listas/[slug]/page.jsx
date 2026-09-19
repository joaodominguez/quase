import { lists, getList, hotelsForList } from "../../../data/lists";
import ReviewRow from "../../components/ReviewRow";

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
      <main className="prose-page">
        <h1>Lista não encontrada</h1>
      </main>
    );
  }

  const items = hotelsForList(list);

  return (
    <main>
      <div className="wrap page-head">
        <p className="kicker">{list.region}</p>
        <h1>{list.title}</h1>
        <p>{list.summary}</p>
      </div>
      <section className="section">
        <div className="wrap">
          <div className="rows">
            {items.map((hotel) => (
              <ReviewRow hotel={hotel} key={hotel.slug} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
