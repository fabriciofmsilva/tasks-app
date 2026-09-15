"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Logout() {
  const router = useRouter();

  useEffect(() => {
    fetch("/api/logout", { method: "POST", body: JSON.stringify({}) })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          router.push("/");
        }
      });
  }, [router]);

  return (
    <div>
      <h1>Logout - Task APP</h1>
    </div>
  );
}
