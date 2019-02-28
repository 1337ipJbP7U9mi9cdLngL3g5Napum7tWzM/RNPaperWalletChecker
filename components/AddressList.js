import React from 'react';
import { StyleSheet, Text, TextInput,
         TouchableOpacity, View, Modal, ScrollView } from 'react-native';
import { Button } from "native-base";
import WAValidator from '../WAV/wav';
import {allApis} from '../apis/allApis';

import Totals from './Totals';
import Addresses from './Addresses';
import QrAddressReader from './QrAddressReader';

export default class AddressList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      addresses: [],
      cryptoSym: this.props.cryptoSym,
      cryptoId: this.props.cryptoId,
      filename: 'PaperWalletChecker.csv',
      popoverOpenInfo: false,
      modal: false,
      qrmodal: false,
      progressBar: 0,
      inputText: ""
    };

    this.handleFilename = this.handleFilename.bind(this);
    this.handleCsvImport = this.handleCsvImport.bind(this);
    this.addAddress = this.addAddress.bind(this);
    this.deleteAddress = this.deleteAddress.bind(this);
    this.checkBalance = this.checkBalance.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.toggleQrModal = this.toggleQrModal.bind(this);
    this.toggleInfo = this.toggleInfo.bind(this);
    this.handleSocial = this.handleSocial.bind(this);
  }

  componentDidUpdate(prevProps) {
    this.clearAddresses(prevProps);
    this.updateAddresses(prevProps);
  }

  clearAddresses(prevProps) {
    if (prevProps.cryptoSym !== this.props.cryptoSym) {
      this.setState({addresses: []});
      this.props.handleCheckBalanceState("unchecked");
      this.props.handleFiatPrice(0);
    }
  }

  updateAddresses(prevProps) {
    if (prevProps.fiatSym !== this.props.fiatSym) {
      const addresses = this.state.addresses.map(a => a.key);
      let i;
      for (i = 0; i < addresses.length; i++) {
        const updateAddress = addresses[i];
        const index = this.state.addresses.findIndex(x => x.key === updateAddress);
        const newFiatAmount = this.state.addresses[index].cryptoAmount * this.props.fiatPrice;
        this.setState((prevState) => {
          const address = prevState.addresses[index];
          address.fiatAmount = newFiatAmount;
          return ({
            address
          });
        });
      }
    }
  }

  toggleModal() {
    this.setState({modal: !this.state.modal});
  }

  toggleQrModal() {
    this.setState({qrmodal: !this.state.qrmodal});
  }

  toggleInfo() {
    this.setState({
      popoverOpenInfo: !this.state.popoverOpenInfo
    });
  }

  checkBalance() {
    this.props.handleCheckBalanceState("checking");
    // const cryptoId = this.props.cryptoId;
    const fiatSym = this.props.fiatSym;
    const handleFiatPrice = this.props.handleFiatPrice;
    const addresses = this.state.addresses.map(a => a.key);
    const cryptoSym = this.props.cryptoSym;
    const cryptoName = this.props.cryptoName;

    const balancePromises = allApis(addresses, cryptoName, cryptoSym, fiatSym, handleFiatPrice);

    Promise.all(balancePromises)
      .then((result) => {
        // console.log(result[1]);
        let i;
        for (i = 0; i < addresses.length; i++) {
          const addressBalance = parseFloat(result[1][addresses[i]]);
          const updateAddress = addresses[i];
          const index = this.state.addresses.findIndex(x => x.key === updateAddress);
          const addressAttributes = {
            cryptoAmount: addressBalance,
            fiatAmount: addressBalance * this.props.fiatPrice
          };
          this.setState({
            addresses: [
              ...this.state.addresses.slice(0, index),
              Object.assign({}, this.state.addresses[index], addressAttributes),
              ...this.state.addresses.slice(index + 1)
            ]
          });
        }
        this.props.handleCheckBalanceState("checked");
      });
  }

  handleFilename(event) {
    this.setState({
      filename:
        event.target.value.includes('.csv') ?
          event.target.value : event.target.value  + '.csv'
    });
  }

  handleCsvImport(data) {
    data.map((row) => {
      row.map((col) => {
        const addObject = this.state.addresses;
        const checkDuplicateArray = (addObject.map(a => a.key));

        if (WAValidator.validate(col.trim(), this.props.cryptoSym)) {
          if (checkDuplicateArray.includes(col.trim())) {
            alert("you have entered a duplicte address");
          } else {
            let newAddress = {
              key: col.trim(),
              cryptoAmount: '',
              fiatAmount: ''
            };

            this.setState((prevState) => {
              return {
                addresses: prevState.addresses.concat(newAddress),
                modal: !this.state.modal
              };
            });
          }
        } else {
          // console.log("Please enter a valid address or check that you have selected : "
          //         + this.props.cryptoSym.toUpperCase());
        }
        return null;
      });
      return null;
    });
  }

  addAddress(result) {
    const addObject = this.state.addresses;
    const address = this.state.inputText !== "" ? this.state.inputText.trim() : result;
    const checkDuplicateArray = (addObject.map(a => a.key));
    const duplicate = checkDuplicateArray.includes(address);

    if (duplicate) {
      alert("you have entered a duplicte address");
    } else if (address !== Object
              && WAValidator.validate(address, this.props.cryptoSym))  {
      var newAddress = {
        key: address,
        cryptoAmount: '',
        fiatAmount: ''
      };

      this.setState((prevState) => {
        return {
          addresses: prevState.addresses.concat(newAddress)
        };
      });
    } else {
      alert("Please enter a valid address");
    }

    this.setState({inputText: ""});
  }

  deleteAddress(key) {
    var filteredAddresses = this.state.addresses.filter(function (address) {
      return (address.key !== key);
    });

    this.setState({
      addresses: filteredAddresses
    });
  }

  handleSocial(social) {
    switch(social) {
      case "github": {
        window.open('https://github.com/1337ipJbP7U9mi9cdLngL3g5Napum7tWzM/PaperWalletChecker', "_blank");
        break;
      }
      case "reddit": {
        window.open('https://www.reddit.com/r/btc/comments/ae9b2t/paper_wallet_checker_simple_and_easy_way_to_check/', '_blank');
        break;
      }
      case "bitcoin": {
        window.open('https://bitcointalk.org/index.php?topic=5090189.new;topicseen', '_blank');
        break;
      }
      default: {
        break;
      }
    }
  }

  render(){
    const csvDownloadHeaders = [
      {label: 'Address', key: 'key'},
      {label: 'btc:', key: 'cryptoAmount'},
      {label: 'USD:', key: 'fiatAmount'}
    ];

    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainerStyle}>
        <View style={{
                // flex: 1,
                flexDirection: "row"
              }}
        >
          {(this.state.addresses.length !== 0) &&
              (<Button success
                style={{
                  marginTop: 5,
                  marginBottom: 5,
                  padding: 5,
                  borderRadius: 8
                }}
                 onPress={this.checkBalance}
               >
                <Text style={{color: "white", fontWeight: "400", fontSize: 20}}>Check Balance</Text>
              </Button>
            )
          }
        </View>
        <Modal animationType = {"slide"} transparent = {false}
          visible = {this.state.qrmodal}
          style={{flex: 1.5,
            alignItems: "center"
          }}
          onRequestClose = {() => { this.toggleQrModal() } }
        >
        {this.state.qrmodal && <QrAddressReader addAddress={this.addAddress} toggleQrModal={this.toggleQrModal} />}
        </Modal>
        <View
          style={{ flexDirection: "row" }}
        >
          <TextInput
            onChangeText={inputText => this.setState({inputText})}
            value={this.state.inputText}
            style={styles.textInput}
            />
            <TouchableOpacity
               style={{
                 marginLeft: 2,
                 padding: 2,
                 color: "white",
                 backgroundColor: "#0069d9",
                 borderRadius: 8
               }}
               onPress={this.toggleQrModal}
             >
              <Text style={{color: "white", fontWeight: "400"}}>QR</Text>
            </TouchableOpacity>
        </View>

        <View
          style={{ marginTop: 5}}
        >
          <Button
            style={{  borderRadius: 8}}
            onPress={this.addAddress}
            >
            <Text style={{
                    color: "white",
                    padding: 5,
                    fontSize: 20,
                  }}
                  >
                  Enter a New Paper Wallet
                  </Text>
            </Button>
          </View>

        {(this.state.addresses.length !== 0) && (
          <Totals
            fiatSym={this.props.fiatSym}
            fiatPrice ={this.props.fiatPrice}
            addresses={this.state.addresses}
            checkBalanceState={this.props.checkBalanceState}
            cryptoSym={this.props.cryptoSym}
          />
        )}
        <Addresses entries={this.state.addresses}
                   delete={this.deleteAddress}
                   cryptoSym={this.props.cryptoSym}
                   fiatSym={this.props.fiatSym}
        />
      </ScrollView>
    );
  }
}



