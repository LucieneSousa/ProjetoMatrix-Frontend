function armazenamentoHttp() {

    function adicionar(participante){
        console.log("PARTICIPANTE ARMAZENAMENTOHTTP", participante);
        var arrayJSON = JSON.stringify(participante);
        console.log("PARTICIPANTE ARMAZENAMENTOHTTP", arrayJSON);
		$.ajax({
			type: "POST",
			url: 'http://matrix.avalie.net/api/participantes/',
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			data: arrayJSON,
            async: false,
            error: function(data){
                console.log("data", data.responseText);
            }
		});	
    }
    
    function todos(){
		var arrayJSON = [];
		$.ajax({
			type: "GET",
			url: 'http://matrix.avalie.net/api/participantes/',
			dataType: "json",
			async: false,
			success: function(data){
				arrayJSON = data;
			}
		});
		return arrayJSON;
    }

    function atualizar(participante){
        console.log("atualizar ARMAZENAMENTOHTTP", participante);
        var arrayJSON = JSON.stringify(participante);
        console.log("atualizar ARMAZENAMENTOHTTP", arrayJSON);
		$.ajax({
			type: "PUT",
			url: 'http://matrix.avalie.net/api/participantes/' + participante.id,
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			data: arrayJSON,
            async: false,
		});	
    }

     
    function adicionarNotaAoParticipante(email, nota) {
        var participantes = todos();
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

        atualizar(participanteEncontrado);
    }
    
    function obter(email){
        var participantes = todos();

        var participantesPorEmail = null;
        participantes.forEach(function (element, index) {
            if (participantes[index].email === email) {
                participantesPorEmail = participantes[index];
            }
        })
        return participantesPorEmail;
    }
    
    

    return {
        todos,
        adicionar,
        adicionarNotaAoParticipante,
        atualizar,
        obter
    };
}


