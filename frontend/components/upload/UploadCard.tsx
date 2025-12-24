type Props = {
  isDragging?: boolean;
  error?: string | null;
  onFileSelected: (file: File | null) => void;
  onUseDemo?: () => void;
};

export default function UploadCard({ isDragging, error, onFileSelected, onUseDemo }: Props) {
  return (
    <div
      style={{
        width: 520,
        padding: "2.5rem",
        borderRadius: 24,
        border: "2px dashed rgba(255,255,255,0.2)",
        background: "linear-gradient(135deg, #1b1b1b, #0f1118)",
        boxShadow: "0 25px 55px rgba(0,0,0,0.35)",
        textAlign: "center",
        transition: "border-color 160ms ease, transform 160ms ease",
        transform: isDragging ? "translateY(-4px)" : "none",
        borderColor: isDragging ? "rgba(0, 224, 255, 0.5)" : undefined,
      }}
    >
      <div style={{ fontSize: "1rem", letterSpacing: "0.05em", opacity: 0.8 }}>
        Drop your Letterboxd export (.zip) or choose a file
      </div>

      <label
        style={{
          display: "inline-block",
          marginTop: "1.5rem",
          padding: "0.85rem 1.4rem",
          borderRadius: 999,
          background: "#00bfff",
          color: "#0b0b0b",
          fontWeight: 700,
          cursor: "pointer",
        }}
      >
        Browse files
        <input
          type="file"
          accept=".zip"
          style={{ display: "none" }}
          onChange={(e) => onFileSelected(e.target.files?.[0] ?? null)}
        />
      </label>

      {onUseDemo && (
        <button
          type="button"
          onClick={onUseDemo}
          style={{
            marginTop: "1rem",
            padding: "0.85rem 1.4rem",
            borderRadius: 999,
            background: "rgba(255,255,255,0.08)",
            color: "white",
            fontWeight: 700,
            border: "1px solid rgba(255,255,255,0.1)",
            cursor: "pointer",
          }}
        >
          Try a demo Wrapped
        </button>
      )}

      <p style={{ marginTop: "0.8rem", opacity: 0.65 }}>
        You can export your data from Letterboxd → Settings → Import & Export.
      </p>

      {error && (
        <div
          style={{
            marginTop: "1rem",
            padding: "0.6rem 0.9rem",
            borderRadius: 12,
            background: "rgba(255,0,76,0.14)",
            color: "#ff7b9c",
            fontWeight: 600,
          }}
        >
          {error}
        </div>
      )}
    </div>
  );
}
