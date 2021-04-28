const $botaoComecar = document.querySelector(".btnComecar");
const $inputNomeUsuario = document.querySelector("#nomeUsuario");
const $inputSenhaUsuario = document.querySelector("#senhaUsuario");

function salvaDadosUsuario(nomeUsuario, senhaUsuario){
    
    var dataAtual = new Date();
    dataAtual.setHours(0,0,0,0);
    
    var dadosDoUsuario = {
        usuario : nomeUsuario, 
        senha : senhaUsuario,
        dataInicio : dataAtual,
        quantidade : [0],
        finalizado : false
    }
    
    localStorage.setItem(nomeUsuario, JSON.stringify(dadosDoUsuario));
    
    alert("Usuário criado com sucesso!");
    
    sessionStorage.setItem("usuarioLogado", nomeUsuario);
}

$botaoComecar.addEventListener("click", () => {
  
    const $nomeUsuario = $inputNomeUsuario.value;
    const $senhaUsuario = btoa($inputSenhaUsuario.value);

    let padraoRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[-+_!@#$%^&*., ?]).+$");
    if(!padraoRegex.test($nomeUsuario)){
        alert("O nome de usuário precisa ter letras maiúsculas, minúsculas, catecteres especiais e números.");
        return;
    }

    let usuarioSalvo =  JSON.parse(localStorage.getItem($nomeUsuario));
   
    if(usuarioSalvo == null){
        let criarNovoUsuario  = confirm('Você deseja criar um novo usuário?');
    
        if(criarNovoUsuario)
        {          
            salvaDadosUsuario($nomeUsuario, $senhaUsuario);
            window.location.href = "./pages/dias/index.html";
        }
        else
        {
            alert("Tente encontrar seu usuário novamente!");
        }
        
    }
    else {
        if($senhaUsuario == usuarioSalvo.senha){
            sessionStorage.setItem("usuarioLogado", $nomeUsuario);
            window.location.href = "./pages/dias/index.html"
        }
        else {
            alert("Senha inválida, tente novamente!")
        }
        
    }
});