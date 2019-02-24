import React from "react";
import PropTypes from "prop-types";
import LoginForm from "../forms/LoginForm";
import { AsyncStorage, StyleSheet } from "react-native";
import { login } from "../../api/auth";
import setAuthorization from "../../utils/setAuthorizationHeader";
import * as Keychain from "react-native-keychain";
import { corpID } from "../../utils/environment";

class LoginPage extends React.Component {
  componentDidMount() {
    setAuthorization(corpID.token);
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
