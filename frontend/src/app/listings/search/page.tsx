"use client";

import { useState } from "react";
import PropertySearchBar from "./PropertySearchBar";
import SearchResults from "./SearchResults";

export default function SearchPage() {
  const [searchUrl, setSearchUrl] = useState("");
  return (
    <>
      <PropertySearchBar setSearchUrl={setSearchUrl} />
      <SearchResults searchUrlParams={searchUrl} />
    </>
  );
}
