import Link from "next/dist/client/link";

export default function Menu() {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/">
            Home
          </Link>
        </li>

        <li>
          <Link href="/about">
            About
          </Link>
        </li>

        <li>
          <Link href="/login">
            Login
          </Link>
        </li>

        <li>
          <Link href="/signup">
            Signup
          </Link>
        </li>
      </ul>
    </nav>
  );
}
