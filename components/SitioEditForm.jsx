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
  { key: "instagram", label: "Instagram (handle ou URL)", type: "text" },
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
  const [uploading, setUploading] = useState(false);
  const [fotoFile, setFotoFile] = useState(null);
  const [fotoCredito, setFotoCredito] = useState(sitio.credito || "");

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

  async function onUploadFoto(event) {
    event.preventDefault();
    if (!fotoFile) {
      setStatus({ ok: false, message: "Escolhe um ficheiro de imagem." });
      return;
    }
    setUploading(true);
    setStatus(null);
    try {
      const body = new FormData();
      body.append("foto", fotoFile);
      body.append("credito", fotoCredito);
      const res = await fetch(`/api/admin/sitios/${sitio.id}/foto/`, {
        method: "POST",
        body,
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus({ ok: false, message: data.error || "Upload falhou." });
        return;
      }
      setForm((prev) => ({
        ...prev,
        imagem: data.path || prev.imagem,
        credito: fotoCredito,
      }));
      setStatus({ ok: true, message: "Foto carregada (só CC/autorizada)." });
      setFotoFile(null);
      router.refresh();
    } catch {
      setStatus({ ok: false, message: "Erro de rede no upload." });
    } finally {
      setUploading(false);
    }
  }

  return (
    <>
    <form className="admin-form" onSubmit={onSubmit}>
      <div className="admin-form-meta">
        <p>
          <strong>id</strong> {sitio.id}
        </p>
        <p>
          <strong>tipo</strong> {sitio.tipo} · <strong>categoria</strong> {sitio.categoria} ·{" "}
          <strong>região</strong> {sitio.regiao}
        </p>
        {sitio.updatedAt ? (
          <p>
            <strong>actualizado</strong>{" "}
            {new Date(sitio.updatedAt).toLocaleString("pt-PT")}
          </p>
        ) : null}
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

    <form className="admin-form" onSubmit={onUploadFoto} style={{ marginTop: "2rem" }}>
      <h2 style={{ margin: 0, fontSize: "1.1rem" }}>Carregar fotografia CC</h2>
      <p className="admin-note" style={{ marginTop: "0.75rem" }}>
        Só imagens com licença clara (CC/CC0) ou autorização escrita. O crédito é obrigatório.
      </p>
      {form.imagem ? (
        <p className="admin-field">
          <span>Actual</span>
          <img
            src={form.imagem}
            alt=""
            style={{ maxWidth: "220px", borderRadius: "8px", display: "block" }}
          />
        </p>
      ) : null}
      <label className="admin-field">
        <span>Ficheiro</span>
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={(e) => setFotoFile(e.target.files?.[0] || null)}
        />
      </label>
      <label className="admin-field">
        <span>Crédito</span>
        <input
          type="text"
          value={fotoCredito}
          onChange={(e) => setFotoCredito(e.target.value)}
          placeholder="Nome · CC BY-SA 4.0 · Wikimedia Commons"
          required
        />
      </label>
      <div className="admin-form-actions">
        <button type="submit" className="botao botao-secundario" disabled={uploading}>
          {uploading ? "A enviar…" : "Enviar foto"}
        </button>
      </div>
    </form>
    </>
  );
}
