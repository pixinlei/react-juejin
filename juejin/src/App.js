import React from 'react'
import './App.css';
import Index from "./pages/index/index";
import {Provider} from "react-redux";
import store from "./store";
import {BrowserRouter} from 'react-router-dom'

function App() {
  return (
    <Provider store={store}>
        <BrowserRouter>
            <div className="App">
                <Index/>
            </div>
        </BrowserRouter>
    </Provider>
  );
}

export default App;
