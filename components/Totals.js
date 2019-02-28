import React, { Component } from "react";
import { Container, Header, Content, Accordion, View, Text, Icon, Card, CardItem, Body } from "native-base";

export default class Totals extends Component {
  constructor(props) {
    super(props);

    this._renderHeader = this._renderHeader.bind(this);
    this._renderContent = this._renderContent.bind(this);
  }

  handleTotalAddresses()  {
    const totalAddresses = this.props.addresses.length;

    return (totalAddresses === 0 ? '' : totalAddresses);
  }

  handleTotalCrypto() {
    if (this.props.checkBalanceState === 'checked') {
      let totalCrypto = 0;

      this.props.addresses.map(addressObject => {
        if (addressObject.cryptoAmount !== '') {
          totalCrypto += addressObject.cryptoAmount;
        }
        return 0;
      });
      return (
        this.props.checkBalanceState === 'checked' ? totalCrypto : ''
      );
    }
  }

  handleTotalFiat() {
    if (this.props.checkBalanceState === 'checked') {
      let totalFiat = 0;

      this.props.addresses.map(addressObject => {
        if (addressObject.fiatAmount !== '') {
          totalFiat += addressObject.fiatAmount;
        }
        return 0;
      });

      return (
        this.props.checkBalanceState === 'checked' ? '$' + totalFiat.toFixed(2) : ''
      );
    }
  }

  render(props) {
    const dataArray = [
      { title: "Totals" }
    ];

    return(

        <Content padder style={{flexDirection: "row"}} contentContainerStyle={{justifyContent: "space-between", flex: 1}}>
          <Accordion
            dataArray={dataArray}
            animation={true}
            expanded={true}
            renderHeader={this._renderHeader}
            renderContent={this._renderContent}
          />
        </Content>

    );
  }

  _renderHeader(item, expanded) {
    return (
      <View style={{
        flexDirection: "row",
        padding: 10,
        justifyContent: "space-between",
        alignItems: "center" ,
        backgroundColor: "#A9DAD6" }}>
      <Text style={{ fontWeight: "600" }}>
          {" "}{item.title}
        </Text>
        {expanded
          ? <Icon style={{ fontSize: 18 }} name="remove-circle" />
          : <Icon style={{ fontSize: 18 }} name="add-circle" />}
      </View>
    );
  }

  _renderContent(item) {
    const cryptoSym = this.props.cryptoSym;
    const fiatPrice = this.props.fiatPrice;
    console.log(cryptoSym);
    const cryptoFiatRate = (
      <Text style={{textAlign: "center"}}>
        {`Current ${cryptoSym.toUpperCase()} / ` +
          `${this.props.fiatSym.toUpperCase()} : ${fiatPrice ? fiatPrice.toFixed(2) : ""}`
        }
      </Text>
    );

    return (
      <View>
        <View style={{
                borderStyle: "dotted",
                borderBottomWidth: 1,
                borderBottomColor: "black"
              }}
        >
          <Text
            style={{
              backgroundColor: "#e3f1f1",
              padding: 10,
              fontStyle: "italic",
              textAlign: "center"
            }}
          >
            {this.props.checkBalanceState === 'checked' ? cryptoFiatRate : <Text/>}
          </Text>
        </View>
        <View style={{
                borderStyle: "dotted",
                borderBottomWidth: 1,
                borderBottomColor: "black"
              }}
        >
          <Text
            style={{
              backgroundColor: "#e3f1f1",
              padding: 10,
              fontStyle: "italic",
              textAlign: "center"
            }}
          >
            Addresses: {this.handleTotalAddresses()}
          </Text>
        </View>
        <View style={{
                borderStyle: "dotted",
                borderBottomWidth: 1,
                borderBottomColor: "black"
              }}
        >
          <Text
            style={{
              backgroundColor: "#e3f1f1",
              padding: 10,
              fontStyle: "italic",
              textAlign: "center"
            }}
          >
            {this.props.cryptoSym.toUpperCase()}: {this.handleTotalCrypto()}
          </Text>
        </View>
        <View style={{
                borderStyle: "dotted",
                borderBottomWidth: 1,
                borderBottomColor: "black"
              }}
        >
          <Text
            style={{
              backgroundColor: "#e3f1f1",
              padding: 10,
              fontStyle: "italic",
              textAlign: "center"
            }}
          >
            {this.props.fiatSym.toUpperCase()}: {this.handleTotalFiat()}
          </Text>
        </View>
      </View>
    );
  }
}

// <thead>
//   <tr>
//     <th>Addresses: {this.handleTotalAddresses()}</th>
//     <th>{this.props.cryptoSym.toUpperCase()}: {this.handleTotalCrypto()}</th>
//     <th>{this.props.fiatSym.toUpperCase()}: {this.handleTotalFiat()}</th>
//     <th>Remove</th>
//   </tr>
// </thead>
