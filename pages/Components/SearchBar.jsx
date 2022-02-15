import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { FiSearch } from "react-icons/fi";
import styles from "../CSS/SearchBar.module.scss";
import { searchJobs } from "../../Redux/actions";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  function handleChange(e) {
    e.preventDefault();
    setSearch(e.target.value);
  }

  function handleSearch(e) {
    e.preventDefault();
    if (e.target.value !== undefined) {
      dispatch(searchJobs(search));
      setSearch("");
      document.getElementById("SBI").value = "";
    }
  }

  return (
    <header className={styles.SearchBar}>
      <button
        className={styles.buttonSearchBar}
        type="submit"
        onClick={(e) => handleSearch(e)}
      >
        <FiSearch className={styles.magnifier} />
      </button>
      <input
        className={styles.inputSearchBar}
        type="text"
        id="SBI"
        placeholder="Search for any job, title, keywords or company"
        onChange={(e) => handleChange(e)}
      />
    </header>
  );
}
