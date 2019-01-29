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

class LoginForm extends Component {
  state = {
    data: {
      cuenta: "",
      segsoc: "",
      email: "",
      password: "",
      password2: ""
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
    if (!data.cuenta) errors.cuenta = "Se requiere cuenta.";
    if (!data.segsoc) errors.segsoc = "Se requiere SS.";
    if (!data.email) errors.email = "Se require email.";
    if (!data.password) errors.password = "Se requiere password.";
    if (!data.password2) errors.password2 = "Se requiere password.";
    //Validar largo SS - 4 digitos
    if (!Validator.isLength(data.segsoc, 4, 4)) errors.segsoc = "Min largo 4";
    //Validar passwords
    if (data.password != data.password2) {
      errors.password = "Passwords no son iguales.";
      errors.password2 = "Passwords no son iguales.";
      this.showError("Passwords no son iguales.");
    }
    //Validar email
    if (data.email && !Validator.isEmail(data.email)) {
      errors.email = "Email invalido";
      this.showError("Email no es valido.");
    }
    return errors;
  };

  onChangeCuenta = text => {
    const { data } = this.state;
    this.setState({
      data: { ...data, cuenta: text.replace(/[^0-9]/g, "") }
    });
  };

  onChangeSegsoc = text => {
    const { data } = this.state;
    this.setState({
      data: { ...data, segsoc: text.replace(/[^0-9]/g, "") }
    });
  };

  onChangeEmail = text => {
    const { data } = this.state;
    this.setState({
      data: { ...data, email: text }
    });
  };

  onChangePassword = text => {
    const { data } = this.state;
    this.setState({
      data: { ...data, password: text }
    });
  };

  onChangePassword2 = text => {
    const { data } = this.state;
    this.setState({
      data: { ...data, password2: text }
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
        <Form>
          <Item error={!!errors.cuenta}>
            <Icon active type="MaterialCommunityIcons" name="account-box" />
            <Input
              value={data.cuenta}
              maxLength={9}
              onChangeText={this.onChangeCuenta}
              autoCapitalize="none"
              keyboardType="numeric"
              placeholder="Numero Cuenta"
              style={styles.label}
            />
          </Item>
          <Item error={!!errors.segsoc}>
            <Icon
              active
              type="MaterialCommunityIcons"
              name="security-account"
            />
            <Input
              value={data.segsoc}
              maxLength={4}
              onChangeText={this.onChangeSegsoc}
              autoCapitalize="none"
              keyboardType="numeric"
              placeholder="Ultimos 4 Digitos Seguro Social"
              style={styles.label}
            />
          </Item>
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
          <Item password error={!!errors.password}>
            <Icon active type="MaterialCommunityIcons" name="lock" />
            <Input
              secureTextEntry
              placeholder="Password"
              value={data.password}
              onChangeText={this.onChangePassword}
              autoCapitalize="none"
              style={styles.label}
            />
          </Item>
          <Item password error={!!errors.password2}>
            <Icon active type="MaterialCommunityIcons" name="lock" />
            <Input
              secureTextEntry
              placeholder="Confirme Password"
              value={data.password2}
              onChangeText={this.onChangePassword2}
              autoCapitalize="none"
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

LoginForm.propTypes = {
  submit: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    replace: PropTypes.func.isRequired
  }).isRequired
};
export default LoginForm;

const styles = StyleSheet.create({
  maincontainer: {
    padding: "5%",
    flex: 1
  },
  label: { fontSize: 15 }
});
