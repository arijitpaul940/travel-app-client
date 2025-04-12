import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

import { Container, SidebarMaybe } from "..";

import css from "./Header.module.css";

const Header = (props) => {
  const sidebarMaybeRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);

  const toggleSidebar = () => {
    sidebarMaybeRef.current.toggle();
  };

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header>
      <SidebarMaybe ref={sidebarMaybeRef}>
        <ul className="flex flex-col text-xl text-white [&>li]:h-16 [&>li]:text-center">
          <li className="hover:bg-white hover:text-[#242424] active:bg-white active:text-[#242424]">
            <Link
              to="/"
              className="flex h-full w-full items-center justify-center"
            >
              Home
            </Link>
          </li>
          <li className="hover:bg-white hover:text-[#242424] active:bg-white active:text-[#242424]">
            <Link
              to="/visited-places"
              className="flex h-full w-full items-center justify-center"
            >
              Visited Places
            </Link>
          </li>
          <li className="hover:bg-white hover:text-[#242424] active:bg-white active:text-[#242424]">
            <Link
              to="/recommendations"
              className="flex h-full w-full items-center justify-center"
            >
              Recommendations
            </Link>
          </li>
        </ul>
      </SidebarMaybe>

      <nav
        className={`${css.navbar} ${
          scrolled ? `${css.navbarScrolled} opacity-100` : ""
        }`}
      >
        <Container
          data-aos="fade-up"
          className="flex flex-row items-center justify-between md:flex-row"
        >
          <div className="text-2xl">
            <Link to="/">Travel Recommender</Link>
          </div>

          <ul className="hidden items-center gap-10 text-xl md:flex">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/visited-places">Visited Places</Link>
            </li>
            <li>
              <Link to="/recommendations">Recommendations</Link>
            </li>
          </ul>

          <button
            onClick={toggleSidebar}
            className="block md:hidden !bg-transparent"
          >
            <i className="fa-solid fa-bars text-2xl"></i>
          </button>
        </Container>
      </nav>
    </header>
  );
};

export default Header;
