import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import Alerta from './Alerta'
import Spinner from './Spinner'

const Formulario = ({cliente, cargando}) => {

    const navigate = useNavigate()

    const nuevoClienteSchema =Yup.object().shape({
        nombre: Yup.string()
                    .min(3, 'El nombre es muy corto')
                    .max(40, 'El nombre es muy largo')
                    .required('El nombre del cliente es obligatorio'),
        empresa: Yup.string()
                    .required('La empresa del cliente es obligatorio'),
        email: Yup.string()
                    .email('El e-mail no es valido')
                    .required('e-mail es obligatorio'),
        telefono: Yup.number()
                    .integer('Número no valido')
                    .typeError('Número no valido')
    })
    
    const handleSubmit =  async (valores) =>{
        // console.log(valores)
        try{
            let respuesta
            if(cliente.id){
                // console.log('Editando...')
                //EDITANDO UN REGISTRO
                const url = `${import.meta.env.VITE_API_URL}/${cliente.id}`
                respuesta = await fetch(url, {
                    method: 'PUT',
                    body: JSON.stringify(valores),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })

            }else{
                //NUEVO REGISTRO
                    const url = import.meta.env.VITE_API_URL

                    respuesta = await fetch(url, {
                        method: 'POST',
                        body: JSON.stringify(valores),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                }
                // const resultado = await respuesta.json()
            await respuesta.json()
            // console.log(resultado)
            navigate('/clientes')
        } catch (error) {
            console.log(error)
        }
    }
    
    return (
        cargando ? <Spinner/> : (
        <div className='bg-white mt-10 px-5 py-10 rounded-md
        shadow-md md:w-3/4 mx-auto'>
            <h2 className='text-gray-600 font-bold 
            text-xl uppercase text-center '>{cliente?.nombre ? 'Editar Cliente' : 
            'Agregar Cliente' }</h2>

            <Formik 
                initialValues={{
                    nombre: cliente?.nombre ?? "",
                    empresa: cliente?.empresa ?? "",
                    email: cliente?.email ?? "",
                    telefono: cliente?.telefono ?? "",
                    notas: cliente?.notas ?? "",
                }}
                enableReinitialize={true}
                onSubmit={ async (values, {resetForm}) => {
                    await handleSubmit(values)

                    resetForm()
                }}
                validationSchema={nuevoClienteSchema}
            >
                {(errors, touched) => {
                    // console.log(touched)
                    return (
                    <Form
                        className='mt-10'
                    >
                        <div className='mb-4'>
                            <label 
                                className='text-gray-800'
                                htmlFor="nombre"
                            >Nombre:</label>
                            <Field
                                id="nombre"
                                type="text"
                                className="mt-2 block w-full p-3 bg-gray-100"
                                placeholder="Nombre de cliente"
                                name="nombre"
                            />
                            <ErrorMessage 
                                name="nombre"
                                component="div"
                                className='bg-red-800 text-center rounded-md text-white'
                            />
                            {/* {errors.nombre && touched.nombre ? (
                                <Alerta>errors.nombre</Alerta>
                            ) : null } */}
                        </div>

                        <div className='mb-4'>
                            <label 
                                className='text-gray-800'
                                htmlFor="empresa"
                            >Empresa:</label>
                            <Field
                                id="empresa"
                                type="text"
                                className="mt-2 block w-full p-3 bg-gray-100"
                                placeholder="Empresa del cliente"
                                name="empresa"
                            />
                            <ErrorMessage 
                                name="empresa"
                                component="div"
                                className='bg-red-800 text-center text-white'
                            />
                        </div>

                        <div className='mb-4'>
                            <label 
                                className='text-gray-800'
                                htmlFor="email"
                            >E-mail:</label>
                            <Field
                                id="email"
                                type="email"
                                className="mt-2 block w-full p-3 bg-gray-100"
                                placeholder="Correo electrónico del cliente"
                                name="email"
                            />
                            <ErrorMessage 
                                name="email"
                                component="div"
                                className='bg-red-800 text-center text-white'
                            />
                        </div>

                        <div className='mb-4'>
                            <label 
                                className='text-gray-800'
                                htmlFor="telefono"
                            >Teléfono:</label>
                            <Field
                                id="telefono"
                                type="tel"
                                className="mt-2 block w-full p-3 bg-gray-100"
                                placeholder="Teléfono del cliente"
                                name="telefono"
                            />
                            <ErrorMessage 
                                name="telefono"
                                component="div"
                                className='bg-red-800 text-center text-white'
                            />
                        </div>

                        <div className='mb-4'>
                            <label 
                                className='text-gray-800'
                                htmlFor="notas"
                            >Notas:</label>
                            <Field
                                as="textarea"
                                id="notas"
                                type="text"
                                className="mt-2 block w-full p-3 bg-gray-100 h-40"
                                placeholder="Notas del cliente"
                                name="notas"
                            />
                        </div>

                        <input
                            type="submit"
                            value={cliente?.nombre ? 'Editar Cliente' : 
                            'Agregar Cliente' }
                            className='mt-5 w-full bg-blue-800 p-3
                            text-white uppercase font-bold text-lg rounded-md
                            hover:bg-blue-600 cursor-pointer'
                        />
                    </Form>
                )}}
            </Formik>

        </div>
    )
  )
}
Formulario.defaultProps = {
    cliente: {},
    cargando: false
}

export default Formulario