//Require - importa módulos e bibliotecas do Node.js
//fs - módulo do Node.js para manipulação de arquivos
const fs = require('fs');
//path - módulo para manipulação de caminhos de arquivos e diretórios, roda em qualquer sistema sem dar erro de caminho
const path = require('path');

function encontrarPalavrasDuplicadas(texto) {
    //Verifica se o texto é uma string e se não está vazio. Se não for, retorna um array vazio.
    if(typeof texto !== 'string' || !texto.trim()) {
        return [];
    }
    const textoLimpo = texto
        .toLowerCase()// Remove letras maiúsculas
        .replace(/[^a-zA-Zà-úÀ-Ú\s]/g, ''); // Remove caracteres que não sejam letras ou espaços (é uma expressão regular ou regex e existe formas bem variadas de escrever uma regex)
    //split - divide o texto em um array de palavras, usando espaço como separador e selecionador das palavras
    //filter(Boolean) - remove strings vazias do array e é nossa rede de segurança.
    const palavras = textoLimpo.split(/\s+/).filter(Boolean);
    //reduce - reduz o array de palavras criando um objeto que conta a quantidade de vezes que cada palavra aparece. O acumulador é um objeto onde as chaves são as palavras e os valores são as contagens.
    //{} - diz para o reduce que o valor inicial do acumulador é um objeto vazio
    const contagem = palavras.reduce((acumulador, palavra) => {
      acumulador[palavra] = (acumulador[palavra] || 0) + 1;
      return acumulador;
    }, {});
    //Object.entries - converte o objeto de contagem em um array de pares [palavra, quantidade] ou seja, extrai as informações de um objeto.
    return Object.entries(contagem).filter(([palavra, quantidade]) => quantidade > 1);
}

 //O length do array de duplicadas verifica a lista para saber se há palavras duplicadas. Se houver, elas são exibidas no console com a quantidade de vezes que aparecem. Caso contrário, uma mensagem informando que não há palavras duplicadas é exibida.
function exibirDuplicadas(duplicadas) {
    if (duplicadas.length > 0) {
        console.log('Palavras duplicadas:');
        duplicadas.forEach(([palavra, quantidade]) => {
            console.log(`- ${palavra}: ${quantidade} vezes`);
        });
    } else {
        console.log('Nenhuma palavra duplicada encontrada.');
    }
}

function exibirErro(mensagem, detalhe) {
    console.error(`Ocorreu um erro: ${mensagem}`);
    if (detalhe) {
        console.error(`Detalhes: ${detalhe}`);
    }
}

async function lerArquivo() {
//process.argv - array que contém os vetores de argumento passados para o script nodejs. O índice 2 é usado para acessar o terceiro argumento, que é o caminho do arquivo fornecido pelo usuário.
const caminhoArquivo = process.argv[2];

if(!caminhoArquivo) {
    exibirErro('Por favor, informe o caminho do arquivo! EX: node src/index.js ./arquivo/texto.txt');
    return;
}

try {
    //path.resolve - converte o caminho relativo do arquivo em um caminho absoluto, garantindo que o arquivo seja encontrado corretamente, independentemente de onde o script seja executado.
    const caminhoAbsoluto = path.resolve(caminhoArquivo);
    //fs.promises.readFile - lê o conteúdo do arquivo de forma assíncrona, retornando uma Promise que resolve com o conteúdo do arquivo. O segundo argumento 'utf8' garante que o conteúdo seja lido como uma string.
    const texto = await fs.promises.readFile(caminhoAbsoluto, 'utf8');
    const duplicadas = encontrarPalavrasDuplicadas(texto);
    exibirDuplicadas(duplicadas);
} catch (erro) {
    exibirErro(`O arquivo no caminho "${caminhoArquivo}" não existe.`, erro.message);
    }
}

lerArquivo();