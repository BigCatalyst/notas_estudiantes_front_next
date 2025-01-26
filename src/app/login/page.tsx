"use client";

import { loguin } from "@/services/api";
import { URL_PAGE_LOGIN } from "@/utils/utils-loguin";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function LoguinPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    const message = searchParams.get("message");
    if (message) {
      // Limpiar el query parameter después de mostrarlo
      router.replace(URL_PAGE_LOGIN, undefined, { shallow: true });
      setMsg(decodeURIComponent(message));
    }
  }, []);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const handlerChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };
  const handlerSubmit = async (e) => {
    e.preventDefault();
    console.log(credentials);
    const response = await loguin(credentials.username, credentials.password);
    if (response.status == 200) {
      router.push("/dashboard");
    } else {
      alert("Loguin incorrecto");
    }
  };
  return (
    <div>
      {msg && <p style={{ color: "red" }}>{msg}</p>}
      <form onSubmit={handlerSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          required
          onChange={handlerChange}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          required
          onChange={handlerChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
