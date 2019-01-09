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

LocaleConfig.locales["es"] = {
  monthNames: [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre"
  ],
  monthNamesShort: [
    "Ene.",
    "Feb.",
    "Mar",
    "Abr",
    "May",
    "Jun",
    "Jul.",
    "Ago",
    "Sept.",
    "Oct.",
    "Nov.",
    "Dec."
  ],
  dayNames: [
    "Domingo",
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Viernes",
    "Sabado"
  ],
  dayNamesShort: ["Dom.", "Lun.", "Mar.", "Mie.", "Jue.", "Vie.", "Sab."]
};

LocaleConfig.defaultLocale = "es";

class ViajeForm extends Component {
  state = {
    cliente: "",
    pais: "",
    desde: "",
    hasta: "",
    rango: "",
    loading: false,
    errors: { descripcion: "", pais: "", rango: "" },
    paises: [],
    razones: []
  };

  componentWillMount() {
    //Si viene con data para editar
    if (this.props.viaje) {
      const { key, descripcion, pais, desde, hasta } = this.props.viaje;
      this.setState({
        key,
        descripcion,
        pais,
        desde,
        hasta,
        rango: desde + " a " + hasta
      });
    }

    moment.locale("es");
    AsyncStorage.getItem("usuario", (err, cliente) => {
      this.setState({
        cliente,
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
    const { key, pais, desde, hasta, descripcion, cliente } = this.state;
    const tarjeta = "000000001";
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

  onSuccess = (newdesde, newhasta) => {
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
      pais,
      paises,
      descripcion,
      razones,
      errors,
      loading,
      desde,
      hasta,
      rango
    } = this.state;
    return (
      <Container>
        <Form>
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
                onSuccess={(ndesde, nhasta) => this.onSuccess(ndesde, nhasta)}
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
