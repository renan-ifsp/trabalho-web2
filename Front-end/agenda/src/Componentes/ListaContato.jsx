import React, { Component } from 'react';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import ContatoServices from '../Servicos/ContatoServices';

class ListaContato extends Component {

    constructor(props) {
        super(props);

        this.state = {
            contatos: []
        }

        this.voltar = this.voltar.bind(this);
        this.excluir = this.excluir.bind(this);
        this.editar = this.editar.bind(this);
        this.novoContato = this.novoContato.bind(this);
    }

    componentDidMount() {
        this.getContatos();
    }

    getContatos() {
        ContatoServices.getContato().then(
            (resposta) =>
                this.setState({ contatos: resposta.data})
        );        
    }

    voltar() {
        this.props.history.push("/");
    }

    excluir(id) {
        ContatoServices.deleteContato(id).then(
            res => {
                alert(res.data);
                this.getContatos();
            }
        );
    }

    editar(id) {
        this.props.history.push("/agenda/"+id)
    }

    novoContato() {
        this.props.history.push("/agenda/_add")
    }

    render() {
        return (
            <Container>

                <Row className="justify-content-md-center"> 
                    <h1>Agenda de Contatos</h1>
                </Row>

                <Row>
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Sobrenome</th>
                                <th>Telefone</th>
                                <th>Email</th>
                                <th>Site</th>
                                <th>Rede Social</th>
                                <th>Editar</th>
                                <th>Excluir</th>
                            </tr>
                        </thead>
                        <tbody> 
                            {
                                this.state.contatos.map(
                                    contato =>
                                        <tr key={contato.id}>
                                            <td>{contato.nome}</td>
                                            <td>{contato.sobrenome}</td>
                                            <td>{contato.telefone}</td>
                                            <td>{contato.email}</td>
                                            <td>{contato.site}</td>
                                            <td>{contato.social}</td>
                                            <td>
                                                <Button variant="warning" onClick={() => this.editar(contato.id)}> Editar  </Button>                                                                                                
                                            </td>
                                            <td>                                                
                                                <Button variant="danger" onClick={() => this.excluir(contato.id)}> Excluir </Button>                                               
                                            </td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </Table>
                </Row>

                <Row>
                    <Col>
                        <Button className="float-left" variant="link" onClick={this.voltar}> Voltar </Button>
                    </Col>
                    <Col>
                        <Button className="float-right" variant="primary" onClick={this.novoContato}> Novo Contato </Button>
                    </Col>

                </Row>

            </Container>
        );
    }
}

export default ListaContato;