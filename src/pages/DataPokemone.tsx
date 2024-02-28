import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PokemonCard from './CardPokemone'; // Asegúrate de tener este componente para mostrar la info
import './styles/Home.css';
import './styles/Modal.css';


interface Pokemon {
  id: number;
  name: string;
  image: string;
  types: Array<{ type: { name: string } }>;
  abilities: Array<{ ability: { name: string } }>;
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

  useEffect(() => {
    const generation = generations.find(gen => gen.gen === selectedGeneration);
    if (!generation) return;

    axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${generation.offset}&limit=${generation.limit}`)
      .then(response => {
        const fetches = response.data.results.map((pokemon: { name: string }) => {
          const imageUrl = `https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/normal/${pokemon.name}.png`;
          return axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
            .then(pokemonResponse => {
              return {
                ...pokemonResponse.data,
                image: imageUrl
              };
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
            <span className="close" onClick={handleCloseModal}>&times;</span> {/* Botón para cerrar el modal */}
            <h2>{selectedPokemon.name}</h2>
            <img src={selectedPokemon.image} alt={selectedPokemon.name} />
            {/* Mostrar tipos y habilidades del Pokémon */}
            <div>
              <h3>Tipos:</h3>
              <ul>
                {selectedPokemon.types.map((type, index) => (
                  <li key={index}>{type.type.name}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3>Habilidades:</h3>
              <ul>
                {selectedPokemon.abilities.map((ability, index) => (
                  <li key={index}>{ability.ability.name}</li>
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