import { bookingUrl } from "../../data/hotels";

export default function FactsRow({ hotel }) {
  return (
    <dl className="facts">
      <div>
        <dt>Preço desde</dt>
        <dd>{hotel.priceFrom}€</dd>
      </div>
      <div>
        <dt>Quando ir</dt>
        <dd>{hotel.whenToGo}</dd>
      </div>
      <div>
        <dt>Temp. agora</dt>
        <dd>{hotel.tempC}°C</dd>
      </div>
      <div>
        <dt>Reservar</dt>
        <dd>
          <a href={bookingUrl(hotel)} rel="nofollow sponsored noopener" target="_blank">
            {hotel.bookingLabel || "Booking"}
          </a>
        </dd>
      </div>
    </dl>
  );
}
