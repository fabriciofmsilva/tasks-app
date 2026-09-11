"use client";

import { useEffect } from "react";

export default function Logout() {
  const logout = async () => {
    fetch("/api/logout", { method: "POST", body: JSON.stringify({}) })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          window.location.href = "/";
        }
      });
  };

  useEffect(() => {
    logout();
  }, []);

  return (
    <div>
      <h1>Logout - Task APP</h1>
    </div>
  );
}
