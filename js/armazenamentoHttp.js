function armazenamentoHttp() {

    function adicionar(participante){
		return axios.post('http://matrix.avalie.net/api/participantes/', participante)
			.then(res => {
				console.log("res", res)
				return res.data;
			})
			.catch(err => {
				console.log("errorr", err)
				throw err.response.data.message; 
			});
    }
    
	function todos(){
		return axios.get('http://matrix.avalie.net/api/participantes/')
			.then(res => {
				return res.data;
			})
			.catch(err => {
				throw err.response.data.message; 
			});

	}
	
   /* function atualizar(participante){
        var arrayJSON = JSON.stringify(participante);
        $.ajax({
			type: "PUT",
			url: 'http://matrix.avalie.net/api/participantes/' + participante.id,
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			data: arrayJSON,
            async: false,
		});	
	}*/
	
	function atualizar(participante){
		console.log("partic http", participante)
		return axios.put('http://matrix.avalie.net/api/participantes/' + participante.id, participante)
			.then(res => {
				return  res.data;
			
			});		
	}
  


	function obter(id){
		return axios.get('http://matrix.avalie.net/api/participantes/' + id)
			.then(res => {

				return res.data;
			});
	}


    /*
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
    }*/

    /*function remover(id){        
		$.ajax({
			type: "DELETE",
			url: 'http://matrix.avalie.net/api/participantes/' + id,
			dataType: "json",
			async: false,
			error: function(data){
                console.log("data err", data.responseText);
            }
		});
		
    }*/
    
	function remover(id){
		return axios.delete('http://matrix.avalie.net/api/participantes' + "/" + id)
		.then(res => console.log(res.data));
	}
    

    return {
        todos,
        adicionar,
        atualizar,
        obter,
        remover
    };
}
