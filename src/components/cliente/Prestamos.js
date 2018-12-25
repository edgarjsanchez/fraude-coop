import React, { Component } from "react";
import { Alert } from "react-native";
import { Card, CardItem, Grid, Row, Col, Text } from "native-base";

export default class Prestamos extends Component {
  render() {
    return (
      <Card>
        <CardItem header bordered>
          <Text style={{ color: "green" }}>Prestamos</Text>
        </CardItem>
        {this.props.prestamos.map((prestamo, index) => (
          <CardItem
            bordered
            key={index}
            button
            onPress={() => Alert.alert(`${prestamo.balance}`)}
          >
            <Grid>
              <Col size={65}>
                <Row>
                  <Text
                    style={{
                      color: "black"
                    }}
                  >
                    {prestamo.descripcion}
                  </Text>
                </Row>
                <Row>
                  <Text note>Pago: {prestamo.pago}</Text>
                </Row>
                <Row>
                  <Text note>En: {prestamo.proxpago}</Text>
                </Row>
              </Col>
              <Col
                size={35}
                style={{ alignItems: "flex-end", justifyContent: "center" }}
              >
                <Text style={{ color: "green" }}>{prestamo.balance}</Text>
              </Col>
            </Grid>
          </CardItem>
        ))}
      </Card>
    );
  }
}
