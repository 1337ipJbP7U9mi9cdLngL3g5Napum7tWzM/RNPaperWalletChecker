import React from 'react';
import { Clipboard } from 'react-native';
import { View, Button, Header, Icon, Text, Toast,
         Root, Tab, Tabs, Title, Left, Body, Right,
         Card, CardItem, Content } from 'native-base';

export default class Menu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      crypto: [
        {cryptoName: "Bitcoin:", cryptoAddress: "1337ipJbP7U9mi9cdLngL3g5Napum7tWzM"},
        {cryptoName: "Ethereum:", cryptoAddress: "0x94483b123b422d2Ab61fC459118667513956144E"},
        {cryptoName: "BitcoinCash:", cryptoAddress: "1GDLQvcZY8TS56gf6X8Hm94B8wRkbtV438"},
        {cryptoName: "Litecoin:", cryptoAddress: "LWcXUB6ny88tK49TK1V6KprE5oDcJ1zJhx"},
        {cryptoName: "Dogecoin:", cryptoAddress: "DND5TbT834xsjBre1c6pREJYWMDWKAL1rc"},
        {cryptoName: "Dash:", cryptoAddress: "XckPoTubxQ8PbY9VAYCnSZarpsq6BFNUHA"},
        {cryptoName: "ZCash:", cryptoAddress: "t1d29PNHtTJHHE4jMeLJFrmRcHJNhyYxZZC"},
      ],
      info: [
        {icon: "logo-github", info: "Github URL here", text: "Github Repo"},
        {icon: "reddit", info: "https://www.reddit.com/r/btc/comments/ae9b2t/paper_wallet_checker_simple_and_easy_way_to_check/",
         type: "FontAwesome", text: "Reddit Post"
        },
        {icon: "bitcoin", info: "https://bitcointalk.org/index.php?topic=5090189.new;topicseen",
         type: "FontAwesome", text: "Bitcoin Talk Forums Post"
        },
      ]
    };

    this._renderInfo = this._renderInfo.bind(this);
    this._renderDonations = this._renderDonations.bind(this);
    this._clipBoardCopy = this._clipBoardCopy.bind(this);
  }

  _clipBoardCopy(string) {
    Clipboard.setString(string);
    Toast.show({text: "Copied to Clipboard", buttonText: "okay"});
  }

  _renderDonations(address) {
    return (
      <Card key={address.cryptoName}>
        <Button transparent onPress={() => this._clipBoardCopy(address.cryptoAddress)}>
          <CardItem>
            <Text>{address.cryptoName}</Text>
          </CardItem>
          <CardItem>
            <Text>{address.cryptoAddress}</Text>
          </CardItem>
        </Button>
      </Card>
    );
  }

  _renderInfo(info) {
    return (
      <Card key={info.text}>
        <Button transparent onPress={() => this._clipBoardCopy(info.info)}>
          <CardItem>
            <Icon name={info.icon} type={info.type} />
            <Text>{info.text}</Text>
          </CardItem>
        </Button>
      </Card>
    );
  }

  render(props) {
    let info = this.state.info
    let listInfo = info.map(this._renderInfo);
    let addresses = this.state.crypto;
    let listAddresses = addresses.map(this._renderDonations);

    return (
      <Root>
        <Header hasTabs>
          <Left>
            <Button transparent
                    onPress={this.props.toggleMenuModal}
            >
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>Menu</Title>
          </Body>
        </Header>
          <Tabs>
            <Tab heading="Information">
              <Content>
                {listInfo}
              </Content>
            </Tab>
            <Tab heading="Donations">
              <Content>
                {listAddresses}
              </Content>
            </Tab>
          </Tabs>
      </Root>
    );
  }
}
