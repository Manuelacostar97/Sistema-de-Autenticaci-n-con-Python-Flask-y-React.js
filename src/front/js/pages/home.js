import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link } from "react-router-dom";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<h1>Para acceder a las funciones de la pagina debes iniciar sesión.</h1>
				<Link to="/login">
					<button type="button" className="btn btn-outline-primary">
						Iniciar Sesión	
					</button>
				</Link>
			<h3>Si no tienes cuentas puedes registrarte </h3>
				<Link to="/sign-up">
					<button type="button" className="btn btn-primary">
						Registrar
					</button>
				</Link>
		</div>
	);
};
