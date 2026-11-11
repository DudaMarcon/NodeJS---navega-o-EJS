
const fs = require("fs");
const path = require("path");

// Caminho da pasta onde ficam os arquivos JSON
const pastaData = path.join(__dirname, "..", "data");

// Função para ler os dados
function lerDados(nomeArquivo) {
    const caminho = path.join(pastaData, nomeArquivo);

    // Se o arquivo não existir, cria um arquivo vazio
    if (!fs.existsSync(caminho)) {
        fs.writeFileSync(caminho, "[]");
    }

    const dados = fs.readFileSync(caminho, "utf-8");

    return JSON.parse(dados);
}

// Função para salvar os dados
function salvarDados(nomeArquivo, dados) {
    const caminho = path.join(pastaData, nomeArquivo);

    fs.writeFileSync(
        caminho,
        JSON.stringify(dados, null, 2)
    );
}

// Função para gerar um novo ID
function gerarId(dados) {
    if (dados.length === 0) {
        return 1;
    }

    return Math.max(...dados.map(item => Number(item.id) || 0)) + 1;
}

// Exporta as funções para serem usadas nas rotas
module.exports = {
    lerDados,
    salvarDados,
    gerarId
};
