// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
import { HashRouter, Route, NavLink } from 'react-router-dom';
import ReactDOM from 'react-dom';
import {Card} from './widgets';
import {Artikkel, Kategori, newsService} from './services';

let history = [];

export class Menu extends Component {
    render() {
        return (
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="flexbox">
                    <NavLink activeStyle={{color: 'darkblue'}} to={'/'}>
                        <div className="logocontainer">
                            <img className="navbar-brand" src="logo.jpg"/>
                        </div>
                    </NavLink>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="flexbox collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <NavLink activeStyle={{color: 'darkblue'}} to={'/kategori/sport'}>
                                    <h4 className="navbar-brand navbarlink">Sport</h4>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink activeStyle={{color: 'darkblue'}} to={'/kategori/underholdning'}>
                                    <h4 className="navbar-brand navbarlink">Underholdning</h4>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink activeStyle={{color: 'darkblue'}} to={'/kategori/drap'}>
                                    <h4 className="navbar-brand navbarlink">Drap</h4>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink activeStyle={{color: 'darkblue'}} to={'/kategori/utenriks'}>
                                    <h4 className="navbar-brand navbarlink">Utenriks</h4>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink activeStyle={{color: 'darkblue'}} to={'/kategori/mat'}>
                                    <h4 className="navbar-brand navbarlink">Mat</h4>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink activeStyle={{color: 'darkblue'}} to={'/ny'}>
                                    <h4 className="navbar-brand navbarlink">Ny Artikkel</h4>
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

export class LiveFeed extends Component {
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
        setInterval(this.fetchData, 1000);
    }

    fetchData() {
        newsService.getLatest()
            .then(e => this.Cases = e)
            .catch(err => console.log(err))
    }
}