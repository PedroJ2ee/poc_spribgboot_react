import React, {Component} from 'react';

import {connect} from 'react-redux';
import {deleteUser} from '../../services/index';

import './../../assets/css/Style.css';
import {Card, Table, ButtonGroup, Button, InputGroup, FormControl} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faList, faEdit, faTrash, faStepBackward, faFastBackward, faStepForward, faFastForward, faSearch, faTimes} from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router-dom';
import MyToast from '../MyToast';
import axios from 'axios';

class UserList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users : [],
            search : '',
            currentPage : 1,
            usersPerPage : 5,
            sortDir: "asc"
        };
    }

    sortData = () => {
        setTimeout(() => {
            this.state.sortDir === "asc" ? this.setState({sortDir: "desc"}) : this.setState({sortDir: "asc"});
            this.findAllUsers(this.state.currentPage);
        }, 500);
    };

    componentDidMount() {
        this.findAllUsers(this.state.currentPage);
    }

    findAllUsers(currentPage) {
        currentPage -= 1;
        axios.get("http://localhost:8081/rest/users?pageNumber="+currentPage+"&pageSize="+this.state.usersPerPage+"&sortBy=name&sortDir="+this.state.sortDir)
            .then(response => response.data)
            .then((data) => {
                this.setState({
                    users: data.content,
                    totalPages: data.totalPages,
                    totalElements: data.totalElements,
                    currentPage: data.number + 1
                });
            })
            .catch(error => {
                console.log(error);
                localStorage.removeItem('jwtToken');
                this.props.history.push('/');
            });
    };

    deleteUser = (userId) => {
        this.props.deleteUser(userId);
        setTimeout(() => {
            if(this.props.userObject != null) {
                this.setState({"show":true});
                setTimeout(() => this.setState({"show":false}), 3000);
                this.findAllUsers(this.state.currentPage);
            } else {
                this.setState({"show":false});
            }
        }, 1000);
    };

    changePage = event => {
        let targetPage = parseInt(event.target.value);
        if(this.state.search) {
            this.searchData(targetPage);
        } else {
            this.findAllUsers(targetPage);
        }
        this.setState({
            [event.target.name]: targetPage
        });
    };

    firstPage = () => {
        let firstPage = 1;
        if(this.state.currentPage > firstPage) {
            if(this.state.search) {
                this.searchData(firstPage);
            } else {
                this.findAllUsers(firstPage);
            }
        }
    };

    prevPage = () => {
        let prevPage = 1;
        if(this.state.currentPage > prevPage) {
            if(this.state.search) {
                this.searchData(this.state.currentPage - prevPage);
            } else {
                this.findAllUsers(this.state.currentPage - prevPage);
            }
        }
    };

    lastPage = () => {
        let condition = Math.ceil(this.state.totalElements / this.state.UsersPerPage);
        if(this.state.currentPage < condition) {
            if(this.state.search) {
                this.searchData(condition);
            } else {
                this.findAllUsers(condition);
            }
        }
    };

    nextPage = () => {
        if(this.state.currentPage < Math.ceil(this.state.totalElements / this.state.UsersPerPage)) {
            if(this.state.search) {
                this.searchData(this.state.currentPage + 1);
            } else {
                this.findAllUsers(this.state.currentPage + 1);
            }
        }
    };

    searchChange = event => {
        this.setState({
            [event.target.name] : event.target.value
        });
    };

    cancelSearch = () => {
        this.setState({"search" : ''});
        this.findAllUsers(this.state.currentPage);
    };

    searchData = (currentPage) => {
        currentPage -= 1;
        axios.get("http://localhost:8081/rest/users/search/"+this.state.search+"?page="+currentPage+"&size="+this.state.usersPerPage)
            .then(response => response.data)
            .then((data) => {
                this.setState({
                    users: data.content,
                    totalPages: data.totalPages,
                    totalElements: data.totalElements,
                    currentPage: data.number + 1
                });
            });
    };

    render() {
        const {users, currentPage, totalPages, search} = this.state;

        return (
            <div>
                <div style={{"display":this.state.show ? "block" : "none"}}>
                    <MyToast show = {this.state.show} message = {"User Deleted Successfully."} type = {"danger"}/>
                </div>
                <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header>
                        <div style={{"float":"left"}}>
                            <FontAwesomeIcon icon={faList} /> User List
                        </div>
                        <div style={{"float":"right"}}>
                             <InputGroup size="sm">
                                <FormControl placeholder="Search" name="search" value={search}
                                    className={"info-border bg-dark text-white"}
                                    onChange={this.searchChange}/>
                                <InputGroup.Append>
                                    <Button size="sm" variant="outline-info" type="button" onClick={this.searchData}>
                                        <FontAwesomeIcon icon={faSearch}/>
                                    </Button>
                                    <Button size="sm" variant="outline-danger" type="button" onClick={this.cancelSearch}>
                                        <FontAwesomeIcon icon={faTimes} />
                                    </Button>
                                </InputGroup.Append>
                             </InputGroup>
                        </div>
                    </Card.Header>
                    <Card.Body>
                        <Table bordered hover striped variant="dark">
                            <thead>
                                <tr>
                                  <th>Name<div className={this.state.sortDir === "asc" ? "arrow arrow-up" : "arrow arrow-down"}> </div></th>
                                  <th>Email</th>
                                  <th>Perfil</th>
                                  <th>Telefone</th>
                                  <th>Actions</th>
                                </tr>
                              </thead>
                              <tbody>
                                {
                                    users.length === 0 ?
                                    <tr align="center">
                                      <td colSpan="7">No Users Available.</td>
                                    </tr> :
                                    users.map((user) => (
                                    <tr key={user.id}>
                                        <td>
                                            {user.name}
                                        </td>
                                        <td>{user.email}</td>
                                        <td>{user.role.name}</td>
                                        <td>{user.mobile}</td>
                                        <td>
                                            <ButtonGroup>
                                                <Link to={"edit/"+user.id} className="btn btn-sm btn-outline-primary"><FontAwesomeIcon icon={faEdit} /></Link>{' '}
                                                <Button size="sm" variant="outline-danger" onClick={this.deleteUser.bind(this, user.id)}><FontAwesomeIcon icon={faTrash} /></Button>
                                            </ButtonGroup>
                                        </td>
                                    </tr>
                                    ))
                                }
                              </tbody>
                        </Table>
                    </Card.Body>
                    {users.length > 0 ?
                        <Card.Footer>
                            <div style={{"float":"left"}}>
                                Showing Page {currentPage} of {totalPages}
                            </div>
                            <div style={{"float":"right"}}>
                                <InputGroup size="sm">
                                    <InputGroup.Prepend>
                                        <Button type="button" variant="outline-info" disabled={currentPage === 1 ? true : false}
                                            onClick={this.firstPage}>
                                            <FontAwesomeIcon icon={faFastBackward} /> First
                                        </Button>
                                        <Button type="button" variant="outline-info" disabled={currentPage === 1 ? true : false}
                                            onClick={this.prevPage}>
                                            <FontAwesomeIcon icon={faStepBackward} /> Prev
                                        </Button>
                                    </InputGroup.Prepend>
                                    <FormControl className={"page-num bg-dark"} name="currentPage" value={currentPage}
                                        onChange={this.changePage}/>
                                    <InputGroup.Append>
                                        <Button type="button" variant="outline-info" disabled={currentPage === totalPages ? true : false}
                                            onClick={this.nextPage}>
                                            <FontAwesomeIcon icon={faStepForward} /> Next
                                        </Button>
                                        <Button type="button" variant="outline-info" disabled={currentPage === totalPages ? true : false}
                                            onClick={this.lastPage}>
                                            <FontAwesomeIcon icon={faFastForward} /> Last
                                        </Button>
                                    </InputGroup.Append>
                                </InputGroup>
                            </div>
                        </Card.Footer> : null
                     }
                </Card>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        UserObject: state.user
    };
};

const mapDispatchToProps = dispatch => {
    return {
        deleteUser: (userId) => dispatch(deleteUser(userId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserList);