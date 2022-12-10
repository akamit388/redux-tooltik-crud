// import logo from './logo.svg';
// import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Add from "./components/Add";
import Home from "./components/Home";

function App() {
  return (
    <>
      <div className="container">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/add" element={<Add />}></Route>
          </Routes>
        </BrowserRouter>
        
      </div>
    </>
  );
}

export default App;
