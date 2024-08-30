const orientacaoVertical = document.getElementById("layout__buttons__vertical");
const orientacaoHorizontal = document.getElementById("layout__buttons__hotizontal");
const modelosMosaico = document.querySelectorAll(".layoutModel");
const botoesLayout = document.querySelectorAll(".layoutModel");
const containerMosaico = document.querySelector("#container__moisaico");

let orientacaoAtual = "v"; //v para vertical e h para horizontal
let qtdFtsMosaico = "2";
let imagemSelecionada = "";

orientacaoHorizontal.addEventListener('click', (evento) => {
    if (orientacaoAtual === "v") {
        evento.target.classList.remove("bt__menu-desactive");
        evento.target.classList.add("bt__menu");
        orientacaoVertical.classList.add("bt__menu-desactive");
        orientacaoVertical.classList.remove("bt__menu");
        orientacaoAtual = "h";

        trocaButoesModelo();
        if(containerMosaico.className!=="")
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
        if(containerMosaico.className!=="")
            atualizaLayoutModel();
    }
});


botoesLayout.forEach(botao => {
    botao.addEventListener('click', (evento) => {
        qtdFtsMosaico = evento.target.id;
        const modeloAtivo = document.querySelector(".activeModel");
        if(modeloAtivo!==null)
            modeloAtivo.classList.remove("activeModel");
        evento.target.classList.add("activeModel");
        atualizaLayoutModel();

    });
});


function atualizaLayoutModel() {
    if(containerMosaico.className!==""){
        containerMosaico.classList.remove(containerMosaico.className);
        
    }
    containerMosaico.classList.add(`imagem__mosaico-moldura${qtdFtsMosaico}${orientacaoAtual}`);
    containerMosaico.innerHTML = "";

    for (let i = 0; i < qtdFtsMosaico; i++) {
        containerMosaico.innerHTML += `
        <img src="/img/imgBase.png" alt="Foto ${i + 1}" class="imagem__mosaico-base imagem__mosaico${i + 1} imagem__mosaico${qtdFtsMosaico}${orientacaoAtual}" id="img${i + 1}" />
        `;
    }
    ativarClickImg();
}

function trocaButoesModelo() {
    for (let i = 0; i < modelosMosaico.length; i++) {
        modelosMosaico[i].setAttribute("src", `img/${orientacaoAtual}M${i + 1}.png`);
    }
}



/// -------------------------- Estilos de borda ------------------------------
const espessuraBordaSlider = document.querySelector(".container-opcoes__img__borda__espessura-slider");
const raioBordaSlider = document.querySelector(".container-opcoes__img__borda__raio-slider");
const tipoDeBorda = document.querySelectorAll(".container-opcoes__img__borda__tipo-botao");
const corSelector = document.querySelector(".container-opcoes__img__borda__cores");

let opcoesBorda = {
    espessura: 3,
    raio: 30,
    tipo: "solid",
    cor: "#000"
}


espessuraBordaSlider.addEventListener('input', (slider) => {
    opcoesBorda.espessura = slider.target.value;
    atualizarBorda();
});

raioBordaSlider.addEventListener('input', (slider) => {
    opcoesBorda.raio = slider.target.value;
    atualizarBorda();
});

tipoDeBorda.forEach((elemento) => {
    elemento.addEventListener('click', () => {
        const botaoAtivo = document.querySelector(".activeModel-Borda");
        botaoAtivo.classList.remove("activeModel-Borda");
        elemento.classList.add("activeModel-Borda");
        opcoesBorda.tipo = elemento.id;
        atualizarBorda();
    });
});


corSelector.addEventListener('input', (evento) => {
    opcoesBorda.cor = evento.target.value;
    atualizarBorda();
});


function atualizarBorda() {
    containerMosaico.setAttribute("style", `border: ${opcoesBorda.espessura}px ${opcoesBorda.tipo} ${opcoesBorda.cor}; border-radius:${opcoesBorda.raio}px`)
}


// ------------------- Ajustes de imagens --------------------
const slidersDeAjuste = document.querySelectorAll(".container-opcoes__img__borda__ajustes-verticais__slider");

let salvarAjustes = [];

let ajustesImg = {
    posicaoVertical: 50,
    posicaoHorizontal: 50,
    zoom: 50
}

slidersDeAjuste[0].addEventListener('input',(evento)=>{
    ajustesImg.posicaoVertical = evento.target.value;
    atualizarPosicionamentoImg();
});


slidersDeAjuste[1].addEventListener('input',(evento)=>{
    ajustesImg.posicaoHorizontal = evento.target.value;
    atualizarPosicionamentoImg();
});

slidersDeAjuste[2].addEventListener('input',(evento)=>{
    ajustesImg.zoom = evento.target.value;
    atualizarPosicionamentoImg();
});

function ativarClickImg() {
    const imagensMosaico = document.querySelectorAll(".imagem__mosaico-base");
    imagensMosaico.forEach((imagem) => {
        imagem.addEventListener('click', (item) => {
            imagemSelecionada = item.target.id;
            console.log(imagemSelecionada);
        });
    });
}

function atualizarPosicionamentoImg(){
    const imgSelecionada = document.getElementById(imagemSelecionada);
    imgSelecionada.setAttribute("style",`object-position: ${ajustesImg.posicaoHorizontal}% ${ajustesImg.posicaoVertical}%; zoom:${ajustesImg.zoom}%`);
}


// --------------- Carregamento de imagens -----------------------
const botaoCarregarImagem = document.querySelector('.container-imagem__upload__button');
const inputUpload = document.getElementById("image-upload");
const containerNomeImg = document.querySelector(".container-imagem__upload__itens-lista");

let imagensCarregadas = [];
let imagemCarregadaObj = {
    src: "",
    nome: "",
    tipo:""
}


botaoCarregarImagem.addEventListener("click", () => {
    inputUpload.click();
});


function lerConteudoDoArquivo(arquivo) {
    return new Promise((resolve, reject) => {
        const leitor = new FileReader();
        leitor.onload = () => {
            resolve({ url: leitor.result, nome: arquivo.name , tipo: arquivo.type})
        }

        leitor.onerror = () => {
            reject(`Erro na leitura do arquivo ${arquivo.name}`)
        }

        leitor.readAsDataURL(arquivo)
    })
}


inputUpload.addEventListener("change", async (evento) => {
    const arquivo = evento.target.files[0];
    
    if (arquivo) {
        try {
            const conteudoDoArquivo = await lerConteudoDoArquivo(arquivo);
            imagemCarregadaObj.src = conteudoDoArquivo.url;
            imagemCarregadaObj.nome = conteudoDoArquivo.nome;
            imagemCarregadaObj.tipo = conteudoDoArquivo.tipo;
            imagensCarregadas.push(imagemCarregadaObj);
            containerNomeImg.innerHTML+=`
                <li class="container-imagem__upload__itens-item" id="imgList${imagemCarregadaObj.length-1}">
                    <p class="container-imagem__upload__itens-item__nome">${imagemCarregadaObj.nome}</p>
                    <img src="img/lixeira.png" alt="icone de apagar imagem"
                    class="container-imagem__upload-button-icon">
                </li>
            `;
        } catch (erro) {
            console.error(erro)
        }
    }
})

