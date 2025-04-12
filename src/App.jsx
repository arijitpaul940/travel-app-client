import React, { useEffect } from "react";
import AOS from "aos";
import { Outlet } from "react-router-dom";

import { Header, Footer } from "./components";

import "aos/dist/aos.css";

function App() {
  useEffect(() => {
    AOS.init({
      offset: 50,
      mirror: false,
      duration: 500,
      easing: "ease-in-out",
    });
  }, []);

  return (
    <main>
      <Header />
      <Outlet />
      <Footer />
    </main>
  );
}

export default App;
