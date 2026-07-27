import chalk from "chalk";

export default function exibirDuplicadas(duplicadas) {
    if (duplicadas.length > 0) {
        console.log(chalk.yellow('Palavras duplicadas:'));
        duplicadas.forEach(([palavra, quantidade]) => {
            console.log(`- ${palavra}: ${quantidade} vezes`);
        });
    } else {
        console.log('Nenhuma palavra duplicada encontrada.');
    }
}