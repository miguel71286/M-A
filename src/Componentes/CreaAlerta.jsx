import React from "react";
import { useState } from "react";
import swal from "sweetalert";

const CreaAlerta = (props) => {
  const creaAlerta = props.onCreaAlerta;
  const [error, setError] = useState(false);

  const [nuevoReminder, setNuevoReminder] = useState("");
  const [nuevoVeces, setNuevoVeces] = useState("");
  const [nuevaFecha, setNuevaFecha] = useState("");
  const [nuevaNota, setNuevaNota] = useState("");

  const gestorSubmit = (evento) => {
    evento.preventDefault();
    setError(false);
    if (
      nuevoReminder.trim() === "" ||
      nuevoVeces.trim() === "" ||
      nuevaFecha.trim() === "" ||    
      nuevaNota.trim() === ""
    ) {
      setError(true);
      return;
    }

    const alerta = {
      reminder: nuevoReminder,
      veces: nuevoVeces,
      fecha: nuevaFecha,
      notas: nuevaNota,  
    };
    creaAlerta(alerta);
    swal({
      title: "Alertas MA",
      text: "Se ha creado una nueva alerta para Fraaaannnnnn",
      icon: "success",
      button: "Aceptar",
    });

    setNuevoReminder("");
    setNuevoVeces("");
    setNuevaFecha("");
    setNuevaNota("");
  };

  const gestorCambiaReminder = (event) => {
    setNuevoReminder(event.target.value);
  };
  const gestorCambioVeces = (event) => {
    setNuevoVeces(event.target.value);
  };
  const gestorCambiaFecha = (event) => {
    setNuevaFecha(event.target.value);
  };
  const gestorCambiaNota = (event) => {
    setNuevaNota(event.target.value);
  };
  return (
    <div className="formulario-crear">
      <div className="tarjeta-formulario">
        <h1 className="sugerir">Sugerir nuevas Alertas</h1>
        {error ? (
          <h3 className="error-campos">Debe completar todos los campos</h3>
        ) : null}
        <form
          onSubmit={gestorSubmit}
          id="prueba"
          className="col-g-3"
          action="formulario"
        >
          <input
            onChange={gestorCambiaReminder}
            className="form-text"
            type="text"
            name="reminder"
            id="reminder"
            placeholder="Reminder"
            required
            value={nuevoReminder}
          />
          <input
            onChange={gestorCambioVeces}
            className="form-text"
            type="number"
            name="veces"
            id="veces"
            placeholder="Veces"
            required
            value={nuevoVeces}
          />
          <input
            onChange={gestorCambiaFecha}
            className="form-text"
            type="date"
            name="fecha"
            id="fecha"
            placeholder="Fecha"
            required
            value={nuevaFecha}
          />
          <textarea
            className="form-text"
            name="informacion"
            id="informacion"
            value={nuevaNota}
            onChange={gestorCambiaNota}
            cols="30"
            rows="2"
          ></textarea>
          <button
            id="btn-creaalerta"
            className="btn btn btn-outline-success"
            type="submit"
          >
            <i class="fa fa-save"></i>
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreaAlerta;
