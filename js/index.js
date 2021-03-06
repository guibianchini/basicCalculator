//Imprime o número na tela
function imprimirNumero(valor) {
    !numeroAtual ? numeroAtual = valor : numeroAtual += valor;
    conta[posNum] = parseInt(numeroAtual);
}

//Imprime operadores na tela
function imprimirOperadores(valor) {
    typeof conta[posNum] != 'number' ? conta[posNum] = valor : conta.push(valor);
    numeroAtual = null;
    posNum += 1;
    posNum += 1;
}

//Finaliza conta com o operador ' = '
function finalizarConta(valor) {
    conta.push(valor);
    posNum += 1;
    for (let i = 0; i < conta.length; i++) {
        switch (conta[i + 1]) {
            case '+':
                conta.push(conta[i] + conta[i + 2]);
                break;
            case '-':
                conta.push(conta[i] - conta[i + 2]);
                break;
            case '/':
                conta.push((conta[i] / conta[i + 2]).toFixed(2));
                break;
            case '*':
                conta.push(conta[i] * conta[i + 2]);
                break;
        }
    }
    conta.filter(e => typeof e === 'number').length > 1 ? resultado = conta.pop() : resultado = resultado;
    if(isNaN(resultado) === true)
        resultado = 'Err';
    limparVisor();
}

//Limpa o visor da Calculadora
function limparVisor() {
    posNum = 0;
    numeroAtual = 0;
    conta = [0];
}

//Limpa o resultado da Calculadora
function limparResultado() {
    resultado = null;
    visorResultado.innerHTML = "";
}


let numeroAtual;
let conta = [];
let posNum = 0;
let resultado = null;
const visorContas = document.getElementById('calc');
const visorResultado = document.getElementById('result');

document.querySelectorAll('#num, #op').forEach(
    (e) => {
        if (e.id) {
            e.onclick = () => {
                if (e.value >= 0 && e.value <= 9) {
                    imprimirNumero(e.value);
                } else if (e.value === '=') {
                    finalizarConta(e.value);
                } else if (e.value === 'clean') {
                    limparVisor();
                    limparResultado();
                } else {
                    imprimirOperadores(e.value);
                }
                visorContas.innerHTML = conta.join('');
                if(resultado !== null)
                    visorResultado.innerHTML = `${resultado}`;  
            };
        }
    });