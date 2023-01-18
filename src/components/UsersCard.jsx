import React from "react";
import { deleteDoc, doc, getFirestore } from "firebase/firestore";
import firebaseApp from "../fireb-credentials";
import { HiUser } from 'react-icons/hi';
import { FaTrashAlt } from 'react-icons/fa';
import Swal from "sweetalert2";

// Credenciales de base de datos firestore de firebase
const db = getFirestore(firebaseApp);

const UserCard = ({ full_name, birth_date, email, country_of_origin, id }) => {
  
  
  //funcion para elminar usuario
  const deleteUser = async(id) => {
    alertDelete()
    await deleteDoc(doc(db,'usuarios', id))
  }

  const alertDelete = () => {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Eliminado',
      showConfirmButton: false,
      timer: 1000
    })
}
  
  return (
    <div className="col-md-4 justify-content-center">
      <div className="card p-1 mb-4 border-info text-center bg-dark shadow">
        <div className="bg-light text-center pt-2 mb-2">
          {country_of_origin === "argentina" ? (
            <p className="badge text-info text-capitalize fs-5">
              {country_of_origin}
            </p>
          ) : null}
          {country_of_origin === "brasil" ? (
            <p className="badge text-warning text-capitalize fs-5">
              {country_of_origin}
            </p>
          ) : null}
          {country_of_origin === "colombia" ? (
            <p className="badge text-success text-capitalize fs-5">
              {country_of_origin}
            </p>
          ) : null}
          {country_of_origin === "peru" ? (
            <p className="badge text-danger text-capitalize fs-5">
              {country_of_origin}
            </p>
          ) : null}
          {country_of_origin === "uruguay" ? (
            <p className="badge text-primary text-capitalize fs-5">
              {country_of_origin}
            </p>
          ) : null}
          {country_of_origin === "venezuela" ? (
            <p className="badge text-warning text-capitalize fs-5">
              {country_of_origin}
            </p>
          ) : null}
          {country_of_origin === "mexico" ? (
            <p className="badge text-success text-capitalize fs-5">
              {country_of_origin}
            </p>
          ) : null}
          {country_of_origin === "chile" ? (
            <p className="badge text-danger text-capitalize fs-5">
              {country_of_origin}
            </p>
          ) : null}
        </div>
        <div className=" text-center items-center">
          <i className="bx bxl-mailchimp">
            {" "}
            <HiUser size={30} color="white" />{" "}
          </i>
          <h6 className="mb-0 text-info">{email}</h6>
        </div>
        <div className="mt-5">
          <h5 className="heading text-info">{full_name}</h5>
          <div className="mt-5">
            <div className="mt-3">
              <span className="text-info">
                {" "}
                Fecha de nacimiento:
                <br /> {birth_date}
              </span>
            </div>
            <button
              onClick={() => deleteUser(id)}
              className="btn btn-outline-light mt-3 mb-2"
            >
              <FaTrashAlt />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};



export default UserCard;
