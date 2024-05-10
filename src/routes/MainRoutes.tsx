
// ==============================|| MAIN ROUTING ||============================== //

import Dashboard from "../app/Dashboard/Dashboard";
import Topbar from "../app/Dashboard/Topbar";
import DataExploration from "../app/DataExploration/DataExploration";
import DataExplainability from "../app/Explainability/DataExplaiability";

const MainRoutes = {
  path: '/',
  element: <Dashboard/>,
  children: [
    {
      path: '/data_explanation',
      element: <DataExploration/>
    },
    {
      path: '/explainability',
      element: <>
      <Topbar/>
      <DataExplainability/>
      
      </>
    },
  ]
};

export default MainRoutes;
