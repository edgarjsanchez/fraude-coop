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
import { AsyncStorage, Platform } from "react-native";
import FingerPrint from "../../touch/FingerPrint";
import TouchID from "react-native-touch-id";
import setAuthorization from "../../utils/setAuthorizationHeader";
import * as Keychain from "react-native-keychain";

class LoginForm extends Component {
  state = {
    data: {
      user: "",
      password: ""
    },
    errors: {},
    loading: false
  };

  componentDidMount() {
    AsyncStorage.getItem("usuario", (err, usuario) => {
      const { data } = this.state;
      this.setState({
        data: { ...data, user: usuario }
      });
    });
  }

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

  authenticate = () => {
    TouchID.authenticate()
      .then(() => {
        Keychain.getGenericPassword()
          .then(creds => creds.password)
          .then(token => {
            setAuthorization(token);
            this.props.navigation.replace("HomePage");
          })
          .catch(error => {
            console.log(error);
            Alert.alert(error.message);
          });
      })
      .catch(error => {
        console.log(error);
        Alert.alert(error.message);
      });
  };

  render() {
    const { data, errors, loading } = this.state;

    return (
      <Container style={styles.maincontainer}>
        <View style={styles.imagecontainer}>
          <Image
            source={require("../../images/bancacoop.png")}
            style={styles.logo}
          />
        </View>
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
              {Platform.OS === "ios" && (
                <FingerPrint auth={this.authenticate} />
              )}
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
