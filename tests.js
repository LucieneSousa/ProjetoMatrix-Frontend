QUnit.module( "Gerenciar Participantes - Sistema Vazio", function() {
  var sistema = new SistemaCadastro();
  QUnit.test( "adicionar participantes", function( assert ) {
    assert.equal( sistema.obterTotalDeParticipantes(), 0, "Retornar zero quando não tiver participantes" );
   });
});


QUnit.module( "Gerenciar Participantes", function() {
  var sistema = new SistemaCadastro();  

  QUnit.test( "adicionar participantes", function( assert ) {
    sistema.adicionarParticipante("João", "Mendes", "jmendes@matrix.com", 56, 1);
    sistema.adicionarParticipante("Carla", "Mendes", "cmendes@matrix.com", 26, 2);
    assert.ok( sistema.obterTotalDeParticipantes() >= 2, "+2 registros adicionados" );    
  });

  QUnit.test( "adicionar participante em duplicidade", function( assert ) {
    sistema.adicionarParticipante("Patricia", "Mendes", "pmendes@matrix.com", 16, 1);
    assert.throws(function(){
        sistema.adicionarParticipante("Patricia", "Mendes", "pmendes@matrix.com", 16, 1)
      }
    );
    sistema.removerParticipante("pmendes@matrix.com");

  });

  QUnit.test( "remover participante", function( assert ) {    
    sistema.adicionarParticipante("Maria", "Mendes", "mmendes@matrix.com", 36, 2);
    sistema.removerParticipante("mmendes@matrix.com");
    var maria = sistema.obterParticipante("mmendes@matrix.com");
    assert.ok(!maria, "Não foi encontrado o registro");
  });

  QUnit.test( "obter participante", function( assert ) {
    sistema.adicionarParticipante("Rodolfo", "Mendes", "rmendes@matrix.com", 16, 1);
    var rodolfo = sistema.obterParticipante("rmendes@matrix.com");
    sistema.removerParticipante("rmendes@matrix.com");

    assert.equal( rodolfo.sobrenome, "Mendes", "Sobrenome correto");
    assert.equal( rodolfo.idade, 16, "Idade correta");
    assert.equal( rodolfo.sexo, 1, "Sexo Masculino");    
  });

  QUnit.test( "verificar Se Participante Esta Aprovado", function( assert ) {
    sistema.adicionarParticipante("Rodolfo", "Mendes", "rmendes@matrix.com", 16, 1);
    sistema.adicionarNotaAoParticipante("rmendes@matrix.com", 80);

    var resultado = sistema.verificarSeParticipanteEstaAprovado("rmendes@matrix.com");
        
    sistema.removerParticipante("rmendes@matrix.com");
    assert.ok( resultado, "Aprovado");    
  });
});

QUnit.module( "Buscar Participantes", function() {
  var sistema = new SistemaCadastro();
    sistema.adicionarParticipante("João", "Mendes", "jmendes@matrix.com", 56, 1);
    sistema.adicionarParticipante("Carla", "Mendes", "cmendes@matrix.com", 26, 2);
  
    QUnit.test( "buscar por nome", function( assert ) {
    var resultados = sistema.buscarParticipantesPorNome("João");
    assert.equal( resultados.length, 1, "Apenas um registro retornado");
    
    var joao = resultados[0];
    assert.equal( joao.sobrenome, "Mendes", "Sobrenome correto");
    assert.equal( joao.idade, 56, "Idade correta");
    assert.equal( joao.sexo, 1, "Sexo Masculino");
  });

  QUnit.test( "buscar por sexo", function( assert ) {
    var resultados = sistema.buscarParticipantesPorSexo(1);
    assert.equal( resultados.length, 1, "Apenas um registro retornado");
    
    var joao = resultados[0];
    assert.equal( joao.sobrenome, "Mendes", "Sobrenome correto");
    assert.equal( joao.idade, 56, "Idade correta");
    assert.equal( joao.sexo, 1, "Sexo Masculino");
  });

  QUnit.test( "obter quantidade de participantes por sexo", function( assert ) {
    var resultado = sistema.obterQuantidadeDeParticipantesPorSexo(1);
    assert.equal( resultado, 1, "Apenas um registro retornado");    
  });

  QUnit.test( "obter total de participantes", function( assert ) {
    var resultado = sistema.obterTotalDeParticipantes();
    assert.equal( resultado, 2, "2 registros");    
  });

  QUnit.test( "buscar por aprovados e reprovados", function( assert ) {
    var resultados = sistema.buscarParticipantesAprovados();    
    assert.equal( resultados.length, 0, "Nenhum participante aprovado");    
    
    resultados = sistema.buscarParticipantesReprovados();    
    assert.equal( resultados.length, 2, "Todos participantes reprovado");   
    
    sistema.adicionarNotaAoParticipante("jmendes@matrix.com", 70);
    var resultados = sistema.buscarParticipantesAprovados();    
    assert.equal( resultados.length, 1, "1 Participante aprovado");     
  });
  
});

QUnit.module( "Informações sobre notas dos Participantes", function() {
  var sistema = new SistemaCadastro();
    sistema.adicionarParticipante("João", "Mendes", "jmendes@matrix.com", 56, 1);
    sistema.adicionarParticipante("Carla", "Mendes", "cmendes@matrix.com", 26, 2);
  
  QUnit.test( "obter média dos participantes", function( assert ) {
    sistema.adicionarNotaAoParticipante("jmendes@matrix.com", 90);
    sistema.adicionarNotaAoParticipante("cmendes@matrix.com", 70);

    var resultado = sistema.obterMediaDasNotasDosParticipantes();
    assert.equal( resultado, 80, "média dos participantes");    
  });
});

//Ele testa se a nota inserida foi gravada no objeto corretamente
QUnit.module( "Teste para adicionar nota", function() {
  var sistema = new SistemaCadastro();
    sistema.adicionarParticipante("João", "Mendes", "jmendes@matrix.com", 56, 1);
    sistema.adicionarNotaAoParticipante("jmendes@matrix.com", 90);
  
  QUnit.test( "obter nota", function( assert ) {

    var resultado = sistema.obterParticipante("jmendes@matrix.com");
    assert.equal( resultado.nota, 90, "notas iguais");    
  });
});