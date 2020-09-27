import React, { Component } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import ContatoServices from '../Servicos/ContatoServices';

class CreateUpdateContato extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id_contato: this.props.match.params.id,
            nome: "",
            sobrenome: "",
            telefone: "",
            email: "",
            site: "",
            social: ""
        }

        this.changeNomeHandler = this.changeNomeHandler.bind(this);
        this.changeSobrenomeHandler = this.changeSobrenomeHandler.bind(this);
        this.changeTelefoneHandler = this.changeTelefoneHandler.bind(this);
        this.changeEmailHandler = this.changeEmailHandler.bind(this);
        this.changeSiteHandler = this.changeSiteHandler.bind(this);
        this.changeSocialHandler = this.changeSocialHandler.bind(this);
        this.salvarContato = this.salvarContato.bind(this);
    }

    componentDidMount() {
        if (this.state.id_contato === "_add") {
            return false
        } else {
            return ContatoServices.getContatoById(this.state.id_contato).then(
                (res) => {
                    let contato = res.data;
                    this.setState({
                        nome: contato.nome,
                        sobrenome: contato.sobrenome,
                        telefone: contato.telefone,
                        email: contato.email,
                        site: contato.site,
                        social: contato.social
                    });
                }
            );
        }
    }

    changeNomeHandler(event) {
        this.setState({ nome: event.target.value })
    }

    changeSobrenomeHandler(event) {
        this.setState({ sobrenome: event.target.value })
    }

    changeTelefoneHandler(event) {
        this.setState({ telefone: event.target.value })
    }

    changeEmailHandler(event) {
        this.setState({ email: event.target.value })
    }

    changeSiteHandler(event) {
        this.setState({ site: event.target.value })
    }

    changeSocialHandler(event) {
        this.setState({ social: event.target.value })
    }

    cancelar() {
        this.props.history.push("/contatos");
    }

    salvarContato() {

        let contato = {
            nome: this.state.nome,
            sobrenome: this.state.sobrenome,
            telefone: this.state.telefone,
            email: this.state.email,
            site: this.state.site,
            social: this.state.social
        }

        if (this.state.id_contato === "_add") {
            ContatoServices.createContato(contato).then(
                (res) => {
                    alert(res.data);
                }
            )
        } else {
            contato.id_contato = this.state.id_contato
            ContatoServices.editContato(contato).then(
                (res) => {
                    console.log(res.data)
                }
            );
        }

        this.props.history.push("/contatos");

    }

    render() {
        return (
            <Container>

                <Row className="justify-content-md-center">
                    <h1>Cadastro de Contato</h1>
                </Row>
              

                <Form>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formNome">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control type="text" placeholder="Digite o seu Nome" value={this.state.nome} onChange={this.changeNomeHandler} />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formSobrenome">
                            <Form.Label>Sobrenome</Form.Label>
                            <Form.Control type="text" placeholder="Digite o seu Sobrenome" value={this.state.sobrenome} onChange={this.changeSobrenomeHandler} />
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formTelefone">
                            <Form.Label>Telefone</Form.Label>
                            <Form.Control type="text" placeholder="Digite o seu Telefone" value={this.state.telefone} onChange={this.changeTelefoneHandler} />                            
                        </Form.Group>     

                        <Form.Group as={Col} controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Digite o seu e-mail" value={this.state.email} onChange={this.changeEmailHandler} />                        
                        </Form.Group>                   
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formSite">
                        <Form.Label>Site</Form.Label>
                            <Form.Control type="text" placeholder="Digite o seu Site" value={this.state.site} onChange={this.changeSiteHandler} />                        
                        </Form.Group>

                        <Form.Group as={Col} controlId="formSocial">
                            <Form.Label>Rede Social</Form.Label>
                            <Form.Control type="text" placeholder="Digite a sua Rede Social" value={this.state.social} onChange={this.changeSocialHandler} />                        
                        </Form.Group>
                    </Form.Row>                    

                    

                    

                    <Form.Group>
                        <Row className="float-right">
                            <Button variant="success" style={{ margin: "10px 0px 10px 0px" }} className="btnSubmit" onClick={this.salvarContato}>
                                Salvar
                            </Button>

                            <Button variant="warning" style={{ margin: "10px " }} onClick={this.cancelar.bind(this)} >
                                Cancelar
                            </Button>
                        </Row>
                    </Form.Group>
                </Form>

            </Container>
        );
    }
}

export default CreateUpdateContato;
