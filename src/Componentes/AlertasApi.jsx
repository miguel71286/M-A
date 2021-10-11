import Print from "./Print";

const AlertasApi = (props) => {
    const listaAlertas = props.onAlertas;
    const eliminarAlerta = props.onEliminarAlerta;
    const modificarAlerta = props.onModificarAlerta;
    console.log(listaAlertas)
  
    return (
      <div className="listado">
        <div className="tarjetas">
          {listaAlertas.map((elemento) => {
            return <Print key={elemento.id} onListado={elemento}  onEliminarAlerta={eliminarAlerta} onModificarAlerta={modificarAlerta}/>;
          })}
        </div>
      </div>
    );
  };
  
  export default AlertasApi;