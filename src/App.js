import { useEffect, useState } from 'react';
import './css/App.css';

function App() {
  const [ conteudo, setConteudo ] = useState(<></>)

  // DESAFIO
  function getGenero(genero) {
    switch (genero) {
      case 'Male':
        return 'Masculino'
      case 'Female':
        return 'Feminino'
      case 'unknown':
        return 'Desconhecido'
      case 'Genderless':
        return 'Sem Gênero'
      default:
        return genero
    }
  }

  function getStatus(status) {
    switch (status) {
      case 'Alive':
        return 'Vivo'
      case 'Dead':
        return 'Morto'
      case 'unknown':
        return 'Desconhecido'
      default:
        return status
    }
  }

  function getEspecie(especie) {
    switch (especie) {
      case 'Alien':
        return 'Alienígena'
      case 'Human':
        return 'Humano'
      case 'Robot':
        return 'Robo'
      case 'Disease':
        return 'Doença'
      case 'Humanoid':
        return 'Humanoide'
      case 'unknown':
        return 'Desconhecido'
      case 'Mythological Creature':
        return 'Criatura Mitológica'
      default:
        return especie
    }
  }

  // 3 - Explicar o FETCH
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

    // 1 Corrigir lista de personagem
    return todosPersonagens.map(personagem =>
      <div className='card char' key={personagem.id}>
        <img src={personagem.image} alt={personagem.name}/>

        <h2>{personagem.name}</h2>

        <div className='char-info'>
          <span><b>Espécie: </b>{getEspecie(personagem.species)}</span>
          <span><b>Gênero: </b>{getGenero(personagem.gender)}</span>
        </div>

        <div>
          <div className='lista-secundaria'>
            <b>Participações:</b>
            {/* 4 - DESAFIO */ }
            { personagem.episode.map(
              ep => 
                  <span key={personagem.name+(ep.split('episode/'))[1]}>
                    Ep-{ (ep.split('episode/'))[1] }
                  </span>
            ) }
          </div>
          <h5><b>Status: </b> {getStatus(personagem.status)}</h5>
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
      {/* 2 - Colocar os filtros aqui */}
      <div className='filtros'>
        <span className='filtros-titulo'>Filtros</span>
        <div className='filtro status'>
          <b>Status:</b>
          <span>Vivo</span>
          <span>Morto</span>
          <span>Desconhecido</span>
        </div>
        <div className='filtro genero'>
          <b>Genero:</b>
          <span>Masculino</span>
          <span>Feminino</span>
          <span>Sem Gênero</span>
          <span>Desconhecido</span>
        </div>
      </div>
      <div className='lista-principal'>
        { conteudo }
      </div>
    </div>
  );
}

export default App;
