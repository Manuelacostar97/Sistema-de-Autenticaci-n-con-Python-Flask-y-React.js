import React, { useContext } from "react";
import { Context } from "../store/appContext";


export const Perfil = () => {
  const { store, actions } = useContext(Context);

  return (
        <div className="d-flex justify-content-between bg-color">
          <div className="col-9 row-80 overflow-y-axis container">
            {/* info */}
            <div className="align-items-center">
              <div className="shadow bg-body rounded-form m-auto w-75 h-75  ">
                <div className="container">
                  <div className="pt-5 mt-5 ">
                    <h1 className="text-center mt-4 text-secondary ">
                      Información de usuario
                    </h1>
                  </div>
                  <div className="d-flex justify-content-evenly py-5 ">
                    <div>
                      <div>
                        <div className="fs-5 text-secondary text-center">
                          <i className="fa-solid fa-user"></i> Nombre
                        </div>
                        <div className="fw-bold text-secondary text-center m_title">
                          {store.activeUser[0].name +
                            " " +
                            store.activeUser[0].last_name}
                        </div>
                      </div>
                      <div>
                        <div className="fs-5 text-secondary text-center mt-4">
                          <i className="fa-solid fa-at"></i> Email
                        </div>
                        <div className="fw-bold text-secondary text-center">
                          {store.activeUser[0].email}
                        </div>
                      </div>
                    </div>
                    <div>
                      <div>
                        <div className="fs-5 text-secondary text-center">
                          <i className="fa-solid fa-location-dot"></i> Ciudad
                        </div>
                        <div className="fw-bold text-secondary text-center m_title">
                          {store.activeUser[0].city}
                        </div>
                      </div>
                      <div>
                        <div className="fs-5 text-secondary text-center mt-4">
                          <i className="fa-solid fa-phone"></i> Teléfono
                        </div>
                        <div className="fw-bold text-secondary text-center m_title">
                          {store.activeUser[0].phone}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
  );
};
