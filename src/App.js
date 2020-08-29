import React, { useState, useEffect } from 'react';
import Formulario from './components/Formulario';
import ListadoImagenes from './components/ListadoImagenes';

function App() {

  //STATES
  const [busqueda, setBusqueda] = useState('');
  const [imagenes, setImagenes] = useState([]);
  const [paginaactual, setPaginaActual] = useState(1);
  const [totalpaginas, setTotalPaginas] = useState(1);

  // USE EFFECT
  useEffect(() => {

    const consultarAPI = async () => {
      if (busqueda === '') return;
      const imagenesPorPagina = 30;
      const keyApi = '18095170-10aeea23651e6f10ad51c35a7';
      const url = `https://pixabay.com/api/?key=${keyApi}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${paginaactual}`;
      const respuesta = await fetch(url);
      const resultado = await respuesta.json();
      //console.log(resultado.hits);
      setImagenes(resultado.hits);

      //calcular el total de paginas
      const calcularTotalPaginas = Math.ceil(resultado.totalHits / imagenesPorPagina);
      setTotalPaginas(calcularTotalPaginas);

      //mover la pantalla hacia arriba al cambiar de pagina. Jumbotron es la parte superior del proyecto
      const jumbotron = document.querySelector('.jumbotron');
      jumbotron.scrollIntoView({ behavior: 'smooth' });

    }
    consultarAPI();

  }, [busqueda, paginaactual])

  // Definir la pagina anterior
  const paginaAnterior = () => {
    const nuevaPaginaActual = paginaactual - 1;
    if (nuevaPaginaActual === 0) return;
    setPaginaActual(nuevaPaginaActual);
  }

  //Definir la pagina siguiente
  const paginaSiguiente = () => {
    const nuevaPaginaActual = paginaactual + 1;
    if (nuevaPaginaActual > totalpaginas) return;
    setPaginaActual(nuevaPaginaActual);
  }

  return (
    <>
      <div className="container">
        <div className="jumbotron">
          <p className="lead text-center">Buscador de Imagenes</p>

          <Formulario
            setBusqueda={setBusqueda}
          />
        </div>
        <div className="row justify-content-center">
          <ListadoImagenes
            imagenes={imagenes}
          />

          {(paginaactual === 1) ? null : (
            <button
              type="button"
              className="bbtn btn-info mr-1"
              onClick={paginaAnterior}
            >&laquo; Anterior</button>
          )}

          {(paginaactual === totalpaginas) ? null : (
            <button
              type="button"
              className="bbtn btn-info"
              onClick={paginaSiguiente}
            >Siguiente &raquo;</button>
          )}

        </div>
      </div>
    </>
  );
}

export default App;

/**
 *  ¿como definimos el total de paginas?
 * Tenemos 30 imagenes x pagina, entonces debemos saber el total de imagenes.
 * si tenemos 500 imagenes -> 500/30 son 16.6 paginas -> Math.ceil redondea hacia arriba
 */