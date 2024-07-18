import {createBrowserRouter, RouterProvider} from "react-router-dom";
import { CreateTripPage } from "./pages/create-trip";
import { TripDetailsPage } from "./pages/trip-details";
import { TestRoute } from "./components/test-route";

const router = createBrowserRouter([
  {
    path: "/",
    element: <CreateTripPage />
  },
  {
    path: "/trips/:tripId",
    element: <TripDetailsPage />
  },
  {
    path: "test/:testId",
    element: <TestRoute />
  }
]);


export default function App() {
  return <RouterProvider router={router} />
}
