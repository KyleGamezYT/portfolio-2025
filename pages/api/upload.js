import { useState } from "react";

export default function ShareXUploader() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);

    const arrayBuffer = await file.arrayBuffer();
    const base64Data = Buffer.from(arrayBuffer).toString("base64");

    const res = await fetch("/api/upload", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        filename: file.name,
        data: base64Data,
      }),
    });

    const json = await res.json();
    setUrl(json.url);
    setLoading(false);
  };

  return (
    <div className="p-8 text-white">
      <h1 className="text-2xl font-bold mb-4">Upload to ShareX</h1>
      <input type="file" onChange={handleUpload} />
      {loading && <p className="mt-4 text-yellow-400">Uploading...</p>}
      {url && (
        <p className="mt-4">
          File uploaded:{" "}
          <a href={url} className="underline text-blue-400" target="_blank">
            {url}
          </a>
        </p>
      )}
    </div>
  );
}
