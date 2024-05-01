
// ==============================|| MAIN ROUTING ||============================== //

import Dashboard from "../app/Dashboard/Dashboard";

const MainRoutes = {
  path: '/',
  element: <Dashboard/>,
  children: [
    {
      path: '/',
      element: <></>
    },
  ]
};

export default MainRoutes;
