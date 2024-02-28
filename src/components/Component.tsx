import React, {useState} from "react";

			const myComponent = () => {
				// eslint-disable-next-line react-hooks/rules-of-hooks
				const [texto, setTexto] = useState("Hola Mundo");
				// eslint-disable-next-line react-hooks/rules-of-hooks
				const [texto2, setTexto2] = useState();

				const buttonClick = () => {
					// @ts-ignore
					setTexto2(texto)
				}

				return (
					<div>
						<h5>Mi primer Componente</h5>
						<div>
							<input type="text" value={texto} onChange={(e) => setTexto(e.target.value)}/>
							<button onClick={buttonClick}>Actualizar</button>
							<p>{texto}</p>
							<p>{texto2}</p>
						</div>
					</div>
				)
			}

			export default myComponent;