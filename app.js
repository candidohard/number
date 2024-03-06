/*let titulo = document.querySelector('h1'); //CRIA A VARIÁVEL 'TITULO'
titulo.innerHTML = 'Jogo do número secreto'; //ATRIBUI A TAG H1 O TEXTO ATRAVÉS DA FUNÇÃO innerHTML

let paragrafo = document.querySelector('p'); //CRIA A VARIÁVEL 'PARAGRAFO'
paragrafo.innerHTML = 'Escolha um número entre 1 e 9'; //ATRIBUI A TAG p O TEXTO ATRAVÉS DA FUNÇÃO innerHTML
*/
//ADICIONANDO TEXTOS COM FUNÇÕES
let listaNumSorteio = []; // Criando uma lista (array) para armazenar os valores gerados para os números
let numLimite = 3; // Definindo uma variável para armazenar os limite dos valores para sorteio
let numeroSecreto = gerarNumeroAleatorio(); //variável criada para armazenar o valor do Nº aleatorio
let tentativas = 1;  //variável criada para exibir a quantidade de tentativas na tela

function textoTela(tag, texto) {    //Função para exibir texto na tela, duas variaveis na função (tag, texto)
    let campo = document.querySelector(tag); // função para buscar todas todos os seletores (tag) 
    campo.innerHTML = texto;        //variavel que recebera os textos
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2} ); //Adiciona a função de leitura da tela
}

function msgInicial() {
    textoTela('h1', 'Jogo do número Secreto');  //chamada da função para a tag H1
    textoTela('p', 'Digite um número entre 1 e 9'); //chamada da função para a tag p
}

msgInicial();   //chamda da função - fora de qualquer outra função ou condição, para iniciar junto a execução

function verificarChute() {         //função chamada no botão chutar html
    let chute = document.querySelector('input').value; //variável que vai receber o valor do input HTML
    //console.log(chute == numeroSecreto)  //Comparando valor inserido no HTML é = ao nº aleatorio gerado, comparação booleana.

    if (chute == numeroSecreto) {   //Compara o valor da variavel chute com a numeroSecreto
        textoTela('h1', 'Acertou!'); //Se forem iguais informa, substituindo os valores da tag h1
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa'; //operador condicional ternario para alterar a palavra caso o numero seja superior ou igual a 1
        let msgTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        textoTela('p', msgTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled'); //função utilizada para remover o atributo do Id (reiniciar) do HTML

        //textoTela('p', 'Você descobriu o númeo secreto!'); alterado pelo acima//Se forem iguais informa, substituindo os valores da tag p
    } else {    //caso não
        if (chute > numeroSecreto){ //verifica se o valor da variavel chute é maior que a variavel numeroSecreto
            textoTela('p', 'O número secreto é menor!'); //Se for maior informa, substituindo o valor da tag p
        } else {
            textoTela('p', 'O número secreto é maior'); // se for menor informa, substituindo o valor da tag p
        }
        tentativas++;   //incremento para a variável contadora
        limpaCampo();   //chamada da função para limpar o campo input do HTML
    }
}

/* function gerarNumeroAleatorio() {   //função para gerar o número secreto
    return parseInt(Math.random() * 10 + 1); // return - retornar o valor obtido pelas funções -> Math.random() - nº aleatorio | parseInt() - Converter para inteiros
}
*/
//MODIFICANDO A FUNÇÃO NºS ALEATÓRIOS PARA IMPEDIR A REPETIÇÃO DOS NÚMEROS
function gerarNumeroAleatorio() {   //função para gerar o número secreto
    let numEscolhido =  parseInt(Math.random() * numLimite + 1); // variável para armazenar os valores sorteados
    let qtdElementLista = listaNumSorteio.length; // Variável para receber o tamanho da lista
    if(qtdElementLista == numLimite){   //Condição que verifica se a lista atingiu o tamanho limite
        listaNumSorteio = [];    //Opção onde se o valor de limite das possibilidades for atingido, limpar toda lista.

    }
    if(listaNumSorteio.includes(numEscolhido)) {//Condição que verifica se o número sorteado neste momento, já foi sorteado anteriormente
        return gerarNumeroAleatorio(); //RECURSÃO - O retorno desta função invoca ela mesma, para testar se os valores já foram sorteados
    } else {
        listaNumSorteio.push(numEscolhido) //PUSH - Método utilizado para adicionar o valor do numero escolhido na lista (array)
        console.log(listaNumSorteio);
        return numEscolhido;
    }
}
function limpaCampo() {     //função para limpar o campo input do HTML
    chute = document.querySelector('input');    //variavel que recebe o valor do input HTML
    chute.value = '';   //alterando o valor inserido no input HTML para vazio.
}

function reiniciarJogo() {  //função para reiniciar o jogo
    numeroSecreto = gerarNumeroAleatorio(); //inserindo todas as funções responsáveis pela funcionalidade do jogo.
    limpaCampo();
    tentativas = 1;
    msgInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true); //Alterando o parametro do botão para desativar novamente
}