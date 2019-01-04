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
import { FlatList } from "react-native";

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
