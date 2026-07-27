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

//cria um objeto do tipo Command, que é usado para definir e gerenciar os comandos da linha de comando. Ele fornece uma interface para criar comandos, opções e argumentos.
const program = new Command();

program
    .version('0.0.1')
    .option('-t, --texto <string>', 'Caminho do texto a ser processado')
    .option('-d, --destino <string>', 'Caminho do diretório de destino para salvar o arquivo de resultado')
    //action - define a função que será executada quando o comando for chamado. A função recebe um objeto options que contém os valores das opções definidas anteriormente.
    .action(async (options) => {
        //Destructuring - extrai os valores dos objetos que passei a ele, mas para ele funcionar os nomes dentro das chaves tem que ser identicos aos nomes que o Commander usou no objeto.
        const { texto, destino } = options;

        //Verifica se o usuário forneceu os caminhos do arquivo de texto e do diretório de destino. Se algum deles estiver ausente, exibe uma mensagem de erro e ajuda.
        if (!texto || !destino) {
            exibirErro('Por favor informe o caminho do arquivo de texto e o diretório de destino. EX: node src/index.js -t arquivo/texto-web.txt -d ./resultados');
            program.help();
            return;
        }
        //path.resolve - converte o caminho relativo do arquivo em um caminho absoluto, garantindo que o arquivo seja encontrado corretamente, independentemente de onde o script seja executado.
        const caminhoTexto = path.resolve(texto);
        const caminhoDestino = path.resolve(destino);

        try {
            await lerArquivo(caminhoTexto, caminhoDestino);
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