// @flow
/* eslint eqeqeq: "off" */

import * as React from 'react';
import { Component } from 'react-simplified';
import { HashRouter, Route, NavLink } from 'react-router-dom';
import ReactDOM from 'react-dom';

export class Card extends Component {
    render() {
        return(
            <div className="card">
                <h5>{this.props.title}</h5>
            </div>
        );
    }
}