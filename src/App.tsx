
import PokemonCard from './pages/CardPokemone';
import Home from './pages/DataPokemone';

			function App() {
			  return (
				<div className="App">
					<Home/>
					<PokemonCard id={0} name={''} image={''} types={[]} abilities={[]}/>
					
					
				</div>
			  );
			}

			export default App;