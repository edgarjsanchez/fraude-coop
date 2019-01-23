// App.js
import React from "react";
import { Root } from "native-base";
import { createStackNavigator, createAppContainer } from "react-navigation";
import LoginPage from "./src/components/pages/LoginPage";
import HomePage from "./src/components/pages/HomePage";
import SignupPage from "./src/components/pages/SignupPage";
import ViajePage from "./src/components/pages/ViajePage";
import EditViajePage from "./src/components/pages/EditViajePage";
import Viajes from "./src/components/cliente/Viajes";

const AppNavigator = createStackNavigator({
  LoginPage: {
    screen: LoginPage,
    navigationOptions: {
      header: null,
      headerBackTitle: null
    }
  },
  HomePage: {
    screen: HomePage,
    navigationOptions: {
      header: null,
      headerBackTitle: null
    }
  },
  SignupPage: {
    screen: SignupPage
  },
  Viajes: {
    screen: Viajes
  },
  ViajePage: {
    screen: ViajePage,
    navigationOptions: {
      headerTitle: "Crear Viaje"
    }
  },
  EditViajePage: {
    screen: EditViajePage,
    navigationOptions: {
      headerTitle: "Modificar Viaje"
    }
  }
});

const AppContainer = createAppContainer(AppNavigator);

const App = () => (
  <Root>
    <AppContainer />
  </Root>
);

export default App;
