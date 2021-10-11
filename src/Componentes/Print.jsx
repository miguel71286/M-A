import React from "react";
import { useState } from "react";
import swal from "sweetalert";

const Print = (props) => {
  const listadoFinal = props.onListado;
  const eliminarAlerta = props.onEliminarAlerta;
  const modificarAlerta = props.onModificarAlerta;  

  const borrarAlerta = () => {
    swal({
          title: "Are you sure?",
          text: "Once deleted, you will not be able to recover this imaginary file!",
          icon: "warning",
          buttons: ['Cancelar', 'Ok'],
          dangerMode: true,
        })
        .then((willDelete) => {
          if (willDelete) {
            swal("Poof! Your imaginary file has been deleted!", {
              icon: "error",
            });
            eliminarAlerta(listadoFinal.id);
          } else {
            swal( {
              icon: "success",
              title: "Your imaginary file is safe!"
            });
          }
        })
      };

  const [error, setError] = useState(false);
  const [abrirModificar, setAbrirModificar] = useState(false);
  const abrirModificarFuncion = () => {
    setAbrirModificar(true);
  };

  const [modificaReminder, setModificaReminder] = useState("");
  const [modificaVeces, setModificaVeces] = useState("");
  const [modificaFecha, setModificaFecha] = useState("");
  const [modificaNotas, setModificaNotas] = useState("");

  const gestorSubmit = (evento) => {
    evento.preventDefault();
    setError(false);
    if (
      modificaReminder.trim() === "" ||
      modificaVeces.trim() === "" ||
      modificaFecha.trim() === "" ||
      modificaNotas.trim() === ""
    ) {
      setError(true);
      return;
    }

    const modificaAlerta = {
      id: listadoFinal.id,
      reminder: modificaReminder,
      veces: modificaVeces,
      fecha: modificaFecha,
      notas: modificaNotas,
    };
    modificarAlerta(modificaAlerta);

    setModificaReminder("");
    setModificaVeces("");
    setModificaFecha("");
    setModificaNotas("");
    setAbrirModificar(false);
  };

  const gestorModificaReminder = (event) => {
    setModificaReminder(event.target.value);
  };
  const gestorModificaVeces = (event) => {
    setModificaVeces(event.target.value);
  };
  const gestorModificaFecha = (event) => {
    setModificaFecha(event.target.value);
  };
  const gestorModificaNotas = (event) => {
    setModificaNotas(event.target.value);
  };

  return (
    <div
      id="card"
      className="card mb-3 w-25 p-3 position-ralative m-4"
      key={listadoFinal._id}
    >
      <h3 className="card-header">Alertas MA</h3>
      <div className="card-body">
        <h4 className="badge bg-danger">Reminder: {listadoFinal.reminder}</h4>
        <p>Veces: {listadoFinal.veces}</p>
        <p>Fecha: {listadoFinal.fecha}</p>
        <span>
          <em>Notas: {listadoFinal.notas} </em>
        </span>
      </div>
      <div>
        <button
          className="btn-delete btn btn-outline-secondary"
          onClick={borrarAlerta}
        >
          <i class="fa fa-trash"></i>
        </button>
        <button
          className="btn-delete btn btn-outline-secondary"
          onClick={abrirModificarFuncion}
        >
          <i class="fa fa-edit"></i>
        </button>
      </div>
      <div className="container">
        <div>
          {error ? (
            <h3 className="error-campos">Debe completar todos los campos</h3>
          ) : null}
          {abrirModificar ? (
            <div>
              <h1>Modificar Alerta</h1>
              <form
                className=""
                onSubmit={gestorSubmit}
                className="formulario"
                action="formulario"
              >
                <input
                  onChange={gestorModificaReminder}
                  className=""
                  type="text"
                  name="reminder"
                  id="reminder"
                  placeholder="Reminder"
                  value={modificaReminder}
                />
                <input
                  onChange={gestorModificaVeces}
                  className=""
                  type="number"
                  name="veces"
                  id="veces"
                  placeholder="Veces"
                  value={modificaVeces}
                />
                <input
                  onChange={gestorModificaFecha}
                  className=""
                  type="date"
                  name="fecha"
                  id="fecha"
                  placeholder="Fecha"
                  value={modificaFecha}
                />
                <textarea
                  name="notas"
                  id="notas"
                  value={modificaNotas}
                  onChange={gestorModificaNotas}
                  cols="30"
                  rows="5"
                ></textarea>
                <button id="btn-modificar" className="btn" type="submit">
                  Modificar
                </button>
              </form>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Print;
