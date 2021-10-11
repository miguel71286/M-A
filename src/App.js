import "./App.css";
import { useState, useEffect } from "react";
import AlertasApi from "./Componentes/AlertasApi";
import Navbar from "./Componentes/Navbar";
import CreaAlerta from "./Componentes/CreaAlerta";

const App = () => {
  const url = process.env.REACT_APP_BACKEND_URL;

  const [alertas, setAlertas] = useState([]);

  // Get para recuperar datos de Alertas -------------------------

  const recuperaDatos = async () => {
    try {
      const respuesta = await fetch(url);
      const resultado = await respuesta.json();
      setAlertas(resultado.alerta);
      setCopia(resultado.alerta);
      console.log(resultado.alerta);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    recuperaDatos();
  }, []);

  //  Eliminar Alerta --------------------------------------------

  const eliminarAlerta = async (id) => {
    var requestOptions = {
      method: "DELETE",
      redirect: "follow",
    };

    await fetch(`https://git.heroku.com/alerts-ma.git/${id}`, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
    recuperaDatos();
  };

  // Crear Alerta --------------------------------------------------

  const creaAlerta = async (alerta) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      Reminder: alerta.reminder,
      Veces: alerta.veces,
      Fecha: alerta.fecha,
      Notas: alerta.notas,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    await fetch("https://git.heroku.com/alerts-ma.git", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
    recuperaDatos();
  };

  // Modificar Alerta --------------------------------------------

  const modificarAlerta = async (alerta) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      Reminder: alerta.reminder,
      Veces: alerta.veces,
      Fecha: alerta.fecha,
      Notas: alerta.notas,
    });

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    await fetch(`https://git.heroku.com/alerts-ma.git/${alerta.id}`, requestOptions)
      .then((response) => response.text())
      .catch((error) => console.log("error", error));
    recuperaDatos();
  };

  const [copia, setCopia] = useState([]);
  const añadirElementosEncontrados = (buscador) => {
    const elementosEncontrados = copia.filter((elemento) => {
      return elemento.Reminder.toLowerCase().startsWith(buscador.toLowerCase());
    });
    setAlertas(elementosEncontrados);
  };

  return (
    <div>
      <Navbar
        alertas={alertas}
        onAñadirElementosEncontrados={añadirElementosEncontrados}
      />
      <CreaAlerta onCreaAlerta={creaAlerta} />
      <AlertasApi
        onAlertas={alertas}
        onEliminarAlerta={eliminarAlerta}
        onModificarAlerta={modificarAlerta}
      />
    </div>
  );
};

export default App;
