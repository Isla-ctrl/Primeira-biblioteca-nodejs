export default function resultadoArquivoEstilizado (listaPalavras) {
    let textoFinal = '';
    listaPalavras.forEach(([palavra, quantidade]) => { 
        textoFinal += `${palavra}, ${quantidade}\n`;
    });
    return textoFinal;
}