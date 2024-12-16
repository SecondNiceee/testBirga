


import React from "react";
import { createRoot } from "react-dom/client";
import { Provider, } from 'react-redux';
import store from './store/index'
import App from "./App";

import './css/Main.css'
import './css/Fonts.css'

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

window.Buffer = window.Buffer || require("buffer").Buffer;

root.render(
    // <React.StrictMode>
        <Provider store={store}>
                <App />
        </Provider>
    // </React.StrictMode> */}
);



