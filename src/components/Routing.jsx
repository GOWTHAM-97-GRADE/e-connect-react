
import Login from "./Login";
import Home from "./Home";
import Search from "./Search";
import Events from "./Events";
import Connect from "./Connect";
import AboutUs from "./AboutUs";
import Clubs from "./Clubs";
import { Route, Routes } from "react-router-dom";

function Routing() {
  return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/events" element={<Events />} />
        <Route path="/clubs" element={<Clubs />} />
        <Route path="/connect" element={<Connect />} />
        <Route path="/aboutus" element={<AboutUs />} />
      </Routes>
  );
}

export default Routing;
