import axios from 'axios';

const apiKey = 'demo';
const apiUrl = 'https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY_ADJUSTED';

const fetchStockData = async (symbol) => {
  console.log("companyname", symbol)
  try {
    const response = await axios.get(
      `${apiUrl}&symbol=${symbol}&apikey=${apiKey}`,
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching stock data:', error);
    throw error;
  }
};

export {fetchStockData};

