import React, { Component } from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { Body, Button, Text, View, Input,
         Header, Icon, Left, Title } from "native-base";

const EnterAddress = (props) => {
  return (
    <View style={{flex: 1}}>
      <Header hasTabs>
        <Left>
          <Button transparent
                  onPress={props.toggleEnterAddressModal}
          >
            <Icon name='arrow-back' />
          </Button>
        </Left>
        <Body>
          <Title>Enter Address</Title>
        </Body>
      </Header>
      <View style={{flexDirection: "row", justifyContent: "center"}}>
        <Input
          onChangeText={inputText => props.changeInputText(inputText)}
          value={props.inputText}
          placeholder="Enter Address"
          style={styles.textInput}
        />
      </View>
      <View style={{
                     flexDirection: "row",
                     justifyContent: "center"
                  }}
      >
        <Button
          style={{  borderRadius: 8}}
          // onPress={this.addAddress}
          onPress={props.addAddress}
        >
          <Text style={{
                  color: "white",
                  padding: 5,
                  fontSize: 20,
                }}
                >
                Enter Address
          </Text>
        </Button>
      </View>
      <View style={{
                     flexDirection: "row",
                     justifyContent: "center"
                  }}
      >
        <Button
          style={{
            marginTop: 5,
            padding: 2,
            color: "white",
            backgroundColor: "#0069d9",
            borderRadius: 8
          }}
          onPress={props.toggleQrModal}
        >
          <Icon name="qrcode-scan" type="MaterialCommunityIcons" style={{margin: 0}} />
          <Text style={{color: "white", fontSize: 20}}>
            QRcode
          </Text>
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
   textInput: {
     backgroundColor: '#f2f2f2',
     padding: 2,
     marginTop: 10,
     marginBottom: 10,
     marginLeft: 25,
     marginRight: 25,
     borderBottomColor: '#6666ff',
     borderBottomWidth: 1,
     borderRadius: 5,
     width: 250,
     height: 30
   },
});

export default EnterAddress;
