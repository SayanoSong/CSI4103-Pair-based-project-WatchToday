import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./styles/index.scss";
import { createRoot } from 'react-dom/client';


const domNode = document.getElementById('root');
const root = createRoot(domNode);
root.render(<App />);