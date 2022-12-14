import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "./../store/appContext";


export const Navbar = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();
	const activeUser = store.activeUser;
	const logout = actions.logout;
	const urlParams = new URLSearchParams();

	return (
		<div>
			<nav className="navbar navbar-light bg-light">
				<div className="container">
					<Link to="/">
						<span className="navbar-brand mb-0 h1">React Boilerplate</span>
					</Link>
				</div>
					<ul className="navbar-nav pt-1">
						{localStorage.getItem("token") == null ? (
							<div className="d-flex">
							<li className="nav-item px-4">
								<Link
								to="/sign-up"
								className="nav-link"
								aria-current="page"
								>
								<i className="fa-solid fa-address-card"></i>
								<span className="ms-2">Registrarse</span>
								</Link>
							</li>
							<li className="nav-item px-4">
								<Link to="/login" className="nav-link">
								<i className="fa-solid fa-right-to-bracket"></i>
								<span className="ms-2">Iniciar Sesión</span>
								</Link>
							</li>
							</div>
						) : (
							<div className="d-flex">
							<li className="nav-item px-4">
								<Link
								to={`/user/` + store.activeUser[0].id}
								className="nav-link"
								aria-current="page"
								>
								<i className="fa-solid fa-user"></i>{" "}
								<span className="ms-2">Perfil de usuario</span>
								</Link>
							</li>
							<li className="nav-item px-4">
								<Link
								to="/"
								className="nav-link"
								onClick={(e) => {
									logout();
									navigate("/");
								}}
								>
								<i className="fa-solid fa-right-from-bracket"></i>
								<span className="ms-2">Cerrar sesión</span>
								</Link>
							</li>
							</div>
					)}
				</ul>
			</nav>
		</div>
	);
};
