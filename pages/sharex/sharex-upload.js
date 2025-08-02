import fs from "fs";
import path from "path";

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

  const uploadDir = path.join(process.cwd(), "public", "uploads");
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const filePath = path.join(uploadDir, name);

  try {
    fs.writeFileSync(filePath, Buffer.from(image, "base64"));
    res.status(200).json({ url: `/uploads/${name}` });
  } catch (err) {
    res.status(500).json({ error: "Failed to save file" });
  }
}
