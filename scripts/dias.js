const $usuarioLogado = sessionStorage.getItem("usuarioLogado");


const $botaoAumentarQuantidade = document.querySelector('.aumentaQuantidade');
const $botaoDiminuirQuantidade = document.querySelector('.diminuiQuantidade');

const $botaoAumentarDia = document.querySelector('.botaoAumentaDia');
const $botaoDiminuirDia = document.querySelector('.botaoDiminuiDia');


const $botaoSalvar = document.querySelector('.botaoSalvar');
const $botaoCancelar = document.querySelector('.botaoCancelar');

const $quantidadeCopoGrande = document.querySelector('.quantidade');
const $quantidadeFaltante = document.querySelector('.faltante');

const $quantidadeMl = document.querySelector('.quantidadeMl'); 

const $textoDiaAtual = document.querySelector('.diaAtual');

if($usuarioLogado == null){
    window.location.href = "/index.html"
}

var numeroDia;
var dadosUsuario;

function buscaInformacoesDoDiaUsuario(direcao){
   
    dadosUsuario = JSON.parse(localStorage.getItem($usuarioLogado));

    let dataAtual = new Date();
   
    dataAtual.setHours(0,0,0,0);

    let diferencaTime = Math.abs(dataAtual.getTime() - new Date(dadosUsuario.dataInicio).getTime());

    //Se inicia em 0
    numeroDia = Math.ceil(diferencaTime / (1000 * 60 * 60 * 24));

    if(numeroDia > 6){
        window.location.href = "/pages/final/index.html";
    }

    $textoDiaAtual.innerText = `Dia ${numeroDia + 1}`;

    let quantidadeSalvaMlDoDia = dadosUsuario.quantidade[numeroDia];

    if(quantidadeSalvaMlDoDia == undefined){
        quantidadeSalvaMlDoDia = 0;
        dadosUsuario.quantidade[numeroDia] = 0;
        localStorage.setItem($usuarioLogado, JSON.stringify(dadosUsuario));
    }
    
    $quantidadeMl.textContent = `${quantidadeSalvaMlDoDia} ml`;
    
}


buscaInformacoesDoDiaUsuario();

function atualizaQuantidadeCopo() {
    
    const textoLitros = document.querySelector('#litros')
    const totalCoposPossiveis = 8;
    
    var quantidadeAtual = parseInt($quantidadeMl.textContent.replace(/\D/gim, ''));

    var quantidadeCheia = quantidadeAtual / 250;
    
    if(quantidadeAtual === 0) {
        $quantidadeCopoGrande.style.visibility = 'hidden'
        $quantidadeCopoGrande.style.height = 0
    } else {
        $quantidadeCopoGrande.style.visibility = 'visible'
        $quantidadeCopoGrande.style.height = `${quantidadeCheia / totalCoposPossiveis * 330}px`
        $quantidadeCopoGrande.innerText = `${quantidadeCheia / totalCoposPossiveis * 100}%`
    }


    if(quantidadeCheia === totalCoposPossiveis) {
        $quantidadeFaltante.style.visibility = 'hidden'
        $quantidadeFaltante.style.height = 0
    } else {
        $quantidadeFaltante.style.visibility = 'visible'
        textoLitros.innerText = `${2 - (250 * quantidadeCheia / 1000)}L`
    }
    
}

atualizaQuantidadeCopo();

$botaoAumentarQuantidade.addEventListener("click", () => {

    $botaoDiminuirQuantidade.disabled = false;

    var quantidadeAtual = parseInt($quantidadeMl.textContent.replace(/\D/gim, ''));
    
    if(quantidadeAtual >= 2000){
        $botaoAumentarQuantidade.disabled = true;
        return;
    }
        
    var valorQuantidadeAtual = quantidadeAtual + 250;

    $quantidadeMl.textContent = `${valorQuantidadeAtual} ml`;

    atualizaQuantidadeCopo();
});


$botaoDiminuirQuantidade.addEventListener("click", () => {
    
    $botaoAumentarQuantidade.disabled = false;

    var quantidadeAtual = parseInt($quantidadeMl.textContent.replace(/\D/gim, ''));
    
    if(quantidadeAtual <= 0){
        $botaoDiminuirQuantidade.disabled = true;
        return;
    }
        
    var valorQuantidadeAtual = quantidadeAtual - 250;

    $quantidadeMl.textContent = `${valorQuantidadeAtual} ml`;

    atualizaQuantidadeCopo();
});


$botaoSalvar.addEventListener("click", () => {
       
    var quantidadeAtual = parseInt($quantidadeMl.textContent.replace(/\D/gim, ''));

    dadosUsuario.quantidade[numeroDia] = quantidadeAtual;
          
    if(numeroDia == 6){
        dadosUsuario.finalizado = true;
    }
    
    localStorage.setItem($usuarioLogado, JSON.stringify(dadosUsuario));

    alert("Informações salvas!");
});

$botaoCancelar.addEventListener("click", () => {
       
    let quantidadeSalvaMlDoDia = dadosUsuario.quantidade[numeroDia];

    if(quantidadeSalvaMlDoDia != undefined)
        $quantidadeMl.textContent = `${quantidadeSalvaMlDoDia} ml`;
    else
        $quantidadeMl.textContent = `${0} ml`;

    
    atualizaQuantidadeCopo();

    alert("Informações resetadas!");
});


$botaoAumentarDia.addEventListener("click", () => {
    
    let numeroDiaDesejado = numeroDia + 1;
    
    if(numeroDiaDesejado > 6){
        let irParaTelaFinal = confirm("Deseja ir para a tela final?");
            if(irParaTelaFinal)
                window.location.href = "/pages/dias/index.html";
    }

    let quantidadeSalvaMlDoDia = dadosUsuario.quantidade[numeroDiaDesejado];

    if(quantidadeSalvaMlDoDia != undefined){
        $quantidadeMl.textContent = `${quantidadeSalvaMlDoDia} ml`;
        $textoDiaAtual.innerText = `Dia ${numeroDiaDesejado + 1}`;
        atualizaQuantidadeCopo();
        numeroDia++;
    }
    else {
        alert("Você não pode ir para esse dia!");
    }

        

    
   
});

$botaoDiminuirDia.addEventListener("click", () => {
    
    let numeroDiaDesejado = numeroDia - 1;
 
    if(numeroDiaDesejado < 0){
        alert("Esse já é o primeiro dia!");
    }

    let quantidadeSalvaMlDoDia = dadosUsuario.quantidade[numeroDiaDesejado];

    if(quantidadeSalvaMlDoDia != undefined){
        $quantidadeMl.textContent = `${quantidadeSalvaMlDoDia} ml`;
        $textoDiaAtual.innerText = `Dia ${numeroDiaDesejado + 1}`;
        atualizaQuantidadeCopo();
        numeroDia --;
    }

}); 