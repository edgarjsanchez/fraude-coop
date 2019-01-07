import React, { Component } from "react";
import {
  Container,
  Form,
  Item,
  Button,
  Text,
  Toast,
  Left,
  Picker,
  DatePicker,
  Label
} from "native-base";
import { AsyncStorage, View, StyleSheet } from "react-native";
import { PropTypes } from "prop-types";
import moment from "moment";
import "moment/locale/es";
import DateRangePicker from "../../utils/DateRangePicker";

class ViajeForm extends Component {
  state = {
    descripcion: "",
    cliente: "",
    pais: "",
    desde: "",
    hasta: "",
    loading: false,
    errors: { descripcion: "", pais: "", desde: null, hasta: null },
    paises: [],
    razones: []
  };

  componentDidMount() {
    moment.locale("es");
    var today = new Date();
    AsyncStorage.getItem("usuario", (err, cliente) => {
      this.setState({ cliente });
    });
    this.setState({
      paises: [
        { label: "Orlando, FL", value: "Orlando, FL" },
        { label: "Carolina, PR", value: "Carolina, PR" },
        { label: "Dallas, TX", value: "Dallas, TX" }
      ]
    });
    this.setState({
      razones: [
        { label: "Aviso y Notificacion", value: "Aviso y Notificacion" },
        { label: "Solo Notificacion", value: "Solo Notificacion" },
        {
          label: "Registro Ciudad Como Hogar",
          value: "Registro Ciudad Como Hogar"
        }
      ]
    });
  }

  onSubmit = () => {
    const { pais, desde, hasta, descripcion, cliente } = this.state;
    const tarjeta = "000000001";
    const data = {
      cliente: cliente,
      pais: pais,
      desde: moment(desde).format("YYYYMMDD"),
      hasta: moment(hasta).format("YYYYMMDD"),
      tarjeta: tarjeta,
      descripcion: descripcion
    };
    console.log(data);
    const errors = this.validate(data);
    console.log(errors);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true });
      this.props.submit(data).catch(error => {
        this.setState({ loading: false });
        if (error.response) {
          this.showError(error.response.data.errors.global);
        } else if (error.request) {
          this.showError("Problemas para actualizar. Trate mas tarde.");
        }
      });
    }
  };

  submit = data =>
    login(data).then(res => {
      AsyncStorage.setItem("usuario", res.login);
      Keychain.setGenericPassword("session", res.token).then(() => {
        setAuthorization(res.token);
        this.props.navigation.replace("HomePage");
      });
    });

  validate = data => {
    const errors = {};
    if (!data.descripcion) errors.descripcion = "Se requiere razon.";
    if (!data.pais) errors.pais = "Se requiere pais.";
    if (!data.desde) errors.desde = "Se requiere fecha desde.";
    if (data.desde == "Invalid date") errors.desde = "Se requiere fecha desde.";
    if (data.hasta == "Invalid date") errors.hasta = "Se requiere fecha desde.";
    if (!data.hasta) errors.hasta = "Se requiere fecha hasta.";
    if (data.desde > data.hasta) {
      errors.hasta = "Hasta no puede ser menor a desde.";
      this.showError("Fecha hasta no puede ser menor a fecha desde.");
    }
    return errors;
  };

  onDesdeValueChange = newDate => {
    const { errors } = this.state;
    this.setState({
      desde: newDate,
      errors: { ...errors, desde: null }
    });
  };

  onHastaValueChange = newDate => {
    const { errors } = this.state;
    this.setState({
      hasta: newDate,
      errors: { ...errors, hasta: null }
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
    const {
      pais,
      paises,
      descripcion,
      razones,
      errors,
      loading,
      desde
    } = this.state;

    return (
      <Container>
        <Form>
          <Item error={!!errors.descripcion} style={{ marginTop: "5%" }}>
            <Label>Razon:</Label>
            <Picker
              placeholder="Seleccione razon"
              mode="dropdown"
              Header="Escoja"
              iosHeader="Escoja"
              selectedValue={descripcion}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({
                  descripcion: itemValue,
                  errors: { ...errors, descripcion: null }
                })
              }
            >
              {razones.map((razon, i) => {
                return (
                  <Picker.Item
                    key={i}
                    value={razon.value}
                    label={razon.label}
                  />
                );
              })}
            </Picker>
          </Item>
          <Item error={!!errors.pais} style={{ marginTop: "5%" }}>
            <Label>Pais:</Label>
            <Picker
              placeholder="Seleccione ciudad, pais"
              mode="dropdown"
              Header="Escoja"
              iosHeader="Escoja"
              selectedValue={pais}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({
                  pais: itemValue,
                  errors: { ...errors, pais: null }
                })
              }
            >
              {paises.map((pais, i) => {
                return (
                  <Picker.Item key={i} value={pais.value} label={pais.label} />
                );
              })}
            </Picker>
          </Item>
          <Item error={!!errors.desde} style={{ marginTop: "5%" }}>
            <Label>Fecha desde:</Label>
            <DatePicker
              locale={"en"}
              modalTransparent
              animationType={"fade"}
              androidMode={"default"}
              placeHolderText="Seleccione fecha"
              placeHolderTextStyle={{ color: "#adadad" }}
              onDateChange={this.onDesdeValueChange}
              mode="date"
            />
          </Item>
          <Item error={!!errors.hasta} style={{ marginTop: "5%" }}>
            <Label>Fecha hasta:</Label>
            <Left>
              <DatePicker
                locale={"en"}
                modalTransparent
                animationType={"fade"}
                androidMode={"default"}
                placeHolderText="Seleccione fecha"
                placeHolderTextStyle={{ color: "#adadad" }}
                onDateChange={this.onHastaValueChange}
                mode="date"
              />
            </Left>
          </Item>
        </Form>
        <View style={{ marginTop: "10%", marginHorizontal: "10%" }}>
          <Button success block onPress={this.onSubmit} disabled={loading}>
            <Text>Aceptar</Text>
          </Button>
          <DateRangePicker
            initialRange={["2018-04-01", "2018-04-10"]}
            onSuccess={(s, e) => alert(s + "||" + e)}
            theme={{ markColor: "red", markTextColor: "white" }}
          />
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
    flex: 1
  }
});
