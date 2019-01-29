import React from "react";
import PropTypes from "prop-types";
import SignupForm from "../forms/SignupForm";
import { inscripcion } from "../../api/auth";
import { Alert } from "react-native";

class LoginPage extends React.Component {
  submit = data =>
    inscripcion(data).then(() => {
      Alert.alert(
        "Pedido de acceso enviado, verifique su email para confirmacion."
      );
      this.props.navigation.replace("LoginPage");
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
