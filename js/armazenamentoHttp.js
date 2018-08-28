function armazenamentoHttp() {

    function adicionar(participante){
        console.log("PARTICIPANTE ARMAZENAMENTOHTTP", participante);
        var arrayJSON = JSON.stringify(participante);
        console.log("PARTICIPANTE ARMAZENAMENTOHTTP", arrayJSON);
        var participanteSalvo = undefined;
		$.ajax({
			type: "POST",
			url: 'http://matrix.avalie.net/api/participantes/',
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			data: arrayJSON,
            async: false,
            success: function(data){
				participanteSalvo = data;
			},
            error: function(data){
                console.log("data err", data.responseText);
            }
        });	
        
        return participanteSalvo;
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
        var arrayJSON = JSON.stringify(participante);
        $.ajax({
			type: "PUT",
			url: 'http://matrix.avalie.net/api/participantes/' + participante.id,
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			data: arrayJSON,
            async: false,
		});	
    }
  
    
    function obter(id){
        var json = undefined;
		$.ajax({
			type: "GET",
			url: 'http://matrix.avalie.net/api/participantes/' + id,
			dataType: "json",
			async: false,
			success: function(data){
				json = data;
			}
		});
		return json;
    }

    function remover(id){        
		$.ajax({
			type: "DELETE",
			url: 'http://matrix.avalie.net/api/participantes/' + id,
			dataType: "json",
			async: false,
			error: function(data){
                console.log("data err", data.responseText);
            }
		});
		
    }
    
    

    return {
        todos,
        adicionar,
        atualizar,
        obter,
        remover
    };
}
