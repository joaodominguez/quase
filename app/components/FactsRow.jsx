export function bookingHref(hotel) {
  return `https://www.booking.com/searchresults.pt-pt.html?ss=${encodeURIComponent(hotel.bookingQuery)}`;
}

export default function FactsRow({ hotel, compact = false }) {
  return (
    <dl className="facts" aria-label="Dados uteis">
      <div>
        <dt>Preco desde</dt>
        <dd>{hotel.priceFrom}€/noite</dd>
      </div>
      <div>
        <dt>Quando ir</dt>
        <dd>{hotel.whenToGo}</dd>
      </div>
      <div>
        <dt>Temp. agora</dt>
        <dd>
          {hotel.tempC}°C
          {!compact && hotel.tempLabel ? ` · ${hotel.tempLabel}` : ""}
        </dd>
      </div>
      <div>
        <dt>Reservar</dt>
        <dd>
          <a href={bookingHref(hotel)} rel="nofollow sponsored noopener" target="_blank">
            {hotel.bookingLabel || "Booking"}
          </a>
        </dd>
      </div>
    </dl>
  );
}
