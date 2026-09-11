"use client"; 

import Menu from '../../components/menu';

export default function Login() {

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    fetch("/api/login", { method: "POST", body: JSON.stringify({ email, password }) })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          window.location.href = "/tasks";
        }
      });
  };

  return (
    <div>
      <h1>Login - Task APP</h1>
      <Menu></Menu>

      <form onSubmit={handleSubmit}>
        <h2>Login</h2>

        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" required placeholder="Enter your email" />

        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" required placeholder="Enter your password" />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}
