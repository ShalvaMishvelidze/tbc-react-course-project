"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

export default function Search({
  pageText,
  setSearch,
}: {
  pageText: string;
  setSearch: Dispatch<SetStateAction<string>>;
}) {
  const [text, setText] = useState("");
  const [query] = useDebounce(text, 300);

  useEffect(() => {
    setSearch(query);
  }, [query]);

  return (
    <input
      placeholder={pageText + " :)"}
      type="search"
      value={text}
      onChange={(e) => setText(e.target.value)}
    />
  );
}
