import Link from 'next/link';

export default function About() {
  return (
    <div>
      <h1>About - Task APP</h1>
      <p>Organize your tasks, one day at a time.</p>

      <nav>
        <ul>
          <li>
            <Link href="/">
              Home
            </Link>
          </li>

          <li>
            <Link href="/login">
              Login
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
