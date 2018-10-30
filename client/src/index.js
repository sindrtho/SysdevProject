/* eslint eqeqeq: "off" */

import * as React from 'react';
import { Component } from 'react-simplified';
import { HashRouter, Route, NavLink } from 'react-router-dom';
import ReactDOM from 'react-dom';
import {Card} from './widgets';

let history = [];

class Menu extends Component {
    render() {
        return (
            <nav class="navbar navbar-dark bg-dark">
                <table>
                    <tbody>
                    <tr>
                        <td>
                            <NavLink activeStyle={{color: 'darkblue'}} to={'/'}>
                                <img className="navbar-brand" src="logo.jpg"/>
                            </NavLink>
                        </td>
                        <td>
                            <NavLink activeStyle={{color: 'darkblue'}} to={'/kategori/kategori1'}>
                                <h3 className="navbar-brand">Kategori 1</h3>
                            </NavLink>
                        </td>
                        <td>
                            <NavLink activeStyle={{color: 'darkblue'}} to={'/kategori/kategori3'}>
                                <h3 className="navbar-brand">Kategori 3</h3>
                            </NavLink>
                        </td>
                        <td>
                            <NavLink activeStyle={{color: 'darkblue'}} to={'/kategori/kategori3'}>
                                <h3 className="navbar-brand">Kategori 3</h3>
                            </NavLink>
                        </td>
                        <td>
                            <NavLink activeStyle={{color: 'darkblue'}} to={'/kategori/kategori8'}>
                                <h3 className="navbar-brand">Kategori 8</h3>
                            </NavLink>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </nav>
        );
    }
}

class NewsCase extends Component {
    render () {
        return (
            <div className="card">
                <h1>{this.props.tittel}</h1>
                <div className="container">
                    <div className="imgcontainer">
                        <img src={this.props.imgurl}/>
                    </div>
                    <div className="info">
                        <ul>
                            <li className="dateEntry">Publisert: {this.props.dato}</li>
                            <li className="categoryEntry">Kategori: {this.props.kategori}</li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    };
}

class NewsFeed extends Component {
    render() {
        return (
            <div className="marquee">
                <img id="livefeedSymbol" src="livefeed.png"/>
                <div className="midmarquee">
                    <div className="innermarquee">
                        <p id="livefeedTitler"><a href='./artikkel_EM.html'>LIVE: BURN</a></p>
                    </div>
                </div>
            </div>
        );
    }
}

class NewsList extends Component {
    constructor(props){
        super(props);
        this.state = {
            result: [],
            url: "http://localhost:8080/artikkel"
        }
    }

    render() {
        return (
            <ul className="list-of-news">
                {
                    this.state.result.map(e => {
                        return (<li>
                            <NavLink activeStyle={{ color: 'darkblue' }} to={'/artikkel/' + e.id}>
                                <NewsCase tittel={e.tittel} kategori={e.kategori} dato={e.tidspunkt} imgurl={e.bilde}/>
                            </NavLink>
                        </li>);
                    })
                }
            </ul>
        );
    }

    componentDidMount(){
        fetch(this.state.url, {
            method: "GET",
            headers: {
                "Content-Type" : "application/json"
            }
        })
            .then(res => res.json())
            .then(res2 => this.setState({result: res2}))
            .catch(error => {
                console.log(error)
            })
    }
}

class News extends Component {
    constructor(props) {
        super(props);
        this.state = {
            results: [],
            url: "http://localhost:8080/artikkel/" + props.match.params.id
        };
    }

    render() {
        return (
            <div>
                {
                    this.state.results.map(e => {
                        return(
                            <div>
                                <h1>{e.tittel}</h1>
                                <div>
                                    <div className="imgcontainer">
                                        <img src={e.bilde}/>
                                    </div>
                                    <div className="content">
                                        <p>{e.innhold}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        );
    }

    componentDidMount() {
        console.log(this.state.url);
        fetch(this.state.url, {
            method: "GET",
            headers: {
                "Content-Type" : "application/json"
            }
        })
            .then(res => res.json())
            .then(res2 => this.setState({results: res2}))
            .catch(error => {
                console.log(error)
            })
    }
}

const root = document.getElementById('root');

if (root)
    ReactDOM.render(
        <HashRouter>
            <div>
                <div id="navigationbar">
                   <Menu/>
                </div>
                <div id="main">
                    <Route exact path="/" component={NewsList}/>
                    <Route exact path="/artikkel/:id" component={News}/>
                </div>
            </div>
        </HashRouter>,
        root
    );
