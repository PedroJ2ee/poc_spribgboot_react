import React, {Component} from 'react';

import {connect} from 'react-redux';
import {saveUser, fetchUser, updateUser} from '../../services/index';

import {Card, Form, Button, Col, InputGroup, FormControl} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSave, faPlusSquare, faUndo, faList, faEdit, faLock} from '@fortawesome/free-solid-svg-icons';
import MyToast from '../MyToast';

class User extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state = {
            show : false
        };
        this.userChange = this.userChange.bind(this);
        this.submitUser = this.submitUser.bind(this);
    }

    initialState = {
        id:'', name:'', email:'', mobile:'', password:''
    };

    componentDidMount() {
        const userId = +this.props.match.params.id;
        if(userId) {
            this.findUserById(userId);
        }
    }
    findUserById = (userId) => {
        this.props.fetchUser(userId);
        setTimeout(() => {
            let user = this.props.userObject.user;
            if(user != null) {
                this.setState({
                    id: user.id,
                    name: user.title,
                    email: user.author,
                    mobile: user.mobile,
                    password: user.password
                });
            }
        }, 1000);
    };

    resetUser = () => {
        this.setState(() => this.initialState);
    };

    submitUser = event => {
        event.preventDefault();

        const user = {
            name: this.state.name,
            email: this.state.email,
            mobile: this.state.mobile,
            password: this.state.password
        };

        this.props.saveUser(user);
        setTimeout(() => {
            if(this.props.userObject.user != null) {
                this.setState({"show":true, "method":"post"});
                setTimeout(() => this.setState({"show":false}), 3000);
            } else {
                this.setState({"show":false});
            }
        }, 2000);
        this.setState(this.initialState);
    };

    updateUser = event => {
        event.preventDefault();

        const user = {
            id: this.state.id,
            name: this.state.name,
            email: this.state.email,
            mobile: this.state.mobile,
            password: this.state.password
        };
        this.props.updateUser(user);
        setTimeout(() => {
            if(this.props.userObject.user != null) {
                this.setState({"show":true, "method":"put"});
                setTimeout(() => this.setState({"show":false}), 3000);
            } else {
                this.setState({"show":false});
            }
        }, 2000);
        this.setState(this.initialState);
    };

    userChange = event => {
        this.setState({
            [event.target.name]:event.target.value
        });
    };

    userList = () => {
        return this.props.history.push("/users");
    };

    render() {
        const {name, email, mobile, password} = this.state;

        return (
            <div>
                <div style={{"display":this.state.show ? "block" : "none"}}>
                    <MyToast show = {this.state.show} message = {this.state.method === "put" ? "Usuário atualizado!." : "Usuário adicionado!."} type = {"success"}/>
                </div>
                <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header>
                        <FontAwesomeIcon icon={this.state.id ? faEdit : faPlusSquare} /> {this.state.id ? "Editar Usuário" : "Add Usuário"}
                    </Card.Header>
                    <Form onReset={this.resetUser} onSubmit={this.state.id ? this.updateUser : this.submitUser} id="userFormId">
                        <Card.Body>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridName">
                                    <Form.Label>Nome</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="test" name="name"
                                        value={name} onChange={this.userChange}
                                        className={"bg-dark text-white"}
                                        placeholder="Nome do Usuário" />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="test" name="email"
                                        value={email} onChange={this.userChange}
                                        className={"bg-dark text-white"}
                                        placeholder="Email do Usuário" />
                                </Form.Group>
                            </Form.Row>

                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridMobile">
                                    <Form.Label>Telefone</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="test" name="mobile"
                                        value={mobile} onChange={this.userChange}
                                        className={"bg-dark text-white"}
                                        placeholder="Enter User Price" />
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text><FontAwesomeIcon icon={faLock}/></InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl required autoComplete="off" width="300px" type="password" name="password" value={password} onChange={this.userChange}
                                            className={"bg-dark text-white"} placeholder="Enter Password"/>
                                    </InputGroup>
                                </Form.Group>
                            </Form.Row>
                        </Card.Body>
                        <Card.Footer style={{"textAlign":"right"}}>
                            <Button size="sm" variant="success" type="submit">
                                <FontAwesomeIcon icon={faSave} /> {this.state.id ? "Editar" : "Salvar"}
                            </Button>{' '}
                            <Button size="sm" variant="info" type="reset">
                                <FontAwesomeIcon icon={faUndo} /> Limpar
                            </Button>{' '}
                            <Button size="sm" variant="info" type="button" onClick={this.userList.bind()}>
                                <FontAwesomeIcon icon={faList} /> Lista de Usuários
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
        userObject: state.user
    };
};

const mapDispatchToProps = dispatch => {
    return {
        saveUser: (user) => dispatch(saveUser(user)),
        fetchUser: (userId) => dispatch(fetchUser(userId)),
        updateUser: (user) => dispatch(updateUser(user))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(User);