import React from 'react';
import { Link } from 'react-router-dom';
import './NavLinks.css'

const Navbar = () => {
	return (
		<div id="barra-nav" className='navbar navbar-expand-lg navbar-light bg-alert'>
			<div className='navbar navbar-light bg-alert'>
				<ul  className='navbar-nav me-auto mb-2 mb-lg-2'>
					<li className='nav-item'>
						<Link className='nav-link active' aria-current='page' to='/'>
							Inicio
						</Link>
					</li>
					<li className='nav-item'>
						<Link className='nav-link' to='/destinos/nuevodestino'>
							Destinos
						</Link>
					</li>
					<li className='nav-item'>
						<Link className='nav-link' to='/auth'>
							Autenticar
						</Link>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default Navbar;
