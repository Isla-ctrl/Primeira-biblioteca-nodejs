export default function encontrarPalavrasDuplicadas(texto) {
    //Verifica se o texto é uma string e se não está vazio. Se não for, retorna um array vazio.
    if(typeof texto !== 'string' || !texto.trim()) {
        return [];
    }
    const textoLimpo = texto
        .toLowerCase()// Remove letras maiúsculas
        .replace(/[^a-zA-Zà-úÀ-Ú\s]/g, ''); // Remove caracteres que não sejam letras ou espaços (é uma expressão regular ou regex e existe formas bem variadas de escrever uma regex)
    //split - divide o texto em um array de palavras, usando espaço como separador e selecionador das palavras
    //filter(Boolean) - remove strings vazias do array e é nossa rede de segurança.
    const palavras = textoLimpo
        .split(/\s+/)
        .filter((palavra) => Boolean(palavra) && palavra.length > 2); // Filtra palavras com mais de 2 letras
    //reduce - reduz o array de palavras criando um objeto que conta a quantidade de vezes que cada palavra aparece. O acumulador é um objeto onde as chaves são as palavras e os valores são as contagens.
    //{} - diz para o reduce que o valor inicial do acumulador é um objeto vazio
    const contagem = palavras.reduce((acumulador, palavra) => {
      acumulador[palavra] = (acumulador[palavra] || 0) + 1;
      return acumulador;
    }, {});
    //Object.entries - converte o objeto de contagem em um array de pares [palavra, quantidade] ou seja, extrai as informações de um objeto.
    return Object.entries(contagem).filter(([palavra, quantidade]) => quantidade > 1);
}