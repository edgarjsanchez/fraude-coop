import React from "react";
import PropTypes from "prop-types";
import SignupForm from "../forms/SignupForm";
import { inscripcion } from "../../api/auth";

class LoginPage extends React.Component {
  submit = data =>
    inscripcion(data).then(() => {
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
