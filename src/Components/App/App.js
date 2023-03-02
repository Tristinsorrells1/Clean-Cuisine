import './App.css';
import Header from "../Header/Header.js"
import Home from "../Home/Home.js"
// import Results from "../Results/Results.js"
// import ResultCard from "../ResultCard/ResultCard.js"
import Details from "../Details/Details.js"
import { Route, Routes } from "react-router";

function App() {
  return (
    <main>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<Details />} />
      </Routes>
    </main>
  );
}

export default App;
