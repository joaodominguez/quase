import Link from "next/link";
import mapPaths from "../../data/map-paths.json";

/**
 * Contornos projectados a partir de Natural Earth (dominio publico). Acores e
 * Madeira ficam em caixas proprias, porque em escala real sairiam do enquadramento.
 */
const PANELS = {
  portugal: {
    label: "Continente",
    box: { minLon: -9.65, maxLon: -6.1, minLat: 36.9, maxLat: 42.2 },
    x: 0,
    y: 0,
    w: 300,
    h: 460,
  },
  acores: {
    label: "Açores",
    box: { minLon: -31.4, maxLon: -24.9, minLat: 36.85, maxLat: 39.6 },
    x: 312,
    y: 0,
    w: 188,
    h: 224,
  },
  madeira: {
    label: "Madeira",
    box: { minLon: -17.35, maxLon: -16.2, minLat: 32.55, maxLat: 33.15 },
    x: 312,
    y: 236,
    w: 188,
    h: 224,
  },
};

const PAD = 18;

function project(hotel) {
  const panel = PANELS[hotel.hub] || PANELS.portugal;
  const { box } = panel;
  const innerW = panel.w - PAD * 2;
  const innerH = panel.h - PAD * 2;
  const fx = Math.min(Math.max((hotel.lon - box.minLon) / (box.maxLon - box.minLon), 0), 1);
  const fy = Math.min(Math.max(1 - (hotel.lat - box.minLat) / (box.maxLat - box.minLat), 0), 1);
  return { x: panel.x + PAD + fx * innerW, y: panel.y + PAD + fy * innerH };
}

export default function HotelsMap({ hotels }) {
  const plotted = hotels.filter(
    (hotel) => typeof hotel.lat === "number" && typeof hotel.lon === "number",
  );

  return (
    <div className="map-block">
      <div className="map-canvas">
        <svg viewBox="0 0 500 460" role="img" aria-label="Mapa dos hotéis recomendados">
          {Object.entries(PANELS).map(([hub, panel]) => {
            const count = plotted.filter((hotel) => hotel.hub === hub).length;
            return (
              <g key={hub}>
                <rect
                  className="map-frame"
                  x={panel.x}
                  y={panel.y}
                  width={panel.w}
                  height={panel.h}
                  rx="8"
                />
                {(mapPaths[hub] || []).map((d, index) => (
                  <path className="map-land" d={d} key={`${hub}-${index}`} />
                ))}
                <text className="map-frame-label" x={panel.x + 14} y={panel.y + 24}>
                  {panel.label}
                </text>
                <text
                  className="map-frame-count"
                  x={panel.x + panel.w - 14}
                  y={panel.y + 24}
                >
                  {count}
                </text>
              </g>
            );
          })}

          {plotted.map((hotel) => {
            const { x, y } = project(hotel);
            return (
              <g key={hotel.slug}>
                <circle className="map-halo" cx={x} cy={y} r="10" />
                <circle className="map-dot" cx={x} cy={y} r="4" />
                <title>{`${hotel.name} — ${hotel.location}`}</title>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="map-side">
        <ul className="map-list">
          {plotted.map((hotel) => (
            <li key={hotel.slug}>
              <Link href={`/ficar/${hotel.slug}/`}>
                <span>{hotel.name}</span>
                <em>{hotel.location}</em>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
