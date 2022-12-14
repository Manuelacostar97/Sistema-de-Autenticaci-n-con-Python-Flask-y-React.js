import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "./../store/appContext";


export const Registrar = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [veriPassword, setVeriPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [acepted, setAcepted] = useState(false);
  const register = actions.register;

  return (
    <div className="col-11 col-lg-10 container">
      <div className="col-8 col-lg-6 m-auto my-5 p-4 pb-5 rounded-form shadow">
        <h1 className="text-center">Regístrate</h1>
        <form className="col-11 m-auto" onSubmit={(e) => e.preventDefault()}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              <i className="fa-solid fa-user"></i> Nombre
            </label>
            <input
              type="string"
              className="form-control form-input border-0 mb-3"
              onChange={(event) => {
                setName(event.target.value);
              }}
              value={name}
              id="name"
              aria-describedby="name"
            />
            <label htmlFor="last-name" className="form-label">
              <i className="fa-regular fa-user"></i> Apellidos
            </label>
            <input
              type="string"
              className="form-control form-input border-0 mb-3"
              onChange={(event) => {
                setLastName(event.target.value);
              }}
              value={lastName}
              id="last-name"
              aria-describedby="last-name"
            />
            <label htmlFor="phone" className="form-label">
              <i className="fa-solid fa-phone"></i> Teléfono
            </label>
            <input
              type="string"
              className="form-control form-input col-5 border-0 mb-3"
              onChange={(event) => {
                setPhone(event.target.value);
              }}
              value={phone}
              id="phone"
              aria-describedby="phone"
            />
            <label htmlFor="city" className="form-label">
              <i className="fa-solid fa-location-dot"></i> Ciudad
            </label>
            <input
              type="string"
              className="form-control form-input col-5 border-0 mb-3"
              value={city}
              onChange={(event) => {
                setCity(event.target.value);
              }}
              id="city"
              aria-describedby="city"
            />
            <label htmlFor="exampleInputEmail1" className="form-label">
              <i className="fa-solid fa-at"></i> Correo electrónico
            </label>
            <input
              type="email"
              className="form-control form-input border-0"
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              value={email}
              id="exampvalueleInputEmail1"
              aria-describedby="emailHelp"
            />
            <div id="emailHelp" className="form-text mb-3">
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
          <div className="mb-3">
            <label htmlFor="exampleInputPassword2" className="form-label">
              <i className="fa-solid fa-unlock"></i> Verifica tu Contraseña
            </label>
            <input
              type="password"
              className="form-control form-input border-0"
              onChange={(event) => {
                setVeriPassword(event.target.value);
              }}
              value={veriPassword}
              id="exampleInputPassword2"
            />
          </div>
          <div className="justify-content-center d-flex">
          </div>
          <div className="form-check my-4">
            <input
              className="form-check-input"
              type="checkbox"
              value={acepted}
              onChange={(e) => {
                setAcepted((prev) => !prev);
              }}
              id="flexCheckDefault"
            />
            <label className="form-check-label" htmlFor="flexCheckDefault">
              Haz leído y aceptas los <strong>Terminos y Condiciones</strong>
            </label>
          </div>
          <div className="d-flex justify-content-center mt-3">
            <button
              type="submit"
              className="btn btn-primary text-center text-white btn-lg rounded-pill px-5"
              onClick={async (e) => {
                if (name.trim() == "") {
                  alert("¡Ups!", "Debes colocar tu nombre completo");
                } else if (lastName.trim() == "") {
                  alert("¡Ups!", "Debes colocar tus apellidos");
                } else if (city.trim() == "") {
                  alert("¡Ups!", "Debes colocar tu ciudad");
                } else if (phone.trim() == "") {
                  alert("¡Ups!", "Debes agregar tu número");
                } else if (email.trim() == "") {
                  alert("¡Ups!", "Debes colocar un Email");
                } else if (password.trim() == "") {
                  alert("¡Ups!", "Debes colocar tu contraseña");
                } else if (veriPassword.trim() == "") {
                  alert("¡Ups!", "Debes verificar tu contraseña");
                } else if (password != veriPassword) {
                  alert("¡Ups!", "Ingresa de nuevo tu contraseña");
                  setPassword("");
                  setVeriPassword("");
                } else if (acepted == false) {
                  alert("¡Ups!", "Debes aceptar los Terminos y Condiciones");
                } else {
                  let success = await register(
                    name.toLowerCase(),
                    lastName.toLowerCase(),
                    city.toLowerCase(),
                    phone.toLowerCase(),
                    email.toLowerCase(),
                    password,
                  );
                  if (success != true) {
                    alert("¡Listo!", "Te has registrado con éxito", "success");
                    return navigate("/login");
                  }
                  alert(
                    "¡Parece haber un error con tus datos!",
                    "Por favor, intenta con otro correo electrónico",
                    "error"
                  );
                }
              }}
            >
              Registrarte
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
