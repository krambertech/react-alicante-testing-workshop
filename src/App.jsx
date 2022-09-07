import React from "react";
import { BrowserRouter, Routes, Route, Link, NavLink } from "react-router-dom";

import Header from "./components/Header";
import Navigation from "./components/Navigation";

import examples from "./examples";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Header />
      <BrowserRouter>
      <main className="App-main">
        <Navigation />
        <div className="App-content">
        <Routes>
          <Route index>Please choose an example</Route>
          {examples.map(({route, component: Component}) => (
            <Route key={route} path={route} element={<Component />} />
          ))}
        </Routes>
        </div>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
