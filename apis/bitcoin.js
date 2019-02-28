import axios from 'axios';

export const bitcoinApi = async (addresses, resolve, reject) => {
  let addressesBalance = {};
  const addressesBech = [];
  const addressesOld = [];
  
  let i;
  for (i = 0; i < addresses.length; i++) { 
    if (addresses[i].slice(0,2) === "bc") {
      addressesBech.push(addresses[i]);
    } else {
      addressesOld.push(addresses[i]);
    }
  }
  
  // Old Address types of everything before bech32 format
  
  await axios.get("https://blockchain.info/balance?active=" + addressesOld.toString().replace(/,/g, '|') + "&cors=true")
  .then(res => {
    const data = res.data;
    
    for (i = 0; i < addressesOld.length; i++) {
      const addressBalance = data[addressesOld[i]].final_balance / 100000000;
      addressesBalance[addressesOld[i].toString()] = addressBalance;
    }
  }).catch((error) => {
    console.log(error);
  });
  
  
  // New bech32 address format api request
    
  let addressRequests = [];
  addressesBech.forEach(address => {
    addressRequests.push("https://api.blockchair.com/bitcoin/dashboards/address/" 
    + address);
  });
  
  function delay() {
    return new Promise(resolve => {
      setTimeout(() => resolve(), 2000);
    });
  }
  
  function axiosRequest(addressRequests, addresses) {
    axios.get(addressRequests)
    .then((res) => {
      const data = res.data.data[addresses];
      addressesBalance[addresses] = data.address.balance / 100000000;
    }).catch((error) => {
      console.log(error);
    });
  }
  
  for (i=0; i<addressRequests.length; i++) {
    await axiosRequest(addressRequests[i], addresses[i]);
    await delay();
  }
  
  resolve(addressesBalance);
};
  