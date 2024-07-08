let listaSorteada = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', 
    {rate:1.2});
}

function mensagemInicial() {
    exibirTextoNaTela('h1', 'jogo do numero secreto!');
    exibirTextoNaTela('p', 'escolha um numero entre 1 e 10'); 
}

mensagemInicial();

function verificarChute() {
    let chute = document.querySelector('input').value;
    
    if  (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa' ;
        let mensagemTentativa = `voce acertou o numero secreto com ${tentativas} ${palavraTentativa}!`
        exibirTextoNaTela('p', mensagemTentativa);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', 'O numero secreto e menor!');
        } else {
            exibirTextoNaTela('p', 'O numero secreto e maior!');
        }
        tentativas++;
        limparCampo();
    }
}

function gerarNumeroAleatorio() {
   let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
   let totalDaLista = listaSorteada.length;

   if (totalDaLista == numeroLimite) {
    listaSorteada = [];
   }
    if (listaSorteada.includes(numeroEscolhido)) {
    return gerarNumeroAleatorio();
   } else {
    listaSorteada.push(numeroEscolhido); 
    return numeroEscolhido;
   }
}
function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    mensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled',true);
}