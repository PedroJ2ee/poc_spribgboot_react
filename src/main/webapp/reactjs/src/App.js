import React from 'react';
import './App.css';

import {Container, Row, Col} from 'react-bootstrap';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import NavigationBar from './components/NavigationBar';
import Welcome from './components/Welcome';
import Cliente from './components/Cliente/Cliente';
import ClienteList from './components/Cliente/ClienteList';
import User from './components/User/User';
import UserList from './components/User/UserList';
import Register from './components/User/Register';
import Login from './components/User/Login';
import Footer from './components/Footer';

export default function App() {

    window.onbeforeunload = (event) => {
        const e = event || window.event;
        e.preventDefault();
        if (e) {
            e.returnValue = '';
        }
        return '';
    };

  const heading = "Bem vindo à POC de Spring-Boot e React";
  const quote = "Desafio proposto para seleção em nova oportunidade.";
  const footer = "Pedro Martins"; 

  return (
    <Router>
        <NavigationBar/>
        <Container>
            <Row>
                <Col lg={12} className={"margin-top"}>
                    <Switch>
                        <Route path="/" exact component={() => <Welcome heading={heading} quote={quote} footer={footer}/>}/>
                        <Route path="/add" exact component={Cliente}/>
                        <Route path="/edit/:id" exact component={Cliente}/>
                        <Route path="/list" exact component={ClienteList}/>
                        <Route path="/users" exact component={UserList}/>
                        <Route path="/addUser" exact component={User}/>
                        <Route path="/register" exact component={Register}/>
                        <Route path="/login" exact component={Login}/>
                        <Route path="/logout" exact component={Login}/>
                    </Switch>
                </Col>
            </Row>
        </Container>
        <Footer/>
    </Router>
  );
}
