import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "50mb",
    },
  },
};

export default async function handler(req, res) {
  const token = req.headers["authorization"];
  if (token !== "Bearer YOUR_SECRET_TOKEN") {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { name, image } = req.body;

  if (!name || !image) {
    return res.status(400).json({ error: "Missing name or image" });
  }

  try {
    const buffer = Buffer.from(image, "base64");

    const { data, error } = await supabase.storage
      .from("sharex")
      .upload(name, buffer, {
        contentType: "image/png",
        upsert: true,
      });

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("sharex").getPublicUrl(name);

    return res.status(200).json({ url: publicUrl });
  } catch (err) {
    return res.status(500).json({ error: "Upload failed" });
  }
}
