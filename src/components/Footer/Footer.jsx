import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-gray-300 py-4 mt-10">
      <div className="container mx-auto text-center text-sm">
        <p>© {currentYear} Travel Recommender. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
