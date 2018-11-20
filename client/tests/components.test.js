import * as React from 'react';
import ReactDOM from 'react-dom';
import { Component } from 'react-simplified';
import { NewsCase, ListOfNews, News, NewNewsView, EditNewsView } from '../src/views.js';
import { Footer, Menu, LiveFeed } from '../src/commonComponents';
import {shallow, mount, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const newsCases = [
    {id:1, innhold:"a", viktighet:1, bilde:"abc", tittel:"tittel1", tidspunkt:"2018-07-03 14:15", kategori:"Sport"},
    {id:2, innhold:"a", viktighet:1, bilde:"def", tittel:"tittel2", tidspunkt:"2018-07-03 15:15", kategori:"Drap"},
    {id:3, innhold:"a", viktighet:1, bilde:"ghi", tittel:"tittel3", tidspunkt:"2018-07-03 16:15", kategori:"Mat"},
    {id:4, innhold:"a", viktighet:1, bilde:"jkl", tittel:"tittel4", tidspunkt:"2018-07-03 17:15", kategori:"Mat"},
    {id:5, innhold:"a", viktighet:1, bilde:"mno", tittel:"tittel5", tidspunkt:"2018-07-03 18:15", kategori:"Utenriks"}
];

describe('Testing', () => {
    it('Renders Menu without problems', () => {
        const div = document.createElement('div');
        ReactDOM.render(<LiveFeed/>, div);
        ReactDOM.unmountComponentAtNode(div);
    });
    it('Renders Footer without problems', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Footer/>, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('Not really sure what to test, so...', () => {
        const news = shallow(<News match={{params:{id:2}}}/>);
        expect(news.find('div').length).toEqual(1);
    })

    it('Testing right ammount of newscases in ListOfNews', () => {
        const newsList = shallow(<ListOfNews Cases={newsCases}/>);
        expect(newsList.find('NewsCase').length).toEqual(5);
    })

    it('Testing a newsCase to see if stuff works', () => {
        const newCase = shallow(<NewsCase tittel="ny tittel" kategori="Sport" dato="2018-11-11 11:11" imgurl="lkjhgfdsa"/>);
        expect(newCase.find('li').length).toEqual(2);
        expect(newCase.find('div').length).toEqual(3);
        expect(newCase.find('.imgcontainer').length).toEqual(1);
        expect(newCase.find('img').props('src').src).toEqual('lkjhgfdsa');
        expect(newCase.find('.categoryEntry').text()).toEqual('Kategori: Sport');
    })
})