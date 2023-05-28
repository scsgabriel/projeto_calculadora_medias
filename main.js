const form = document.getElementById('form-atividade');      //a variável form recebe o form HTML, preenchido pelo usuário
const imgAprovado = '<img src="./images_projeto_2/aprovado.png" alt="Emoji feliz" />';     // a variável recebe a imagem feliz como valor
const imgReprovado = '<img src="./images_projeto_2/reprovado.png" alt="Emoji triste" />';   // a variável recebe a imagem triste como valor
const atividades = [];          //array que vai receber os nomes das atividades que o usuário digitar
const notas = [];             //array que vai receber as notas que o usuário digitar
const spanAprovado = '<span class="resultado aprovado">Aprovado</span>';
const spanReprovado = '<span class="resultado reprovado">Reprovado</span>';  
//eu não preciso chamar o span pelo nome da tag, posso usar ela apenas como <span></span> e alterar o mesmo conteúdo
//de formas difentes - cono acima, pra mesma mensagem foi criada duas variáveis contendo o mesmo span
//e ele mudou conforme foi pogramado pra mudar. :)
const notaMinimaAprovacao = parseFloat(prompt('Qual é a nota mínima para ser aprovado?'));  //parseFloat();
//  o usuário define qual é a nota mínima para a aprovação e usa ela como base 
//  o parseFloat converte a string que ele vai digitar para o tipo numérico 


let linhas = '';     // essa variável tá declarada no escopo global do código pra não sofrer o efeito do 'submit', que resetaria seu conteúdo

form.addEventListener('submit', function(e){      //addEventListener reconhece um evento no código, que no caso é o submit
    e.preventDefault();      //preventDefault() é uma função, ele cancela o reload da page que o submit causa                                  
    
    adicionaLinha();     
    atualizaTabela();
    atualizaMediaFinal();
});

function adicionaLinha() {     // essa função adiciona uma linha a variável 'linhas' (o código dentro dela executa isso)
    const inputNomeAtividade = document.getElementById('nome-atividade');      //a variável recebe o input atividade
    const inputNotaAtividade = document.getElementById('nota-atividade');      //a variável recebe o input nota

    if (atividades.includes(inputNomeAtividade.value)) {   //includes verifica se um valor está incluso no array
        alert(`A atividade: ${inputNomeAtividade.value} já foi inserida.`);  //crase pra concatenar 
    } else {
        atividades.push(inputNomeAtividade.value);     //o push joga pro array o valor do input da atividade que o usuário irá digitar 
        notas.push(parseFloat(inputNotaAtividade.value));   //o parseFloat já converte o número que é digitado como 'string' pelo usuário e joga no array como tipo number


        let linha = '<tr>';    //abertura da tag tr  //essa variável recebe a linha da table, que é a tr (tudo dentro da tr é referente as linhas da table)
        linha += `<td>${inputNomeAtividade.value}</td>`;        //os sinais += é a concatenação em JS
        linha += `<td>${inputNotaAtividade.value}</td>`;        //tr é uma linha e td é uma célula que recebe dados 
        linha += `<td> ${ inputNotaAtividade.value >= notaMinimaAprovacao ? imgAprovado : imgReprovado}</td>`;    // aqui usamos um operador ternário dentro das chaves, onde: if = ? e else = :
        //                                                                                          if puxa a carinha feliz declarada no escopo geral e else a carinha triste
        linha += '</tr>';     //fechamento da tag tr

        // a variável linha recebe todo esse conteúdo desde a aberta da tag tr até o fechamento da tag tr

        linhas += linha;    //essa concatenação acrescenta uma linha as linhas já existentes enviadas quando o formulário é preenchido e o submit acionado
    };

    inputNomeAtividade.value = '';    //a variável seguida do value, recebendo uma string vazia faz o campo ficar em branco dps que o submit é acionado
    inputNotaAtividade.value = ''; 
}

function atualizaTabela() {      //recebe o código de atualizar a tabela (essa function, assim como a outra é chamada dentro do 'form' e executa todo esse código aqui)
    const corpoTabela = document.querySelector('tbody');  //essa variável puxa o conteúdo que criamos pra dentro do tbody (acessa o tbpdy pelo querSelector)
    corpoTabela.innerHTML = linhas;  //aqui a tbody é zerada ao receber linhas, que foi inicializada com uma string vazia; na concatenação as linhas serão atualizadas uma a uma
    // esse comando não altera a parte visual de forma imediata, mas os valores sim!! a parte visual mudará quando o submit for acionado
    //pra inserir/alterar um conteúdo HTML dentro de uma variável usamos o innerHTML (foi necessário pra mexer no conteúdo da tbody) 
}

function atualizaMediaFinal() {       //essa function irá atualizar visualmente o resultado no HTML pelo DOM
    const mediaFinal = calculaMediaFinal();   
    
    document.getElementById('media-final-valor').innerHTML = mediaFinal;
    document.getElementById('media-final-resultado').innerHTML = mediaFinal >= notaMinimaAprovacao ? spanAprovado : spanReprovado;
}

function calculaMediaFinal(){
    let somaDasNotas = 0;     // o seu valor é atualizado conforme o número digitado, que é somado com o atual dentro dele

    for (let i = 0; i < notas.length; i++) {  //notas.lenght é a condição do término do loop
         //                                    o i++ atualiza i que começa com 0, em +1, até a condição ser true 
         somaDasNotas += notas[i];  //é a mesma coisa de somaDasNotas = somaDasNotas + notas[i];
         //  como os valores são do tipo number, ocorre uma soma, e o resultado é agregado a variável somaDasNotas
        //                 o [i] é o índice de cada valor de dentro do array, ele acessa eles a partir do 0
    };     //essa function vai somar as notas digitadas pelo usuário e dividir pelos lengths

    return somaDasNotas / notas.length;   //vai retornar pra função o valor da somaDasNotas dividido pelos lengths
}

