import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";

import useMoneda from "../hooks/useMoneda";
import useCriptomoneda from "../hooks/useCriptomoneda";
import axios from "axios";

const Boton = styled.input`
  margin-top: 20px;
  font-weight: bold;
  font-size: 20px;
  padding: 10px;
  background-color: #66a2fe;
  width: 100%;
  border-radius: 10px;
  color: #fff;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #326ac0;
    cursor: pointer;
  }
`;

const Formulario = () => {
  // State del listado de criptomonedas
  const [listacripto, setListacripto] = useState([]);
  const [error, setError] = useState(false);

  const MONEDAS = [
    { codigo: "USD", nombre: "Dolar de Estados Unidos" },
    { codigo: "CL", nombre: "Peso Chileno" },
    { codigo: "MXM", nombre: "Peso Mexicano" },
    { codigo: "EUR", nombre: "Euro" },
  ];

  // Utilizar useMoneda
  const [moneda, SelectMonedas] = useMoneda("Elige tu Moneda", "", MONEDAS);

  // Utilizar useCriptomoneda
  const [criptomoneda, SelectCripto] = useCriptomoneda(
    "Elige tu Criptomoneda",
    "",
    listacripto
  );

  // Ejecutar llamdo a la API
  useEffect(() => {
    const consultarAPI = async () => {
      const url =
        "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";

      const resultado = await axios.get(url);

      setListacripto(resultado.data.Data);
    };
    consultarAPI();
  }, []);

  // Cuando el usuario hace submit
  const cotizarMoneda = (e) => {
    e.preventDefault();

    // Validar si ambos campos estan llenos
    if (moneda === "" || criptomoneda === "") {
      setError(true);
      return;
    }

    // Pasar los datos al componente principal
    setError(false);
  };

  return (
    <form onSubmit={cotizarMoneda}>
      {error ? "Hay un error" : null}
      <SelectMonedas />
      <SelectCripto />
      <Boton type="submit" value="Calcular" />
    </form>
  );
};

export default Formulario;
