"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const FIELDS = [
  { key: "nome", label: "Nome", type: "text", required: true },
  { key: "onde", label: "Onde", type: "text" },
  { key: "estado", label: "Estado", type: "select", options: ["aberto", "obras"] },
  { key: "resumo", label: "Resumo", type: "textarea", rows: 3 },
  { key: "review", label: "O espaço (review)", type: "textarea", rows: 6 },
  { key: "preco", label: "Preço (€)", type: "number" },
  {
    key: "precoUnidade",
    label: "Unidade do preço",
    type: "select",
    options: ["noite", "entrada", "periodo"],
  },
  { key: "temp", label: "Temperatura (°C)", type: "number" },
  { key: "tempFonte", label: "Fonte da temperatura", type: "text" },
  { key: "bookingUrl", label: "URL Booking", type: "url" },
  { key: "oficialUrl", label: "URL oficial", type: "url" },
  { key: "instagram", label: "Instagram (URL)", type: "url" },
  { key: "imagem", label: "Imagem (path /fotos/...)", type: "text" },
  { key: "credito", label: "Crédito da foto", type: "text" },
  {
    key: "carregador",
    label: "Carregador EV",
    type: "select",
    options: ["", "sim", "perto", "nao"],
  },
  { key: "carregadorTexto", label: "Nota do carregador", type: "text" },
  { key: "agua", label: "Água", type: "text" },
  { key: "quando", label: "Quando", type: "text" },
];

export default function SitioEditForm({ sitio }) {
  const router = useRouter();
  const [form, setForm] = useState(() => {
    const initial = {};
    for (const f of FIELDS) {
      initial[f.key] = sitio[f.key] ?? "";
    }
    return initial;
  });
  const [status, setStatus] = useState(null);
  const [saving, setSaving] = useState(false);

  function onChange(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function onSubmit(event) {
    event.preventDefault();
    setSaving(true);
    setStatus(null);
    try {
      const res = await fetch(`/api/admin/sitios/${sitio.id}/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus({ ok: false, message: data.error || "Não foi possível gravar." });
        return;
      }
      setStatus({ ok: true, message: "Gravado. O site público já reflecte a alteração." });
      router.refresh();
    } catch {
      setStatus({ ok: false, message: "Erro de rede ao gravar." });
    } finally {
      setSaving(false);
    }
  }

  return (
    <form className="admin-form" onSubmit={onSubmit}>
      <div className="admin-form-meta">
        <p>
          <strong>id</strong> {sitio.id}
        </p>
        <p>
          <strong>tipo</strong> {sitio.tipo} · <strong>categoria</strong> {sitio.categoria} ·{" "}
          <strong>região</strong> {sitio.regiao}
        </p>
        <p>
          <a href={sitio.url} target="_blank" rel="noreferrer">
            Ver ficha pública
          </a>
        </p>
      </div>

      {FIELDS.map((field) => (
        <label key={field.key} className="admin-field">
          <span>{field.label}</span>
          {field.type === "textarea" ? (
            <textarea
              rows={field.rows || 4}
              value={form[field.key]}
              onChange={(e) => onChange(field.key, e.target.value)}
              required={field.required}
            />
          ) : field.type === "select" ? (
            <select
              value={form[field.key]}
              onChange={(e) => onChange(field.key, e.target.value)}
            >
              {field.options.map((opt) => (
                <option key={opt || "(vazio)"} value={opt}>
                  {opt || "—"}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={field.type}
              value={form[field.key]}
              onChange={(e) => onChange(field.key, e.target.value)}
              required={field.required}
              step={field.type === "number" ? "any" : undefined}
            />
          )}
        </label>
      ))}

      <div className="admin-form-actions">
        <button type="submit" className="botao" disabled={saving}>
          {saving ? "A gravar…" : "Gravar"}
        </button>
        {status && (
          <p className={`admin-status${status.ok ? " is-ok" : " is-err"}`}>
            {status.message}
          </p>
        )}
      </div>
    </form>
  );
}
