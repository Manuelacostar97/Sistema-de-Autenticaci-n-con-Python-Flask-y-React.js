import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "./../store/appContext";


export const IniciarSesion = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = actions.login;

  return (
    <div className="container">
      <div className="col-6 m-auto margin-a p-4 pb-5 shadow bg-body rounded-form">
        <h1 className="text-center">Iniciar sesión</h1>
        <form className="col-11 m-auto" onSubmit={(e) => e.preventDefault()}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              <i className="fa-regular fa-at"></i> Correo electrónico
            </label>
            <input
              type="email"
              className="form-control form-input border-0"
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              value={email}
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
            <div id="emailHelp" className="form-text">
              Nosotros nunca compartiremos tu correo con nadie más
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              <i className="fa-solid fa-key"></i> Contraseña
            </label>
            <input
              type="password"
              className="form-control form-input border-0"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              value={password}
              id="exampleInputPassword1"
            />
          </div>
          <div className="d-flex justify-content-center mt-5">
            <button
              type="submit"
              className="btn btn-primary text-center text-white btn-lg rounded-pill px-5"
              onClick={async (e) => {
                console.log(email);
                if (email.trim() == "") {
                  alert("¡Ups!", "Debes colocar un Email");
                } else if (password.trim() == "") {
                  alert("¡Ups!", "Debes colocar tu contraseña");
                } else {
                  let success = await login(email, password);
                  if (success == true) {
                    alert("¡Bienvenido!", "Inicio de sesión exitoso", "success");
                    return navigate("/user/" + store.activeUser[0].id);
                  }
                  alert(
                    "Email o contraseña invalidos",
                    "Intenta de nuevo",
                    "error"
                  );
                }
              }}
            >
              Iniciar sesión
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
