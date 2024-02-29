import React from 'react';
import '../styles/PokemonCard.css';

interface PokemonCardProps {
  id: number;
  name: string;
  image: string;
  types: Array<{ type: { name: string } }>;
  abilities: Array<{ ability: { name: string } }>;
  onClick?: () => void; 
}

const PokemonCard: React.FC<PokemonCardProps> = ({ id, name, image, types, abilities, onClick }) => {
  return (
    <div className="pokemon-card" onClick={onClick}>
      <img src={image} alt={name} />
      <h5 style={{ color: 'black' }}>Pokemon Name:</h5>
      <h2 className="pokemon-name">{name}</h2>
      <div className="pokemon-types">
      </div>
    </div>
  );
};

export default PokemonCard;
