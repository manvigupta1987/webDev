import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// wrapping the browserwrapper around app, sets up the router to be able to work with all other components
// we are going to be importing next and it also listens to the url and notifies those other components when
// the url changes.

ReactDOM.render(
	<BrowserRouter><App /></BrowserRouter>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
