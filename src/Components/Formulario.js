import React, {useState} from 'react';
import { obtenerDiferenciayear, calcularMarca, obtenerPlan} from '../helper'

import styled from '@emotion/styled';

const Campo = styled.div`
    display:flex;
    margin-bottom:1rem;
    align-items:center;
`;

const Label = styled.label`
    flex:0 0 100px;
`;

const Select = styled.select`
    display:block;
    widows:100%;
    padding:1rem;
    border: 1px solid #e1e1e1;
    -webkit-appearance:none;
`;

const InputRadio = styled.input`
    margin:0 1rem;
`;

const Boton = styled.button`
    background-color:#00838F;
    font-size:16px;
    width:100%;
    padding:1rem;
    color:#fff;
    text-transform:uppercase;
    font-weight:bold;
    border:none;
    transition: background-color .3s ease;
    margin-top:2rem;

    &:hover{
        background-color:#26C6DA;
        cursor: pointer;
    }
`;

const Error = styled.div`
    background-color:red;
    color:white;
    padding:1rem;
    width:100%;
    text-align:center;
    margin-bottom:2rem;
`;

const Formulario = ({guardarResumen, guardarCargando}) => {

    const [datos, guardaDatos] = useState({
        marca:'',
        year:'',
        plan:''

    }); 

    const [error, guardarError] = useState(false);

    // Extraer los datos del state
    const {marca, year, plan} = datos;

    //leer los datos del formulario y colocarlos en el state
    const obtenerInformacion = e =>{
        guardaDatos({
            ...datos,
            [e.target.name] : e.target.value
        })
    }

    const cotizarSeguro = e =>{
        e.preventDefault();

        if(marca.trim() === '' || year.trim() === '' || plan.trim() === ''){
            guardarError(true);
            return;
        }

        guardarError(false);

        //una base de 2000
        let resultado =2000;

        // Obtener la diferencia de año

        const diferencia = obtenerDiferenciayear(year);
        resultado -=(( diferencia * 3 )* resultado) /100;



        // por cada año hay que restar el 3%



        // Americano 15
        // Asiatico 5%
        //Europeo 30%
        resultado = calcularMarca(marca) * resultado;


        //Basico aumenta 20%
        //Completo 50%
        const incrementoPlan = obtenerPlan(plan);

        resultado = parseFloat(incrementoPlan * resultado).toFixed(2);

        guardarCargando(true);
        setTimeout(() =>{
            guardarCargando(false);



            guardarResumen({
                cotizacion: Number(resultado),
                datos
            });

        }, 3000)
       
        //total
    }

    return ( 
        <form
            onSubmit={cotizarSeguro}
        >
            { error ? <Error>Todos los campos deben ser llenados</Error> :null}
            <Campo>
                <Label>Marca</Label>
                    <Select
                        name="marca"
                        value={marca}
                        onChange={obtenerInformacion}
                    >
                        <option value="">--- Seleccione ---</option>
                        <option value="americano">Americano</option>
                        <option value="europeo">Europeo</option> 
                        <option value="asiatico">Asiatico</option>   
                    </Select>
            </Campo>

            <Campo>
                <Label>Año</Label>
                    <Select
                        name="year"
                        value={year}
                        onChange={obtenerInformacion}
                    >
                        <option value="">-- Seleccione --</option>
                        <option value="2021">2021</option>
                        <option value="2020">2020</option>
                        <option value="2019">2019</option>
                        <option value="2018">2018</option>
                        <option value="2017">2017</option>
                        <option value="2016">2016</option>
                        <option value="2015">2015</option>
                        <option value="2014">2014</option>
                        <option value="2013">2013</option>
                        <option value="2012">2012</option> 
                    </Select>
            </Campo>

            <Campo>
                <Label>Plan</Label>
                <InputRadio 
                    type="radio"
                    name="plan"
                    value="basico"
                    checked={plan === "basico"}
                    onChange={obtenerInformacion}
                />Básico

            <Label>Plan</Label>
                <InputRadio 
                    type="radio"
                    name="plan"
                    value="Completo"
                    checked={plan === "Completo"}
                    onChange={obtenerInformacion}
                />Completo
            </Campo>

            <Boton type="submit">Cotizar </Boton>
        </form>

     );
}
 
export default Formulario;