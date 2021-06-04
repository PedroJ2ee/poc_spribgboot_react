import React, {Component} from 'react';

import {connect} from 'react-redux';
import {saveCliente, fetchCliente, updateCliente} from '../../services/index';

import {Card, Form, Button, Col} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSave, faPlusSquare, faUndo, faList, faEdit} from '@fortawesome/free-solid-svg-icons';
import MyToast from '../MyToast';

class Cliente extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state = {
            show : false
        };
        this.clienteChange = this.clienteChange.bind(this);
        this.submitCliente = this.submitCliente.bind(this);
    }

    initialState = {
        id:'', nome:'', cpf:'', email:'', telefone:'',
        cep: "",
        logradouro: "",
        complemento: "", 
        bairro: "",
        localidade: "",
        uf: ""
    };

    componentDidMount() {
        const clienteId = +this.props.match.params.id;
        if(clienteId) {
            this.findClienteById(clienteId);
        }
    }

    findClienteById = (clienteId) => {
        this.props.fetchCliente(clienteId);
        setTimeout(() => {
            let cliente = this.props.clienteObject.cliente;
            if(cliente != null) {
                this.setState({
                    id: cliente.id,
                    nome: cliente.nome,
                    cpf: cliente.cpf,
                    email: cliente.email,
                    telefone: cliente.telefone,
                    cep: cliente.cep,
                    logradouro: cliente.logradouro,
                    complemento: cliente.complemento,
                    bairro: cliente.bairro,
                    localidade: cliente.localidade,
                    uf: cliente.uf
                });
            }
        }, 1000);
    };

    resetCliente = () => {
        this.setState(() => this.initialState);
    };

    submitCliente = event => {
        event.preventDefault();

        const cliente = {
            nome: this.state.nome,
            cpf: this.state.cpf,
            email: this.state.email,
            telefone: this.state.telefone,
            cep: this.state.cep,
            logradouro: this.state.logradouro,
            complemento: this.state.complemento,
            bairro: this.state.bairro,
            localidade: this.state.localidade,
            uf: this.state.uf
        };

        this.props.saveCliente(cliente);
        setTimeout(() => {
            if(this.props.clienteObject.cliente != null) {
                this.setState({"show":true, "method":"post"});
                setTimeout(() => this.setState({"show":false}), 3000);
            } else {
                this.setState({"show":false});
            }
        }, 2000);
        this.setState(this.initialState);
    };

    updateCliente = event => {
        event.preventDefault();

        const cliente = {
            id: this.state.id,
            nome: this.state.nome,
            cpf: this.state.cpf,
            email: this.state.email,
            telefone: this.state.telefone,
            cep: this.state.cep,
            logradouro: this.state.logradouro,
            complemento: this.state.complemento,
            bairro: this.state.bairro,
            localidade: this.state.localidade,
            uf: this.state.uf
        };
        this.props.updateCliente(cliente);
        setTimeout(() => {
            if(this.props.clienteObject.cliente != null) {
                this.setState({"show":true, "method":"put"});
                setTimeout(() => this.setState({"show":false}), 3000);
            } else {
                this.setState({"show":false});
            }
        }, 2000);
        this.setState(this.initialState);
    };

    clienteChange = event => {
        this.setState({
            [event.target.name]:event.target.value
        });
    };

    clienteList = () => {
        return this.props.history.push("/list");
    };

    render() {
        const {nome, cpf, email, telefone, cep, logradouro} = this.state;

        return (
            <div>
                <div style={{"display":this.state.show ? "block" : "none"}}>
                    <MyToast show = {this.state.show} message = {this.state.method === "put" ? "Cliente Updated Successfully." : "Cliente Saved Successfully."} type = {"success"}/>
                </div>
                <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header>
                        <FontAwesomeIcon icon={this.state.id ? faEdit : faPlusSquare} /> {this.state.id ? "Update Cliente" : "Add New Cliente"}
                    </Card.Header>
                    <Form onReset={this.resetCliente} onSubmit={this.state.id ? this.updateCliente : this.submitCliente} id="clienteFormId">
                        <Card.Body>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridTitle">
                                    <Form.Label>Nome</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="test" name="nome"
                                        value={nome} onChange={this.clienteChange}
                                        className={"bg-dark text-white"}
                                        placeholder="Enter Cliente Title" />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridAuthor">
                                    <Form.Label>CPF</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="test" name="cpf"
                                        value={cpf} onChange={this.clienteChange}
                                        className={"bg-dark text-white"}
                                        placeholder="Enter Cliente Author" />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridTitle">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="test" name="email"
                                        value={email} onChange={this.clienteChange}
                                        className={"bg-dark text-white"}
                                        placeholder="Enter Cliente Title" />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridAuthor">
                                    <Form.Label>Telefone</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="test" name="telefone"
                                        value={telefone} onChange={this.clienteChange}
                                        className={"bg-dark text-white"}
                                        placeholder="Enter Cliente Author" />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridPrice">
                                    <Form.Label>CEP</Form.Label>
                                    <Form.Control autoComplete="off"
                                        type="test" name="cep"
                                        value={cep} onChange={this.clienteChange}
                                        className={"bg-dark text-white"}
                                        placeholder="Enter Cliente Author" />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridLanguage">
                                    <Form.Label>Logradouro</Form.Label>
                                    <Form.Control autoComplete="off"
                                        type="test" name="logradouro"
                                        value={logradouro} onChange={this.clienteChange}
                                        className={"bg-dark text-white"}
                                        placeholder="Enter Cliente Author" />
                                </Form.Group>
                            </Form.Row>
                        </Card.Body>
                        <Card.Footer style={{"textAlign":"right"}}>
                            <Button size="sm" variant="success" type="submit">
                                <FontAwesomeIcon icon={faSave} /> {this.state.id ? "Update" : "Save"}
                            </Button>{' '}
                            <Button size="sm" variant="info" type="reset">
                                <FontAwesomeIcon icon={faUndo} /> Reset
                            </Button>{' '}
                            <Button size="sm" variant="info" type="button" onClick={this.clienteList.bind()}>
                                <FontAwesomeIcon icon={faList} /> Cliente List
                            </Button>
                        </Card.Footer>
                    </Form>
                </Card>
            </div>
        );
    }
};

const mapStateToProps = state => {
    return {
        clienteObject: state.cliente
    };
};

const mapDispatchToProps = dispatch => {
    return {
        saveCliente: (cliente) => dispatch(saveCliente(cliente)),
        fetchCliente: (clienteId) => dispatch(fetchCliente(clienteId)),
        updateCliente: (cliente) => dispatch(updateCliente(cliente))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cliente);