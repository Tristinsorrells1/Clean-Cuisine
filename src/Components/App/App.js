import './App.css';
import Header from "../Header/Header.js"
import Home from "../Home/Home.js"
import Details from "../Details/Details.js"
import Error from "../Error/Error"
import { Route, Routes } from "react-router";

function App() {
  return (
    <main>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<Details />} />
        <Route path="/error" element={<Error />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </main>
  );
}

export default App;
