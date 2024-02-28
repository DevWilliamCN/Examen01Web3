import React from 'react';
			import ReactDOM from 'react-dom/client';
			import './styles/index.css';


			import App from './App';
			import NavBar from "./components/navBar";
			import { BrowserRouter, Routes, Route } from 'react-router-dom'


			const root = ReactDOM.createRoot(
			  document.getElementById('root') as HTMLElement
			);

			root.render(
			  <BrowserRouter>
				<NavBar />
				  <Routes>
					  <Route path="/" element={<App />} />
					
				  </Routes>
			  </BrowserRouter>
			);