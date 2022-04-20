import { Routes, Route } from "react-router-dom";
import Home from "./views/home/index";

function App() {
  return (
      <Routes>
        <Route path="/" exact element = { <Home /> } />
      </Routes>
  );
}

export default App;
