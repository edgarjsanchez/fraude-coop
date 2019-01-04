import React from "react";
import PropTypes from "prop-types";
import ViajeForm from "../forms/ViajeForm";
import { putViaje } from "../../api/auth";

class ViajePage extends React.Component {
  submit = data =>
    putViaje(data).then(res => {
      this.props.navigation.replace("HomePage");
    });

  render() {
    return (
      <ViajeForm submit={this.submit} navigation={this.props.navigation} />
    );
  }
}

ViajePage.propTypes = {
  navigation: PropTypes.shape({
    replace: PropTypes.func.isRequired
  }).isRequired
};

export default ViajePage;
