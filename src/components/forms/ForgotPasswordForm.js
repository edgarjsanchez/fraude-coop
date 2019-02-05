import React, { Component } from "react";
import {
  Form,
  Item,
  Input,
  Icon,
  Button,
  Text,
  Toast,
  Spinner
} from "native-base";
import {
  Keyboard,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Alert
} from "react-native";
import { PropTypes } from "prop-types";
import Validator from "validator";

class ForgotPasswordForm extends Component {
  state = {
    data: {
      email: ""
    },
    errors: {},
    loading: false
  };

  onSubmit = () => {
    Keyboard.dismiss();
    const { data } = this.state;
    const errors = this.validate(data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true });
      console.log(data);
      this.props.submit(data).catch(error => {
        this.setState({ loading: false });
        if (error.response) {
          this.showError(error.response.data.errors.global);
        } else if (error.request) {
          this.showError("Servicio No Disponible.");
        }
      });
    }
  };

  validate = data => {
    const errors = {};
    //Validar campos en blanco
    if (!data.email) errors.email = "Se require email.";
    //Validar email
    if (data.email && !Validator.isEmail(data.email)) {
      errors.email = "Email invalido";
      this.showError("Email no es valido.");
    }
    return errors;
  };

  onChangeEmail = text => {
    const { data } = this.state;
    this.setState({
      data: { ...data, email: text }
    });
  };

  showError = msg => {
    Toast.show({
      text: msg,
      buttonText: "Ok",
      duration: 5000,
      type: "danger"
    });
  };

  render() {
    const { data, errors, loading } = this.state;

    return (
      <KeyboardAvoidingView
        style={styles.maincontainer}
        behavior="padding"
        enabled
      >
        <Text>Pedido De Reset De Password</Text>
        <Form style={{ marginTop: "10%" }}>
          <Item error={!!errors.email}>
            <Icon active type="MaterialCommunityIcons" name="email" />
            <Input
              value={data.email}
              onChangeText={this.onChangeEmail}
              autoCapitalize="none"
              placeholder="Email"
              style={styles.label}
            />
          </Item>
          <View style={{ marginTop: "10%" }}>
            <Button success block onPress={this.onSubmit} disabled={loading}>
              {!loading && <Text>Continuar</Text>}
              {loading && <Spinner color="white" />}
            </Button>
          </View>
        </Form>
      </KeyboardAvoidingView>
    );
  }
}

ForgotPasswordForm.propTypes = {
  submit: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    replace: PropTypes.func.isRequired
  }).isRequired
};
export default ForgotPasswordForm;

const styles = StyleSheet.create({
  maincontainer: {
    padding: "5%",
    flex: 1
  },
  label: { fontSize: 15 }
});
