"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

export function Search({ pageText }: { pageText: string }) {
  const router = useRouter();
  const [text, setText] = useState("");
  const [query] = useDebounce(text, 3000);

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
        placeholder={pageText + " :)"}
        type="search"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </form>
  );
}
