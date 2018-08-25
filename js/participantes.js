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

    if (document.getElementById("femininoParaEditar").checked) {
        sexo = "feminino";
    } 

    if (document.getElementById("masculinoParaEditar").checked){
        sexo = "masculino";
    }
    
    return sexo;
}

function cadastrar(event) {event.preventDefault();

    var nome = document.querySelector('#nome').value;
    var sobrenome = document.querySelector('#sobrenome').value;
    var email = document.querySelector('#email').value;
    var idade = document.querySelector('#idade').value;
    var nota = document.querySelector('#nota').value;
    var sexo = sexoEscolhido();

    sistema.adicionarParticipante(nome, sobrenome, email, idade, sexo);
    sistema.adicionarNotaAoParticipante(email, nota);

    montarTabela();
}

function todosParticipantes(){
    
    var valores = sistema.buscarParticipantes();
    return valores;
}


function abrirEditar(event){
    var email = event.target.id;
    var participante = sistema.obterParticipante(email);
    document.querySelector('#nomeParaEditar').value = participante.nome;
    document.querySelector('#sobrenomeParaEditar').value = participante.sobrenome;
    document.querySelector('#emailParaEditar').value = participante.email;
    document.querySelector('#idadeParaEditar').value = participante.idade;
    document.querySelector('#notaParaEditar').value = participante.nota;
    if(participante.sexo === 'masculino'){
        sexo = document.querySelector('#masculinoParaEditar')
        sexo.checked = true;
    } else if(participante.sexo === 'feminino'){
        sexo = document.querySelector('#femininoParaEditar')
        sexo.checked = true;
    }
    
    $('#myModal').modal('show');
}

function editar(){
    var nome = document.querySelector('#nomeParaEditar').value;
    var sobrenome = document.querySelector('#sobrenomeParaEditar').value;
    var email = document.querySelector('#emailParaEditar').value;
    var idade = document.querySelector('#idadeParaEditar').value;
    var nota = document.querySelector('#notaParaEditar').value;
    var sexo = sexoEscolhidoEditar();

    sistema.removerParticipante(email);
    sistema.adicionarParticipante(nome, sobrenome, email, idade, sexo);
    sistema.adicionarNotaAoParticipante(email, nota);

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
        celulaDaTabela.id = todos[contador][coluna[2]];
        celulaDaTabela.style = 'cursor:pointer; text-decoration:underline';
        

        var celulaDaTabela = tr.insertCell(-1);
        celulaDaTabela.innerHTML = 'Excluir';
        celulaDaTabela.onclick = remover;
        celulaDaTabela.id = todos[contador][coluna[2]];
        celulaDaTabela.style = 'cursor:pointer; text-decoration:underline';
    }

    var divContainer = document.getElementById("mostrarTabela");
    divContainer.innerHTML = "";
    divContainer.appendChild(table);
}