import axios from 'axios';

export const zcashApi = (addresses, resolve, reject) => {
  let addressesBalance = {};
  let addressRequests = [];

  addresses.forEach(address => {
    addressRequests.push("https://api.zcha.in/v2/mainnet/accounts/" + address);
  });

  axios.all(addressRequests.map(l => axios.get(l)))
  .then(axios.spread((...res) => {
    let i;
    for(i = 0; i < res.length; i++) {
      const data = res[i].data;
      addressesBalance[data.address.toString()] = data.balance.toString();
    }

    resolve(addressesBalance);
  })).catch((error) => {
    reject(error);
  });
};
