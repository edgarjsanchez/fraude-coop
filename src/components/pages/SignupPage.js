import React from "react";
import PropTypes from "prop-types";
import SignupForm from "../forms/SignupForm";
import { inscripcion } from "../../api/auth";
import { Alert } from "react-native";

class SignupPage extends React.Component {
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

SignupPage.propTypes = {
  navigation: PropTypes.shape({
    replace: PropTypes.func.isRequired
  }).isRequired
};

export default SignupPage;
