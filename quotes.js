window.onload = () => {
  document.getElementById('goToCalculator')
    .addEventListener('click', () => window.open('./index.html'));

  let exchangeRates = {'USD':'107', 'EUR':'114', 'RUB':'1'};

  fetch('https://iss.moex.com/iss/statistics/engines/currency/markets/selt/rates.json?iss.meta=off')
    .then((response) => {
      if (!response.ok) {
        throw new Error('HTTP error, status = ' + response.status);
      }
      return response.json();
    })
    .then((json) => {
      exchangeRates.USD = json.cbrf.data[0][json.cbrf.columns.indexOf('CBRF_USD_LAST')];
      exchangeRates.EUR = json.cbrf.data[0][json.cbrf.columns.indexOf('CBRF_EUR_LAST')];
      console.log(exchangeRates);
    })
    .catch((error) => {
      console.error(error);
    });

  const usdInRubs = document.getElementById('usdInRubs');
  usdInRubs.innerHTML = exchangeRates.USD;

  const eurInRubs = document.getElementById('eurInRubs');
  eurInRubs.innerHTML = exchangeRates.EUR;
}
