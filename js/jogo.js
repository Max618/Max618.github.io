function novoElemento(tagName, className) {
    const elem = document.createElement(tagName)
    elem.classList.add(className)
    return elem
}

function Jogador(larguraJogo) {
    this.elemento = new novoElemento('div','jogador')
    let andarDireita = false, andarEsquerda = false

    this.getX = () => parseInt(this.elemento.style.left.split('px')[0])
    this.setX = x => this.elemento.style.left = `${x}px`

    window.onkeydown = e => {
        e.preventDefault()
        if(e.keyCode == 39) {
            andarDireita = true
        }
        if(e.keyCode == 37) {
            andarEsquerda = true
        }
    }
    window.onkeyup = e => {
        e.preventDefault()
        if(e.keyCode == 39) {
            andarDireita = false
        }
        if(e.keyCode == 37) {
            andarEsquerda = false
        }
    }

    let moverDireita = () => {
        const novoX = this.getX() + (andarDireita ? 4 : 0)
        const larguraMaxima = larguraJogo - this.elemento.clientWidth - 13

        if(novoX >= larguraMaxima){
            this.setX(larguraMaxima)
        }
        else{
            this.setX(novoX)
        }
    }

    let moverEsquerda = () => {
        const novoX = this.getX() + (andarEsquerda ? -4  : 0)

        if(novoX <= 0)
            this.setX(2)
        else
            this.setX(novoX)
    }

    this.andar = () => {
        if(this.elemento.style.position != 'absolute'){
            this.elemento.style.position = 'absolute'
            this.elemento.style.bottom = "5px"
        }
        moverDireita()
        moverEsquerda()
    }

    this.setX(larguraJogo / 2 - 25)
}

// const jogador = new Jogador(900)
// document.querySelector('[mx-jogo]').appendChild(jogador.elemento)
// setInterval(() => {
//     jogador.andar()
// }, 20)

function Barreira() {
    this.elemento = novoElemento('div', 'barreira')

    this.setColor = c => this.elemento.style.backgroundColor = c
}

function Barreiras(numberChild) {
    this.elemento = novoElemento('div', 'barreiras')

    const colors = [
        "red", "blue", "green", "white", "orange"
    ]

    for(let x = 0; x < numberChild; x++){
        let novaBarreira = new Barreira()
        novaBarreira.setColor(colors[Math.floor(Math.random() * 4)])
        this.elemento.appendChild(novaBarreira.elemento)
    }
}

// const barreiras = new Barreiras(504)
// const jogador = new Jogador(900)
// const jogo = document.querySelector('[mx-jogo]')
// jogo.appendChild(barreiras.elemento)
// jogo.appendChild(jogador.elemento)
// setInterval(() => {
//     jogador.andar()
// }, 20)


function Bolinha() {
    this.elemento = novoElemento('div','bolinha')

}

const barreiras = new Barreiras(504)
const jogador = new Jogador(900)
const bolinha = new Bolinha()

const jogo = document.querySelector('[mx-jogo]')
jogo.appendChild(barreiras.elemento)
jogo.appendChild(jogador.elemento)
jogo.append(bolinha.elemento)
setInterval(() => {
    jogador.andar()
}, 20)