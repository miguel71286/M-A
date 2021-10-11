import React from "react";
import { useState, useEffect } from "react";

const Navbar = (props) => {
  const alertas = props.alertas;
  const añadirElementosEncontrados = props.onAñadirElementosEncontrados;

  const [buscador, setBuscador] = useState("");
  const buscar = (e) => {
    setBuscador(e.target.value);
  };

  useEffect(() => {
    añadirElementosEncontrados(buscador);
  }, [buscador]);

  return (
    <div>
      <ul className="nav nav-pills bg-secondary">
        <li className="nav-item">
          <a className="nav-link active bg-danger" aria-current="page" href="">
            Alertas MA
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-light" href="">
            
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-light" href="">
            Buscador
          </a>
        </li>
        <li>
          <input
            value={buscador}
            onChange={buscar}
            type="search"
            name="name"
            id="name"
            className="form-control col-auto"
          />
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
