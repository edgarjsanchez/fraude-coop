import React, { Component } from "react";
import {
  Container,
  Form,
  Item,
  Button,
  Text,
  Toast,
  Input,
  Picker,
  Label
} from "native-base";
import { AsyncStorage, View, StyleSheet } from "react-native";
import { PropTypes } from "prop-types";
import moment from "moment";
import "moment/locale/es";
import DateRangePicker from "../../utils/DateRangePicker";
import { LocaleConfig } from "react-native-calendars";
import { espanol } from "../../utils/calendario";

LocaleConfig.locales["es"] = espanol;
LocaleConfig.defaultLocale = "es";

class ViajeForm extends Component {
  state = {
    cliente: "",
    tarjeta: "",
    pais: "",
    desde: "",
    hasta: "",
    rango: "",
    loading: false,
    errors: { tarjeta: "", descripcion: "", pais: "", rango: "" },
    paises: [],
    razones: [],
    tarjetas: [],
    selectedItems: []
  };

  componentWillMount() {
    //Si viene con data para editar
    if (this.props.viaje) {
      const {
        key,
        tarjeta,
        descripcion,
        pais,
        desde,
        hasta
      } = this.props.viaje;
      this.setState({
        key,
        tarjeta,
        descripcion,
        pais,
        desde,
        hasta,
        rango: desde + " a " + hasta
      });
    }
    AsyncStorage.getItem("usuario", (err, cliente) => {
      this.setState({
        cliente,
        tarjetas: [
          { label: "0000000000000001", value: "0000000000000001" },
          { label: "0000000000000002", value: "0000000000000002" },
          { label: "Todas", value: "Todas" }
        ],
        paises: [
          { label: "Orlando, FL", value: "Orlando, FL" },
          { label: "Carolina, PR", value: "Carolina, PR" },
          { label: "Dallas, TX", value: "Dallas, TX" }
        ],
        razones: [
          { label: "Aviso y Notificacion", value: "Aviso y Notificacion" },
          { label: "Solo Notificacion", value: "Solo Notificacion" },
          {
            label: "Registro Ciudad Como Hogar",
            value: "Registro Ciudad Como Hogar"
          }
        ]
      });
    });
  }

  onSubmit = () => {
    const {
      key,
      tarjeta,
      pais,
      desde,
      hasta,
      descripcion,
      cliente
    } = this.state;
    const data = {
      key: key,
      cliente: cliente,
      pais: pais,
      desde: moment(desde).format("YYYY-MM-DD"),
      hasta: moment(hasta).format("YYYY-MM-DD"),
      tarjeta: tarjeta,
      descripcion: descripcion
    };
    const errors = this.validate(data);
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

  onSuccessDatePicker = (newdesde, newhasta) => {
    this.setState({
      desde: newdesde,
      hasta: newhasta,
      rango: newdesde + " a " + newhasta
    });
  };

  validate = data => {
    const errors = {};
    if (!data.descripcion) errors.descripcion = "Se requiere razon.";
    if (!data.pais) errors.pais = "Se requiere pais.";
    if (!data.desde) errors.rango = "Se requiere rango de fechas.";
    if (data.desde == "Invalid date")
      errors.rango = "Se requiere rango de fechas.";

    return errors;
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
      tarjeta,
      pais,
      paises,
      descripcion,
      razones,
      errors,
      loading,
      desde,
      hasta,
      rango,
      tarjetas
    } = this.state;

    return (
      <Container>
        <Form>
          <Item fixedLabel error={!!errors.tarjeta} style={{ marginTop: "5%" }}>
            <Label>Tarjeta:</Label>
            <Picker
              placeholder="Seleccione tarjetas"
              mode="dropdown"
              Header="Escoja"
              iosHeader="Escoja"
              selectedValue={tarjeta}
              onValueChange={(value, index) =>
                this.setState({
                  tarjeta: value,
                  errors: { ...errors, tarjeta: null }
                })
              }
            >
              {tarjetas.map((tarjeta, i) => {
                return (
                  <Picker.Item
                    key={i}
                    value={tarjeta.value}
                    label={tarjeta.label}
                  />
                );
              })}
            </Picker>
          </Item>
          <Item
            fixedLabel
            error={!!errors.descripcion}
            style={{ marginTop: "5%" }}
          >
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
          <Item fixedLabel error={!!errors.pais} style={{ marginTop: "5%" }}>
            <Label>Pais:</Label>
            <Picker
              placeholder="Seleccione ciudad, pais"
              mode="dropdown"
              Header="Escoja"
              iosHeader="Escoja"
              selectedValue={pais}
              onValueChange={(value, index) =>
                this.setState({
                  pais: value,
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
          <Item fixedLabel error={!!errors.rango}>
            <Label>Periodo:</Label>
            <Input value={rango} />
          </Item>
          <Item error={!!errors.rango}>
            <View style={styles.container}>
              <DateRangePicker
                initialRange={[desde, hasta]}
                onSuccess={(ndesde, nhasta) =>
                  this.onSuccessDatePicker(ndesde, nhasta)
                }
                theme={{ markColor: "red", markTextColor: "white" }}
                minDate={new Date()}
              />
            </View>
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
  },
  container: {
    flex: 1,
    alignItems: "stretch"
  }
});
