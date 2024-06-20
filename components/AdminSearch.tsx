"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

export function AdminSearch({
  pageText,
  page,
}: {
  pageText: string;
  page: string;
}) {
  const router = useRouter();
  const [text, setText] = useState("");
  const [query] = useDebounce(text, 300);

  useEffect(() => {
    if (!query) {
      router.push(`/admin?page=${page}`);
    } else {
      router.push(`/admin?page=${page}&search=${query}`);
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
