import React, { useState, useEffect } from 'react';
import Formulario from './components/Formulario';

function App() {

  //STATES
  const [busqueda, setBusqueda] = useState('');

  // USE EFFECT
  useEffect(() => {

    const consultarAPI = async () => {
      if (busqueda === '') return;
      const imagenesPorPagina = 30;
      const keyApi = '18095170-10aeea23651e6f10ad51c35a7';
      const url = `https://pixabay.com/api/?key=${keyApi}&q=${busqueda}&per_page=${imagenesPorPagina}`;
      const respuesta = await fetch(url);
      const resultado = await respuesta.json();
      //console.log(resultado.hits);
      setBusqueda(resultado.hits);
    }
    consultarAPI();

  }, [busqueda])

  return (
    <>
      <div className="container">
        <div className="jumbotron">
          <p className="lead text-center">Buscador de Imagenes</p>

          <Formulario
            setBusqueda={setBusqueda}
          />
        </div>
      </div>
    </>
  );
}

export default App;
