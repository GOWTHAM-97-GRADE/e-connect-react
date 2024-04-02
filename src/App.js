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
function App() {
  return (
    <div className="App">
      <GlobalStyles />
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/events" element={<Events />} />
        <Route path="/clubs" element={<Clubs />} />
        <Route path="/connect" element={<Connect />} />
        <Route path="/aboutus" element={<AboutUs />} />
      </Routes>
    </div>
  );
}

export default App;
