import { React, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import Usuarios from "./pages/Usuarios";
import NuevoDestino from "./pages/NuevoDestino";
import Navbar from "./components/Navbar";
import Auth from "./pages/Auth";

const App = () => {
  const [tieneAcceso, setTieneAcceso] = useState(false);
  const [datos, setDatos] = useState({});
  const [token, setToken] = useState();

  // Traemos desde el componente Auth los datos del usuario enviados desde el servidor mediante esta función prop
  const gestionarAcceso = (dato) => {
    setDatos(dato); // datos del usuario: email, password y token
    setTieneAcceso(true); // La variable que indica que está logueado se pone a true
    setToken(dato.token); // Por si fuera necesario
    // localStorage.setItem(
    //   "datosUsuario",
    //   JSON.stringify(dato({ userId: dato.userId, token: dato.token }))
    // );
  };

  // const gestionarLogout = () => {
  //   setToken(null);
  //   setTieneAcceso(false);
  // };

  // useEffect(() => {
  //   const datosRecuperar = JSON.parse(localStorage.getItem("datosUsuario"));
  //   if (datosRecuperar && datosRecuperar.token) {
  //     setToken(datosRecuperar.token);
  //   }
  //   console.log(datosRecuperar);
  // }, []);

  return (
    <div className="listado">
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <Usuarios />
        </Route>
        <Route path="/destinos/nuevodestino">
          <NuevoDestino acceso={tieneAcceso} datos={datos} />
        </Route>
        <Route path="/auth">
          <Auth gestionarAcceso={gestionarAcceso} />
        </Route>
        <Redirect to="/" />
      </Switch>
    </Router>
    </div>
  );
};
export default App;
