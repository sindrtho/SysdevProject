/* eslint eqeqeq: "off" */

import * as React from 'react';
import { Component } from 'react-simplified';
import { HashRouter, Route, NavLink } from 'react-router-dom';
import ReactDOM from 'react-dom';
import {Card} from './widgets';
import {newsService} from './services';

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
    Cases = [];

    render() {
        return (
            <ul className="list-of-news">
                {
                    this.Cases.map(e => {
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

    mounted() {
        newsService.getNews()
            .then(e => this.Cases = e)
            .catch(err => console.log(err))
    }
}

class News extends Component {
    Case = [];

    render() {
        return (
            <div>
                {
                    this.Case.map(e => {
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

    mounted() {
        newsService.getANews(this.props.match.params.id)
            .then(e => this.Case = e)
            .catch(err => console.log(err))
    }
}

class LiveFeed extends Component {
    Cases = []

    render() {
        return (
            <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                <ol className="carousel-indicators">
                    <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                    {
                        this.Cases.slice(1).map((e, index) => {
                            return(
                                <li key={index} data-target="#carouselExampleIndicators" data-slide-to={index + 1}></li>
                            );
                        })
                    }
                </ol>
                <div className="carousel-inner">
                    {
                        this.Cases.slice(0, 1).map(e => {
                            return(
                                <NavLink activeStyle={{ color: 'darkblue' }} to={'/artikkel/' + e.id}>
                                    <div className="carousel-item active">
                                        <h2>{e.tittel}</h2>
                                        <p>{e.tidspunkt}</p>
                                    </div>
                                </NavLink>
                            );
                        })
                    }
                    {
                        this.Cases.slice(1).map(e => {
                            return (
                                <NavLink activeStyle={{ color: 'darkblue' }} to={'/artikkel/' + e.id}>
                                    <div className="carousel-item">
                                        <h2>{e.tittel}</h2>
                                        <p>{e.tidspunkt}</p>
                                    </div>
                                </NavLink>
                            );
                        })
                    }
                </div>
                <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>
        );
    }

    mounted() {
        newsService.getLatest()
            .then(e => this.Cases = e)
            .catch(err => console.log(err))
    }
}

const root = document.getElementById('root');

if (root)
    ReactDOM.render(
        <HashRouter>
            <div>
                <div id="navigationbar">
                    <Menu/>
                    <LiveFeed/>
                </div>
                <div id="main">
                    <Route exact path="/" component={NewsList}/>
                    <Route exact path="/artikkel/:id" component={News}/>
                </div>
            </div>
        </HashRouter>,
        root
    );
