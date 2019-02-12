import React from "react";
import PropTypes from "prop-types";
import ForgotPasswordForm from "../forms/ForgotPasswordForm";
import { resetPasswordRequest } from "../../api/auth";
import { Alert } from "react-native";

class ForgotPasswordPage extends React.Component {
  submit = data =>
    resetPasswordRequest(data).then(() => {
      Alert.alert(
        "Pedido de reset de password enviado, verifique su email para continuar."
      );
      this.props.navigation.replace("LoginPage");
    });
  render() {
    return (
      <ForgotPasswordForm
        submit={this.submit}
        navigation={this.props.navigation}
      />
    );
  }
}

ForgotPasswordPage.propTypes = {
  navigation: PropTypes.shape({
    replace: PropTypes.func.isRequired
  }).isRequired
};

export default ForgotPasswordPage;
