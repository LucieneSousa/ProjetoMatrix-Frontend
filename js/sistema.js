var armazenamentoHttp = new armazenamentoHttp();

//Objeto Participante
function Participante() {
    this.id=0;
    this.nome = "";
    this.sobrenome = "";
    this.email = "";
    this.idade = 0
    this.sexo = 0
    this.nota = 0
    this.aprovado = false
}

/***********************
 * Representa o sistema
 * Uma vez instanciado, deve-se usar essa mesma
 * instancia em todas as operações.
 */
function SistemaCadastro() {
    //Onde os participantes ficarão armazenados
  //  var participantes = [];

    function adicionarParticipante(nome, sobrenome, email, idade, sexo, nota) {

        //implemente o código necessário
        var p = new Participante();
        p.nome = nome;
        p.sobrenome = sobrenome;
        p.email = email;
        p.idade = idade;
        p.sexo = sexo;
        p.nota = nota;


        if (p.nota >= 70) {
            p.aprovado = true;
        } else {
            p.aprovado = false;
        }

        return armazenamentoHttp.adicionar(p);
        
    }

    function removerParticipante(id) {
        return armazenamentoHttp.remover(id);
    }

    function buscarParticipantesPorNome(nome) {
        //implemente o código necessário
        return armazenamentoHttp.obterParticipantePorNome(nome);
    }

    function buscarParticipantesPorSexo(sexo) {
        //implemente o código necessário
        return armazenamentoHttp.obterParticipantesPorSexo(sexo);
    }

    function buscarParticipantesAprovados() {
        //implemente o código necessário
       return armazenamentoHttp.obterParticipanteAprovado(true);
    }

    function buscarParticipantesReprovados() {
        //implemente o código necessário
        return armazenamentoHttp.obterParticipanteAprovado(false);
    }

    function buscarParticipantes(){
        return armazenamentoHttp.todos();
    }

    
    function obterParticipante(id) {
        return armazenamentoHttp.obter(id);
    }

    function editarParticipante(id, nome, sobrenome, email, idade, nota, sexo){
        var participante = {};
        participante.id = id;
        participante.nome = nome;
        participante.sobrenome = sobrenome;
        participante.email = email;
        participante.idade = idade;
        participante.nota = nota;
        participante.sexo = sexo;
        if (participante.nota >= 70) {
            participante.aprovado = true;
        } else {
            participante.aprovado = false;
        }
        return armazenamentoHttp.atualizar(participante);

    }

    function obterMediaDasNotasDosParticipantes() {
        //implemente o código necessário
        return armazenamentoHttp.obterMediaDasNotasDosParticipantes();
    }

    function obterTotalDeParticipantes() {
        return participantes.length;
    }

    function verificarSeParticipanteEstaAprovado(id) {
        //implemente o código necessário
        return armazenamentoHttp.verificarSeParticipanteEstaAprovado(id);

    }

    function obterQuantidadeDeParticipantesPorSexo(sexo) {
        //implemente o código necessário
        return armazenamentoHttp.obterQuantidadeDeParticipantesPorSexo(sexo);
    }

    
    return {
        adicionarParticipante,
        removerParticipante,
        buscarParticipantesPorNome,
        buscarParticipantesPorSexo,
        buscarParticipantesAprovados,
        buscarParticipantesReprovados,
        obterParticipante,
        obterMediaDasNotasDosParticipantes,
        obterTotalDeParticipantes,
        verificarSeParticipanteEstaAprovado,
        obterQuantidadeDeParticipantesPorSexo,
        buscarParticipantes,
        editarParticipante
    };
}