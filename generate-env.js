const fs = require('fs');
require('dotenv').config();

const apiUrl = process.env.API_URL;

if (!apiUrl) {
  console.error("ERRO: A variável de ambiente API_URL não foi definida!");
  process.exit(1);
}

const fileContent = `export const API_URL = '${apiUrl}';\n`;

try {
  fs.writeFileSync('api.js', fileContent);
  console.log(`✅ Arquivo 'api.js' gerado com sucesso com a URL: ${apiUrl}`);
} catch (error) {
  console.error("❌ Falha ao escrever o arquivo api.js:", error);
  process.exit(1);
}