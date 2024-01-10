export function getData(symbol?: string | number) {
  console.log('call the service', symbol);
  return {
    method: 'get',
    url: `/query?function=TIME_SERIES_WEEKLY_ADJUSTED&symbol=${symbol}&apikey=`,

    config: {
      store: {
        key: 'stockDetails',
        action: 'set',
        successMessage: 'successfully Fetched',
        showErrorMessage: true,
      },
    },
  };
}
