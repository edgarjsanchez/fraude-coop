import React, { Component } from "react";
import {
  Content,
  SwipeRow,
  View,
  Text,
  Icon,
  Button,
  Separator,
  Left
} from "native-base";
import { FlatList, TouchableOpacity } from "react-native";
import moment from "moment";
import "moment/locale/es";

export default class App extends Component {
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
          data={this.props.viajes}
          renderItem={({ item }) => (
            <SwipeRow
              rightOpenValue={-75}
              body={
                <View>
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigator.navigate("EditViajePage", {
                        viaje: item
                      })
                    }
                  >
                    <Text style={{ paddingLeft: 10 }}>{item.tarjeta}</Text>
                    <Text note style={{ paddingLeft: 10 }}>
                      {item.descripcion}
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        alignItems: "baseline",
                        paddingLeft: 10
                      }}
                    >
                      {item.pais}
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        paddingLeft: 10
                      }}
                    >
                      De {moment(item.desde).format("ll")} a{" "}
                      {moment(item.hasta).format("ll")}
                    </Text>
                  </TouchableOpacity>
                </View>
              }
              right={
                <Button danger onPress={() => this.props.removeItem(item.key)}>
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
