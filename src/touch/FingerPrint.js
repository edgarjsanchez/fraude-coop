"use strict";
import React, { Component } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { Button, Text } from "native-base";
import { ScaledSheet } from "react-native-size-matters";

import TouchID from "react-native-touch-id";

export default class FingerPrint extends Component {
  state = {
    biometryType: null
  };

  componentDidMount() {
    TouchID.isSupported().then(biometryType => {
      this.setState({ biometryType });
    });
  }
  clickHandler = () =>
    TouchID.isSupported()
      .then(this.props.auth)
      .catch(error => {
        console.log(error);
        Alert.alert("TouchID not supported!");
      });

  render() {
    return (
      <View>
        {this.state.biometryType != "None" && (
          <Button transparent success onPress={this.clickHandler}>
            <Text style={styles.green_link_text}>{`Usar ${
              this.state.biometryType
            }`}</Text>
          </Button>
        )}
      </View>
    );
  }
}

const styles = ScaledSheet.create({
  green_link_text: { fontSize: "14@ms0.4", paddingRight: 15 }
});
