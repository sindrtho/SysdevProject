// @flow
/* eslint eqeqeq: "off" */

import * as React from 'react';
import { Component } from 'react-simplified';
import { HashRouter, Route, NavLink } from 'react-router-dom';
import ReactDOM from 'react-dom';
import {Card} from './widgets';
import {Artikkel, Kategori, newsService} from './services';
import {Menu, LiveFeed} from './commonComponents';
import {NewsList, CategoryLimitedNews, NewNewsView, News} from "./views";

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