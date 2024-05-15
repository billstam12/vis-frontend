// import { IQuery } from "../../types/query.model";

// // A mock function to mimic making an async request for data
// export const fetchData = (query: IQuery) => {
//    return {data: []};
// }
  


import axios from "axios";
import { IQuery } from "../../types/query.model";
// A mock function to mimic making an async request for data
export const fetchData = async (feature1: String, xaitype: String,method:String, feature2: string) => {
   const response = await axios.post(
      'http://localhost:8080/api/visualization/explainability/i2cat_desktop_features',
      {
        "modelId": "UNSW_NB15_model",
        "explainabilityType": xaitype,
        "explainabilityMethod": method,
        "visualizationType": "line",
        "constraints": {},
        "additionalParams": {
          "feature1": feature1,
          "feature2": feature2
        }});
   return response;
}
