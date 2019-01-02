import React, { Component } from "react";
import {
  Grid,
  Row,
  Col,
  Right,
  Content,
  SwipeRow,
  View,
  Text,
  Icon,
  Button,
  Separator,
  Left
} from "native-base";
import { FlatList } from "react-native";

export default class App extends Component {
  state = {
    data: [
      {
        key: "1",
        ciudad: "California, US",
        desde: "12 Dic 2018",
        hasta: "24 Dic 2018",
        tarjeta: "000000000001",
        descripcion: "Aviso y Notificacion"
      },
      {
        key: "2",
        ciudad: "Florida, US",
        desde: "12 Dic 2018",
        hasta: "24 Dic 2018",
        tarjeta: "000000000003",
        descripcion: "Solo Notificacion"
      },
      {
        key: "3",
        ciudad: "Texas, US",
        desde: "12 Dic 2018",
        hasta: "24 Dic 2018",
        tarjeta: "000000000002",
        descripcion: "Registro ciudad como hogar"
      }
    ]
  };

  removeItem(key) {
    let data = this.state.data;
    data = data.filter(item => item.key !== key);
    this.setState({ data });
  }

  render() {
    return (
      <Content scrollEnabled={false}>
        <Separator style={{ height: 45 }} bordered>
          <Text
            style={{
              fontSize: 12,
              color: "green"
            }}
          >
            REGISTROS VIGENTES
          </Text>
        </Separator>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            <SwipeRow
              leftOpenValue={75}
              rightOpenValue={-75}
              left={
                <Button success onPress={() => alert(item.ciudad)}>
                  <Icon active name="add" />
                </Button>
              }
              body={
                <View>
                  <Text
                    style={{
                      fontSize: 14,
                      alignItems: "baseline",
                      paddingLeft: 10
                    }}
                  >
                    {item.ciudad}
                  </Text>
                  <Text note style={{ paddingLeft: 10 }}>
                    {item.descripcion}
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      paddingLeft: 10
                    }}
                  >
                    De {item.desde} a {item.hasta}
                  </Text>
                </View>
              }
              right={
                <Button danger onPress={() => this.removeItem(item.key)}>
                  <Icon active name="trash" />
                </Button>
              }
            />
          )}
        />
      </Content>
    );
  }
}
