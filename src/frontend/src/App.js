import "./App.css";
import Verse from "./components/Verse/Verse";
import NavBar from "./components/NavBar/NavBar";

import { Helmet } from "react-helmet";

function App() {
  return (
    <div className="App">
      <Helmet>
        <script
          src="https://kit.fontawesome.com/13fdecaf2e.js"
          crossorigin="anonymous"
        ></script>
      </Helmet>
      <NavBar />
      <Verse />
    </div>
  );
}

export default App;
