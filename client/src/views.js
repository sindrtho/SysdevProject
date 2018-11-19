// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
import { HashRouter, Route, NavLink } from 'react-router-dom';
import ReactDOM from 'react-dom';
import {Card} from './widgets';
import {Artikkel, Kategori, newsService} from './services';

let history = [];

export class NewsCase extends Component<{tittel: string, kategori: string, dato: string, imgurl: string}> {
    render () {
        return (
            <Card title={this.props.tittel}>
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
            </Card>
        );
    };
}

export class NewsList extends Component {
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

export class CategoryLimitedNews extends Component<{match: {params: {kategori: string}}}> {
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

export class News extends Component<{match: {params: {id: number}}}> {
    Case: Artikkel[] = [];

    render() {
        return (
            <div>
                {
                    this.Case.map(e => {
                        return (
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
                        )
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

export class NewNewsView extends Component<{history: string[]}> {
    categories: Kategori[] = [];
    myNewCase: Artikkel[] = [];

    render() {
        return (
            <div>
                <form onSubmit={this.validation}>
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
    }

    validation() {
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
                    .then(e => this.props.history.push('/artikkel/' + e[0].id))
                    .catch(err => console.log(err.toString())
                    )
            )
    }

    mounted() {
        newsService.getCategories()
            .then(e => this.categories = e)
            .catch(err => console.log(err.toString()))
    }
}