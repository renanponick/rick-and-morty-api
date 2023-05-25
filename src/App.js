import { useEffect, useState } from 'react';
import './css/App.css';

function App() {
  const [ conteudo, setConteudo ] = useState(<></>)
  const [ busca, setBusca ] = useState('');

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

  async function carregarTodosPersonagens() {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    const result = await fetch(
      "https://rickandmortyapi.com/api/character"+busca,
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

  function montarFiltro(type, value){
    const filtros = new URLSearchParams(busca)
    const filtro = filtros.get(type)

    if(filtro === value){
      filtros.delete(type)
    } else {
      filtros.set(type, value)
    }

    setBusca('?'+filtros.toString())
  }

  function marcarFiltro(type, value){
    const filtros = new URLSearchParams(busca)
    const filtro = filtros.get(type)

    if(filtro === value){
      return 'filtro-ativo'
    }
    return ''
  }

  useEffect(() => {
    async function getConteudo() {
      setConteudo(await listaPersonagens())
    }
    getConteudo()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [busca])

  return (
    <div className="App">
      <header className="cabecalho">
        <h1>Rick and Morty API</h1>
        <h2><a href='/'>Personagens</a></h2>
      </header>
      <div className='filtros'>
        <span className='filtros-titulo'>Filtros</span>
        <div className='filtro status'>
          <b>Status:</b>
          <span
            className={marcarFiltro('status', 'live')}
            onClick={() => montarFiltro('status', 'live')}
          >
            Vivo
          </span>
          <span
            className={marcarFiltro('status', 'dead')}
            onClick={() => montarFiltro('status', 'dead')}>
            Morto
          </span>
          <span
            className={marcarFiltro('status', 'unknown')}
            onClick={() => montarFiltro('status', 'unknown')}
          >
            Desconhecido
          </span>
        </div>
        <div className='filtro genero'>
          <b>Gênero:</b> 
          <span
            className={marcarFiltro('gender', 'female')}
            onClick={() => montarFiltro('gender', 'female')}>Feminino
          </span>
          <span
            className={marcarFiltro('gender', 'male')}
            onClick={() => montarFiltro('gender', 'male')}>Masculino
          </span>
          <span
            className={marcarFiltro('gender', 'genderless')}
            onClick={() => montarFiltro('gender', 'genderless')}>Sem gênero
          </span>
          <span
            className={marcarFiltro('gender', 'unknown')}
            onClick={() => montarFiltro('gender', 'unknown')}>Desconhecido
          </span>
        </div>
      </div>
      <div className='lista-principal'>
        { conteudo }
      </div>
    </div>
  );
}

export default App;
