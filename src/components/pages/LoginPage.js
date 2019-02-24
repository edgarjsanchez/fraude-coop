import React from "react";
import PropTypes from "prop-types";
import LoginForm from "../forms/LoginForm";
import { AsyncStorage, StyleSheet } from "react-native";
import { login, test } from "../../api/auth";
import setAuthorization from "../../utils/setAuthorizationHeader";
import * as Keychain from "react-native-keychain";

class LoginPage extends React.Component {
  componentWillMount() {
    setAuthorization(
      "eyJhbGciOiJIUzI1NiJ9.eyJjb21wYW5pYSI6Ik15U29mdHdhcmVPViJ9.mr6os1iR-3ywUgDaTGQXqHPfIDHdzhI8YAAbEZlGhzU"
    );
  }

  submit = data =>
    login(data).then(res => {
      AsyncStorage.setItem("usuario", res.email);
      Keychain.setGenericPassword(res.email, data.password).then(() => {
        setAuthorization(res.token);
        this.props.navigation.replace("HomePage");
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
