import { Router } from "react-router-dom";
import Home from "./views/home";

function App() {
  return (
    <>
      <Router path="/" exact component={Home} />
    </>
  );
}

export default App;
