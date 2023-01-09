import React  from "react";


const Countries = ({ name }) => {
  return (
    <li>
      <a className="dropdown-item">{name}</a>;
    </li>
  );
};

export default Countries;
