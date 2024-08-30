const orientacaoVertical = document.getElementById("layout__buttons__vertical");
const orientacaoHorizontal = document.getElementById("layout__buttons__hotizontal");
const modelosMosaico = document.querySelectorAll(".layoutModel");
const botoesLayout = document.querySelectorAll(".layoutModel");
const containerMosaico = document.querySelector("#container__moisaico");

let orientacaoAtual = "v"; //v para vertical e h para horizontal
let qtdFtsMosaico = "2";


orientacaoHorizontal.addEventListener('click', (evento) => {
    if (orientacaoAtual === "v") {
        evento.target.classList.remove("bt__menu-desactive");
        evento.target.classList.add("bt__menu");
        orientacaoVertical.classList.add("bt__menu-desactive");
        orientacaoVertical.classList.remove("bt__menu");
        orientacaoAtual = "h";

        trocaButoesModelo();
        atualizaLayoutModel();
    }
});

orientacaoVertical.addEventListener('click', (evento) => {
    if (orientacaoAtual === "h") {
        evento.target.classList.remove("bt__menu-desactive");
        evento.target.classList.add("bt__menu");
        orientacaoHorizontal.classList.add("bt__menu-desactive");
        orientacaoHorizontal.classList.remove("bt__menu");
        orientacaoAtual = "v";

        trocaButoesModelo();
        atualizaLayoutModel();
    }
});


botoesLayout.forEach(botao => {
    botao.addEventListener('click', (evento) => {
        qtdFtsMosaico = evento.target.id;
        const modeloAtivo = document.querySelector(".activeModel");
        modeloAtivo.classList.remove("activeModel");
        evento.target.classList.add("activeModel");
        atualizaLayoutModel();

    });
});


function atualizaLayoutModel(){
    containerMosaico.classList.remove(containerMosaico.className);
    containerMosaico.classList.add(`imagem__mosaico-moldura${qtdFtsMosaico}${orientacaoAtual}`);
    containerMosaico.innerHTML = "";

    for (let i = 0; i < qtdFtsMosaico; i++) {
        containerMosaico.innerHTML += `
        <img src="/img/imgBase.png" alt="Foto ${i + 1}" class="imagem__mosaico-base imagem__mosaico${i + 1} imagem__mosaico${qtdFtsMosaico}${orientacaoAtual}" />
        `;
    }
}

function trocaButoesModelo(){
    for (let i = 0; i < modelosMosaico.length; i++) {
        modelosMosaico[i].setAttribute("src", `img/${orientacaoAtual}M${i + 1}.png`);
    }
}

