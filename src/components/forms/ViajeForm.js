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

class ViajeForm extends Component {
  state = {
    data: {
      user: "",
      password: ""
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

  onChangeUser = text => {
    const { data } = this.state;
    this.setState({
      data: { ...data, user: text }
    });
  };

  onChangePassword = text => {
    const { data } = this.state;
    this.setState({
      data: { ...data, password: text }
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
            <Item error={!!errors.user}>
              <Icon active name="person" />
              <Input
                value={data.user}
                onChangeText={this.onChangeUser}
                autoCapitalize="none"
                placeholder="Usuario"
              />
            </Item>
            <Item password error={!!errors.password}>
              <Icon active name="lock" />
              <Input
                secureTextEntry
                placeholder="Password"
                value={data.password}
                onChangeText={this.onChangePassword}
              />
            </Item>
            <View style={{ marginTop: "10%" }}>
              <Button success block onPress={this.onSubmit} disabled={loading}>
                {!loading && <Text>Log in</Text>}
                {loading && <Spinner color="white" />}
              </Button>
            </View>
          </Form>
        </View>
      </Container>
    );
  }
}

ViajeForm.propTypes = {
  submit: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    replace: PropTypes.func.isRequired
  }).isRequired
};
export default ViajeForm;

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
