

import React, {useCallback, useEffect, useState} from 'react';
import {Dropdown, Chart, Container, SpacerColumn, Row} from '../../components';
import { fetchStockData } from '../../apis/services';

const Home = () => {

  const [symbol, setSymbol] = useState('IBM');
  const [selectedChartItem, setSelectedChartItem] = useState("");
  const [stockData, setStockData] = useState(null);
  console.log('symbol', symbol)
  console.log('selectedChartItem', selectedChartItem)
  console.log('stockData new', stockData)
  
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchStockData(symbol);
        setStockData(data);
      } catch (error) {
        console.log("error",error)
      }
    };

    fetchData();
  }, [symbol]);
  
  const handleSymbolChange = useCallback((newSymbol) => {
    setSymbol(newSymbol);
  }, []);

  const handleChartChange = useCallback((newSelectedItem) => {
    setSelectedChartItem(newSelectedItem);
  }, []);

  const symbolOptions = [
    { label: "IBM", value: "IBM" },
    { label: "MSFT", value: "MSFT" },
  ];

  const chartOptions = [
    { label: "Open", value: "1. open" },
    { label: "High", value: "2. high" },
    { label: "Low", value: "3. low" },
    { label: "Close", value: "4. close" },
  ];

  const [data, setData] = useState({
        labels: [
          '2020/01/4',
          '2040/10/23',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
        datasets: [
          {
            data: [72, 810, 700, 723, 493, 677, 641, 509, 213, 335, 198, 249],
          },
        ],
      });
 



 

  return (
    <Container>
      <Row alignItems="center" justifyContent="space-between">
      <Dropdown
          items={symbolOptions}
          containerStyle={{ width: "45%" }}
          defaultValue={symbol}
          onChange={handleSymbolChange}
          placeholder="Select a symbol"
          mode="BADGE"
        />
        <Dropdown
          items={chartOptions}
          containerStyle={{ width: "45%" }}
          defaultValue={selectedChartItem}
          onChange={handleChartChange}
          placeholder="Select an item"
          mode="BADGE"
        />
      </Row>

      <SpacerColumn size={5} />
      <Chart data={data} width={undefined} height={390} />
     
    </Container>
  );
};

export default Home;









// import React, {useCallback, useEffect, useState} from 'react';
// import {Dropdown, Chart, Container, SpacerColumn, Row} from '../../components';
// import {Services} from '../../apis';
// import {request} from '../../utils';
// import { Select } from '../../store';
// import { useSelector } from 'react-redux';
// import axios from 'axios';

// const Home = () => {
//   // const user: any = useSelector(Select.stockDetails);
//   // console.log('first@@@@@@@@@@@', user)
//   const defaultSymbol = { label: "IBM", value: "IBM" };
//   const [symbol, setSymbol] = useState(defaultSymbol.value);
//   const [selectedChartItem, setSelectedChartItem] = useState("");
//   console.log('symbol', symbol)
//   console.log('selectedChartItem', selectedChartItem)
//   const handleSymbolChange = useCallback((newSymbol) => {
//     setSymbol(newSymbol);
//   }, []);

//   const handleChartChange = useCallback((newSelectedItem) => {
//     setSelectedChartItem(newSelectedItem);
//   }, []);

//   const symbolOptions = [
//     { label: "IBM", value: "IBM" },
//     { label: "MSFT", value: "MSFT" },
//   ];

//   const chartOptions = [
//     { label: "Open", value: "1. open" },
//     { label: "High", value: "2. high" },
//     { label: "Low", value: "3. low" },
//     { label: "Close", value: "4. close" },
//   ];



//   const [details, setDetails]= useState()
//   const [data, setData] = useState({
//     labels: [
//       '2020/01/4',
//       '2040/10/23',
//       'Mar',
//       'Apr',
//       'May',
//       'Jun',
//       'Jul',
//       'Aug',
//       'Sep',
//       'Oct',
//       'Nov',
//       'Dec',
//     ],
//     datasets: [
//       {
//         data: [72, 810, 700, 723, 493, 677, 641, 509, 213, 335, 198, 249],
//       },
//     ],
//   });

