import React from "react";
import PropTypes from "prop-types";
import ForgotPasswordForm from "../forms/ForgotPasswordForm";
import { inscripcion } from "../../api/auth";
import { Alert } from "react-native";

class ForgotPasswordPage extends React.Component {
  submit = data =>
    inscripcion(data).then(() => {
      Alert.alert(
        "Pedido de acceso enviado, verifique su email para confirmacion."
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
