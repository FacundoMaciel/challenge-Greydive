import React, { useState } from "react";
import data from "../assets/data";
import firebaseApp from "../fireb-credentials";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import Swal from "sweetalert2";

// Credenciales de base de datos firestore de firebase
const db = getFirestore(firebaseApp);

function Form() {
  // Valor inicial del estado local
  const initialValue = {
    full_name: "",
    email: "",
    birth_date: "",
    country_of_origin: "",
  };

  // Variables de estado local
  const [users, setUsers] = useState(initialValue);

  // Funcion para manejar el valor de los inputs y setear los valores al estado local.
  const handleOfinputs = (e) => {
    const { name, value } = e.target;
    setUsers({ ...users, [name]: value });
  };

  // Funcion para manejar la info enviada por el formulario a la base de datos, disparar la alerta y reestablecer los campos del mismo a vacíos.
  const handleOfSubmit = async (e) => {
    e.preventDefault();
    users && theAlert();

    try {
        await addDoc(collection(db, "usuarios"), {
          ...users,
        });
      } catch (error) {
        console.log(error);
      }
      document.getElementById("myForm").reset();
    
  };

  // Alerta con la ruta para ver la lista de usuarios 
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
        window.location.href = `https://challenge-greydive-alpha.vercel.app/users`;
      }
    });
  };

  return (
    <div className="container d-flex justify-content-center">
      <form
        id="myForm"
        onSubmit={handleOfSubmit}
        className="w-auto p-3 m-3 fs-4"
      >
        <div className="bg-info mb-4 rounded-top container-fluid py-4 text-center text-white text-uppercase py-1 header-offer">
          <strong className="bg-transparent text-dark">
            Challenge Greydive
          </strong>
        </div>
        <hr className="border-bottom border-info" />
        {/* Logica donde se indica que los inputs no sean de tipos checkbox ni submit ni tampoco sean selects */}
        {data &&
          data.items.map((item) => {
            return (
              <div key={item.type}>
                <div className="form-group p-1">
                  {!item.options &&
                  item.type !== "checkbox" &&
                  item.type !== "submit" ? (
                    <div>
                      <label className="control-label text-dark">
                        {item.label}
                      </label>
                      <input
                        type={item.type}
                        className="form-control bg-info"
                        name={item.name}
                        placeholder={item.name}
                        required
                        onChange={handleOfinputs}
                      />
                    </div>
                  ) : null}
                  {/* Logica donde se indica que este campo va ser de un tipo select */}
                  {item.options ? (
                    <div>
                      <label className="control-label text-dark">
                        {item.label}
                      </label>
                      <select
                        className="form-control bg-info text-capitalize"
                        name={item.name}
                        onChange={handleOfinputs}
                        required
                      >
                        {item.label}
                        <option className="text-black pointer fs-5" value={null}>
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
                  {/* Logica donde se indica que este item va ser de un tipo checkbox */}
                  {item.type === "checkbox" ? (
                    <div className="d-flex justify-content-center fs-4 border-top border-info p-1 pt-2 mt-1 bg-info rounded">
                      <label className="control-label text-dark p-2">
                        {item.label}
                      </label>
                      <input type={item.type} name={item.name} required />
                    </div>
                  ) : null}
                  {/* Logica donde se indica que este item va ser de un tipo submit */}
                  {item.type === "submit" ? (
                    <div className="d-flex justify-content-center">
                      <button
                        className="btn btn-outline-info btn-lg text-dark"
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
