import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the API
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
    console.warn("Gemini API Key is missing. AI features will not work.");
}

const genAI = new GoogleGenerativeAI(API_KEY);

export const analyzeDataWithGemini = async (
    dataSummary: string,
    columnInfo: string,
    userQuery?: string
): Promise<string> => {
    if (!API_KEY) {
        throw new Error("API Key configuration missing");
    }

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        const prompt = `
      You are an expert data analyst. I will provide you with a summary of a dataset and some column information.
      Your goal is to provide 3-5 key insights, trends, or interesting patterns you might hypothesize from this data.
      
      If a user context or specific question is provided, focus on that.
      
      Dataset Columns:
      ${columnInfo}
      
      Data Summary / Sample Rows:
      ${dataSummary}
      
      ${userQuery ? `User Focus: ${userQuery}` : ""}
      
      Please format your response in Markdown. Use bullet points and bold text for emphasis.
      Keep the tone professional yet accessible.
      If the data seems too sparse or random to draw conclusions, honestly state that.
    `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        return text;
    } catch (error: any) {
        console.error("Error calling Gemini API:", error);
        const errorMessage = error.message || error.toString();
        throw new Error(`AI Error: ${errorMessage}`);
    }
};
