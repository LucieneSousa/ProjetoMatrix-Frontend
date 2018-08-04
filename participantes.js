var sistema = new SistemaCadastro();

function sexoEscolhido() {
    var sexo = '';

    if (document.getElementById("feminino").checked) {
        sexo = "feminino";
    } 

    if (document.getElementById("masculino").checked){
        sexo = "masculino";
    }
    
    return sexo;
}

function cadastrar(event) {

    event.preventDefault();

    var nome = document.querySelector('#nomeInserido').value;
    var sobrenome = document.querySelector('#sobrenomeInserido').value;
    var email = document.querySelector('#emailInserido').value;
    var idade = document.querySelector('#idadeInserida').value;
    var nota = document.querySelector('#notaInserida').value;
    var sexo = sexoEscolhido();

    sistema.adicionarParticipante(nome, sobrenome, email, idade, sexo);
    sistema.adicionarNotaAoParticipante(email, nota);

    listarResultado();

}

function todosParticipantes(){
    return sistema.buscarParticipantes();
}

function listarResultado() {

    var todos = todosParticipantes();
    console.log('todos', todos);

    
    var coluna = [];
    for (var i = 0; i < todos.length; i++) { //mudar nome das variaveis
        for (var key in todos[i]) {
            if (coluna.indexOf(key) === -1) {
                coluna.push(key);
            }
        }
    }

    
    var table = document.createElement("table");
    table.setAttribute('class', 'table');

    

    var tr = table.insertRow(-1);                   

    for (var i = 0; i < coluna.length; i++) { //mudar nome das variaveis
        var th = document.createElement("th");      
        th.innerHTML = coluna[i];
        tr.appendChild(th);
    }

    var th = document.createElement("th");      
    th.innerHTML = 'Ações';
    tr.appendChild(th);

   
    for (var i = 0; i < todos.length; i++) { //mudar nome das variaveis

        tr = table.insertRow(-1);

        for (var j = 0; j < coluna.length; j++) {
            var tabCell = tr.insertCell(-1);
            tabCell.innerHTML = todos[i][coluna[j]];
        }

        var tabCell = tr.insertCell(-1);
        tabCell.innerHTML = 'Editar | Excluir';
    }

    
    var divContainer = document.getElementById("showData");
    divContainer.innerHTML = "";
    divContainer.appendChild(table);
}

/*function cadastrar2(event) {

    event.preventDefault();

    var nome = document.querySelector('#nomeInserido').value;
    var sobrenome = document.querySelector('#sobrenomeInserido').value;
    var email = document.querySelector('#emailInserido').value;
    var idade = document.querySelector('#idadeInserida').value;
    var nota = document.querySelector('#notaInserida').value;
    var sexo = sexoEscolhido();

    //criando participante json
    var partip_json = {
        nome: nome,
        sobrenome: sobrenome,
        email: email,
        idade: idade,
        nota: nota,
        sexo: sexo
    }

    console.log(partip_json);

    //recuperando do localStorage o array_participantes
    var array_participantes_string = localStorage.getItem("array_participantes");

    console.log(array_participantes_string);

    //transformando de string para objeto javascript
    var array_participantes = JSON.parse(array_participantes_string); //string to object

    if (!array_participantes) {
        //caso seja a primeira vez. Ele inicia a variavel sendo um array vazio
        array_participantes = [];
    }

    // add o participante do formulario no array
    array_participantes.push(partip_json);

    // grava no localStorage o array atualizado
    localStorage.setItem("array_participantes", JSON.stringify(array_participantes)); //object to string

    //localStorage.removeItem('array_participantes');
    //console.log("removido array", array_participantes);
} */