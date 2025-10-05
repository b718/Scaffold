"use client";

import React, { useState } from "react";
import styles from "../page.module.css";
import { useRouter } from "next/navigation";

const SearchBar = () => {
  const router = useRouter();
  const [query, setQuery] = useState<string>("");
  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };
  const redirectToQueryPage = () => {
    if (query.length == 0) return;

    const pageForCurrentQuery = "/query/" + query;
    router.push(pageForCurrentQuery);
  };

  return (
    <div className={styles.SearchBarContainer}>
      <input
        type={"text"}
        placeholder={"Rich dad poor dad"}
        value={query}
        onChange={handleQueryChange}
      />
      <button type={"submit"} onClick={redirectToQueryPage}>
        Search
      </button>
    </div>
  );
};

export default SearchBar;
