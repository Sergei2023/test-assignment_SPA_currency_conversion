window.onload = () => {
  document.getElementById('goToQuotes')
    .addEventListener('click', () => window.open('./quotes.html'));

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


  let inputValue = document.getElementById('inputValue');
  let currency1 = document.getElementById('currency1');
  let currency2 = document.getElementById('currency2');
  let convertedResult = document.getElementsByClassName('convertedResult')[0];

  const changingCurrency = () => {
    let result = 0;

    if (inputValue.value === '') {
      convertedResult.innerHTML = '=00.00';
      return;
    }

    if (currency1.value === currency2.value) {
      result = inputValue.value;
    } else {
      if (currency1.value === 'RUB') {
        result = (inputValue.value/exchangeRates[currency2.value]);
      } else if (currency2.value === 'RUB') {
        result = (inputValue.value*exchangeRates[currency1.value]);
      } else {
        console.log(inputValue.value);
        console.log(exchangeRates[currency1.value]);
        console.log(exchangeRates[currency2.value]);
        result = (inputValue.value*exchangeRates[currency1.value]/exchangeRates[currency2.value]);
      }
    }

    convertedResult.innerHTML = '=' + result.toFixed(2);
  }

  inputValue.oninput = function () {
    changingCurrency();
  };

  currency1.onchange = function () {
    changingCurrency();
  };

  currency2.onchange = function () {
    changingCurrency();
  }
}
