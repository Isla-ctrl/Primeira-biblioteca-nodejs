export default function exibirErro(mensagem, detalhe) {
    console.error(`Ocorreu um erro: ${mensagem}`);
    if (detalhe) {
        console.error(`Detalhes: ${detalhe}`);
    }
}