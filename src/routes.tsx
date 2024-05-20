import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import DataExploration from "./app/DataExploration/DataExploration"
import DataExplainability from "./app/Explainability/DataExplaiability"
import Dashboard from "./app/Dashboard/dashboard";

const routes = createBrowserRouter(
  createRoutesFromElements(
    <>
        <Route path="/" element={<Dashboard />} />
        <Route path="/explainability" element={<DataExplainability />} />
        <Route path="/data_explanation" element={<DataExploration />} />
    </>
  ));

export default routes;
