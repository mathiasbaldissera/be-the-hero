import React, { useState } from "react";
import "./styles.css";
import heroesImg from "../../assets/heroes.png";
import logo from "../../assets/logo.svg";
import { FiLogIn } from "react-icons/fi";
import { Link, useHistory } from "react-router-dom";
import api from "../../services/api";

export default function Logon() {
  const [id, setId] = useState();
  const history = useHistory();
  async function handleLogin(event) {
    event.preventDefault();
    try {
      const response = await api.post("/sessions", { id });
      localStorage.setItem("ongId", id);
      localStorage.setItem("ongName", response.data.name);
      history.push("/profile");
    } catch (err) {
      alert("Falha no login. Tente novamente");
    }
  }
  return (
    <div className="logon-container">
      <section className="form">
        <img src={logo} alt="Be The Hero - Logo" />
        <form onSubmit={handleLogin}>
          <h1>Faça seu logon</h1>
          <input
            value={id}
            onChange={e => setId(e.target.value)}
            placeholder="Sua ID"
          />
          <button className="button" type="submit">
            Entrar
          </button>
          <Link className="back-link" to="/register">
            <FiLogIn size={15} color="#E02041" />
            Não tenho cadastro
          </Link>
        </form>
      </section>
      <img src={heroesImg} alt="Heroes" />
    </div>
  );
}
