import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import Dashboard from "./app/Dashboard/Dashboard";

const routes = createBrowserRouter(
  createRoutesFromElements(
    <>
        <Route path="/" element={<Dashboard />} />
    </>
  ));

export default routes;
