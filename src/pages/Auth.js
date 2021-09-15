import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import './Auth.css';
import Card from '../components/Card';
import axios from 'axios';

export default function Auth(props) {
	const { gestionarAcceso } = props; // función que usamos para pasar los datos del servidor a la App principal
	const [tieneAcceso, setTieneAcceso] = useState(false); // variable de estado que indica si el usuario existe o no en la base de datos.

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm(); // hook del formulario para 'react-hook-form'

	const gestorDeCambioDeModo = () => { 
		if (!tieneAcceso) {
			setValue('Nombre', undefined);
		}
		setTieneAcceso(!tieneAcceso);
	};

	const onSubmit = async (data) => {
		// Envío de los datos del formulario ( data ) al servidor
		console.log(data);
		if (!tieneAcceso) {
			await axios
				.post(process.env.REACT_APP_BACKEND_URL + '/usuarios/alta', {
					// endpoint de la API de nuestro servidor
					nombre: data.nombre, // dato extraído del formulario
					email: data.email, // dato extraído del formulario
					password: data.password, // dato extraído del formulario
				})
				.then((response) => {
					console.log('Usuario creado'); // Si se recibe este mensaje en consola es que se ha dado de alta correctamente
					gestionarAcceso(response.data); // enviamos a la App la respuesta del servidor, que contiene el token creado por este, el e-mail y el password del usuario.
				})
				.catch((error) => {
					console.log(error.response.data);
				});
		} else {
			await axios
				.post(process.env.REACT_APP_BACKEND_URL +'/usuarios/login', {
					email: data.email,
					password: data.password,
				})
				.then((response) => {
					console.log('Login Correcto');
					gestionarAcceso(response.data); // enviamos a la App la respuesta del servidor, que contiene el token creado por este
				})
				.catch((error) => {
					console.log(error);
				});
		}
	};

	return (
		<div>
		<Card className='authentication'>
			<h2>{tieneAcceso ? 'Login necesario' : 'Introduzca datos de alta'}</h2>
			<form className='card' onSubmit={handleSubmit(onSubmit)}>
				{!tieneAcceso && (
					<input
						type='text'
						placeholder='Nombre de Usuario.'
						{...register('nombre', { required: true, message: 'Requerido' })}
					/>
				)}
				<input
					type='text'
					placeholder='Email'
					{...register('email', { required: true, pattern: /^\S+@\S+$/i })}
				/>
				{errors.email && errors.email.type === 'required' && (
					<span>Se requiere e-mail válido</span>
				)}
				{errors.email && errors.email.type === 'pattern' && (
					<span>Se requiere e-mail válido</span>
				)}
				<input
					type='password'
					placeholder='Contraseña'
					{...register('password', { required: true, minLength: 6 })}
				/>
				{errors.password && errors.password.type === 'required' && (
					<span>Se requiere contraseña</span>
				)}
				{errors.password && errors.password.type === 'minLength' && (
					<span>Mínimo de 6 caracteres</span>
				)}

				<button className="btn-form" type='submit'>{tieneAcceso ? 'ACCESO' : 'ALTA'} </button>
			</form>
			<button className="btn-cambia" onClick={gestorDeCambioDeModo}>
				CAMBIAR A {tieneAcceso ? 'ALTA' : 'ACCESO'}
			</button>
		</Card>
		</div>
	);
}
