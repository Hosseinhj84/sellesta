import { useEffect, useState } from "react";
import api from "./api/axios";
import Home from "./pages/Home";
import Header from "./components/Header";

function App() {
  return (
    <div>
      <Header />
      <Home />
    </div>
  );
}

export default App;
