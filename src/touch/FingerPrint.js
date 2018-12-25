"use strict";
import React, { Component } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { Button, Text } from "native-base";

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
      <View style={styles.container}>
        <Button
          transparent
          success
          onPress={this.clickHandler}
          style={{ alignSelf: "center" }}
        >
          <Text style={{ fontSize: 14 }}>{`Use ${
            this.state.biometryType
          }`}</Text>
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20
  }
});
