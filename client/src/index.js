// @flow
/* eslint eqeqeq: "off" */

import * as React from 'react';
import { Component } from 'react-simplified';
import { HashRouter, Route, NavLink } from 'react-router-dom';
import ReactDOM from 'react-dom';
import {Card} from './widgets';
import {Artikkel, Kategori, newsService} from './services';

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
                                <div className="logocontainer">
                                    <img className="navbar-brand" src="logo.jpg"/>
                                </div>
                            </NavLink>
                        </td>
                        <td className="linkcolumn">
                            <NavLink activeStyle={{color: 'darkblue'}} to={'/kategori/sport'}>
                                <h4 className="navbar-brand navbarlink">Sport</h4>
                            </NavLink>
                        </td>
                        <td className="linkcolumn">
                            <NavLink activeStyle={{color: 'darkblue'}} to={'/kategori/underholdning'}>
                                <h4 className="navbar-brand navbarlink">Underholdning</h4>
                            </NavLink>
                        </td>
                        <td className="linkcolumn">
                            <NavLink activeStyle={{color: 'darkblue'}} to={'/kategori/drap'}>
                                <h4 className="navbar-brand navbarlink">Drap</h4>
                            </NavLink>
                        </td>
                        <td className="linkcolumn">
                            <NavLink activeStyle={{color: 'darkblue'}} to={'/kategori/utenriks'}>
                                <h4 className="navbar-brand navbarlink">Utenriks</h4>
                            </NavLink>
                        </td>
                        <td className="linkcolumn">
                            <NavLink activeStyle={{color: 'darkblue'}} to={'/kategori/mat'}>
                                <h4 className="navbar-brand navbarlink">Mat</h4>
                            </NavLink>
                        </td>
                        <td className="linkcolumn">
                            <NavLink activeStyle={{color: 'darkblue'}} to={'/ny'}>
                                <h4 className="navbar-brand navbarlink">Ny Artikkel</h4>
                            </NavLink>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </nav>
        );
    }
}

class NewsCase extends Component<{tittel: string, kategori: string, dato: string, imgurl: string}> {
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

class NewsList extends Component {
    Cases: Artikkel[] = [];

    render() {
        return (
            <ul className="list-of-news list-group">
                {
                    this.Cases.map(e => {
                        return (<li className="list-group-item">
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

class CategoryLimitedNews extends Component<{match: {params: {kategori: string}}}> {
    Cases: Artikkel[] = [];

    render() {
        return (
            <ul className="list-of-news list-group">
                {
                    this.Cases.map(e => {
                        return (<li className="list-group-item">
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
        newsService.getCategoryNews(this.props.match.params.kategori)
            .then(e => {
                this.Cases = e;
                console.log(this.props.match.params.kategori);
            })
            .catch(err => console.log(err))
    }
}

class News extends Component<{match: {params: {id: number}}}> {
    Case: Artikkel;

    render() {
        return (
            <div>
                <div>
                    <h1>{this.Case.tittel}</h1>
                    <div>
                        <div className="imgcontainer">
                            <img src={this.Case.bilde}/>
                        </div>
                        <div className="content">
                            <p>{this.Case.innhold}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    mounted() {
        newsService.getANews(this.props.match.params.id)
            .then(e => this.Case = e)
            .catch(err => console.log(err))
    }
}

class NewNewsView extends Component {
    categories: Kategori[] = [];
    myNewCase: Artikkel[] = [];

    render() {
        return (
            <div>
                <form onSubmit={validation}>
                    <div className="form-groug">
                        <label htmlFor="newNewsCase">Tittel</label>
                        <input type="text" className="form-control" id="titleinput" placeholder="Tittel" required/>
                    </div>
                    <div className="form-groug">
                        <label htmlFor="newNewsCase">Bilde</label>
                        <input type="text" className="form-control" id="imageinput" placeholder="Bilde URL" required/>
                    </div>
                    <div className="form-groug">
                        <label htmlFor="newNewsCase">Artikkel Innhold</label>
                        <textarea className="form-control" id="contentinput" placeholder="Innhold" rows="15" required/>
                    </div>
                    <div className="form-groug">
                        <label htmlFor="newNewsCase">Kategori</label>
                        <select className="form-control" id="categorychoser">
                            {
                                this.categories.map(e => {
                                    return (
                                        <option>{e.navn}</option>
                                    );
                                })
                            }
                        </select>
                    </div>
                    <div className="form-check">
                        <input type="checkbox" className="form-check-input-lg" value="" id="importanceinput"/>
                        <label className="form-check-label" htmlFor="newNewsCase">Viktig</label>
                    </div>
                    <button className="btn btn-primary" type="submit">Lagre</button>
                </form>
            </div>
        );

        function validation() {
            let newCase: Object = {};

            newCase.tittel = (document.getElementById('titleinput'): any).value;
            newCase.innhold = (document.getElementById('contentinput'):any ).value;
            newCase.bilde = (document.getElementById('imageinput'):any ).value;
            if((document.getElementById('importanceinput'): any).checked) {
                newCase.viktighet = 1;
            } else {
                newCase.viktighet = 2;
            }
            newCase.kategori = (document.getElementById('categorychoser'):any ).value;

            console.log(JSON.stringify(newCase));

            newsService.addANews(newCase)
                .then(a =>
                    newsService.getLatest()
                        .then(e => history.push('/artikkel/' + e[0].id))
                        .catch(err => console.log(err.toString())
                        )
                )
        }
    }

    mounted() {
        newsService.getCategories()
            .then(e => this.categories = e)
            .catch(err => console.log(err.toString()))
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
                                <div className="carousel-item active">
                                    <NavLink activeStyle={{ color: 'darkblue' }} to={'/artikkel/' + e.id}>
                                        <h2>{e.tittel}</h2>
                                        <p>{e.tidspunkt}</p>
                                    </NavLink>
                                </div>
                            );
                        })
                    }
                    {
                        this.Cases.slice(1).map(e => {
                            return (
                                <div className="carousel-item">
                                    <NavLink activeStyle={{ color: 'darkblue' }} to={'/artikkel/' + e.id}>
                                        <h2>{e.tittel}</h2>
                                        <p>{e.tidspunkt}</p>
                                    </NavLink>
                                </div>
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
                    <Route exact path="/kategori/:kategori" component={CategoryLimitedNews}/>
                    <Route exact path="/ny" component={NewNewsView}/>
                    <Route exact path="/rediger/:id" component={NewNewsView}/>
                </div>
            </div>
        </HashRouter>,
        root
    );