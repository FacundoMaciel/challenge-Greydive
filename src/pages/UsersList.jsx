import React, { useEffect, useState } from "react";
import firebaseApp from "../fireb-credentials";
import {
  getFirestore,
  collection,
  getDocs,
} from "firebase/firestore"; //doc, getDoc
import { BarChart, Bar, XAxis, YAxis } from "recharts";
import UsersTable from "../components/UsersTable";
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
    { name: "Argentina", value: arg.length },
    { name: "Brasil", value: bra.length },
    { name: "Colombia", value: col.length },
    { name: "Perú", value: per.length },
    { name: "Uruguay", value: uru.length },
    { name: "Venezuela", value: ven.length },
    { name: "Mexico", value: mex.length },
    { name: "Chile", value: chi.length },
  ];

  return (
    <div>
      <div className="table-responsive">
        <h2 className="text-center text-info p-4 mb-4">Usuarios</h2>
        <table className="table table-bordered text-info">
          <thead className="fs-5 text-center">
            <tr>
              <th>Id</th>
              <th>Nombre completo</th>
              <th>Fecha de nacimiento</th>
              <th>Email</th>
              <th>Pais de origen</th>
            </tr>
          </thead>
          <tbody className="text-dark">
            {/* Componente con el cuerpo y propiedades que muestra la lista de usuarios */}
            {list.map((el) => (
              <UsersTable
                key={el.id}
                id={el.id}
                country_of_origin={el.country_of_origin}
                full_name={el.full_name}
                birth_date={el.birth_date}
                email={el.email}
                button={el.button}
              />
            ))}
          </tbody>
        </table>
         {/* Boton para volver al home */}
        <div className="d-flex justify-content-center p-1">
          <Link to="/">
            <button className="btn btn-outline-dark btn-lg">Volver</button>
          </Link>
        </div>
      </div>
      <div className="d-flex justify-content-center mt-2">
        <h3 className="text-info">Encuesta de usuarios por pais</h3>
      </div>
       {/* Grafico y menu desplegable con los datos de usuarios por pais  */}
      <div className="d-flex justify-content-center mt-5 pb-2 fs-4">
      <BarChart width={940} height={230} data={data}>
          <Bar dataKey="value" fill="#8884d8" />
          <XAxis dataKey="name" />
          <YAxis />
        </BarChart>
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
    </div>
  );
};

export default UsersList;
