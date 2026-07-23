//O length do array de duplicadas verifica a lista para saber se há palavras duplicadas. Se houver, elas são exibidas no console com a quantidade de vezes que aparecem. Caso contrário, uma mensagem informando que não há palavras duplicadas é exibida.
export default function exibirDuplicadas(duplicadas) {
    if (duplicadas.length > 0) {
        console.log('Palavras duplicadas:');
        duplicadas.forEach(([palavra, quantidade]) => {
            console.log(`- ${palavra}: ${quantidade} vezes`);
        });
    } else {
        console.log('Nenhuma palavra duplicada encontrada.');
    }
}