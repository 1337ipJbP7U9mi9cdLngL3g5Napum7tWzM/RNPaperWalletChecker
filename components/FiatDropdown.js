import React from 'react';
import { StyleSheet } from 'react-native';
import { Container, Content, Picker, Form } from "native-base";


export default class FiatDropdown extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleFiat = this.toggleFiat.bind(this);
    this.fiatList = this.fiatList.bind(this);

    this.state = {
      fiat: [
        "aed", "ars", "aud", "bch", "bdt", "bhd", "bmd", "bnb",
        "brl", "btc", "cad", "chf", "clp", "cny", "czk", "dkk",
        "eos", "eth", "eur", "gbp", "hkd", "huf", "idr", "ils",
        "inr", "jpy", "krw", "kwd", "lkr", "ltc", "mmk", "mxn",
        "myr", "nok", "nzd", "php", "pkr", "pln", "rub", "sar",
        "sek", "sgd", "thb", "try", "twd", "usd", "vef", "xag",
        "xau", "xdr", "xlm", "xrp", "zar"
      ],
      dropdownOpen: false,
      dropdownValue: "usd"
    };
  }

  fiatList(fiat) {
    return (
      <Picker.Item key={fiat} label={fiat.toUpperCase()}
        value={fiat}
      />
    );
  }

  toggleFiat(itemValue, itemIndex) {
    const fiat = this.state.fiat[itemIndex];

    this.setState({dropdownValue: itemValue});
    this.props.handleFiatSym(fiat);
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  render(props) {
    const fiatList = this.state.fiat;
    const listFiat = fiatList.map(this.fiatList);

    return (
      <Content>
        <Form>
          <Picker
            mode="dropdown"
            textStyle={{  }}
            selectedValue={this.state.dropdownValue}
            onValueChange={(itemValue, itemIndex) =>
              this.toggleFiat(itemValue, itemIndex)
            }
          >
            {listFiat}
          </Picker>
        </Form>
      </Content>
    );
  }
}
