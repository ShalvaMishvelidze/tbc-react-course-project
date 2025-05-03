import { withPageAuthRequired } from "@auth0/nextjs-auth0";

export default withPageAuthRequired(
  async () => {
    return (
      <div>
        <h1>Payment Canceled</h1>
        <p>Your payment was canceled. Please try again.</p>
      </div>
    );
  },
  { returnTo: "/canceled" }
);
