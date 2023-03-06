import { useEffect, useState } from 'react';
import './css/App.css';

function App() {
  const [ conteudo, setConteudo ] = useState(<></>)

  // 2 - Explica o fetch e cria os async await
  async function carregarTodosPersonagens() {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    const result = await fetch(
      "https://rickandmortyapi.com/api/character",
      requestOptions
    )
      .then(response => response.text())
      .then(result => { return result })
      .catch(error => console.log('error', error));

    const char = JSON.parse(result)

    return char.results
  }

  async function listaPersonagens() {
    const todosPersonagens = await carregarTodosPersonagens()

    // 1 - Arrumar essa listagem principal
    return todosPersonagens.map(personagem =>
      <div className='card char' key={personagem.id}>
        <img src={personagem.image} alt={personagem.name}/>

        <h2>{personagem.name}</h2>

        <div className='char-info'>
          <span><b>Espécie: </b>{personagem.species}</span>
          <span><b>Gênero: </b>{personagem.gender}</span>
        </div>

        <div>
          <div className='lista-secundaria'>
            <b>Participações:</b>
            {/* Desafio da aula 
            { personagem.episode.map(
              ep => 
                  <span key={personagem.name+(ep.split('episode/'))[1]}>
                    Ep-{ (ep.split('episode/'))[1] }
                  </span>
            ) }*/}
          </div>
          <h5><b>Status: </b> {personagem.status}</h5>
        </div>
      </div>
    )
  }

  useEffect(() => {
    async function getConteudo() {
      setConteudo(await listaPersonagens())
    }
    getConteudo()
  }, [])

  return (
    <div className="App">
      <header className="cabecalho">
        <h1>Rick and Morty API</h1>
        <h2><a href='/'>Personagens</a></h2>
      </header>
      <div className='lista-principal'>
        { conteudo }
      </div>
    </div>
  );
}

export default App;
