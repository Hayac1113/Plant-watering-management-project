import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

const Login = () => {
  const router = useRouter();
  const [getError, setError] = useState<string | null>(null);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const usernameFromForm = event.currentTarget.username.value;
    const passwordFromForm = event.currentTarget.password.value;

    if (usernameFromForm === undefined || passwordFromForm === undefined) {
      // This means something went wrong
      return;
    }
    try {
      const response = await axios.post("http://localhost:3001/login", {
        username: usernameFromForm,
        password: passwordFromForm,
      });
      setError(null);
      // Store token
      localStorage.setItem("token", response.data.token);
      // Navigate home!
      router.push("/");
    } catch (error) {
      setError("Something went wrong with the request");
    }
  };

  return (
    <>
      <main>
        <h1>This is the login page</h1>
        <div>
          <form className="login-form" onSubmit={handleSubmit}>
            <label htmlFor="username">Username</label>
            <input type="username" id="username" name="username" />

            <label htmlFor="password">🔑 Password</label>
            <input type="password" id="password" name="password" />

            <button type="submit">Log in</button>
          </form>
          {getError && <p className="error-text">{getError}</p>}
        </div>
      </main>
    </>
  );
};

export default Login;
