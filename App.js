// App.js
import React from "react";
import { Root } from "native-base";
import { createStackNavigator, createAppContainer } from "react-navigation";
import LoginPage from "./src/components/pages/LoginPage";
import HomePage from "./src/components/pages/HomePage";
import ViajePage from "./src/components/pages/ViajePage";

const AppNavigator = createStackNavigator({
  LoginPage: {
    screen: LoginPage,
    navigationOptions: {
      header: null
    }
  },
  HomePage: {
    screen: HomePage,
    navigationOptions: {
      header: null,
      headerBackTitle: null
    }
  },

  ViajePage: {
    screen: ViajePage,
    navigationOptions: {
      headerTitle: "Crear Viaje"
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
