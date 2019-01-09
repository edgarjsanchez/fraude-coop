import React from "react";
import PropTypes from "prop-types";
import ViajeForm from "../forms/ViajeForm";
import { updateViaje } from "../../api/auth";

class EditViajePage extends React.Component {
  submit = data =>
    updateViaje(data).then(res => {
      this.props.navigation.replace("HomePage");
    });

  render() {
    const { navigation } = this.props;
    const viaje = navigation.getParam("viaje", "");
    return (
      <ViajeForm
        submit={this.submit}
        navigation={this.props.navigation}
        viaje={viaje}
      />
    );
  }
}

EditViajePage.propTypes = {
  navigation: PropTypes.shape({
    replace: PropTypes.func.isRequired
  }).isRequired
};

export default EditViajePage;
