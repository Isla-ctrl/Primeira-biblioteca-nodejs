export default function encontrarPalavrasDuplicadas(texto) {
    if(typeof texto !== 'string' || !texto.trim()) {
        return [];
    }
    const textoLimpo = texto
        .toLowerCase()
        .replace(/[^a-zA-Zà-úÀ-Ú\s-]/g, ''); 
    const palavras = textoLimpo
        .split(/\s+/)
        .filter((palavra) => Boolean(palavra) && palavra.length > 2 && /[a-zA-Z]/.test(palavra)); 
    const contagem = palavras.reduce((acumulador, palavra) => {
      acumulador[palavra] = (acumulador[palavra] || 0) + 1;
      return acumulador;
    }, {});
    return Object.entries(contagem).filter(([palavra, quantidade]) => quantidade > 1);
}