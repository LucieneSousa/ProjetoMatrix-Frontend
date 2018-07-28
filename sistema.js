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

        if (participanteDuplicado){
            throw true;
        }

        participantes.push(p);
        
    }

    function removerParticipante(email) {
        //implemente o código necessário 
        var indiceParaRemover = -1;
        var excluirParticipante = participantes.length;;
        for (var i = 0; i < excluirParticipante; i++ ){
            if(participantes[i].email === email){
                indiceParaRemover = i;
            }
        }     
        var r = participantes.splice(indiceParaRemover, 1);        
    }

    function buscarParticipantesPorNome(nome){
        //implemente o código necessário
        var participantesPorNome = [];
        var procurarParticipantesPorNome = participantes.length ;
        var i = 0;
        
        for (i = 0; i < procurarParticipantesPorNome; i++ ){
            if(participantes[i].nome === nome){
                participantesPorNome.push(participantes[i]);
            }
        }     
        return participantesPorNome;        
    }    

    function buscarParticipantesPorSexo(sexo){
        //implemente o código necessário
        var participantesPorSexo = [];
        var procurarParticipantesPorSexo = participantes.length;
        var i = 0;
        for (i = 0; i < procurarParticipantesPorSexo; i++ ){
            if(participantes[i].sexo === sexo){
                participantesPorSexo.push(participantes[i]);
            }
        }     
        return participantesPorSexo;
    }

    function buscarParticipantesAprovados(){
        //implemente o código necessário
        var i =0;
        var participanteAprovado=[];
        var procurarParticipanteAprovado = participantes.length;
        for(i = 0; i < procurarParticipanteAprovado; i++){
            if(participantes[i].aprovado === true){
                participanteAprovado.push(participantes[i]);
            }               
        }
       return participanteAprovado;
    }

    function buscarParticipantesReprovados(){
        //implemente o código necessário
        var i =0;
        var participanteReprovado=[];
        var procurarParticipanteReprovado = participantes.length;
        for(i = 0; i < procurarParticipanteReprovado; i++){
            if(participantes[i].aprovado === false){
                participanteReprovado.push(participantes[i]);
            }               
        }
       return participanteReprovado;
        
    }

    function obterParticipante(email){
        //implemente o código necessário
        var participantesPorEmail = null;
        var acharParticipante = participantes.length
        var i = 0;
        for (i = 0; i < acharParticipante; i++ ){
            if(participantes[i].email === email){
                participantesPorEmail = participantes[i];
            }
        }     
        
        return participantesPorEmail;
       
    }

    function adicionarNotaAoParticipante(email, nota){
        //implemente o código necessário
        var i = 0;
        var adicionarNota = participantes.length;
        for (i = 0; i < adicionarNota; i++ ){
            if(participantes[i].email === email){
                participantes[i].nota = nota;
                if (nota>= 70){
                    participantes[i].aprovado = true;
                }
            }
        }     

    }

    function obterMediaDasNotasDosParticipantes(){
        //implemente o código necessário
        var i = 0, soma = 0;
        var quantidadeDeParticipantes = participantes.length;
        for (i = 0; i < quantidadeDeParticipantes; i++ ){
            soma = soma + participantes[i].nota;            
        }
        var media = (soma) / participantes.length;
        return media;
    }

    function obterTotalDeParticipantes(){
        return participantes.length;
    }

    function verificarSeParticipanteEstaAprovado(email){
        //implemente o código necessário
        var i = 0;
        var verificarParticipanteAprovado = participantes.length;
        for (i=0; i < verificarParticipanteAprovado; i++){
            if(participantes[i].email === email && participantes[i].aprovado === true){
                return verificarSeParticipanteEstaAprovado;
            }
        }
    }

    function obterQuantidadeDeParticipantesPorSexo(sexo){
        //implemente o código necessário
        var quantidadeDeParticipantesPorSexo = participantes.length;
        var i = 0 , a = 0;
        for (i = 0; i < quantidadeDeParticipantesPorSexo; i++ ){
            if(participantes[i].sexo === sexo){
                a +=1;                
            }
        }     
        return a;
    }
    
    function adicionarParticipanteEmDuplicidade(email){
        var participantesPorEmail = null;
        var acharParticipante = participantes.length
        var i = 0;
        for (i = 0; i < acharParticipante; i++ ){
            if(participantes[i].email === email){
                participantesPorEmail = participantes[i];
            }
        }     
        
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