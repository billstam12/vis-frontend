// import { useState, useEffect } from 'react';
// import { useAppDispatch, useAppSelector } from '../../store/store';
// import { fetchDataExploration } from '../../store/slices/dataExplorationSlice';

// export const useDataExploration = (cols, granularity, scaler, requestData) => {
//     const { dataExploration, loading, error } = useAppSelector(state => state.dataExploration);
//     const dispatch = useAppDispatch();
//     const [data, setData] = useState([]);
//     const [columns, setColumns] = useState([]);

//     useEffect(() => {
//         dispatch(fetchDataExploration(requestData));
//     }, [dispatch, requestData]);

//     useEffect(() => {
//         if (dataExploration) {
//             const parsedData = JSON.parse(dataExploration.data);
//             setData(parsedData);
//             const gridColumns = parsedData[0] ? Object.keys(parsedData[0]).map(name => ({
//                 field: name,
//                 headerName: name,
//                 width: 200,
//             })) : [];
//             setColumns(gridColumns);
//         }
//     }, [dataExploration]);

//     return { data, columns, loading, error };
// };
