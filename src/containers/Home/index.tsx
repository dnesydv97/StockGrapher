import React, {useCallback, useEffect, useState} from 'react';
import {Dropdown, Chart, Container, SpacerColumn, Row} from '../../components';
import {fetchStockData} from '../../apis/services';

const Home = () => {
  const [params,setParams] = useState<any>({
    symbol:'IBM',
    type:"1. open"
  })
  const [stockFilter, setStockFilter] = useState<any>({});
    const fetchData = async (params:any) => {
      const valuesWithDates:any[] = []
      try {
        const data = await fetchStockData(params?.symbol);
        for (const date in data['Weekly Adjusted Time Series']) {
          const value =
          data['Weekly Adjusted Time Series'][date][params?.type];
          valuesWithDates.push({date, value});
        }
        setStockFilter(
          {
            labels:valuesWithDates?.slice(0,10)?.map(item => item?.date),
            datasets:[
              {
                data:valuesWithDates?.slice(0,10)?.map(item => item?.value)
              }
            ]
          }
        )
    } catch (error) {
        console.log('error', error);
      }
    };

  useEffect(() => {
    fetchData(params);
  }, []);
  console.log('selectedChartItem', stockFilter);

  const handleSymbolChange = useCallback((newSymbol:any) => {
    const updateParams = {...params,symbol:newSymbol}
    setParams(updateParams)
    fetchData(updateParams)
  }, []);

  const handleChartChange = useCallback((newSelectedItem:any) => {
    const updateParams = {...params,type:newSelectedItem}
    setParams(updateParams)
    fetchData(updateParams)
  }, []);

   // Dropdown options
  const symbolOptions = [
    {label: 'IBM', value: 'IBM'},
    {label: 'MSFT', value: 'MSFT'},
  ];

  const chartOptions = [
    {label: 'Open', value: '1. open'},
    {label: 'High', value: '2. high'},
    {label: 'Low', value: '3. low'},
    {label: 'Close', value: '4. close'},
  ];

  return (
    <Container>
      <Row alignItems="center" justifyContent="space-between">
        <Dropdown
          items={symbolOptions}
          containerStyle={{width: '45%'}}
          defaultValue={params?.symbol}
          onChange={handleSymbolChange}
          placeholder="Select a symbol"
          mode="BADGE"
        />
        <Dropdown
          items={chartOptions}
          containerStyle={{width: '45%'}}
          defaultValue={params?.type}
          onChange={handleChartChange}
          placeholder="Select an item"
          mode="BADGE"
        />
      </Row>

      <SpacerColumn size={20} />
      {
       !!Object.keys(stockFilter)?.length && (

          <Chart data={stockFilter} width={undefined} height={390} />
        )
      }
    </Container>
  );
};

export default Home;
