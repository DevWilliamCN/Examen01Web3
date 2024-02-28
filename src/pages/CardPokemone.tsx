import React from 'react';
import './styles/PokemonCard.css';


interface PokemonCardProps {
  id: number;
  name: string;
  image: string;
  types: Array<{ type: { name: string } }>;
  abilities: Array<{ ability: { name: string } }>;
  onClick?: () => void; // La propiedad onClick es opcional
}



const PokemonCard: React.FC<PokemonCardProps> = ({ id, name, image, types, abilities }) => {
  return (
    <div className="pokemon-card">
      <img src={image} alt={name} />
      <h2 className="pokemon-name">{name}</h2>
      <div className="pokemon-types">
        {types.map(typeInfo => (
          <span className="pokemon-type" key={typeInfo.type.name}>{typeInfo.type.name}</span>
        ))}
      </div>
      <div className="pokemon-abilities">
        <h4>Habiliidades:</h4>
        {abilities.map(abilityInfo => (
          <span className="pokemon-ability" key={abilityInfo.ability.name}>{abilityInfo.ability.name}</span>
        ))}
      </div>
    </div>
  );
};

export default PokemonCard;