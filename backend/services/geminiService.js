const { GoogleGenAI } = require("@google/genai");

const SYSTEM_PROMPT = require("../prompts/prompt");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function extractCRMData(records) {
  try {
    const prompt = `
${SYSTEM_PROMPT}

CSV Records:

${JSON.stringify(records, null, 2)}
`;

    const response = await ai.models.generateContent({
      model: process.env.GEMINI_MODEL,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const text = response.text;

    return JSON.parse(text);

  } catch (error) {

    console.error(error);

    throw error;

  }
}

module.exports = {
  extractCRMData,
};