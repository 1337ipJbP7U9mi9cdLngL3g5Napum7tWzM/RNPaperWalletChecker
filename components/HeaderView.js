import React from 'react';
import { Picker, StyleSheet, View, Modal } from 'react-native';
import { Container, Header, Left, Body, Right, Title, Button, Icon, Text } from 'native-base';
import CryptoDropdown from "./CryptoDropdown";
import FiatDropdown from "./FiatDropdown";
import Menu from "./Menu";

export default class HeaderView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      btc: "1337ipJbP7U9mi9cdLngL3g5Napum7tWzM",
      eth: "0x94483b123b422d2Ab61fC459118667513956144E",
      bch: "1GDLQvcZY8TS56gf6X8Hm94B8wRkbtV438",
      ltc: "LWcXUB6ny88tK49TK1V6KprE5oDcJ1zJhx",
      ppc: "PMWKyz4Sr8nKZnjABsWKnxJHCnjKo4garm",
      doge: "DND5TbT834xsjBre1c6pREJYWMDWKAL1rc",
      nmc: "NKX2XRAnucmc8RBTV9oZo8kgx7NP6K52JV",
      etc: "Ethereum Classic Paper Wallet Checker!",
      vtc: "VhuhgKpVwgqyuNCsJpEjcWxxKyP9rm9Aod",
      dash: "XckPoTubxQ8PbY9VAYCnSZarpsq6BFNUHA",
      btg: "GMbBJi6x6osdKnCnQUZqUWgD3fGztzik1h",
      neo: "Neo Paper Wallet Checker!",
      gas: "Neo Gas Paper Wallet Checker!",
      qtum: "Qtum Paper Wallet Checker!",
      kmd: "Komodo Paper Wallet Checker!",
      btcz: "Bitcoinz Paper Wallet Checker!",
      zen: "Zen Paper Wallet Checker!",
      zec: "t1d29PNHtTJHHE4jMeLJFrmRcHJNhyYxZZC",
      zcl: "ZClassic Paper Wallet Checker!",
      dcr: "Decred Paper Wallet Checker!",
      dgb: "DKkftwDYUQpMZCcDmcgtbLnCk5sf1qV9Hi",

      loading: true,
      menumodal: false,
      // popoverOpen: false,
      // popoverOpenAd: false,
    };

    this.toggle = this.toggle.bind(this);
    this.toggleAd = this.toggleAd.bind(this);
    this.toggleMenuModal = this.toggleMenuModal.bind(this);
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });
    this.setState({loading: false});
  }

  toggle() {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    });
  }

  toggleAd() {
    this.setState({
      popoverOpenAd: !this.state.popoverOpenAd
    });
  }

  toggleMenuModal() {
    this.setState({menumodal: !this.state.menumodal});
  }

  render(){
    if (this.state.loading) {
      return <Expo.AppLoading />;
    }
    const cryptoSym = this.props.cryptoSym;
    const fiatPrice = this.props.fiatPrice;
    const cryptoFiatRate = (
      <Text style={{textAlign: "center"}}>
        {`Current ${this.props.cryptoSym.toUpperCase()} / ` +
          `${this.props.fiatSym.toUpperCase()} : ${fiatPrice ? fiatPrice.toFixed(2) : ""}`
        }
      </Text>
    );

    return (
        <View
          style={{
            // height: 'auto',
            flex: 0.23,
          }}
        >
          <Modal animationType = {"slide"} transparent = {false}
          visible = {this.state.menumodal}
          style={{flex: 1}}
          onRequestClose = {() => { this.toggleMenuModal() } }
          >
            <Menu toggleMenuModal={this.toggleMenuModal} />
          </Modal>
          <Header>
            <Left style={{flex: .9}}>
              <Button transparent
                onPress={this.toggleMenuModal}
              >
                <Icon name='menu' />
              </Button>
            </Left>
            <Body style={{flex: 3}}>
              <Title style={{
                      // fontSize: 30,
                      // fontWeight: '500',
                      // textAlign: "center"
                    }}
              >
                Paper Wallet Checker!
              </Title>
            </Body>
            <Right style={{flex: .5}} />
          </Header>
          <View style={{
            flexDirection: "row",
            // justifyContent: "space-between"
          }}
          >
            <CryptoDropdown
              handleCryptoSymId={this.props.handleCryptoSymId}
              handleCheckBalanceState={this.props.handleCheckBalanceState}
            />
            <FiatDropdown
              handleFiatSym={this.props.handleFiatSym}
            />
          </View>
        </View>
    );
  }
}
