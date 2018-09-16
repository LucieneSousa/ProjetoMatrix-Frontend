import React, { Component } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";

class Form extends React.Component {
  constructor() {
    super(); //chama o construtor do Component
    this.state = { lista: [] }; //inicialmente lista esta com o state vazio
  }

  editar(id) {
    console.log("meu click editar", id);
  }

  excluir(id) {
    console.log("meu click excluir", id);
  }

  setNome(event) {
    this.setState({ nome: event.target.value });
  }

  setSobrenome(event) {
    this.setState({ sobrenome: event.target.value });
  }

  setEmail(event) {
    this.setState({ email: event.target.value });
  }

  setIdade(event) {
    this.setState({ idade: event.target.value });
  }

  setNota(event) {
    this.setState({ nota: event.target.value });
  }

  setSexo(event) {
    this.setState({ sexo: event.target.value });
  }

  componentDidMount() {
    axios.get(`http://matrix.avalie.net/api/participantes/`).then(res => {
      const lista = res.data;
      this.setState({ lista }); //vai atualizar a lista que estava vazia
    });

    this.handleSubmit = event => {
      event.preventDefault();

      const participantes = {
        nome: this.state.nome,
        sobrenome: this.state.sobrenome,
        email: this.state.email,
        idade: this.state.idade,
        nota: this.state.nota,
        sexo: 1
      };

      axios
        .post(`http://matrix.avalie.net/api/participantes/`, participantes)
        .then(res => {
          console.log("res", res);
          console.log(res.data);
        })
        .catch(error => {
          console.log("error", error);
        });
    };
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Nome:
          <input
            id="nome"
            type="text"
            name="nome"
            value={this.state.nome}
            onChange={e => {
              this.setNome(e);
            }}
          />
        </label>
        <label>
          Sobrenome:
          <input
            id="sobrenome"
            type="text"
            name="sobrenome"
            value={this.state.sobrenome}
            onChange={e => {
              this.setSobrenome(e);
            }}
          />
        </label>
        <label>
          Email:
          <input
            id="email"
            type="email"
            name="email"
            value={this.state.email}
            onChange={e => {
              this.setEmail(e);
            }}
          />
        </label>
        <label>
          Idade:
          <input
            id="idade"
            type="number"
            name="idade"
            value={this.state.idade}
            onChange={e => {
              this.setIdade(e);
            }}
          />
        </label>
        <label>
          Nota:
          <input
            id="nota"
            type="number"
            name="nota"
            value={this.state.nota}
            onChange={e => {
              this.setNota(e);
            }}
          />
        </label>
        <label>
          Sexo:
          <input id="sexo" type="text" name="sexo" />
        </label>
        <input type="submit" value="cadastrar" />
      </form>
    );
  }
}

export default Form;

{
  /* <div className="container">
        <div className="row">
            <div className="col-sm-12">
                <form>
                    <div className="form-group row">
                        <label for="id" hidden class="col-sm-2 col-form-label">Id</label>
                        <div className="col-sm-8">
                            <input className="form-control" id="id" type="hidden">
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="nome" class="col-sm-2 col-form-label">Nome</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" id="nome" required>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="sobrenome" class="col-sm-2 col-form-label">Sobrenome</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" id="sobrenome" required>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="email" class="col-sm-2 col-form-label">Email</label>
                        <div class="col-sm-8">
                            <input type="email" class="form-control" id="email" required>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="idade" class="col-sm-2 col-form-label">Idade</label>
                        <div class="col-sm-8">
                            <input type="number" class="form-control" id="idade" required>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="nota" class="col-sm-2 col-form-label">Nota</label>
                        <div class="col-sm-8">
                            <input type="number" class="form-control" id="nota" required >
                        </div>
                    </div>
                    <fieldset class="form-group">
                        <div class="row">
                            <legend class="col-form-label col-sm-2 pt-0">Sexo</legend>
                            <div class="col-sm-8">
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="1" value="option1">
                                    <label class="form-check-label" for="inlineRadio1">Feminino</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="2" value="option2">
                                    <label class="form-check-label" for="inlineRadio2">Masculino</label>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                    <div class="form-group row">
                        <div class="col-sm-8">
                            <button type="submit" class="btn btn-primary" id="btn-salvar" onclick="cadastrar(event)">Salvar</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div> */
}
