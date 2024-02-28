import React from 'react';
		import {Link} from 'react-router-dom';
		import logo from '../logo.svg';

		const NavBar =  () => {
			return (
				<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
					<Link className="navbar-brand" to="/">
						<img src={logo} width="40" height="40" alt="Logo de la empresa" />
					</Link>
					<Link className="navbar-brand text-primary" to="/">React Bootstrap</Link>
					<button className="navbar-toggler"
							type="button"
							data-toggle="collapse"
							data-target="#navbarNavAltMarkup"
							aria-controls="navbarNavAltMarkup"
							aria-expanded="false">
						<span className="navbar-toggler-icon" />
					</button>
					<div className="collapse navbar-collapse" id="nvbarNavAltMarkup">
						<ul className="navbar-nav m-auto">


							<li className="nav-item">
								<Link to="/" className="nav-link">Inicio</Link>
							</li>



						</ul>
					</div>
				</nav>
			);
		}

		export default NavBar;