// <TouchableOpacity
//   style={{
//     flex: 1/3,
//     backgroundColor: "#218838"
//   }}
//   onPress={this.checkBalance}
// >
//   <Text style={{
//           color: "white",
//           textAlign: "center"
//         }}
//   >
//     Check Balance
//   </Text>
// </TouchableOpacity>

// <TouchableOpacity
//   style={{
//     flex: 1/3,
//     backgroundColor: "#ffc107"
//   }}
//   onPress={console.log("load")}
// >
//   <Text style={{
//           color: "white",
//           textAlign: "center"
//         }}
//   >
//     Load Spreadsheet
//   </Text>
// </TouchableOpacity>

// {(this.state.addresses.length !== 0) &&
//   (<TouchableOpacity
//      style={{
//        flex: 1/3,
//        backgroundColor: "#0069d9"
//      }}
//      onPress={console.log("export")}
//    >
//      <Text style={{
//              color: "white",
//              textAlign: "center"
//            }}
//      >
//        Export Spreadsheet
//      </Text>
//    </TouchableOpacity>
//   )
// }

 const styles = StyleSheet.create({
    container: {
      flex: 1,
      // flexDirection: 'column',
      // backgroundColor: 'white',
      // borderColor: "black",
      // borderWidth: 2
    },
    contentContainerStyle: {
      alignItems: 'center',
      justifyContent: 'flex-start'
    },
    textInput: {
      backgroundColor: '#f5f5f0',
      padding: 2,
      borderColor: "black",
      borderWidth: 1,
      borderRadius: 14,
      width: 250,
      height: 30
    },
});
