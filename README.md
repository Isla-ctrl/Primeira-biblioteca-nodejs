# 🔎 Contador de Palavras Duplicadas - CLI em Node.js

Ferramenta de linha de comando que lê um arquivo de texto, identifica quais palavras aparecem mais de uma vez e gera um relatório com a contagem de ocorrências, tudo isso construído do zero. Com arquitetura própria, como minha primeira biblioteca em Node.js.

## 💡 Sobre o projeto

Esse projeto nasceu de um curso de Node.js, mas a implementação é inteiramente minha: estrutura de pastas, lógica de negócio, tratamento de erros e organização dos módulos foram pensados e escritos antes mesmo de o curso apresentar sua própria solução. A única influência direta do curso foi a sugestão de bibliotecas de terceiros (como `commander` e `chalk`).

O desafio proposto foi simples na superfície, "conte palavras repetidas em um texto", mas resolvê-lo bem exigiu decisões reais de engenharia: como separar responsabilidades, como validar entradas do usuário, como lidar com falhas de I/O sem derrubar o programa, e como devolver uma saída legível tanto no terminal quanto em arquivo.

## ⚙️ Funcionalidades

- Recebe o caminho de um arquivo de texto e um diretório de destino via linha de comando (`-t`/`--texto`, `-d`/`--destino`)
- Normaliza o texto (minúsculas, remoção de caracteres que não sejam letras ou espaços)
- Filtra palavras com mais de 2 letras, evitando ruído de artigos e preposições curtas
- Conta as ocorrências de cada palavra usando `reduce`
- Filtra apenas as palavras que se repetem (`quantidade > 1`)
- Exibe o resultado no terminal com formatação colorida (`chalk`)
- Gera um arquivo `resultado.txt` no diretório de destino informado
- Tratamento de erros centralizado, com mensagens amigáveis para o usuário e detalhes técnicos no console

## 🏗️ Arquitetura

O projeto segue uma separação de responsabilidades inspirada em camadas (services / views / utils), pensada para que cada módulo tenha uma única razão para mudar:

```
src/
├── index.js                  # Fluxo principal — configura o CLI (commander) e orquestra o fluxo
├── services/
│   └── contaDuplicadas.js     # Regra de negócio: encontra e conta palavras duplicadas
├── views/
│   └── cli.js                 # Camada de apresentação: exibe o resultado no terminal
└── utils/
    ├── helper.js               # Formata a lista de duplicadas para escrita em arquivo
    └── funcaoErro.js           # Tratamento e exibição padronizada de erros
```

**Fluxo principal:**

1. `index.js` lê as opções passadas pelo usuário via `commander` e valida se `texto` e `destino` foram informados
2. `path.resolve` converte os caminhos relativos em absolutos, garantindo que o script funcione independentemente de onde é executado
3. `fs.promises.readFile` lê o conteúdo do arquivo de forma assíncrona
4. `encontrarPalavrasDuplicadas` (service) processa o texto e retorna as palavras repetidas
5. `exibirDuplicadas` (view) mostra o resultado no terminal
6. `criaESalvaArquivo` formata e grava o resultado em `resultado.txt`
7. Qualquer erro no processo é capturado e tratado por `exibirErro`, sem expor stack traces cruas ao usuário final

## 🧰 Tecnologias

- **Node.js** - runtime
- **ES Modules** (`import`/`export`) 
- **fs/promises** - leitura e escrita assíncrona de arquivos
- **path** - manipulação de caminhos multiplataforma
- **[Commander](https://www.npmjs.com/package/commander)** - parsing de argumentos de linha de comando
- **[Chalk](https://www.npmjs.com/package/chalk)** - formatação colorida de saída no terminal
- **async/await** e **try/catch** - tratamento de código assíncrono e de erros

## ▶️ Como executar

```bash
# Clone o repositório
git clone https://github.com/Isla-ctrl/Primeira-biblioteca-nodejs.git
cd Primeira-biblioteca-nodejs

# Instale as dependências
npm install

# Rode o CLI
node src/index.js -t caminho/para/texto.txt -d ./resultados
```

Se os parâmetros obrigatórios não forem informados, o CLI exibe uma mensagem de ajuda com o formato correto de uso.

## 📚 O que esse projeto me ensinou

- Diferença entre bibliotecas nativas (`fs`, `path`) e bibliotecas externas instaladas via `npm`, e como o `package.json`/`node_modules` sustentam isso
- Como estruturar um projeto Node.js em módulos coesos, usando `import`/`export` para comunicar as partes entre si
- Manipulação de arrays, strings e objetos para resolver um problema real de lógica (regex, `split`, `filter`, `reduce`, `Object.entries`)
- Programação assíncrona: a diferença entre `callbacks`, `Promises` e `async/await`, e por que isso importa em operações de I/O
- Tratamento de erros com `try/catch` e o objeto `Error`, incluindo a criação de uma função própria de exibição de erros
- Como ler argumentos passados pela linha de comando e usá-los para parametrizar o comportamento de um programa

## 🐛 Aprendizado extra: Git

Durante o desenvolvimento, versionei o projeto do início ao fim. Um problema real que enfrentei: adicionar `node_modules` ao `.gitignore` não impede que arquivos já rastreados continuem sendo versionados. Resolvi isso limpando o cache do Git:

​```bash
git rm -r --cached node_modules
​```
---

Projeto desenvolvido de forma independente, como parte da minha jornada de estudos em desenvolvimento backend com Node.js. 💻

> O mais importante foi me desafiar a estruturar o código com total autonomia, criando uma solução completamente diferente do proposto no curso, mesmo que isso torne meus estudos mais longos. Mas o mais importante para mim é desenvolver uma base sólida e futuramente ser capaz de sustentar cada conhecimento. Não é preciso decorar tudo, mas sim, saber pesquisar e ter a paciência de pensar na resolução do problema.

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/https://www.linkedin.com/in/beatriz-souza-6a942b333/)
