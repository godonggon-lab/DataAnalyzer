const apiKey = "AIzaSyBdQ5p4DK3ObAL7eAgLLinaGXr9-3LqANU";
const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;

async function listModels() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.models) {
            console.log("Available models:");
            data.models.forEach(m => console.log(m.name));
        } else {
            console.log("No models found or error:", data);
        }
    } catch (e) {
        console.error("Error:", e);
    }
}

listModels();
