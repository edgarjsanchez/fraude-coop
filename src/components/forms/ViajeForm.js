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
import { View, StyleSheet, Modal } from "react-native";
import { PropTypes } from "prop-types";

class ViajeForm extends Component {
  state = {
    razon: "",
    pais: "",
    desde: "",
    hasta: "",
    loading: false,
    errors: { razon: "", pais: "", desde: "", hasa: "" },
    paises: [],
    razones: []
  };

  componentDidMount() {
    var today = new Date();
    this.setState({ chosenDate: today });
    this.setState({
      paises: [
        { label: "Orlando, FL", value: "1" },
        { label: "Carolina, PR", value: "2" },
        { label: "Dallas, TX", value: "3" }
      ]
    });
    this.setState({
      razones: [
        { label: "Aviso y Notificacion", value: "1" },
        { label: "Solo Notificacion", value: "2" },
        { label: "Registro Ciudad Como Hogar", value: "3" }
      ]
    });
  }

  onSubmit = () => {
    const { razon, pais, desde, hasta } = this.state;
    const data = { razon: razon, pais: pais, desde: desde, hasta: hasta };
    const errors = this.validate(data);
    this.setState({ errors });
  };

  validate = data => {
    const errors = {};
    if (!data.razon) errors.razon = "Se requiere razon.";
    if (!data.pais) errors.pais = "Se requiere pais.";
    if (!data.desde) errors.desde = "Se requiere fecha desde.";
    if (!data.hasta) errors.hasta = "Se requiere fecha hasta.";
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
    const { pais, paises, razon, razones, errors, loading } = this.state;

    return (
      <Container>
        <Form>
          <Item error={!!errors.razon} style={{ marginTop: "5%" }}>
            <Label>Razon:</Label>
            <Picker
              placeholder="Seleccione razon"
              mode="dropdown"
              selectedValue={razon}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({
                  razon: itemValue,
                  errors: { ...errors, razon: null }
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
              initialDate={new Date()}
              minimumDate={new Date()}
              locale={"en"}
              modalTransparent
              animationType={"fade"}
              androidMode={"default"}
              placeHolderText="Seleccione fecha"
              placeHolderTextStyle={{ color: "#adadad" }}
              onDateChange={this.onDesdeValueChange}
            />
          </Item>
          <Item error={!!errors.hasta} style={{ marginTop: "5%" }}>
            <Label>Fecha hasta:</Label>
            <Left>
              <DatePicker
                defaultDate={new Date()}
                minimumDate={new Date()}
                locale={"en"}
                modalTransparent
                animationType={"fade"}
                androidMode={"default"}
                placeHolderText="Seleccione fecha"
                placeHolderTextStyle={{ color: "#adadad" }}
                onDateChange={this.onHastaValueChange}
              />
            </Left>
          </Item>
        </Form>
        <View style={{ marginTop: "10%", marginHorizontal: "10%" }}>
          <Button success block onPress={this.onSubmit} disabled={loading}>
            <Text>Aceptar</Text>
          </Button>
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
