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
import { Image, View, Alert, Keyboard } from "react-native";
import { PropTypes } from "prop-types";
import { AsyncStorage, Platform, Dimensions } from "react-native";
import FingerPrint from "../../touch/FingerPrint";
import TouchID from "react-native-touch-id";
import * as Keychain from "react-native-keychain";
import LoginImage from "../../images/bancacoop.png";
import { ScaledSheet } from "react-native-size-matters";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

class LoginForm extends Component {
  state = {
    data: {
      user: "",
      password: ""
    },
    errors: {},
    loading: false,
    showTouch: false,
    storedUser: ""
  };

  componentDidMount() {
    //Keychain.resetGenericPassword();
    //AsyncStorage.removeItem("usuario");
    AsyncStorage.getItem("usuario", (err, usuario) => {
      const { data } = this.state;
      this.setState({
        data: { ...data, user: usuario }
      });
      this.setState({ storedUser: usuario });
      AsyncStorage.getItem("touchid" + usuario, (err, touch_id) => {
        if (touch_id == "true") {
          Keychain.getGenericPassword()
            .then(creds => {
              if (creds) {
                if (creds.username == usuario) {
                  this.setState({ showTouch: true });
                  this.authenticate();
                }
              } else {
                this.setState({ showTouch: false });
              }
            })
            .catch(error => {
              this.setState({ showTouch: false });
            });
        }
      });
    });
  }

  onSubmit = () => {
    Keyboard.dismiss();
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
    if (!data.user) errors.user = "Se require email.";
    if (!data.password) errors.password = "Se requiere password.";
    return errors;
  };

  onChangeUser = text => {
    const { data, storedUser } = this.state;
    if (storedUser == text) {
      this.setState({ showTouch: true });
    } else {
      this.setState({ showTouch: false });
    }
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
          .then(credentials => {
            const { data } = this.state;
            this.setState({
              data: { ...data, user: credentials.user }
            });
            this.setState({
              data: { ...data, password: credentials.password }
            });
            this.onSubmit();
          })
          .catch(error => {
            console.log(error);
            Alert.alert(error.message);
          });
      })
      .catch(error => {
        console.log(error);
        //Alert.alert(error.message);
      });
  };

  render() {
    const { data, errors, loading, showTouch } = this.state;

    return (
      <KeyboardAwareScrollView>
        <Container style={styles.maincontainer}>
          <View style={styles.imagecontainer}>
            <Image
              source={LoginImage}
              resizeMode="contain"
              style={{ width: Dimensions.get("window").width / 2 }}
            />
          </View>
          <View style={styles.formcontainer}>
            <Form>
              <Item error={!!errors.user}>
                <Icon active name="person" />
                <Input
                  style={styles.input_text}
                  value={data.user}
                  onChangeText={this.onChangeUser}
                  autoCapitalize="none"
                  placeholder="Usuario o Email"
                />
                {Platform.OS === "ios" && showTouch && (
                  <FingerPrint auth={this.authenticate} />
                )}
              </Item>
              <Item password error={!!errors.password}>
                <Icon active name="lock" />
                <Input
                  style={styles.input_text}
                  secureTextEntry
                  placeholder="Password"
                  value={data.password}
                  onChangeText={this.onChangePassword}
                />
                <View>
                  <Button
                    transparent
                    success
                    onPress={() =>
                      this.props.navigation.navigate("ForgotPasswordPage")
                    }
                  >
                    <Text style={styles.green_link_text}>No recuerdo</Text>
                  </Button>
                </View>
              </Item>
              <View style={{ marginTop: "10%" }}>
                <Button
                  success
                  block
                  onPress={this.onSubmit}
                  disabled={loading}
                >
                  {!loading && <Text style={styles.button_text}>Accesar</Text>}
                  {loading && <Spinner color="white" />}
                </Button>
              </View>
              <View style={{ marginTop: "10%" }}>
                <Button
                  transparent
                  block
                  onPress={() => this.props.navigation.navigate("SignupPage")}
                >
                  {!loading && (
                    <Text style={styles.inscription_text}>
                      Inscribase Al Servicio
                    </Text>
                  )}
                </Button>
              </View>
            </Form>
          </View>
        </Container>
      </KeyboardAwareScrollView>
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

const styles = ScaledSheet.create({
  maincontainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  imagecontainer: {
    alignItems: "center"
  },
  formcontainer: {
    width: "90%",
    maxWidth: 600
  },
  inscription_text: { color: "grey", fontSize: "16@ms0.4" },
  input_text: { fontSize: "15@ms0.4" },
  button_text: { fontSize: "16@ms0.4" },
  green_link_text: { fontSize: "14@ms0.4", paddingRight: 15 }
});
