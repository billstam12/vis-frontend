import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import Dashboard from "./app/Dashboard/dashboard";

const routes = createBrowserRouter(
  createRoutesFromElements(
    <>
        <Route path="/" element={<Dashboard />} />
    </>
  ));

export default routes;
