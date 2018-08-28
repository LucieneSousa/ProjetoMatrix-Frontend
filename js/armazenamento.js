function Armazenamento() {

    function recuperaParticipantesSalvo(){
        var array_participantes_string = localStorage.getItem("participantes");

        var array_participantes = JSON.parse(array_participantes_string);

        if (!array_participantes) {
            array_participantes = [];
        }

        return array_participantes;
    }

    function todos(){
        return recuperaParticipantesSalvo();
    }

    function adicionar(participante) {

        var participantes = recuperaParticipantesSalvo();

        participantes.push(participante);

        localStorage.setItem("participantes", JSON.stringify(participantes));
    }

    function adicionarParticipantes(participantes) {
        localStorage.setItem("participantes", JSON.stringify(participantes));
    }

    function obter(email){
        var participantes = recuperaParticipantesSalvo();

        var participantesPorEmail = null;
        participantes.forEach(function (element, index) {
            if (participantes[index].email === email) {
                participantesPorEmail = participantes[index];
            }
        })
        return participantesPorEmail;
    }

    function obterParticipantePorNome(participantes){
        function participantePorNome(participantes) {
            return participantes.nome === nome;
        }
        return participantes.filter(participantePorNome);
    }
    
    function adicionarNotaAoParticipante(email, nota) {
        console.log("entrou na funcao");
        var participantes = recuperaParticipantesSalvo();
        var participanteEncontrado = participantes.find(function (element, index) {
            if (participantes[index].email === email) {
                return participantes[index].email === email;
            }
        });
        participanteEncontrado.nota = nota;
        if (participanteEncontrado.nota >= 70) {
            participanteEncontrado.aprovado = true;
        } else {
            participanteEncontrado.aprovado = false;
        }

        adicionarParticipantes(participantes);
    }
    
    function remover(email) {
        var participantes = recuperaParticipantesSalvo();
        var participantesRemovidos = participantes.filter(function (element, index) {
            if (participantes[index].email === email) {
                return false;
            }
            return true;
        });
 
        participantes = participantesRemovidos;

        adicionarParticipantes(participantes);
    }

   

    return {
        adicionar,
        obter,
        adicionarNotaAoParticipante,        
        todos,
        remover
        
    };
}