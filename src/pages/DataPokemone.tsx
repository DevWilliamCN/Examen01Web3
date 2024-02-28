import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PokemonCard from './CardPokemone'; // Asegúrate de tener este componente para mostrar la info
import '../styles/Home.css';
import '../styles/Modal.css';

interface Pokemon {
  id: number;
  name: string;
  image: string;
  height: number; // Altura del Pokémon
  weight: number; // Peso del Pokémon
  types: Array<{ type: { name: string } }>;
  abilities: Array<{ ability: { name: string } }>;
  moves: Array<{ move: { name: string } }>; // Movimientos del Pokémon
}


interface PokemonCardProps {
  id: number;
  name: string;
  image: string;
  types: Array<{ type: { name: string } }>;
  abilities: Array<{ ability: { name: string } }>;
  onClick: () => void; // Agrega la propiedad onClick a la interfaz
}

const generations = [
  { gen: 'Primera', offset: 0, limit: 151 },
  { gen: 'Segunda', offset: 151, limit: 100 },
  { gen: 'Tercera', offset: 251, limit: 135 },
  { gen: 'Cuarta', offset: 386, limit: 107 },
  { gen: 'Quinta', offset: 493, limit: 156 },
  // Agrega más generaciones si es necesario
];

const Home: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [selectedGeneration, setSelectedGeneration] = useState<string>('Primera');
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null); // Nuevo estado para el Pokémon seleccionado

 // ... resto del código ...

useEffect(() => {
  const generation = generations.find(gen => gen.gen === selectedGeneration);
  if (!generation) return;

  axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${generation.offset}&limit=${generation.limit}`)
    .then(response => {
      const fetches = response.data.results.map((pokemon: { name: string }) => {
        return axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
          .then(pokemonResponse => {
            // Asumiendo que la respuesta tiene todos los campos necesarios
            const { id, name, height, weight, types, abilities, moves, sprites } = pokemonResponse.data;
            const image = sprites.front_default || `https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/normal/${name}.png`;
            return { id, name, image, height, weight, types, abilities, moves };
          });
      });
      return Promise.all(fetches);
    })
    .then(pokemonData => {
      setPokemons(pokemonData);
    })
    .catch(error => {
      console.error("Error fetching data: ", error);
    });
}, [selectedGeneration]);

// ... resto del código ...


  // Función para abrir el modal y establecer el Pokémon seleccionado
  const handlePokemonClick = (pokemon: Pokemon) => {
    setSelectedPokemon(pokemon);
  };

  const handleCloseModal = () => {
    setSelectedPokemon(null);
  };

  return (
    <div className="pokemon-container">
      <div>
        <label htmlFor="generation-select" className="label-generacion">Selecciona una generación:</label>
        <select id="generation-select" value={selectedGeneration} onChange={(e) => setSelectedGeneration(e.target.value)}>
          {generations.map(gen => (
            <option key={gen.gen} value={gen.gen}>{gen.gen}</option>
          ))}
        </select>
      </div>
      {pokemons.map((pokemon) => (
        <PokemonCard
          key={pokemon.id}
          id={pokemon.id}
          name={pokemon.name}
          image={pokemon.image}
          types={pokemon.types}
          abilities={pokemon.abilities}
          onClick={() => handlePokemonClick(pokemon)} // Agrega el evento onClick para abrir el modal al hacer clic en el Pokémon
        />
      ))}
      {/* Modal */}
      {selectedPokemon && (
  <div className="modal">
    <div className="modal-content">
      <span className="close" onClick={handleCloseModal}>&times;</span>
      <h2>{selectedPokemon.name}</h2>
      <img src={selectedPokemon.image} alt={selectedPokemon.name} />
      <p>Número: {selectedPokemon.id}</p>
      <p>Altura: {selectedPokemon.height}</p>
      <p>Peso: {selectedPokemon.weight}</p>
      <p>Tipos: {selectedPokemon.types.map(type => type.type.name).join(', ')}</p>
      <p>Habilidades: {selectedPokemon.abilities.map(ability => ability.ability.name).join(', ')}</p>
      <div>
        <h3>Movimientos:</h3>
        <ul>
          {selectedPokemon.moves.map((move, index) => (
            <li key={index}>{move.move.name}</li>
          ))}
        </ul>
      </div>
    </div>
  </div>
)}
    </div>
  );
};

export default Home;
