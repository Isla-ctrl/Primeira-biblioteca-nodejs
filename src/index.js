import encontrarPalavrasDuplicadas from './services/contaDuplicadas.js';
import exibirDuplicadas from './views/cli.js';
import exibirErro from './utils/funcaoErro.js';
import resultadoArquivoEstilizado from './utils/helper.js';
//Require - importa módulos e bibliotecas do Node.js
//fs - módulo do Node.js para manipulação de arquivos
import fs from 'fs';
//path - módulo para manipulação de caminhos de arquivos e diretórios, roda em qualquer sistema sem dar erro de caminho
import path from 'path';

async function lerArquivo() {
//process.argv - array que contém os vetores de argumento passados para o script nodejs. O índice 2 é usado para acessar o terceiro argumento, que é o caminho do arquivo fornecido pelo usuário.
const caminhoArquivo = process.argv[2];
const enderecoNovo = process.argv[3];

if(!caminhoArquivo) {
    exibirErro('Por favor, informe o caminho do arquivo! EX: node src/index.js ./arquivo/texto.txt');
    return;
}

try {
    //path.resolve - converte o caminho relativo do arquivo em um caminho absoluto, garantindo que o arquivo seja encontrado corretamente, independentemente de onde o script seja executado.
    const caminhoAbsoluto = path.resolve(caminhoArquivo);
    const endereco = path.resolve(enderecoNovo);
    //fs.promises.readFile - lê o conteúdo do arquivo de forma assíncrona, retornando uma Promise que resolve com o conteúdo do arquivo. O segundo argumento 'utf8' garante que o conteúdo seja lido como uma string.
    const texto = await fs.promises.readFile(caminhoAbsoluto, 'utf8');
    const duplicadas = encontrarPalavrasDuplicadas(texto);
    exibirDuplicadas(duplicadas);
    criaESalvaArquivo(duplicadas, endereco);
} catch (erro) {
    exibirErro(`O arquivo no caminho "${caminhoArquivo}" não existe.`, erro.message);
    }
}

async function criaESalvaArquivo(listaPalavras, endereco) {
    const arquivoNovo = `${endereco}/resultado.txt`;
    const textoPalavras = resultadoArquivoEstilizado(listaPalavras);    
    try {
        await fs.promises.writeFile(arquivoNovo, textoPalavras);
        console.log('Arquivo criado') 
    } catch (erro) {
        throw erro;
    }
}

lerArquivo();