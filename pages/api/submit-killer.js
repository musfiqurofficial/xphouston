import connectMongo from "@/lib/db";
import KillerSubmission from "@/models/KillerSubmission";

export default async function handler(req, res) {
  await connectMongo();

  if (req.method === "POST") {
    const { name, email } = req.body;

    if (!name || name.trim() === "") {
      return res.status(400).json({ error: "Name is required" });
    }

    if (!email || email.trim() === "") {
      return res.status(400).json({ error: "Email is required" });
    }

    try {
      const newSubmission = new KillerSubmission({ name, email });
      await newSubmission.save();
      return res.status(201).json({ message: "Submission saved successfully!" });
    } catch (error) {
      return res.status(500).json({ error: "Error saving submission." });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed." });
  }
}
