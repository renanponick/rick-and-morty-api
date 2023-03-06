import { useEffect, useState } from 'react';
import './css/App.css';

const mock = [
  {
    "id": 1,
    "name": "Rick Sanchez",
    "status": "Alive",
    "species": "Human",
    "type": "",
    "gender": "Male",
    "origin": {
        "name": "Earth (C-137)",
        "url": "https://rickandmortyapi.com/api/location/1"
    },
    "location": {
        "name": "Citadel of Ricks",
        "url": "https://rickandmortyapi.com/api/location/3"
    },
    "image": "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
    "episode": [
        "https://rickandmortyapi.com/api/episode/1",
        "https://rickandmortyapi.com/api/episode/2"
    ],
    "url": "https://rickandmortyapi.com/api/character/1",
    "created": "2017-11-04T18:48:46.250Z"
  },
  {
      "id": 2,
      "name": "Morty Smith",
      "status": "Alive",
      "species": "Human",
      "type": "",
      "gender": "Male",
      "origin": {
          "name": "unknown",
          "url": ""
      },
      "location": {
          "name": "Citadel of Ricks",
          "url": "https://rickandmortyapi.com/api/location/3"
      },
      "image": "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
      "episode": [
          "https://rickandmortyapi.com/api/episode/1",
          "https://rickandmortyapi.com/api/episode/2",
          "https://rickandmortyapi.com/api/episode/3",
          "https://rickandmortyapi.com/api/episode/4",
          "https://rickandmortyapi.com/api/episode/1",
          "https://rickandmortyapi.com/api/episode/2",
          "https://rickandmortyapi.com/api/episode/3",
          "https://rickandmortyapi.com/api/episode/4",
          "https://rickandmortyapi.com/api/episode/1",
          "https://rickandmortyapi.com/api/episode/2",
          "https://rickandmortyapi.com/api/episode/3",
          "https://rickandmortyapi.com/api/episode/4",
          "https://rickandmortyapi.com/api/episode/1",
          "https://rickandmortyapi.com/api/episode/2",
          "https://rickandmortyapi.com/api/episode/3",
          "https://rickandmortyapi.com/api/episode/4",
          "https://rickandmortyapi.com/api/episode/1",
          "https://rickandmortyapi.com/api/episode/2",
          "https://rickandmortyapi.com/api/episode/3",
          "https://rickandmortyapi.com/api/episode/4",
      ],
      "url": "https://rickandmortyapi.com/api/character/2",
      "created": "2017-11-04T18:50:21.651Z"
  },
]

function App() {
  const [ conteudo, setConteudo ] = useState(<></>)

  function carregarTodosPersonagens() {
    return mock
  }

  // 2 - Cria a função da lista div vazia
  // 3 - Cria o Mock
  function listaPersonagens() {
    const todosPersonagens = carregarTodosPersonagens()

    return todosPersonagens.map(personagem =>
      <div key={personagem.id}>
        {personagem.name}
      </div>
    )
  }

  // 4 - Cria a função para carregar as coisas
  useEffect(() => {
    function getConteudo() {
      setConteudo(listaPersonagens())
    }
    getConteudo()
  }, [])

  // 1- Ajusta o HTML
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
