import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Auth = ({setActive}) => {
  const [state, setState] = useState(initialState);
  const [signUp, setSignUp] = useState(false);

  const { email, password, firstName, lastName, confirmPassword } = state;

  const navigate = useNavigate();

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    if (!signUp) {
      if(email && password) {
        const {user} = await signInWithEmailAndPassword(auth, email, password);
        setActive("home");
      }else {
        return toast.error("Por favor preencha todos os campos!")
      }
    } else {
      if (password !== confirmPassword) {
        return toast.error("Suas senhas não coincidem");
      }
      if (firstName && lastName && email && password) {
        const { user } = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        await updateProfile(user, { displayName: `${firstName} ${lastName}` });
        setActive("home");
      } else {
        return toast.error("Por favor preencha todos os campos!")
      }
    }
    navigate("/");
  };

  return (
    <div className="container-fluid mb-4">
      <div className="container">
        <div className="col-12 text-center">
          <div className="text-center heading py-2">
            {!signUp ? "Login" : "Cadastrar"}
          </div>
        </div>
        <div className="row h-100 justify-content-center align-items-center">
          <div className="col-10 col-md-8 col-lg-6">
            <form className="row" onSubmit={handleAuth}>
              {signUp && (
                <>
                  <div className="col-6 py-3">
                    <input
                      type="text"
                      name="firstName"
                      placeholder="Primeiro nome"
                      className="form-control"
                      value={firstName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-6 py-3">
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Último nome"
                      className="form-control"
                      value={lastName}
                      onChange={handleChange}
                    />
                  </div>
                </>
              )}
              <div className="col-12 py-3">
                <input
                  type="email"
                  name="email"
                  placeholder="E-mail"
                  className="form-control"
                  value={email}
                  onChange={handleChange}
                />
              </div>
              <div className="col-12 py-3">
                <input
                  type="password"
                  name="password"
                  placeholder="Senha"
                  className="form-control"
                  value={password}
                  onChange={handleChange}
                />
              </div>
              {signUp && (
                <div className="col-12 py-3">
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirme sua senha"
                    className="form-control"
                    value={confirmPassword}
                    onChange={handleChange}
                  />
                </div>
              )}
              <div className="col-12 py-3 text-center">
                <button
                  type="submit"
                  className={`btn${!signUp ? " btn-sign-in" : " btn-sign-up"}`}
                >
                  {!signUp ? "Entrar" : "Cadastrar"}
                </button>
              </div>
            </form>
            <div>
              {!signUp ? (
                <div className="text-center justify-content mt-2 pr-2">
                  <p className="small fw-bold mt-2 pt-1 mb-0">
                    Não possui conta ?&nbsp;
                    <span
                      className="link-danger"
                      style={{ textDecoration: "none", cursor: "pointer" }}
                      onClick={() => setSignUp(true)}
                    >
                      Cadastrar-se
                    </span>
                  </p>
                </div>
              ) : (
                <div className="text-center justify-content mt-2 pr-2">
                  <p className="small fw-bold mt-2 pt-1 mb-0">
                    Já possui uma conta ?&nbsp;
                    <span
                      className="link-danger"
                      style={{
                        textDecoration: "none",
                        cursor: "pointer",
                        color: "#298af2",
                      }}
                      onClick={() => setSignUp(false)}
                    >
                      Voltar ao Login
                    </span>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
