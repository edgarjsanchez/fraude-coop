import React from "react";
import PropTypes from "prop-types";
import SignupForm from "../forms/SignupForm";
import { login } from "../../api/auth";
import setAuthorization from "../../utils/setAuthorizationHeader";
import * as Keychain from "react-native-keychain";

class LoginPage extends React.Component {
  submit = data =>
    login(data).then(res => {
      Keychain.setGenericPassword("session", res.token).then(() => {
        setAuthorization(res.token);
        this.props.navigation.replace("HomePage");
      });
    });

  render() {
    return (
      <SignupForm submit={this.submit} navigation={this.props.navigation} />
    );
  }
}

LoginPage.propTypes = {
  navigation: PropTypes.shape({
    replace: PropTypes.func.isRequired
  }).isRequired
};

export default LoginPage;
