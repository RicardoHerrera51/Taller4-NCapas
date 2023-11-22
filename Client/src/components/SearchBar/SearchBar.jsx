

import React, { useState } from 'react';
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SearchBar({ onSearch, placeholder = "Buscar..." }) {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(inputValue);
  };

  return (
    <form className="flex gap-2" onSubmit={handleSubmit}>
      <div className="w-full lg:w-64 imprima-400">
        <input
          type="text"
          className="input bg-white border-none text-greenish-black text-sm rounded-full block w-full h-8"
          placeholder={placeholder}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-xs h-8 w-8 rounded-full border-none bg-light-green hover:bg-darkest-green active:bg-dark-green">
        <FontAwesomeIcon icon={faMagnifyingGlass} style={{ color: "#ffffff" }} size="sm" />
      </button>
    </form>
  );
}