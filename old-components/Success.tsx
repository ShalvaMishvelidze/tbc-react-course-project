"use client";

import { useSearchParams } from "next/navigation";

const Success = () => {
  const searchParams = useSearchParams();
  const session_id = searchParams.get("session_id");

  return (
    <div>
      <h1>Payment Successful</h1>
      <p>Your session ID is: {session_id}</p>
    </div>
  );
};
export default Success;
