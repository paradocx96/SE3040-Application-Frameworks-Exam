import React, {Component} from 'react';
import { BrowserRouter as Router, Redirect, Switch, Route } from 'react-router-dom';

import NavigationBar from "./NavigationBar";
import Homepage from "../pages/Homepage";
import AddCategory from "../category/AddCategory";
import ViewCategory from "../category/ViewCategory";
import AddProduct from "../product/AddProduct";
import ViewProducts from "../product/ViewProducts";
import Calculator from "../calculate/Calculator";

class Routes extends Component {

    render() {
        return (
            <div>
                <Router>
                    <NavigationBar />
                    <Switch>
                        <Route exact path="/"><Homepage /></Route>
                        <Route path="/add-category"><AddCategory /></Route>
                        <Route path="/category"><ViewCategory /></Route>
                        <Route path="/add-product"><AddProduct/></Route>
                        <Route path="/product"><ViewProducts/></Route>
                        <Route path="/calculate"><Calculator/></Route>
                        <Redirect to='/' />
                    </Switch>
                </Router>
            </div>
        )
    }
}

export default Routes;