"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

export function AdminSearch({ pageText }: { pageText: string }) {
  const router = useRouter();
  const [text, setText] = useState("");
  const [query] = useDebounce(text, 300);

  useEffect(() => {
    if (!query) {
      router.push("/admin");
    } else {
      router.push(`/admin?search=${query}`);
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
