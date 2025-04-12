import React from "react";

import { Hero, Container, RecommendedPlaces } from "../../components";

const RecommendedPlacesPage = (props) => {
  return (
    <div>
      <Hero />

      <Container>
        <RecommendedPlaces />
      </Container>
    </div>
  );
};

export default RecommendedPlacesPage;
