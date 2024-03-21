//variável que recebe um número aleatório
let randomNumber = parseInt(Math.random()*100+1)

const submit = document.querySelector('#jogar') //botão
const jogada = document.querySelector('#txtNumero') //caixa de texto
const jogadaAnterior = document.querySelector('.vezes') //jogadas anteriores
const jogadasRestantes = document.querySelector('.numChances') //jogadas que faltam 
const recomecar = document.querySelector(".resultados") //manipula  a div
const avisos = document.querySelector(".avisos") // texto informativo

const p = document.createElement("p") // cria um parágrafo para reiniciar
let numerosJogados = [] //criação de vetor para números jogados
let minhasJogadas = 1 //conta jogadas
let playGame = true //jogador pode jogar

if(playGame){ // se playGame for verdadeira execute
    submit.addEventListener('click', function(e){
        e.preventDefault()
        const tentativa = parseInt(jogada.value)
    validaChances(tentativa) //chamando a função validaChances e enviando tentativa como argumento
    })
}

function validaChances(tentativa){
    if(isNaN(tentativa)){   //se tentativa não for um número(Not a Number)
        alert("Favor digitar um número")
        jogada.value = ''
        jogada.focus() //colocar o cursor na caixa de texto
    }
    else if(tentativa > 100 || tentativa < 1){
        alert("Digite um número entre 1 e 100")
        jogada.value = ''
        jogada.focus()
    }
    else{
        numerosJogados.push(tentativa) //empurrando o valor no vetor
        if(minhasJogadas === 6 && tentativa !== randomNumber){ //se minhasJogadas for = a 6 vidas e tentativa for diferente do nº aleatório
            displayTentativas(tentativa) //chama a função displayTentativas
            msg(`Game Over <br>O número correto era: ${randomNumber}`)
            fimJogo()
        }
        else{
            displayTentativas(tentativa)
            checkarTentativas(tentativa)
        }
    }
}

function checkarTentativas(tentativa){
    if(tentativa === randomNumber){
        msg('Parabéns! Você acertou o número')
        fimJogo()
    }
    else if(tentativa < randomNumber){
        msg('Palpite baixo, tente novamente')
    }
    else if(tentativa > randomNumber){
        msg('Palpite alto, tente novamente')
    }
}

/* irá limpar a caixa de texto para próxima jogada
insere o número jogado no elemento html (innerHTML)
aumentando o valor de minhasJogadas em 1
inserindo informação de jogadas restantes no elemento html(innerHTML)
*/ 
function displayTentativas(tentativa){
    jogada.value = ''
    jogadaAnterior.innerHTML += `${tentativa} `
    minhasJogadas++
    jogadasRestantes.innerHTML = `${7 - minhasJogadas}`
}

function msg(mensagem){
    avisos.innerHTML = `${mensagem}`
}