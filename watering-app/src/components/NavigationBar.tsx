import React from "react";

import Link from "next/link";
import CustomLink from "./CustomLink";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const NavigationBar = () => {
  const router = useRouter();
  const [token, setToken] = useState<null | string>(null);
  useEffect(() => {
    const tokenFromLocalstorage = localStorage.getItem("token");
    if (tokenFromLocalstorage) {
      setToken(tokenFromLocalstorage);
    }
  }, []);

  const handleClick = () => {
    localStorage.removeItem("token");
    setToken(null);
    router.push("/");
  };

  return (
    <nav className="navigation">
      <Link href="/">
        <h1>Welcome to your plant watering management</h1>
      </Link>
      <div className="flex justify-between border-solid border-5 ">
        <CustomLink href="/" text="Homepage" variant="primary" />

        {token ? (
          <>
            <CustomLink href="/yourList" text="Your List" variant="secondary" />
            <button className="logoutBtn" onClick={handleClick}>
              Logout
            </button>
          </>
        ) : (
          <>
            {" "}
            <CustomLink href="/login" text="log in" variant="secondary" />
            <CustomLink href="/register" text="Register" variant="secondary" />
          </>
        )}
      </div>
    </nav>
  );
};

export default NavigationBar;
