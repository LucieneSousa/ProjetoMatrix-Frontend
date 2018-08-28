var sistema = new SistemaCadastro();

function sexoEscolhido() {
    var sexo = '';

    if (document.getElementById("1").checked) {
        sexo = "1";
    } 

    if (document.getElementById("2").checked){
        sexo = "2";
    }
    
    return sexo;
}

function sexoEscolhidoEditar() {
    var sexo = '';

    if (document.getElementById("1").checked) {
        sexo = "1";
    } 

    if (document.getElementById("2").checked){
        sexo = "2";
    }
    
    return sexo;
}

function cadastrar(event) {
    event.preventDefault();

    var nome = document.querySelector('#nome').value;
    var sobrenome = document.querySelector('#sobrenome').value;
    var email = document.querySelector('#email').value;
    var idade = document.querySelector('#idade').value;
    var nota = document.querySelector('#nota').value;
    var sexo = sexoEscolhido();

    var participante = sistema.adicionarParticipante(nome, sobrenome, email, idade, sexo);
    sistema.adicionarNotaAoParticipante(participante.id, nota);

    montarTabela();
}

function todosParticipantes(){
    
    var valores = sistema.buscarParticipantes();
    return valores;
}


function abrirEditar(event){
    var email = event.target.id;
    var participante = sistema.obterParticipante(email);
    document.querySelector('#idEditar').value = participante.id;
    document.querySelector('#nomeEditar').value = participante.nome;
    document.querySelector('#sobrenomeEditar').value = participante.sobrenome;
    document.querySelector('#emailEditar').value = participante.email;
    document.querySelector('#idadeEditar').value = participante.idade;
    document.querySelector('#notaEditar').value = participante.nota;
    
    if(participante.sexo === 2){
        sexo = document.querySelector('#masc')
        sexo.checked = true;
    } else if(participante.sexo === 1){
        sexo = document.querySelector('#fem')
        sexo.checked = true;
    }
    
    $('#myModal').modal('show');
}

function editar(){
    var id =  document.querySelector('#idEditar').value; 
    var nome = document.querySelector('#nomeEditar').value;
    var sobrenome = document.querySelector('#sobrenomeEditar').value;
    var email = document.querySelector('#emailEditar').value;
    var idade = document.querySelector('#idadeEditar').value;
    var nota = document.querySelector('#notaEditar').value;
    var sexo = sexoEscolhidoEditar();

    sistema.editarParticipante(id, nome, sobrenome, email, idade, nota, sexo);

    montarTabela();
    $('#myModal').modal('hide');
}

function remover(event){
    var email = event.target.id;
    sistema.removerParticipante(email);
    montarTabela();
}

function montarTabela() {

    var todos = todosParticipantes();
    
    var coluna = [];
    for (var contador = 0; contador < todos.length; contador++) { 
        for (var chave in todos[contador]) {
            if (coluna.indexOf(chave) === -1) {
                 coluna.push(chave);                
                
            }
        }
    }

    var table = document.createElement("table");
    table.setAttribute('class', 'table');

    var tr = table.insertRow(-1);                   

    for (var contador = 0; contador < coluna.length; contador++) { 
        var th = document.createElement("th");      
        th.innerHTML = coluna[contador];
        tr.appendChild(th);
    }

    if (coluna.length > 0){
        var th = document.createElement("th");      
        th.innerHTML = 'Ações';
        tr.appendChild(th);
    }

    for (var contador = 0; contador < todos.length; contador++) { 

        tr = table.insertRow(-1);

        for (var segundoContador = 0; segundoContador < coluna.length; segundoContador++) {
            var celulaDaTabela = tr.insertCell(-1);
            var valor = todos[contador][ coluna[segundoContador] ];

            if ( typeof valor === 'boolean'){
                if (valor){
                    valor = "Sim";
                }else {
                    valor = "Não";
                }               
            }

            celulaDaTabela.innerHTML = valor;
        }

        var celulaDaTabela = tr.insertCell(-1);
        celulaDaTabela.innerHTML = 'Editar';
        celulaDaTabela.onclick = abrirEditar;
        celulaDaTabela.id = todos[contador][coluna[0]];
        celulaDaTabela.style = 'cursor:pointer; text-decoration:underline';
        

        var celulaDaTabela = tr.insertCell(-1);
        celulaDaTabela.innerHTML = 'Excluir';
        celulaDaTabela.onclick = remover;
        celulaDaTabela.id = todos[contador][coluna[0]];
        celulaDaTabela.style = 'cursor:pointer; text-decoration:underline';
    }

    var divContainer = document.getElementById("mostrarTabela");
    divContainer.innerHTML = "";
    divContainer.appendChild(table);
}