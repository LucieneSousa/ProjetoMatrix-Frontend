function armazenamentoHttp() {

	function adicionar(participante) {
		return axios.post('http://matrix.avalie.net/api/participantes/', participante)
			.then(res => {
				return res.data;
			})
			.catch(err => {
				throw err.response.data.message;
			});
	}

	function todos() {
		return axios.get('http://matrix.avalie.net/api/participantes/')
			.then(res => {
				return res.data;
			})
			.catch(err => {
				throw err.response.data.message;
			});

	}

	function atualizar(participante) {
		return axios.put('http://matrix.avalie.net/api/participantes/' + participante.id, participante)
			.then(res => {
				return res.data;
			});
	}

	function obter(id) {
		return axios.get('http://matrix.avalie.net/api/participantes/' + id)
			.then(res => {
				return res.data;
			});
	}

	function remover(id) {
		return axios.delete('http://matrix.avalie.net/api/participantes' + "/" + id)
			.then(res => console.log(res.data));
	}

	function obterParticipantePorNome(nome) {
		var todosParticipantes = todos();
		for (var i = 0; i < todosParticipantes.lenght; i++) {
			if (todosParticipantes[i].nome === nome) {
				return todosParticipantes[i];
			}
		}
	}

	function obterParticipantesPorSexo(sexo) {
		var todosParticipantes = todos();
		todosParticipantes.forEach(function (p) {
			if (todosParticipantes[i].sexo === sexo) {
				return todosParticipantes[i];
			}
		})
	}

	function obterParticipanteAprovado(aprovado){
		var todosParticipantes = todos();
		todosParticipantes.forEach(function(p){
			if(todosParticipantes[i].aprovado === aprovado){
				return todosParticipantes[i];
			}
		})
	}

	function obterMediaDasNotasDosParticipantes() {		
		var todosParticipantes = todos();
		var mediaDosParticipantes = participantes.reduce(function (somatorioDasNotas, element, index) {
            return somatorioDasNotas = somatorioDasNotas + participantes[index].nota;
        }, 0);

        return resultado = mediaDosParticipantes / todosParticipantes.lenght;
        
	}
	
	function verificarSeParticipanteEstaAprovado(id){
		var verificarParticipanteAprovado = obter(id);
		if (verificarParticipanteAprovado.aprovado){
			return true;
		}else {
			return false;
		}
	}

	function obterQuantidadeDeParticipantesPorSexo(sexo){
		var quantidadePorSexo = buscarParticipantesPorSexo(sexo);
		return quantidadePorSexo.lenght;
	}

	return {
		todos,
		adicionar,
		atualizar,
		obter,
		remover
	};
}
