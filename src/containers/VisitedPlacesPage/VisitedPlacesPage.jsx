import React from "react";

import { Hero, Container, VisitedPlaces } from "../../components";

const VisitedPlacesPage = (props) => {
  return (
    <div>
      <Hero />

      <Container>
        <VisitedPlaces />
      </Container>
    </div>
  );
};

export default VisitedPlacesPage;
