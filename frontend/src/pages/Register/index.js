import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import "./styles.css";
import logoImg from "../../assets/logo.svg";

import api from '../../services/api';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsApp, setWhatsApp] = useState('');
  const [city, setCity] = useState('');
  const [uf, setUf] = useState('');
  const history = useHistory();
  async function handleRegister(e){
    //previne o comportamento padrão do form de recarregar ao submit
    e.preventDefault();
    const data = {
      name, email, whatsApp, city, uf,
    };
    try {
      const response = await api.post('ongs', data);
      alert(`Seu ID de Acesso ${response.data.id}`);
      history.push('/');
    } catch (error) {
      alert('Erro no cadastro!');
    }
  }
  
  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be the Hero" />

          <h1>Cadastro</h1>
          <p>
            Faça seu cadastro, entre na plataforma e ajude pessoas a encontrar
            os casos da sua ONG.
          </p>

          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#E02041" />
            Não tenho cadastro
          </Link>
        </section>
        <form onSubmit={handleRegister}>
          <input type="text" placeholder="Nome da ONG" 
          value={name}
          onChange={e => setName(e.target.value)}/>
          <input type="E-mail" placeholder="E-mail"
          value={email}
          onChange={e => setEmail(e.target.value)} />
          <input type="text" placeholder="WhatsApp" 
          value={whatsApp}
          onChange={e => setWhatsApp(e.target.value)}/>
          <div className="input-group">
            <input type="text" placeholder="Cidade"
            value={city}
            onChange={e => setCity(e.target.value)} />
            <input type="text" placeholder="UF" style={{ width: 80 }} 
            value={uf}
            onChange={e => setUf(e.target.value)}/>
          </div>
          <button className="button" type="submit">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}
