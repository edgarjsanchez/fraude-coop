import React, { Component } from "react";
import {
  Container,
  Content,
  Footer,
  Button,
  Icon,
  FooterTab,
  Header,
  Left,
  Body,
  Right,
  Title,
  Subtitle,
  Toast,
  Drawer
} from "native-base";
import { RefreshControl, AsyncStorage } from "react-native";
import { getCuentas, getPrestamos } from "../../api/auth";
import SideBar from "../menu/SideBar";
import Cuentas from "../cliente/Cuentas";
import Prestamos from "../cliente/Prestamos";

export class Home extends Component {
  state = {
    refreshing: false,
    cuentas: [],
    prestamos: []
  };

  componentDidMount() {
    AsyncStorage.getItem("usuario", (err, usuario) => {
      getCuentas(usuario)
        .then(cuentas => this.setState({ cuentas }))
        .catch(err => {
          this.showError("Problemas para obtener balances.");
        });
      getPrestamos(usuario)
        .then(prestamos => this.setState({ prestamos }))
        .catch(err => {
          this.showError("Problemas para obtener balances prestamos.");
        });
    });
  }

  _onRefresh = () => {
    this.setState({ refreshing: true });
    this.setState({
      cuentas: [
        { descripcion: "Ahorros", balance: 12345 },
        { descripcion: "Xmas", balance: 67890 },
        { descripcion: "Depositos", balance: 1222.11 },
        { descripcion: "Depositos 2", balance: 100 },
        { descripcion: "Depositos 3", balance: 15.12 }
      ]
    });
    this.setState({ refreshing: false });
  };

  showError = msg => {
    Toast.show({
      text: msg,
      buttonText: "Ok",
      duration: 3000,
      type: "danger"
    });
  };

  closeDrawer = () => {
    this.drawer._root.close();
  };

  openDrawer = () => {
    this.drawer._root.open();
  };

  render() {
    return (
      <Drawer
        ref={ref => {
          this.drawer = ref;
        }}
        content={<SideBar navigator={this.props.navigation} />}
        onClose={() => this.closeDrawer()}
      >
        <Container>
          <Header style={{ backgroundColor: "green" }}>
            <Left>
              <Button transparent onPress={() => this.openDrawer()}>
                <Icon
                  type="Entypo"
                  style={{ color: "white" }}
                  android="menu"
                  ios="menu"
                />
              </Button>
            </Left>
            <Body>
              <Title style={{ color: "white" }}>Informacion</Title>
              <Subtitle style={{ color: "white" }}>Balances</Subtitle>
            </Body>
            <Right>
              <Button
                transparent
                onPress={() => this.props.navigation.replace("LoginPage")}
              >
                <Icon name="log-out" style={{ color: "white" }} />
              </Button>
            </Right>
          </Header>
          <Content
            contentContainerStyle={{
              padding: "2%"
            }}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh}
                title="Actualizando..."
              />
            }
          >
            <Cuentas cuentas={this.state.cuentas} />
            <Prestamos prestamos={this.state.prestamos} />
          </Content>
          <Footer>
            <FooterTab>
              <Button onPress={() => this.toggleTab1()}>
                <Icon name="apps" />
              </Button>
              <Button onPress={() => this.toggleTab2()}>
                <Icon name="camera" />
              </Button>
              <Button onPress={() => this.toggleTab3()}>
                <Icon name="compass" />
              </Button>
              <Button onPress={() => this.toggleTab4()}>
                <Icon name="contact" />
              </Button>
            </FooterTab>
          </Footer>
        </Container>
      </Drawer>
    );
  }
}

export default Home;
