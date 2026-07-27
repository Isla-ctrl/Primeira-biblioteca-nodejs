import encontrarPalavrasDuplicadas from './services/contaDuplicadas.js';
import exibirDuplicadas from './views/cli.js';
import exibirErro from './utils/funcaoErro.js';
import resultadoArquivoEstilizado from './utils/helper.js';
import { Command } from 'commander';
//Require - importa módulos e bibliotecas do Node.js
//fs - módulo do Node.js para manipulação de arquivos
import fs from 'fs';
//path - módulo para manipulação de caminhos de arquivos e diretórios, roda em qualquer sistema sem dar erro de caminho
import path from 'path';

const program = new Command();

program
    .version('0.0.1')
    .option('-t, --texto <string>', 'Caminho do texto a ser processado')
    .option('-d, --destino <string>', 'Caminho do diretório de destino para salvar o arquivo de resultado')
    .action(async (options) => {
        const { texto, destino } = options;

        if (!texto || !destino) {
            exibirErro('Por favor informe o caminho do arquivo de texto e o diretório de destino. EX: node src/index.js -t arquivo/texto-web.txt -d ./resultados');
            program.help();
            return;
        }
        //path.resolve - converte o caminho relativo do arquivo em um caminho absoluto, garantindo que o arquivo seja encontrado corretamente, independentemente de onde o script seja executado.
        const caminhoTexto = path.resolve(texto);
        const caminhoDestino = path.resolve(destino);

        try {
            lerArquivo(caminhoTexto, caminhoDestino);
            console.log('Processamento concluído com sucesso.');
        } catch (erro) {
            exibirErro('Falha ao processar o arquivo.', erro.message);
        }
    });

program.parse(process.argv);

async function lerArquivo(caminhoTexto, caminhoDestino) {
//fs.promises.readFile - lê o conteúdo do arquivo de forma assíncrona, retornando uma Promise que resolve com o conteúdo do arquivo. O segundo argumento 'utf8' garante que o conteúdo seja lido como uma string.
    try {
        const conteudoTexto = await fs.promises.readFile(caminhoTexto, 'utf8');
        const duplicadas = encontrarPalavrasDuplicadas(conteudoTexto);
        exibirDuplicadas(duplicadas);
        await criaESalvaArquivo(duplicadas, caminhoDestino);
    } catch (erro) {
        throw erro;
    }
}

async function criaESalvaArquivo(listaPalavras, endereco) {
    const arquivoNovo = path.join(endereco, 'resultado.txt');
    const textoPalavras = resultadoArquivoEstilizado(listaPalavras);    

    try {
        await fs.promises.writeFile(arquivoNovo, textoPalavras);
        console.log('Arquivo criado') 
    } catch (erro) {
        throw erro;
    }
}