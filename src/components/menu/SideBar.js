import React, { Component } from "react";
import {
  Container,
  Content,
  List,
  ListItem,
  Text,
  View,
  Body,
  Right,
  Switch
} from "native-base";
import { Image, StyleSheet, AsyncStorage, Platform } from "react-native";
import setAuthorization from "../../utils/setAuthorizationHeader";
import { NavigationActions, StackActions } from "react-navigation";

class SideBar extends Component {
  state = {
    touchid: false,
    usuario: ""
  };

  logout = () => {
    setAuthorization();
    this.resetStack();
  };

  onChangeState = value => {
    this.setState({ touchid: value });
    AsyncStorage.setItem("touchid" + this.state.usuario, value.toString());
  };

  componentDidMount() {
    AsyncStorage.getItem("usuario", (err, usuario) => {
      if (usuario) {
        this.setState({ usuario });
        AsyncStorage.getItem("touchid" + usuario, (err, touch_id) => {
          if (touch_id == "true") {
            this.setState({ touchid: true });
          }
        });
      }
    });
  }

  resetStack = () => {
    this.props.navigator.dispatch(
      StackActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({
            routeName: "LoginPage"
          })
        ]
      })
    );
  };

  render() {
    const { touchid } = this.state;

    return (
      <Container>
        <Content>
          <View style={styles.imagecontainer}>
            <Image
              source={require("../../images/bancacoop.png")}
              style={styles.logo}
            />
          </View>

          <List>
            <ListItem
              button
              onPress={() => this.props.navigator.navigate("LoginPage")}
            >
              <Text>Mantenimiento Telefonos</Text>
            </ListItem>
            <ListItem>
              <Text>Transferencias</Text>
            </ListItem>
            <ListItem last>
              <Text>Tarjetas</Text>
            </ListItem>
            <ListItem>
              <Text>Personal</Text>
            </ListItem>
            {Platform.OS === "ios" && (
              <ListItem icon>
                <Body>
                  <Text>Login usando Touch ID</Text>
                </Body>
                <Right>
                  <Switch value={touchid} onValueChange={this.onChangeState} />
                </Right>
              </ListItem>
            )}
            <ListItem button onPress={this.resetStack}>
              <Text>Log out</Text>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}
export default SideBar;

const styles = StyleSheet.create({
  maincontainer: {
    padding: "5%",
    flex: 1,
    justifyContent: "center"
  },
  imagecontainer: {
    alignItems: "center",
    marginTop: "10%"
  },
  logo: { width: 220, height: 70 }
});
