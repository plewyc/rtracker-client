import React from 'react';
// import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Expenses from "./routes/expenses";
import Invoices from "./routes/invoices";
import Races from "./routes/races";
import Race from "./routes/race";
import ResultsQualifying from './routes/ResultsQualifying';
import User from './routes/user';
import Login from './routes/users/Login';
import Signup from './routes/users/Signup';
import RTracker from './routes/rTracker';

const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="expenses" element={<Expenses />} />
      <Route path="invoices" element={<Invoices />} />
      <Route path="races/:id/qualifying" element={<ResultsQualifying />} />
      <Route path="races/:id" element={<Race />} />
      <Route path="races" element={<Races />} />
      <Route path="users/:id" element={<User />} />
      <Route path="users/login" element={<Login />} />
      <Route path="users/signup" element={<Signup />} />
    </Routes>
  </BrowserRouter>,
  rootElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();