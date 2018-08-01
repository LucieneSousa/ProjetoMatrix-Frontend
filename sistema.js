//Objeto Participante
function Participante() {
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

    function adicionarParticipante(nome, sobrenome, email, idade, sexo) {
        //implemente o código necessário
        var p = new Participante();
        p.nome = nome;
        p.sobrenome = sobrenome;
        p.email = email;
        p.idade = idade;
        p.sexo = sexo;

        var participanteDuplicado = obterParticipante(email);

        if (participanteDuplicado) {
            throw "Participante com email duplicado";
        }

        participantes.push(p);

    }

    function removerParticipante(email) {

        var participantesRemovidos = participantes.filter(function (element, index) {
            if (participantes[index].email === email) {
                return false;
            }
        });
        participantes = participantesRemovidos;
    }

    function buscarParticipantesPorNome(nome) {
        //implemente o código necessário
        var participantesPorNome = [];
        participantes.forEach(function (element, index) {
            if (participantes[index].nome === nome) {
                participantesPorNome.push(participantes[index]);
            }
        })

        return participantesPorNome;
    }

    function buscarParticipantesPorSexo(sexo) {
        //implemente o código necessário
        var participantesPorSexo = [];
        participantes.forEach(function (element, index) {
            if (participantes[index].sexo === sexo) {
                participantesPorSexo.push(participantes[index]);
            }
        })
        return participantesPorSexo;
    }

    function buscarParticipantesAprovados() {
        //implemente o código necessário
        var participanteAprovado = [];
        participantes.forEach(function (element, index) {
            if (participantes[index].aprovado === true) {
                participanteAprovado.push(participantes[index]);
            }
        })
        return participanteAprovado;
    }

    function buscarParticipantesReprovados() {
        //implemente o código necessário
        var participanteReprovado = [];
        participantes.forEach(function (element, index) {
            if (participantes[index].aprovado === false) {
                participanteReprovado.push(participantes[index]);
            }
        })

        return participanteReprovado;

    }

    function obterParticipante(email) {
        //implemente o código necessário
        var participantesPorEmail = null;
        participantes.forEach(function (element, index) {
            if (participantes[index].email === email) {
                participantesPorEmail = participantes[index];
            }
        })

        return participantesPorEmail;

    }

    function adicionarNotaAoParticipante(email, nota) {
        //implemente o código necessário
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
    }

    function obterMediaDasNotasDosParticipantes() {
        //implemente o código necessário

        var quantidadeDeParticipantes = participantes.length;
        var MediaDosParticipantes = participantes.reduce(function (somatorio, element, index) {
            return somatorio = somatorio + participantes[index].nota;
        }, 0);

        var media = MediaDosParticipantes / quantidadeDeParticipantes;
        return media;
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
        participantes.forEach(function(element,index){
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
        adicionarParticipanteEmDuplicidade
    };
}