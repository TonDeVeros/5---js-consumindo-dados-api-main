
//ESSA MANEIRA NAO ESTA ERRADA, MAS TEM UMA DIFICIL LEITURA
// var consultaCEP = fetch("https://viacep.com.br/ws/01001250/json/")
//   .then((resposta) => resposta.json()) //converte a promisse em um objeto json
//   .then((r) => {
//     if (r.erro) {
//       throw Error("Esse cep não existe!"); 
//     } else {
//       console.log(r);
//     }
//   })
//   .catch((erro) => console.log(erro))
//   .finally(mensagem => console.log('processamento concluido')); //o finally ocorre independente se deu erro ou não.

// console.log(consultaCEP);



// A declaração async function define uma função assíncrona e o operador await é utilizado para esperar por uma Promise. Dessa maneira, nossa requisição funcionará corretamente.

async function buscaEndereco(cep){

    let mensagemErro = document.getElementById('erro');

    mensagemErro.innerHTML = ''; //temos que inicializar como vazio se nao nao conseguimos escreve-la depois

    try{

    let consultaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    let consultaCEPConvertida = await consultaCEP.json();
    if(consultaCEPConvertida.erro){
        throw Error('CEP inválido');
    }
    let cidade = document.getElementById("cidade");
    let bairro = document.getElementById("bairro");

    let logradouro = document.getElementById("endereco");
    let estado = document.getElementById("estado");

    cidade.value = consultaCEPConvertida.localidade;
    logradouro.value = consultaCEPConvertida.logradouro;
    estado.value = consultaCEPConvertida.uf;
    bairro.value = consultaCEPConvertida.bairro;


    console.log(consultaCEPConvertida);
    } catch (erro){
        mensagemErro.innerHTML = '<p>CEP inválido! Tente novamente</p>';
        console.log(erro);
    }

}



let ceps = ['01001000', '01001001'];
let conjuntoCeps = ceps.map(valores => buscaEndereco(valores));
Promise.all(conjuntoCeps).then(respostas => console.log(respostas));

// O async/await apesar de ser uma opção mais "legível" ao .then() é importante frisar que não são logicamente equivalentes: o async/await faz o processamento de forma sequencial, Promises com .then() são processadas em paralelo, o que faz com que este método seja mais rápido. O async/await simplifica a escrita e a interpretação do código, mas não é tão flexível e só funciona com uma Promise por vez.


//aqui definimos que cada vez que o usuario sair do foco do CEP, ele ativara a requisicao da API
var cep = document.getElementById("cep");
cep.addEventListener("focusout", () => buscaEndereco(cep.value));