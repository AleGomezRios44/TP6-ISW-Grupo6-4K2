const express = require('express')
const { DropdownDivider } = require('react-bootstrap')
const app = express()

let datosLista = []


//Preguntar de donde puedo sacar una lista de provincias
app.post('guardar-datos', (req, res) => {
    const {
        tipoCarga,
        domicilioRetiro,
        fechaRetiro,
        domicilioEntrega,
        fechaEntrega,
        fotos
    } = req.body

    //Este sirve para ver si recibe todos los datos necesarios en general
    if(validarTipoCarga(tipoCarga) &&
        validarFechaRetiro(domicilioRetiro) &&
        validarFechaRetiro(fechaRetiro) &&
        validarDomicilio(domicilioEntrega) &&
        validarFechaEntrega(fechaEntrega, fechaRetiro) &&
        validarFotos(fotos)){
            return res.status(400),send("Datos cargados correctamente")
        }
    
    //Ahora se descompondrá y revisará cada variable en particular
    
    //Valida si el tipo de entrega es del tipo see
    const validarTipoCarga = (carga) => {
        const opcionesValidas = ['documentacion', 'paquete', 'granos', 'hacienda']
    
        for (let i = 0; i < opcionesValidas.length; i++) {
            if (carga === opcionesValidas[i]) {
                return true
            }
        }
        return res.status(400).send('El tipo de carga seleccionado no se encuentra dentro de las posibles opciones')
    }
    
    //Se usa la misma funcion para ambos domicilios
    const validarDomicilio = (domicilio) => {
        const {
            calle,
            numero,
            localidad,
            provincia,
        } = domicilio

        if(calle === null || typeof calle === 'integer' || calle.trim() === ''){
            return res.status(400).send('Calle incorrecta o faltante')
        }
        if(numero === null || typeof numero === 'string' || numero.trim() === ''
            || !Number.isInteger(numero)){
            return res.status(400).send('Numero incorrecto o faltante')
        }
        if(localidad === null || typeof localidad === 'integer' || localidad.trim() === ''){
            return res.status(400).send('Localidad incorrecta o faltante')
        }

        //En realidad hay que compararlo con una lista de las provincias
        if(provincia === null || typeof provincia === 'integer' || provincia.trim() === ''){
            return res.status(400).send('Provincia incorrecta o faltante')
        }

        return true
    }

    const validarFechaRetiro = (fechaRetiro) => {
        if(fechaRetiro === null || fechaRetiro.trim() === ''){
            return res.status(400).send('Fecha incorrecta o faltante')
        } 
        
        //Formato YYYY-MM-DD
        const fechaHoy = new Date().toISOString().split('T')[0]
        fechaRetiro = new Date(fechaRetiro)

        if(fechaRetiro < fechaHoy){
            return res.status(400).send('Fecha menor a la actual')
        } else {
            return true
        }
        
    }

    const validarFechaEntrega = (fechaEntrega, fechaRetiro) => {
        //Formato YYYY-MM-DD
        fechaRetiro = new Date(fechaRetiro)
        fechaEntrega = new Date(fechaEntrega)
        //Es posible reutilizar la funcion validarFechaRetiro para determinar
        // si es menor a la fecha actual
        if(validarFechaRetiro(fechaEntrega)){
            if(fechaEntrega < fechaRetiro){
                return res.status(400).send('Fecha de entrega menor a la fecha de retiro')
            } else {
                const diferenciaMilisegundos = fechaEntrega - fechaRetiro
                const diferenciaDias = diferenciaMilisegundos / (1000 * 60 * 60 * 24)
                if(diferenciaDias > 10){   
                    return res.status(400).send("Diferencia de dias entre fechas mayor a 10")
                }
            }
            return true
        }
    }

    const validarFotos = (fotos) => {
        if(fotos === null){
            return true
        }
    }




})