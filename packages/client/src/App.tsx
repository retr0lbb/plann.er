import {createBrowserRouter, RouterProvider} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>I'm a furry</div>
  },
  {
    path: "/test",
    element: <div>I'm a Programmer</div>
  }
]);


export function App() {
  return <RouterProvider router={router} />
}
