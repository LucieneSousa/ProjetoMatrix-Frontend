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
    var participantes = [];

    function adicionarParticipante(nome, sobrenome, email, idade, sexo, nota) {

        //implemente o código necessário
        var p = new Participante();
        p.nome = nome;
        p.sobrenome = sobrenome;
        p.email = email;
        p.idade = idade;
        p.sexo = sexo;
        p.nota = nota;

        return armazenamentoHttp.adicionar(p);
        
    }

    function removerParticipante(id) {
        return armazenamentoHttp.remover(id);
    }

    function buscarParticipantesPorNome(nome) {
        //implemente o código necessário
        armazenamento.obterParticipantePorNome(nome);
        function participantePorNome(participantes) {
            return participantes.nome === nome;
        }
        return participantes.filter(participantePorNome);
    }

    function buscarParticipantesPorSexo(sexo) {
        //implemente o código necessário
        function participantesPorSexo(participantes) {
            return participantes.sexo === sexo;
        }
        return participantes.filter(participantesPorSexo);
    }

    function buscarParticipantesAprovados() {
        //implemente o código necessário
        function participanteAprovado(participantes) {
            return participantes.aprovado === true
        }
        return participantes.filter(participanteAprovado);
    }

    function buscarParticipantesReprovados() {
        //implemente o código necessário
        function participanteReprovado(participantes){
            return participantes.aprovado === false
        }
        return participantes.filter(participanteReprovado);

    }

    function buscarParticipantes(){
        return armazenamentoHttp.todos();
    }

    
    function obterParticipante(id) {
        return armazenamentoHttp.obter(id);
    }

    //passar o id
    function adicionarNotaAoParticipante(id, nota) {
       return  armazenamentoHttp.atualizar(participante);       
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
        return armazenamentoHttp.atualizar(participante);

    }

    function obterMediaDasNotasDosParticipantes() {
        //implemente o código necessário
        var totalDeParticipantes = participantes.length;
        var MediaDosParticipantes = participantes.reduce(function (somatorioDasNotas, element, index) {
            return somatorioDasNotas = somatorioDasNotas + participantes[index].nota;
        }, 0);

        var resultado = MediaDosParticipantes / totalDeParticipantes;
        return resultado;
    }

    function obterTotalDeParticipantes() {
        return participantes.length;
    }

    function verificarSeParticipanteEstaAprovado(email) {
        //implemente o código necessário

        var verificarParticipanteAprovado = participantes.find(function (element, index) {
            return participantes[index].email === email && participantes[index].aprovado === true;
        });

        return verificarParticipanteAprovado;

    }

    function obterQuantidadeDeParticipantesPorSexo(sexo) {
        //implemente o código necessário

        var somaQuantidadeParticipantePorSexo = participantes.reduce(function (somatorio, element, index) {
            if (participantes[index].sexo === sexo) {
                return somatorio + 1;
            }
            return somatorio;
        }, 0);

        return somaQuantidadeParticipantePorSexo;
    }

    function adicionarParticipanteEmDuplicidade(email) {
        var participantesPorEmail = null;
        participantes.forEach(function (element, index) {
            if (participantes[index].email === email) {
                participantesPorEmail = participantes[index];
            }
        })

        return participantesPorEmail;
    }

    return {
        adicionarParticipante,
        removerParticipante,
        buscarParticipantesPorNome,
        buscarParticipantesPorSexo,
        buscarParticipantesAprovados,
        buscarParticipantesReprovados,
        obterParticipante,
        adicionarNotaAoParticipante,
        obterMediaDasNotasDosParticipantes,
        obterTotalDeParticipantes,
        verificarSeParticipanteEstaAprovado,
        obterQuantidadeDeParticipantesPorSexo,
        adicionarParticipanteEmDuplicidade,
        buscarParticipantes,
        editarParticipante
    };
}