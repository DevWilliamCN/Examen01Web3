import React, { useEffect, useState } from "react";
import axios from "axios";
import PokemonCard from "./CardPokemone"; 
import "../styles/Home.css";
import "../styles/Modal.css";

interface Pokemon {
  id: number;
  name: string;
  image: string;
  height: number; 
  weight: number; 
  types: Array<{ type: { name: string } }>;
  abilities: Array<{ ability: { name: string } }>;
  moves: Array<{ move: { name: string } }>; 
}

interface PokemonCardProps {
  id: number;
  name: string;
  image: string;
  types: Array<{ type: { name: string } }>;
  abilities: Array<{ ability: { name: string } }>;
  onClick: () => void;
}

const generations = [
  { gen: "Primera", offset: 0, limit: 151 },
  { gen: "Segunda", offset: 151, limit: 100 },
  { gen: "Tercera", offset: 251, limit: 135 },
  { gen: "Cuarta", offset: 386, limit: 107 },
  { gen: "Quinta", offset: 493, limit: 156 },
];

const Home: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [selectedGeneration, setSelectedGeneration] =
    useState<string>("Primera");
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [showMoves, setShowMoves] = useState<boolean>(false); // Estado para mostrar/ocultar movimientos

  useEffect(() => {
    const generation = generations.find(
      (gen) => gen.gen === selectedGeneration
    );
    if (!generation) return;

    axios
      .get(
        `https://pokeapi.co/api/v2/pokemon?offset=${generation.offset}&limit=${generation.limit}`
      )
      .then((response) => {
        const fetches = response.data.results.map(
          (pokemon: { name: string }) => {
            return axios
              .get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
              .then((pokemonResponse) => {
                const {
                  id,
                  name,
                  height,
                  weight,
                  types,
                  abilities,
                  moves,
                  sprites,
                } = pokemonResponse.data;
                const image =
                  sprites.front_default ||
                  `https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/normal/${name}.png`;
                return {
                  id,
                  name,
                  image,
                  height,
                  weight,
                  types,
                  abilities,
                  moves,
                };
              });
          }
        );
        return Promise.all(fetches);
      })
      .then((pokemonData) => {
        setPokemons(pokemonData);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, [selectedGeneration]);

  const handlePokemonClick = (pokemon: Pokemon) => {
    setSelectedPokemon(pokemon);
    setShowMoves(false); 
  };

  const handleCloseModal = () => {
    setSelectedPokemon(null);
    setShowMoves(false); 
  };

  
  const handleToggleMoves = () => {
    setShowMoves(!showMoves);
  };

  return (
    <div className="pokemon-container">
      <div>
        <label htmlFor="generation-select" className="label-generacion">
          Generación:
        </label>
        <select
          id="generation-select"
          value={selectedGeneration}
          onChange={(e) => setSelectedGeneration(e.target.value)}
        >
          {generations.map((gen) => (
            <option key={gen.gen} value={gen.gen}>
              {gen.gen}
            </option>
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
          onClick={() => handlePokemonClick(pokemon)}
        />
      ))}
      {}
      {selectedPokemon && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>
              &times;
            </span>
            <h3>Nombre:</h3>
            <h2>{selectedPokemon.name}</h2>
            <img src={selectedPokemon.image} alt={selectedPokemon.name} />
            <p>Número: {selectedPokemon.id}</p>
            <p>Altura: {selectedPokemon.height}</p>
            <p>Peso: {selectedPokemon.weight}</p>
            <p>
              Tipos:{" "}
              {selectedPokemon.types.map((type) => type.type.name).join(", ")}
            </p>
            <p>
              Habilidades:{" "}
              {selectedPokemon.abilities
                .map((ability) => ability.ability.name)
                .join(", ")}
            </p>
            <div>
              <h3>Movimientos:</h3>
              <ul>
                <button onClick={handleToggleMoves}>
                  {showMoves ? "Ocultar Movimientos" : "Mostrar Movimientos"}
                </button>

                {showMoves && (
                  <ul>
                    {selectedPokemon.moves.map((move, index) => (
                      <li key={index}>{move.move.name}</li>
                    ))}
                  </ul>
                )}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
