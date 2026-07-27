import encontrarPalavrasDuplicadas from './services/contaDuplicadas.js';
import exibirDuplicadas from './views/cli.js';
import exibirErro from './utils/funcaoErro.js';
import resultadoArquivoEstilizado from './utils/helper.js';
import { Command } from 'commander';
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';

const program = new Command();

program
    .version('0.0.1')
    .option('-t, --texto <string>', 'Caminho do texto a ser processado')
    .option('-d, --destino <string>', 'Caminho do diretório de destino para salvar o arquivo de resultado')
    .action(async (options) => {
        const { texto, destino } = options;

        if (!texto || !destino) {
            exibirErro(chalk.red('Por favor informe o caminho do arquivo de texto e o diretório de destino. EX: node src/index.js -t arquivo/texto-web.txt -d ./resultados'));
            program.help();
            return;
        }
        
        const caminhoTexto = path.resolve(texto);
        const caminhoDestino = path.resolve(destino);

        try {
            await lerArquivo(caminhoTexto, caminhoDestino);
            console.log(chalk.green('Processamento concluído com sucesso.'));
        } catch (erro) {
            exibirErro(chalk.red('Falha ao processar o arquivo.'), erro.message);
        }
    });

program.parse(process.argv);

async function lerArquivo(caminhoTexto, caminhoDestino) {
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
        console.log(chalk.green('Arquivo criado com sucesso.')) 
    } catch (erro) {
        throw erro;
    }
}