import React, { useState } from "react";
import data from "../assets/data";
import firebaseApp from "../fireb-credentials";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import Swal from "sweetalert2";

const db = getFirestore(firebaseApp);

function Form() {
  // Valor inicial del estado local
  const initialValue = {
    full_name: "",
    email: "",
    birth_date: "",
    country_of_origin: "",
  };

  // Variables de estado
  const [users, setUsers] = useState(initialValue);

  // Funciones para manejar el valor del imput, manejar el envio de los datos,
  // reestrablecer los campos a input vacio
  const handleOfinputs = (e) => {
    const { name, value } = e.target;
    setUsers({ ...users, [name]: value });
  };

  const handleOfSubmit = async (e) => {
    e.preventDefault();
    if (users) {
      theAlert();
    } else {
      try {
        await addDoc(collection(db, "usuarios"), {
          ...users,
        });
      } catch (error) {
        console.log(error);
      }
      document.getElementById("myForm").reset();
    }
  };

  // Alerta con ruta para ver la lista de users
  const theAlert = () => {
    Swal.fire({
      title: "<strong>Usuario guardado correctamente</strong>",
      icon: "success",
      html: `Si desea dirigirse a la lista de usuarios por favor haga click en el boton Go de lo contrario click en Ok`,
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      reverseButtons: true,
      focusCancel: true,
      cancelButtonText: `Ok`,
      confirmButtonText: `Go`,
    }).then((result) => {
      if (result.value) {
        window.location.href = `/users`;
      }
    });
  };

  return (
    <div>
      <form
        id="myForm"
        onSubmit={handleOfSubmit}
        className="w-auto p-3 m-3 fs-5"
      >
        <div className="bg-info mb-4 rounded-top container-fluid py-4 text-center text-white text-uppercase py-1 header-offer">
          <strong className="bg-transparent text-dark">
            Challenge Greydive
          </strong>
        </div>
        <hr className="border-bottom border-info" />
        {data &&
          data.items.map((item) => {
            return (
              <div key={item.type}>
                <div className="form-group p-1">
                  {!item.options &&
                  item.type !== "checkbox" &&
                  item.type !== "submit" ? (
                    <div>
                      <label className="control-label text-info">
                        {item.label}
                      </label>
                      <input
                        type={item.type}
                        className="form-control"
                        name={item.name}
                        placeholder={item.name}
                        required
                        onChange={handleOfinputs}
                      />
                    </div>
                  ) : null}
                  {item.options ? (
                    <div>
                      <label className="control-label text-info">
                        {item.label}
                      </label>
                      <select
                        className="form-control"
                        name={item.name}
                        onChange={handleOfinputs}
                        required
                      >
                        {item.label}
                        <option className="text-info pointer fs-5" value={null}>
                          {item.name}
                        </option>
                        {item.options.map((el) => (
                          <option
                            className="text-info pointer fs-5"
                            key={el.label}
                            value={el.value}
                          >
                            {el.label}
                          </option>
                        ))}
                      </select>
                      <br />
                    </div>
                  ) : null}
                  {item.type === "checkbox" ? (
                    <div className="d-flex justify-content-center border-top border-info pt-2 mt-3">
                      <label className="control-label text-info p-2">
                        {item.label}
                      </label>
                      <input type={item.type} name={item.name} required />
                    </div>
                  ) : null}
                  {item.type === "submit" ? (
                    <div className="d-flex justify-content-center">
                      <button
                        className="btn btn-outline-info btn-lg"
                        type={item.type}
                      >
                        {item.label}
                      </button>
                    </div>
                  ) : null}
                </div>
              </div>
            );
          })}
      </form>
    </div>
  );
}

export default Form;
