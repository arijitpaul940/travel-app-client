import App from "../App";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import {
  HomePage,
  NotFoundPage,
  VisitedPlacesPage,
  RecommendedPlacesPage,
} from "../containers";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<HomePage />} />
      <Route path="visited-places" element={<VisitedPlacesPage />} />
      <Route path="recommendations" element={<RecommendedPlacesPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
);

export default router;
