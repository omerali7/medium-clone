import { Link } from "react-router-dom";

export default function Links({
  to,
  label,
  type,
}: {
  to: string;
  label: string;
  type: "dark" | "light";
}) {
  return (
    <Link
      to={to}
      className={`font-SohneLight text-sm ${type === "dark" ? "" : "text-[#6B6B6B]"}`}
    >
      {label}
    </Link>
  );
}
