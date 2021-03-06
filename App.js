import React from 'react';
import { StyleSheet, Text, View, StatusBar, Platform } from 'react-native';
import { Root } from "native-base";
import { AdMobBanner, AdMobInterstitial, AdMobRewarded } from "expo-ads-admob";

import HeaderView from './components/HeaderView';
import AddressList from './components/AddressList';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    // cryptoId is used in CoinMarketCap api
    this.state = {
      fiatPrice: 0,
      currentPriceFiat: {},
      fiatSym: "usd",
      cryptoSym: "btc",
      cryptoId: 1,
      cryptoName: "bitcoin",
      checkBalanceState: "unchecked"
    };

    this.handleFiatPrice = this.handleFiatPrice.bind(this);
    this.handleFiatSym = this.handleFiatSym.bind(this);
    this.handleCryptoSymId = this.handleCryptoSymId.bind(this);
    this.handleCheckBalanceState = this.handleCheckBalanceState.bind(this);
  }

  handleCheckBalanceState(checkBalanceState) {
    this.setState({checkBalanceState: checkBalanceState});
  }

  handleCryptoSymId(cryptoSym, cryptoId, cryptoName) {
    this.setState({cryptoSym: cryptoSym, cryptoId: cryptoId, cryptoName: cryptoName});
  }

  handleFiatSym(fiatSym) {
    this.setState({fiatSym: fiatSym});

    if (this.state.currentPriceFiat !== {}) {
      this.setState({fiatPrice: this.state.currentPriceFiat[fiatSym]});
    }
  }

  handleFiatPrice(price, current_prices) {
    if (current_prices) {
      this.setState(() => {
        return {
          currentPriceFiat: current_prices
        };
      });
    }

    if (this.state.currentPriceFiat !== {}) {
      this.setState(() => {
        return {
          fiatPrice: this.state.currentPriceFiat[this.state.fiatSym]
        };
      });
    }
  }

  bannerError() {
    console.log("an error with admob occured");
  }

  render() {
    return (
        <View style={{
            flex: 1,
            paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight
          }}
        >
          <HeaderView
            fiatPrice={this.state.fiatPrice}
            handlefiatPrice={this.state.handleFiatPrice}
            fiatSym={this.state.fiatSym}
            handleFiatSym={this.handleFiatSym}
            cryptoSym={this.state.cryptoSym}
            handleCryptoSymId={this.handleCryptoSymId}
            checkBalanceState={this.state.checkBalanceState}
            handleCheckBalanceState={this.handleCheckBalanceState}
          />
          <AddressList
            fiatSym={this.state.fiatSym}
            fiatPrice={this.state.fiatPrice}
            handleFiatPrice={this.handleFiatPrice}
            cryptoSym={this.state.cryptoSym}
            cryptoId={this.state.cryptoId}
            cryptoName={this.state.cryptoName}
            checkBalanceState={this.state.checkBalanceState}
            handleCheckBalanceState={this.handleCheckBalanceState}
          />
          <AdMobBanner
            style={styles.bottomBanner}
            bannerSize="fullBanner"
            adUnitID="ca-app-pub-5374261406606651/3308871967"
            // adUnitID="ca-app-pub-3940256099942544/6300978111"
            // Test ID, Replace with your-admob-unit-id
            testDeviceID="EMULATOR"
            didFailToReceiveAdWithError={this.bannerError}
          />
        </View>
    );
  }
}


const styles = StyleSheet.create({
  bottomBanner: {
    position: "absolute",
    alignSelf: 'center',
    bottom: 0,
  }
});
