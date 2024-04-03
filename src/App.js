import Header from "./components/Header";
import GlobalStyles from "./components/GlobalStyle";
import Login from "./components/Login";
import Home from "./components/Home";
import Search from "./components/Search";
import Events from "./components/Events";
import Connect from "./components/Connect";
import AboutUs from "./components/AboutUs";
import Clubs from "./components/Clubs";
import { Route, Routes } from "react-router-dom";
import Footer from './components/Footer';
import Routing from "./components/Routing";
function App() {
  return (
    <div className="App">
      <GlobalStyles />
      <Header />
      <Routing/>
      <Footer/>
      
    </div>
  );
}

export default App;
