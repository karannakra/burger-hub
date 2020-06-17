import React, { Component } from 'react';

import BurgerBuilders from "./containers/BurgerBuilder/BurgerBuilder";

import Layout from "./components/Layout/layout";

class App extends Component{
    render() {
        return(
            <div>
                <Layout>
                    <BurgerBuilders/>
                </Layout>
            </div>
        );
    }

}





export default App;
