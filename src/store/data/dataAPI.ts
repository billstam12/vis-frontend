import { IQuery } from "../../types/query.model";

// A mock function to mimic making an async request for data
export const fetchData = (query: IQuery) => {
   return {data: []};
}
  


// import axios from "axios";
// import { IQuery } from "../../types/query.model";

// // A mock function to mimic making an async request for data
// export const fetchData = async (query: IQuery) => {
//    const response = await axios.post(
//       'http://localhost:8080/api/visualization/explainability/i2cat_desktop_features',
//       {
//         "modelId": "UNSW_NB15_model",
//         "explainabilityType": "pipeline",
//         "explainabilityMethod": "pdp",
//         "visualizationType": "line",
//         "constraints": {},
//         "additionalParams": {
//           "feature1": "Model__lr"
//         }});
//       console.log('resp',response);
//    //  return response;
//    console.log('kati');
//    // return {data: [response.data]};
//    return response;
// }
  
