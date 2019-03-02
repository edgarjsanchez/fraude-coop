import React from "react";
import PropTypes from "prop-types";
import LoginForm from "../forms/LoginForm";
import { AsyncStorage, Alert } from "react-native";
import { login } from "../../api/auth";
import setAuthorization from "../../utils/setAuthorizationHeader";
import * as Keychain from "react-native-keychain";
import { corpID } from "../../utils/environment";

class LoginPage extends React.Component {
  componentDidMount() {
    setAuthorization(corpID.token);
  }

  activaTouchID = usuario => {
    AsyncStorage.setItem("touchid" + usuario, "true");
  };

  submit = data =>
    login(data).then(res => {
      AsyncStorage.getItem("usuario", (err, usuario) => {
        if (usuario != res.email) {
          AsyncStorage.setItem("usuario", res.email);
          Alert.alert(
            "Aviso",
            "Desea activar TouchID?",
            [
              {
                text: "No",
                onPress: () => {
                  Keychain.setGenericPassword(res.email, data.password).then(
                    () => {
                      setAuthorization(res.token);
                      this.props.navigation.replace("HomePage");
                    }
                  );
                },
                style: "cancel"
              },
              {
                text: "Ok",
                onPress: () => {
                  this.activaTouchID(res.email);
                  Keychain.setGenericPassword(res.email, data.password).then(
                    () => {
                      setAuthorization(res.token);
                      this.props.navigation.replace("HomePage");
                    }
                  );
                }
              }
            ],
            { cancelable: false }
          );
        }
      });
    });

  render() {
    return (
      <LoginForm submit={this.submit} navigation={this.props.navigation} />
    );
  }
}

LoginPage.propTypes = {
  navigation: PropTypes.shape({
    replace: PropTypes.func.isRequired
  }).isRequired
};

export default LoginPage;
