require('dotenv').config({ path: 'd:/ai-career-coach/.env' });
const fs = require('fs');
async function run() {
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`);
  const data = await response.json();
  fs.writeFileSync('d:/ai-career-coach/list_models_output.json', JSON.stringify(data, null, 2), 'utf-8');
}
run();
