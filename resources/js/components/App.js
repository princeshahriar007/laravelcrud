import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";

import { Button, Container } from "react-bootstrap";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ProjectList from "./pages/projects/ProjectList";
import ProjectCreate from "./pages/projects/ProjectCreate";
import { PUBLIC_URL } from "../constants";
import ProjectView from "./pages/projects/ProjectView";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import { checkIfAuthenticated } from "../services/AuthService";
import Routes from "./layouts/Routes";

// const App = () => {
//     return (<h1>Hello World</h1>);
// }

class App extends Component {
    state = {
        user: {},
        isLoggedIn: false
    };
    componentDidMount() {
        if (checkIfAuthenticated()) {
            this.setState({
                user: checkIfAuthenticated(),
                isLoggedIn: true
            });
        }
    }

    render() {
        return (
            <div>
                <Router>
                    <Header authData={this.state} />
                    <div>
                        {/*<nav>
                            <ul>
                                <li>
                                    <Link to={`${this.state.PUBLIC_URL}`}>
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link to={`${this.state.PUBLIC_URL}about`}>
                                        About
                                    </Link>
                                </li>
                                <li>
                                    <Link to={`${this.state.PUBLIC_URL}contact`}>
                                        Contact
                                    </Link>
                                </li>
                            </ul>
                        </nav>*/}
                        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
                        <Container className="p-4">
                            <Routes authData={this.state} />
                        </Container>
                    </div>
                    <Container>
                        <Footer />
                    </Container>
                </Router>
            </div>
        );
    }
}

export default App;

if (document.getElementById("app")) {
    ReactDOM.render(<App />, document.getElementById("app"));
}
