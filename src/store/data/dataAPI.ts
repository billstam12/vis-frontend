

import axios from "axios";
// A mock function to mimic making an async request for data
export const fetchTSData = async (dataset_id,columns,visualizationType,aggFunction,filters,limit) => {
    const response = await axios.post(
      `http://leviathan.imsi.athenarc.gr:8080/api/visualization/data/${dataset_id}`,
      {
        "visualizationType": visualizationType,
        "columns": columns,
        "aggFucntion": aggFunction,
        "groupBy": [],
        "filters": filters,
        "constraints": {},
        "taskId": "2",
        "limit": limit
    });
   return response;
}