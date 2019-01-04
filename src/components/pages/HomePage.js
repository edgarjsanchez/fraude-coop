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
  Toast,
  Drawer
} from "native-base";
import { RefreshControl, AsyncStorage } from "react-native";
import { getViajes } from "../../api/auth";
import SideBar from "../menu/SideBar";
import Viajes from "../cliente/Viajes";

export class Home extends Component {
  state = {
    refreshing: false,
    viajes: []
  };

  componentDidMount() {
    this.buscarViajes();
  }

  _onRefresh = () => {
    this.setState({ refreshing: true });
    this.buscarViajes();
  };

  buscarViajes = () => {
    AsyncStorage.getItem("usuario", (err, usuario) => {
      getViajes(usuario)
        .then(viajes => this.setState({ viajes, refreshing: false }))
        .catch(err => {
          this.showError("Problemas para obtener lista de viajes.");
        });
    });
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

  removeItem = key => {
    let viajes = this.state.viajes;
    viajes = viajes.filter(item => item.key !== key);
    this.setState({ viajes });
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
              <Title style={{ color: "white" }}>Viajes</Title>
            </Body>
            <Right>
              <Button
                transparent
                onPress={() => this.props.navigation.navigate("ViajePage")}
              >
                <Icon name="add" style={{ color: "white" }} />
              </Button>
            </Right>
          </Header>
          <Content
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh}
                title="Actualizando..."
              />
            }
          >
            <Viajes viajes={this.state.viajes} removeItem={this.removeItem} />
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
