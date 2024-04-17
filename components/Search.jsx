"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

export function Search({}) {
  const router = useRouter();
  const [text, setText] = useState("");
  const [query] = useDebounce(text, 300);

  useEffect(() => {
    if (!query) {
      router.push("/");
    } else {
      router.push(`/?search=${query}`);
    }
  }, [query, router]);

  return (
    <form className="search">
      <input
        placeholder="Enter what you're looking for :)"
        type="search"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </form>
  );
}