//   useEffect(() => {
  
//     let data = ' Display the list of repositories on the mobile app below the search bar.\r\n● Implement an elegant UI/UX design that is suitable for a mobile environment.\r\n● Display additional information about each repository, such as the number of stars, forks,\r\nand the primary language.\r\n';
    
//     let config = {
//       method: 'get',
//       maxBodyLength: Infinity,
//       url: 'https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY_ADJUSTED&symbol=MSFT&apikey=EGE9ODG4XG0ATFV8',
//       headers: { 
//         'Content-Type': 'application/json'
//       },
//       data : data
//     };
    
//     axios.request(config)
//     .then((response) => {
//       setDetails(response.data)
 
 
//     })
//     .catch((error) => {
//       console.log(error);
//     });
    
//   }, []); 


 


// // useEffect(()=>{
// //   if(details){
// //   const valuesWithDates = [];
// //   const valuesWithAmount = [];
  
// //   for (const date in details["Weekly Adjusted Time Series"]) {
// //     const value = details["Weekly Adjusted Time Series"][date][selectedItem];
// //     const amount = details["Weekly Adjusted Time Series"][selectedItem];
// //     valuesWithDates.push({ date, value});
// //     valuesWithAmount.push({  amount});
  
// // }
// // console.log("@@@@@@@@@@@@@@@@@@@@@@@@",valuesWithDates)
// // console.log("valuesWithAmount",valuesWithAmount)
// // console.log("@@@@@@@@@@@@@#############",selectedItem)}
// // },[selectedItem])
 

//   return (
//     <Container>
//       <Row alignItems="center" justifyContent="space-between">
//       <Dropdown
//           items={symbolOptions}
//           containerStyle={{ width: "45%" }}
//           defaultValue={symbol}
//           onChange={handleSymbolChange}
//           placeholder="Select a symbol"
//           mode="BADGE"
//         />
//         <Dropdown
//           items={chartOptions}
//           containerStyle={{ width: "45%" }}
//           defaultValue={selectedChartItem}
//           onChange={handleChartChange}
//           placeholder="Select an item"
//           mode="BADGE"
//         />
//       </Row>

//       <SpacerColumn size={4} />
//       <Chart data={data} width={undefined} height={390} />
//     </Container>
//   );
// };

// export default Home;

// import {View} from 'react-native';
// import React, {useCallback} from 'react';
// import {Dropdown, Chart, Container, SpacerColumn} from '../../components';
// import { Services } from '../../apis';
// import { request } from '../../utils';
// const Home = () => {

//   const items = [
//     {label: 'IBM', value: 'IBM'},
//     {label: 'MSFT', value: 'MSFT'},
//   ];

//   const handleDropdownChange = useCallback(selectedItem => {
//     console.log('Selected Item:', selectedItem);

//     await request(Services.getRepo(selectedItem))
//       .then((resp: any) => {

//       })
//       .catch(err => {
//         console.log('err', err);

//       });
//   }, []);
//   const data = {
//     labels: [
//       '2020/01/4',
//       '2040/10/23',
//       'Mar',
//       'Apr',
//       'May',
//       'Jun',
//       'Jul',
//       'Aug',
//       'Sep',
//       'Oct',
//       'Nov',
//       'Dec',
//     ],
//     datasets: [
//       {
//         data: [72, 810, 700, 723, 493, 677, 641, 509, 213, 335, 198, 249],
//       },
//     ],
//   };
//   return (
//     <Container>
//       <Dropdown
//         items={items}
//         defaultValue={items[0]}
//         onChange={handleDropdownChange}
//         placeholder="Select an item"
//         mode="SIMPLE"
//       />
//       <SpacerColumn size={4} />

//       <Chart data={data} width={undefined} height={390} />
//     </Container>
//   );
// };

// export default Home;
