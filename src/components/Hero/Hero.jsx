import React from "react";

import HeroImage from "../../assets/hero.png";

const Hero = (props) => {
  return (
    <section
      id=""
      data-aos="fade-in"
      className="flex min-h-screen w-full items-center justify-center text-white"
    >
      <div
        style={{
          background: `linear-gradient(-45deg, #0000004d, #0009), url(${HeroImage}) no-repeat`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor: "rgba(0, 0, 0, 0.3)",
        }}
        className="absolute right-0 top-0 z-[-1] h-full w-full bg-gradient-to-br from-black to-transparent"
      ></div>
    </section>
  );
};

export default Hero;
