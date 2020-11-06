import styles from './MainContainer.module.css'
import React, { Component } from 'react';
import covid from '../../assests/covid19.png';
import analysis from '../../assests/hero-a.svg';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import Admin from '../Admin/Admin';
import Landing from '../Landing/Landing';


class MainContainer extends React.Component{
    constructor(props) {
        super(props);
      }
    render(){
        return (
            <Router>  
                <Switch>
                    <Route path="/admin">
                        <Admin />
                    </Route>
                    <Route path="/">
                        <Landing />
                    </Route>
                </Switch>
            </Router>
        );
    }
}
export default MainContainer;