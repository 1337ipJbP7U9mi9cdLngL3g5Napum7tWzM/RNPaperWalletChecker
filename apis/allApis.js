import {bitcoinApi} from './bitcoin';
import {bchApi} from './bitcoincash';
import {dashApi} from './dash';
import {dogeApi} from './doge';
import {ethApi} from './ethereum';
import {litecoinApi} from './litecoin';
import {zcashApi} from './zcash';
import {fiatPriceCheck} from './fiat';

export const allApis = (addresses, cryptoName, cryptoSym, fiatSym, handleFiatPrice) => {
  let fiatApis = new Promise(function(resolve, reject) {
    fiatPriceCheck(cryptoName, fiatSym, handleFiatPrice, resolve, reject);
  });
  
  let cryptoApis = new Promise(function(resolve, reject) {
    switch(cryptoSym) {
      case 'btc':
        bitcoinApi(addresses, resolve, reject);
        break;
      case 'ltc':
        litecoinApi(addresses, resolve, reject);
        break;
      case 'dash':
        dashApi(addresses, resolve, reject);
        break;
      case 'zec':
        zcashApi(addresses, resolve, reject);
        break;
      case 'doge':
        dogeApi(addresses, resolve, reject);
        break;
      case 'bch':
        bchApi(addresses, resolve, reject);
        break;
      case 'eth':
        ethApi(addresses, resolve, reject);
        break;
      default:
        console.log("didn't get either");  
    }
  });
  
  return [fiatApis, cryptoApis];
};
