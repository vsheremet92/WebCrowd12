import { Component } from "solid-js";
import { Routes, Route } from "solid-app-router";
import { Header } from "./components/Header";
import { HomePage } from "./components/HomePage";
import { ItemDetail } from "./components/ItemDetail";

const App: Component = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={
          <HomePage />
        }
        />
        <Route path="/detail/:id" element={
          <ItemDetail />
        }
        />
      </Routes>
    </div>
  );
};

export default App;
