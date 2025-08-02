import { useState } from "react";

export default function ShareXDashboard() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [link, setLink] = useState("");
  const [error, setError] = useState("");

  function handleFileChange(e) {
    setFile(e.target.files[0]);
    setLink("");
    setError("");
  }

  async function handleUpload() {
    if (!file) return;

    setUploading(true);
    setError("");
    setLink("");

    const reader = new FileReader();
    reader.onload = async () => {
      // Get base64 string without metadata prefix
      const base64 = reader.result.split(",")[1];
      try {
        const res = await fetch("/api/sharex-upload", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer YOUR_SECRET_TOKEN", // replace with your token or env var usage
          },
          body: JSON.stringify({
            name: file.name,
            image: base64,
          }),
        });

        if (!res.ok) {
          const data = await res.json();
          setError(data.error || "Upload failed");
          setUploading(false);
          return;
        }

        const data = await res.json();
        setLink(window.location.origin + data.url);
        setUploading(false);
      } catch (e) {
        setError("Upload error");
        setUploading(false);
      }
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className="min-h-screen bg-black text-white p-8 max-w-lg mx-auto">
      <h1 className="text-4xl font-bold mb-6 text-green-400">ShareX Dashboard</h1>
      <p className="mb-4 text-gray-300">
        Upload an image or video and get a sharable link instantly.
      </p>

      <input
        type="file"
        onChange={handleFileChange}
        className="mb-4 w-full text-black"
        accept="image/*,video/*"
      />

      <button
        disabled={!file || uploading}
        onClick={handleUpload}
        className="bg-green-500 hover:bg-green-600 disabled:bg-gray-600 px-6 py-2 rounded font-semibold mb-4 w-full"
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {link && (
        <div className="bg-green-900 p-4 rounded">
          <p className="mb-2 break-all">{link}</p>
          <button
            onClick={() => {
              navigator.clipboard.writeText(link);
              alert("Link copied!");
            }}
            className="bg-green-400 hover:bg-green-500 text-black px-4 py-1 rounded"
          >
            Copy Link
          </button>
        </div>
      )}
    </div>
  );
}
