import { Link } from "react-router-dom";

export default function App() {
  return (
    <div>
      <h1 className="text-3xl font-bold underline">Bookkeeper</h1>
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem"
        }}
      >
        <Link to="/invoices">Invoices</Link> |{" "}
        <Link to="/expenses">Expenses</Link> |{" "}
        <Link to="/races">Races</Link>
      </nav>
    </div>
  );
}