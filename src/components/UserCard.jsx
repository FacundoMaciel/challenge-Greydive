import React from "react";

const UserCard = ({ full_name, birth_date, email, country_of_origin, id }) => {
  return (
    <>
      <tr className="fw-bold">
        <td>{id}</td>
        <td>{full_name}</td>
        <td>{birth_date}</td>
        <td>{email}</td>
        <td>{country_of_origin}</td>
      </tr>
    </>
  );
};


export default UserCard;
