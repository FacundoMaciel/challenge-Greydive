import React, { useEffect, useState } from "react";
import firebaseApp from "../fireb-credentials";
import { getFirestore, collection, getDocs } from "firebase/firestore"; //doc, getDoc
import UsersCard from "../components/UsersCard";
import { Link } from "react-router-dom";

// variable con las credenciales de firebase
const db = getFirestore(firebaseApp);

const UsersList = () => {
  //variables de estado local
  const [list, setList] = useState([]);

  // funciones para renderizar la lista de los usuarios
  useEffect(() => {
    const getList = async () => {
      try {
        const getData = await getDocs(collection(db, "usuarios")); // Metodo getDocs de firebase
        const docs = [];
        getData.forEach((doc) => {
          docs.push({ ...doc.data(), id: doc.id });
        });
        setList(docs);
      } catch (error) {
        console.log(error);
      }
    };
    getList();
  }, [list]);

  // Cantidad de usuarios por pais
  const arg = list.filter((el) => el.country_of_origin === "argentina");
  const bra = list.filter((el) => el.country_of_origin === "brasil");
  const col = list.filter((el) => el.country_of_origin === "colombia");
  const per = list.filter((el) => el.country_of_origin === "peru");
  const uru = list.filter((el) => el.country_of_origin === "uruguay");
  const ven = list.filter((el) => el.country_of_origin === "venezuela");
  const mex = list.filter((el) => el.country_of_origin === "mexico");
  const chi = list.filter((el) => el.country_of_origin === "chile");

  // Info para mostrar en el gráfico
  const data = [
    { name: "Arg", value: arg.length },
    { name: "Bra", value: bra.length },
    { name: "Col", value: col.length },
    { name: "Per", value: per.length },
    { name: "Uru", value: uru.length },
    { name: "Ven", value: ven.length },
    { name: "Mex", value: mex.length },
    { name: "Chi", value: chi.length },
  ];

  return (
    <div className="container">
      <h2 className="text-center text-info p-4 mb-4 bg-dark mt-2 shadow">Usuarios</h2>
      <div className="container mt-5 mb-3">
        <div className="row justify-content-center">
        {list.map((el)=>{
          return(
          <UsersCard 
          key={el.id}
          country_of_origin={el.country_of_origin}
          full_name={el.full_name}
          birth_date={el.birth_date}
          email={el.email}
          id={el.id}
          />
          )
        })}
        </div>
      </div>
      <div className="d-flex justify-content-center mt-2">
        <h3 className="text-center text-info p-4 mb-4 bg-dark mt-2 shadow">Registros</h3>
      </div>
      {/*menu desplegable con los datos de usuarios por pais  */}
      <div className="d-flex justify-content-center">
        <div className="dropdown">
          <button
            className="btn btn-outline-dark btn-lg dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Usuarios por pais
          </button>
          <ul className="dropdown-menu">
            {data?.map((el) => (
              <li className="dropdown-item fs-4" key={el.name}>
                {el.name} : {el.value}
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* Boton para volver al home */}
      <div className="d-flex justify-content-center p-1">
        <Link to="/">
          <button className="btn btn-outline-dark btn-lg">Volver</button>
        </Link>
      </div>
    </div>
  );
};

export default UsersList;
