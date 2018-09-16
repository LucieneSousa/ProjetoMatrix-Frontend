import React, { Component } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";

class Form extends Component {
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
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label for="nome">Nome</label>
                <input
                  type="text"
                  class="form-control"
                  id="nome"
                  value={this.state.nome}
                  onChange={e => {
                    this.setNome(e);
                  }}
                />
              </div>
              <div className="form-group">
                <label for="sobrenome">Sobrenome</label>
                <input
                  type="text"
                  class="form-control"
                  id="sobrenome"
                  value={this.state.sobrenome}
                  onChange={e => {
                    this.setSobrenome(e);
                  }}
                />
              </div>
              <div className="form-group">
                <label for="email">Email</label>
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  value={this.state.email}
                  onChange={e => {
                    this.setEmail(e);
                  }}
                />
              </div>
              <div className="form-group">
                <label for="idade">Idade</label>
                <input
                  type="number"
                  class="form-control"
                  id="idade"
                  value={this.state.idade}
                  onChange={e => {
                    this.setIdade(e);
                  }}
                />
              </div>
              <div className="form-group">
                <label for="nota">Nota</label>
                <input
                  type="number"
                  class="form-control"
                  id="nota"
                  value={this.state.nota}
                  onChange={e => {
                    this.setNota(e);
                  }}
                />
              </div>

              <div className="form-group">
                <div className="row">
                  <legend className="col-form-label col-sm-2 pt-0">Sexo</legend>
                  <div className="col-sm-8">
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="inlineRadioOptions"
                        id="1"
                        value={this.state.sexo}
                      />
                      <label className="form-check-label" for="inlineRadio1">
                        Feminino
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="inlineRadioOptions"
                        id="2"
                        value={this.state.sexo}
                      />
                      <label className="form-check-label" for="inlineRadio2">
                        Masculino
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <button type="submit" className="btn btn-primary">
                Cadastrar
              </button>
            </form>
          </div>

          <div>
            <table className="table table-hover">
              <thead className="thead-dark">
                <tr>
                  <th>Id</th>
                  <th>Nome</th>
                  <th>Sobrenome</th>
                  <th>Email</th>
                  <th>Idade</th>
                  <th>Nota</th>
                  <th>Sexo</th>
                  <th>Opções</th>
                </tr>
              </thead>
              <tbody>
                {this.state.lista.map(participante => {
                  return (
                    <tr key={participante.id}>
                      <td>{participante.id}</td>
                      <td>{participante.nome}</td>
                      <td>{participante.sobrenome}</td>
                      <td>{participante.email}</td>
                      <td>{participante.idade}</td>
                      <td>{participante.nota}</td>
                      <td>{participante.sexo}</td>
                      <td>
                        <button
                          className="btn btn-outline-primary"
                          onClick={e => {
                            this.editar(participante.id);
                          }}
                        >
                          Editar
                        </button>

                        <button
                          className="btn btn-outline-danger"
                          onClick={e => {
                            this.excluir(participante.id);
                          }}
                          // onClick={this.excluir.bind(this, participante.id)}
                        >
                          Excluir
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default Form;
