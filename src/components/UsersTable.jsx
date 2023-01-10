import React from "react";
import { deleteDoc, doc, getFirestore } from "firebase/firestore";
import firebaseApp from "../fireb-credentials";

const db = getFirestore(firebaseApp);

const UserCard = ({ full_name, birth_date, email, country_of_origin, id }) => {

  //funcion elminar usuario
  const deleteUser = async(id) => {
    await deleteDoc(doc(db,'usuarios', id))
  }

  return (
    <>
      <tr className="fw-bold text-center">
        <td>{id}</td>
        <td className="text-capitalize">{full_name}</td>
        <td>{birth_date}</td>
        <td>{email}</td>
        <td className="text-capitalize">{country_of_origin}</td>
        <td type="button" onClick={()=>deleteUser(id)}
        className="btn btn-danger text-dark border border-left-0 border-right-0">Eliminar</td>
      </tr>
    </>
  );
};


export default UserCard;
