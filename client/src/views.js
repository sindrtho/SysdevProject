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

export class ListOfNews extends Component<{Cases: Artikkel[]}> {
    render() {
        return (
            <ul className="list-of-news list-group">
                {
                    this.props.Cases.map(e => {
                        return (
                            <li className="list-group-item" key={e.id}>
                                <NavLink activeStyle={{ color: 'darkblue' }} to={'/artikkel/' + e.id}>
                                    <NewsCase tittel={e.tittel} kategori={e.kategori} dato={e.tidspunkt} imgurl={e.bilde}/>
                                </NavLink>
                            </li>
                        );
                    })
                }
            </ul>
        )
    }
}

export class NewsList extends Component {
    Cases: Artikkel[] = [];

    render() {
        return (
            <div>
                <h1>Alle Nyheter</h1>
                <ListOfNews Cases={this.Cases}></ListOfNews>
            </div>
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
            <div>
                <h1>{this.props.match.params.kategori.toUpperCase()}</h1>
                <ListOfNews Cases={this.Cases}></ListOfNews>
            </div>
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
                                <div className="articlecontainer_hashincase">
                                    <h1>{e.tittel}</h1>
                                    <img src={e.bilde}/>
                                    <div className={"tid_og_kategori"}>
                                        <p>{e.tidspunkt}</p>
                                        <p>{e.kategori}</p>
                                    </div>
                                </div>
                                    <div className="content">
                                        {
                                            e.innhold.split('\n').filter(e => e != '').map(a => {
                                                return <p className="content_text">{a}</p>
                                            })
                                        }

                                    </div>
                                    <NavLink activeStyle={{color: 'darkblue'}} to={'/rediger/' + e.id}>
                                        <button className="editbutton">REDIGER</button>
                                    </NavLink>
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

        newsService.addANews(newCase)
            .then(a => {
                    console.log(a);
                    this.props.history.push('/artikkel/' + a.insertId);
                })
    }

    mounted() {
        newsService.getCategories()
            .then(e => this.categories = e)
            .catch(err => console.log(err.toString()))
    }
}

export class EditNewsView extends Component<{match: {params: {id: number}}, history: string[]}> {
    Case: Artikkel[] = [];
    categories: Kategori[] = [];

    render() {
        if(this.Case[0] == null)
            return null;
        return (
            <div>
                <form onSubmit={this.validation}>
                    <div className="form-groug">
                        <label htmlFor="newNewsCase">Tittel</label>
                        <input name="tittel" onChange={this.handle} type="text" className="form-control" id="titleinput" placeholder="Tittel" value={this.Case[0].tittel} required/>
                    </div>
                    <div className="form-groug">
                        <label htmlFor="newNewsCase">Bilde</label>
                        <input name="bilde" onChange={this.handle} type="text" className="form-control" id="imageinput" placeholder="Bilde URL" value={this.Case[0].bilde} required/>
                    </div>
                    <div className="form-groug">
                        <label htmlFor="newNewsCase">Artikkel Innhold</label>
                        <textarea name="innhold" onChange={this.handle} className="form-control" id="contentinput" placeholder="Innhold" rows="15" value={this.Case[0].innhold} required/>
                    </div>
                    <div className="form-groug">
                        <label htmlFor="newNewsCase">Kategori</label>
                        <select name="kategori" onChange={this.handle} className="form-control" id="categorychoser" value={this.Case[0].kategori}>
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
                        <label name="viktighet" className="form-check-label" htmlFor="newNewsCase">Viktig</label>
                    </div>
                    <button className="btn btn-primary" type="submit">Lagre</button>
                </form>
                <button onClick={this.delete} className="deletebutton">DELETE</button>
            </div>
        );
    }

    handle(event: { target: { name: string, value: string } }) {
        this.Case[0][event.target.name] = event.target.value;
    }

    mounted() {
        newsService.getCategories()
            .then(e => this.categories = e)
            .catch(err => console.log(err.toString()))
        newsService.getANews(this.props.match.params.id)
            .then(e => {
                this.Case = e;
                console.log(e);
            })
            .catch(err => console.log(err.toString()))
    }

    validation(event: Event) {
        event.preventDefault();
        let newCase: Object = {};

        newCase.id = this.props.match.params.id;
        newCase.tittel = (document.getElementById('titleinput'): any).value;
        newCase.innhold = (document.getElementById('contentinput'):any ).value;
        newCase.bilde = (document.getElementById('imageinput'):any ).value;
        if((document.getElementById('importanceinput'): any).checked) {
            newCase.viktighet = 1;
        } else {
            newCase.viktighet = 2;
        }
        newCase.kategori = (document.getElementById('categorychoser'):any ).value;

        newsService.editNews(newCase)
            .then(() => this.props.history.push('/artikkel/' + this.props.match.params.id))
            .catch(err => console.log(err.toString()))
    }

    delete() {
        newsService.deleteNews(this.props.match.params.id)
            .then(e => this.props.history.push('/'))
            .catch(err => console.log(err.toString()))
    }
}