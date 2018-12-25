import React, { Component } from "react";
import { Alert, View, StyleSheet, Image } from "react-native";
import { Card, CardItem, Grid, Row, Col, Text } from "native-base";

export default class Cuentas extends Component {
  render() {
    return (
      <Card>
        <CardItem header bordered>
          <Text style={{ color: "green" }}>Cuentas</Text>
        </CardItem>
        {this.props.cuentas.map((cuenta, index) => (
          <CardItem
            bordered
            key={index}
            button
            onPress={() => Alert.alert(`${cuenta.balance}`)}
          >
            <Grid>
              <Col size={10} style={styles.imagecontainer}>
                <View>
                  <Image
                    source={require("../../images/money-safe.png")}
                    style={styles.logo}
                  />
                </View>
              </Col>
              <Col size={30}>
                <Row>
                  <Text
                    style={{
                      color: "black"
                    }}
                  >
                    {cuenta.descripcion}
                  </Text>
                </Row>
                <Row>
                  <Text note>Tipo {cuenta.tipo}</Text>
                </Row>
              </Col>
              <Col size={55} style={{ alignItems: "flex-end" }}>
                <Row>
                  <Text style={{ color: "green" }}>{cuenta.balance}</Text>
                </Row>
                <Row>
                  <Text note>Disp: {cuenta.disponible}</Text>
                </Row>
              </Col>
            </Grid>
          </CardItem>
        ))}
      </Card>
    );
  }
}
const styles = StyleSheet.create({
  imagecontainer: {
    justifyContent: "center"
  },
  logo: { width: 20, height: 20 }
});
