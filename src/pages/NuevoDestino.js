import { React, useState } from 'react';
import { useForm } from 'react-hook-form';
import Card from '../components/Card';
import axios from 'axios';

const NuevoDestino = (props) => {
	const { tieneAcceso, datos } = props;

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm();

	const onSubmit = async (data) => { 
		await axios
			.post(
				process.env.REACT_APP_BACKEND_URL + '/destinos',
				{
					nombre: data.nombre,
					descripcion: data.descripcion,
					direccion: data.direccion,
					creador: data.nombreCreador, // del prop enviado desde App.js extraemos el userId (en datos están todos los datos del token recibido desde el servidor cuando el usuario entró en su cuenta)
					loacalizacion: {},
				},
				{
					headers: {
						Authorization: 'Bearer ' + datos.token, // En los headers van 'Bearer ' + token recibido
					},
				}
			)
			.then((response) => {
				console.log('Todo correcto', response.data);
			})
			.catch((error) => {
				console.log(error.response.data);
			});
	};

	return (
		<div>
		<Card className='authentication'>
			<h2>Datos del destino</h2>
			<form className='card' onSubmit={handleSubmit(onSubmit)}>
				<input
					type='text'
					placeholder='Nombre'
					{...register('nombre', { required: true, message: 'Requerido' })}
				/>
				<input
					type='text'
					placeholder='Descripción'
					{...register('descripcion', {
						required: true,
						message: 'Campo requerido',
					})}
				/>
				<input
					type='text'
					placeholder='Dirección'
					{...register('direccion', { required: true })}
				/>
				<input
					type='text'
					placeholder='Nombre Creador'
					{...register('nombreCreador', { required: true }, 'Campo requerido')}
				/>
				<input
					type='text'
					placeholder='Localización'
					{...register('localizacion')}
				/>
				<button className="btn-form" type='submit'>Guardar datos</button>
			</form>
		</Card>
		</div>
	);
};

export default NuevoDestino;
