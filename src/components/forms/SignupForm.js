import React, { Component } from "react";
import {
  Container,
  Form,
  Item,
  Input,
  Icon,
  Button,
  Text,
  Toast,
  Spinner
} from "native-base";
import { Image, View, StyleSheet, Alert } from "react-native";
import { PropTypes } from "prop-types";
import setAuthorization from "../../utils/setAuthorizationHeader";

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
    const { data } = this.state;
    const errors = this.validate(data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true });
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
    if (!data.user) errors.user = "Se require usuario.";
    if (!data.password) errors.password = "Se requiere password.";
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
      duration: 3000,
      type: "danger"
    });
  };

  render() {
    const { data, errors, loading } = this.state;

    return (
      <Container style={styles.maincontainer}>
        <View>
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
                placeholder="Ultimos 4 Digitos Seguro Social"
              />
            </Item>
            <Item error={!!errors.user}>
              <Icon active type="MaterialCommunityIcons" name="email" />
              <Input
                value={data.email}
                onChangeText={this.onChangeEmail}
                autoCapitalize="none"
                placeholder="Email"
              />
            </Item>
            <Item password error={!!errors.password}>
              <Icon active type="MaterialCommunityIcons" name="lock" />
              <Input
                secureTextEntry
                placeholder="Password"
                value={data.password}
                onChangeText={this.onChangePassword}
              />
            </Item>
            <Item password error={!!errors.password2}>
              <Icon active type="MaterialCommunityIcons" name="lock" />
              <Input
                secureTextEntry
                placeholder="Confirme Password"
                value={data.password2}
                onChangeText={this.onChangePassword2}
              />
            </Item>
            <View style={{ marginTop: "10%" }}>
              <Button success block onPress={this.onSubmit} disabled={loading}>
                {!loading && <Text>Enviar</Text>}
                {loading && <Spinner color="white" />}
              </Button>
            </View>
          </Form>
        </View>
      </Container>
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
    flex: 1,
    justifyContent: "center"
  },
  imagecontainer: {
    alignItems: "center"
  },
  logo: { width: 310, height: 90 }
});
