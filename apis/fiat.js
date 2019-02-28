import axios from 'axios';

export const fiatPriceCheck = (cryptoName, fiatSym, handleFiatPrice, resolve, reject) => {
  axios.get("https://api.coingecko.com/api/v3/coins/" + cryptoName.toLowerCase() + "?localization=false&tickers=false&community_data=false&developer_data=false&sparkline=false")
  .then(res => {
    // console.log(res.data.market_data.current_price);
    const current_prices = res.data.market_data.current_price;
    
    handleFiatPrice(current_prices[fiatSym], current_prices);
    resolve('Fiat Done');
  }).catch(error => {
    console.log(error);
    reject(error);
  });
};