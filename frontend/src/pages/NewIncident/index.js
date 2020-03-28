import React, { useState } from "react";
import logo from "../../assets/logo.svg";
import "./styles.css";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import api from "../../services/api";

export default function NewIncident() {
  const ongId = localStorage.getItem("ongId");

  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [value, setValue] = useState();

  const history = useHistory();
  async function handleNewIncident(event) {
    event.preventDefault();

    const data = {
      title,
      description,
      value
    };

    try {
      await api.post("/incidents", data, {
        headers: {
          Authorization: ongId
        }
      });
      history.push("/profile");
    } catch (err) {
      alert("Erro ao cadastrar caso, tente novamente.");
    }
  }
  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={logo} alt="Be the Hero" />
          <h1>Cadastrar novo caso</h1>
          <p>
            Descreva o caso detalhadamente para encontrar um herói para resolver
            isso.
          </p>
          <Link className="back-link" to="/profile">
            <FiArrowLeft size={15} color="#E02041" />
            Voltar para o perfil
          </Link>
        </section>
        <form onSubmit={handleNewIncident}>
          <input
            placeholder="Título do caso"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Descrição"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <input
            placeholder="Valor em Reais"
            value={value}
            onChange={e => setValue(e.target.value)}
          />

          <div>
            <button className="button" type="submit">
              Cadastrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
