import Groq from "groq-sdk";
import Product from "../models/productModel.js";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// 🔹 CHATBOT
export const aiChat = async (req, res) => {
  console.log("✅ AI CHAT HIT");

  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message missing" });
    }

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [{ role: "user", content: message }],
    });

    res.json({
      reply: completion.choices[0].message.content,
    });
  } catch (err) {
    console.error("❌ CHAT ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// 🔹 PRODUCT RECOMMENDATION
export const recommendProducts = async (req, res) => {
  console.log("✅ AI RECOMMEND HIT");

  try {
    const { userInterest } = req.body;
    if (!userInterest) {
      return res.status(400).json({ error: "userInterest missing" });
    }

    const products = await Product.find(
      {},
      "name category priceInCents description",
    );

    const prompt = `
User wants: ${userInterest}

Products:
${products
  .map(
    (p) =>
      `- ${p.name} (${p.category}) ₹${p.priceInCents / 100}
${p.description || ""}`,
  )
  .join("\n")}

Recommend best products.
`;

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [{ role: "user", content: prompt }],
    });

    res.json({
      recommendations: completion.choices[0].message.content,
    });
  } catch (err) {
    console.error("❌ RECOMMEND ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
};
