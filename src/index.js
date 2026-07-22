//Require - importa módulos e bibliotecas do Node.js
//fs - módulo do Node.js para manipulação de arquivos
const fs = require('fs');

//process.argv - array que contém os argumentos passados para o script Node.js
const caminhoArquivo = process.argv;
//caminhoArquivo[2] - terceiro argumento passado para o script, que é o caminho do arquivo a ser lido
const link = caminhoArquivo[2];

fs.readFile(link, 'utf8', (err, data) => {
  if (err) {
    console.log('Erro ao ler o arquivo:', err);
    return;
  }
  console.log(data);
});

