import React, { Component } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";

class Form extends Component {
  constructor() {
    super();
    this.state = { lista: [], editar: false };
  }

  participante = {
    id: null,
    nome: null,
    sobrenome: null,
    email: null,
    idade: null,
    nota: null,
    sexo: null,
    aprovado: null
  };

  editar(id) {
    axios.get(`http://matrix.avalie.net/api/participantes/` + id).then(res => {
      this.state.editar = true;
      const participante = res.data;

      participante.sexo === 1
        ? (this.refs.masculino.checked = true)
        : (this.refs.feminino.checked = true);

      this.setState({
        id: participante.id,
        nome: participante.nome,
        sobrenome: participante.sobrenome,
        email: participante.email,
        idade: participante.idade,
        nota: participante.nota,
        sexo: participante.sexo,
        editar: true
      });
    });
  }

  excluir(id) {
    axios
      .delete(`http://matrix.avalie.net/api/participantes/` + id)
      .then(res => console.log(res.data))
      .catch(err => {
        console.log(err);
      });
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
    this.setState({ aprovado: event.target.value >= 70 });
  }

  setSexo(event) {
    this.setState({ sexo: event.target.value });
  }

  handleSubmit = event => {
    event.preventDefault();

    const participante = {
      id: this.state.id,
      nome: this.state.nome,
      sobrenome: this.state.sobrenome,
      email: this.state.email,
      idade: this.state.idade,
      nota: this.state.nota,
      sexo: this.state.sexo,
      aprovado: this.state.aprovado
    };

    if (this.state.editar) {
      axios
        .put(
          `http://matrix.avalie.net/api/participantes/` + participante.id,
          participante
        )
        .then(res => {
          this.setState({
            editar: false,
            id: null,
            nome: "",
            sobrenome: "",
            email: "",
            idade: "",
            nota: "",
            sexo: ""
          });
          this.buscar();
        })
        .catch(err => {
          console.log("error PUT", err);
        });
    } else {
      axios
        .post(`http://matrix.avalie.net/api/participantes/`, participante)
        .then(res => {
          console.log("res", res);
          console.log(res.data);
        })
        .catch(err => {
          console.log("error post", err);
        });
    }
  };

  buscar() {
    axios.get(`http://matrix.avalie.net/api/participantes/`).then(res => {
      const lista = res.data;
      console.log(lista);
      this.setState({ lista });
    });
  }

  componentDidMount() {
    this.buscar();
  }

  render() {
    return (
      <div>
        <h3
          className="navbar navbar-dark bg-dark justify-content-center"
          style={{ color: "#fff" }}
        >
          Cadastro de Participantes
        </h3>
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <form onSubmit={e => this.handleSubmit(e)}>
                <div className="form-group">
                  <label for="nome">Nome</label>
                  <input
                    ref="nome"
                    type="text"
                    class="form-control"
                    id="nome"
                    value={this.state.nome}
                    onInput={e => {
                      this.setNome(e);
                    }}
                  />
                </div>
                <div className="form-group">
                  <label for="sobrenome">Sobrenome</label>
                  <input
                    ref="sobrenome"
                    type="text"
                    class="form-control"
                    id="sobrenome"
                    value={this.state.sobrenome}
                    onInput={e => {
                      this.setSobrenome(e);
                    }}
                  />
                </div>
                <div className="form-group">
                  <label for="email">Email</label>
                  <input
                    ref="email"
                    type="email"
                    class="form-control"
                    id="email"
                    value={this.state.email}
                    onInput={e => {
                      this.setEmail(e);
                    }}
                  />
                </div>
                <div className="form-group">
                  <label for="idade">Idade</label>
                  <input
                    ref="idade"
                    type="number"
                    class="form-control"
                    id="idade"
                    value={this.state.idade}
                    onInput={e => {
                      this.setIdade(e);
                    }}
                  />
                </div>
                <div className="form-group">
                  <label for="nota">Nota</label>
                  <input
                    ref="nota"
                    type="number"
                    class="form-control"
                    id="nota"
                    value={this.state.nota}
                    onInput={e => {
                      this.setNota(e);
                    }}
                  />
                </div>

                <div className="form-group">
                  <div className="row">
                    <legend className="col-form-label col-sm-2 pt-0">
                      Sexo
                    </legend>
                    <div className="col-sm-6">
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="inlineRadioOptions"
                          ref="feminino"
                          id="Fem"
                          value="2"
                          onInput={e => {
                            this.setSexo(e);
                          }}
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
                          ref="masculino"
                          id="Masc"
                          value="1"
                          onInput={e => {
                            this.setSexo(e);
                          }}
                        />
                        <label className="form-check-label" for="inlineRadio2">
                          Masculino
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <button type="submit" className="btn btn-outline-primary">
                  Salvar
                </button>
              </form>
            </div>
          </div>

          <div>
            <table style={{ marginTop: 10 }} className="table table-hover">
              <thead className="thead-dark">
                <tr>
                  <th>Id</th>
                  <th>Nome</th>
                  <th>Sobrenome</th>
                  <th>Email</th>
                  <th>Idade</th>
                  <th>Nota</th>
                  <th>Sexo</th>
                  <th>Aprovado</th>
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
                      <td>{participante.sexo === 2 ? "Fem" : "Masc"}</td>
                      <td>{participante.aprovado ? "Sim" : "Não"}</td>
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
                          style={{ margin: 10 }}
                          className="btn btn-outline-danger"
                          onClick={e => {
                            this.excluir(participante.id);
                          }}
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
