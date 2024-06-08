let estado = ""

let tareas = [
    {
        "_id": "1",
        "titulo": "caminar",
        "descripcion": "salir a caminar en las mañanas",
        "estado": "activa",
        "responsable": "sebas"
    },
    {
        "_id": "2",
        "titulo": "ir al gimnasio",
        "descripcion": "salir al gimnasio en las tardes luego del trabajo",
        "estado": "activa",
        "responsable": "sebas"
    },
    {
        "_id": "3",
        "titulo": "Pasear al perror",
        "descripcion": "salir a caminar en las mañanas con el perro",
        "estado": "activa",
        "responsable": "sebas"
    },
    {
        "_id": "4",
        "titulo": "limpiar la cocina",
        "descripcion": "limpiar la cocina despues de cocinar",
        "estado": "activa",
        "responsable": "sebas"
    }
]

const crearTarea = async (tarea) => {
    // enviar consulta a la API para crear una tarea
    // alert('tarea creada')
await fetch("http://localhost:3000/api/v1/tareas", {
method: "POST",
body: JSON.stringify(tareas),
Headers: {
    "content-Type": "aplication/json"
}
})
   // tarea.estado = 'inactiva'
   // tareas.push(tarea)
}

const obtenerTareas = async () => {
    // enviar consulta a la API para obtener todas las tareas

    let query = ""
    if (estado) {
        query = "?estado=" + estado
    }
    const response = await fetch("http://localhost:3000/api/v1/tareas", + query)
    const data = await response.json()
        
       
     return data.data
        })

    

   // return tareas


const verTarea = async (id) => {
    // enviar consulta a la API para obtener la tarea con el id
    // alert('tarea obtenida')
    const tareaEncontrada = tareas.find((tarea) => {
        if (id === tarea._id) {
            return true
        }
        return false
    })

    if (tareaEncontrada) {
        return tareaEncontrada
    } else {
        alert('tarea no encontrada')
    }
}

const editarTarea = async (id, tareaEditada) => {
    // enviar consulta a la API para obtener la tarea con el id
    // alert(http://localhost:3000/api/v1/tareas'tarea editada')
await fetch("http://localhost:3000/api/v1/tareas/" + id, {
    method: "PUT",
    body: JSON.stringify(tareaEditada),
    headers: {
        "Content-Type" : "application/json"
    }
})
    //* const listaTareasModificadas = tareas.map((tarea) => {
        //if (id === tarea._id) {
          //  tareaEditada._id = id
          //  return tareaEditada
       // }

       // return tarea
   // })

    //tareas = listaTareasModificadas
}


const eliminarTarea = async (id) => {
    // enviar consulta a la API para eliminar la tarea con el id
    // alert('tarea eliminada')
await fetch("http://localhost:3000/api/v1/tareas" + id, {
    method: "DELETE"
})
    //const tareasFiltradas = tareas.filter((tarea) => {
        //if (tarea._id !== id) {
         //   return true
        }
       // return false
    

    tareas = tareasFiltradas


// -----------------------  Renderizar tareas en el HTML -----------------------
const listaTareas = document.getElementById('lista-tareas')
const renderTareas = async () => {

    listaTareas.innerHTML = ''
    
    const listaTareasObtenidas = await obtenerTareas()

    // blucle para recorrer cada tarea
    listaTareasObtenidas.forEach((tarea) => {
        //console.log(tarea)

        const listItem = document.createElement('li')
        const article = document.createElement('article')
        const datos = document.createElement('div')
        datos.classList.add('tarea')

        const titulo = document.createElement('h4')
        const estado = document.createElement('p')
        const responsable = document.createElement('p')

        //titulo.innerText = `Titulo: ${tarea.titulo}`
        titulo.innerText = 'Titulo: ' + tarea.titulo
        estado.innerText = `Estado: ${tarea.estado}`
        responsable.innerText = `Responsable: ${tarea.responsable}`

        datos.appendChild(titulo)
        datos.appendChild(estado)
        datos.appendChild(responsable)

        article.appendChild(datos)
        listItem.appendChild(article)

        listaTareas.appendChild(listItem)

        // ------ botones --------
        const wrapperBotones = document.createElement('div')
        wrapperBotones.classList.add('wrapper-botones')

        const buttonVerMas = document.createElement('button')
        const buttonEditar = document.createElement('button')
        const buttonEliminar = document.createElement('button')

        buttonVerMas.innerText = 'Ver más'
        buttonEditar.innerText = 'Editar'
        buttonEliminar.innerText = 'Eliminar'

        wrapperBotones.appendChild(buttonVerMas)
        wrapperBotones.appendChild(buttonEditar)
        wrapperBotones.appendChild(buttonEliminar)

        article.appendChild(wrapperBotones)

        // ------- agregar evento click al boton Ver Mas --------
        buttonVerMas.addEventListener('click', async () => {
            // console.log(tarea._id)
            const tareaObtenida = await verTarea(tarea._id)
            // console.log(tareaObtenida)

            const descripcion = document.createElement('p')
            descripcion.innerText = `Descripción: ${tareaObtenida.descripcion}`
            datos.appendChild(descripcion)

            // desabilitar el boton
            buttonVerMas.disabled = true
        })

        // ------- agregar evento click al boton editar
        buttonEditar.addEventListener('click', async () => {
            // console.log(tarea._id)

            const wrapperEditarTarea = document.getElementById('wrapper-form-editar')
            wrapperEditarTarea.style.display = 'grid'

            const tareaObtenida = await verTarea(tarea._id)

            const inputEditarTitulo = document.getElementById('editar-titulo')
            const inputEditarDescripcion = document.getElementById('editar-descripcion')
            const inputEditarResponsable = document.getElementById('editar-responsable')
            const inputEditarEstado = document.getElementById('editar-estado')

            inputEditarTitulo.value = tareaObtenida.titulo
            inputEditarDescripcion.value = tareaObtenida.descripcion
            inputEditarResponsable.value = tareaObtenida.responsable
            inputEditarEstado.value = tareaObtenida.estado

            const formEditarTarea = document.getElementById('form-editar-tarea')
            formEditarTarea.addEventListener('submit', async (event) => {
                event.preventDefault()

                const data = Object.fromEntries(new FormData(event.target))

                await editarTarea(tarea._id, data)

                wrapperEditarTarea.style.display = 'none'

                renderTareas()

            })

        })

        // ------------ agregar evento click al boton eliminar -----------
        buttonEliminar.addEventListener('click', async () => {
            await eliminarTarea(tarea._id)
            renderTareas()
        })


    })

}

// -----------------------  Abrir y Cerra ventana crear tarea -----------------------
const wrapperFormCrear = document.getElementById('wrapper-form-crear')

const buttonAbrirFormCrear = document.getElementById('abrir-form-crear')
buttonAbrirFormCrear.addEventListener('click', () => {
    wrapperFormCrear.style.display = 'grid'
})

const buttonCerrarFormCrear = document.getElementById('cerrar-form-crear')
buttonCerrarFormCrear.addEventListener('click', () => {
    wrapperFormCrear.style.display = 'none'
})

// -----------------------  Abrir ventana editar tarea -----------------------
const buttonCerrarFormEditar = document.getElementById('cerrar-form-editar')
buttonCerrarFormEditar.addEventListener('click', () => {
    const editarTarea = document.getElementById('wrapper-form-editar')
    editarTarea.style.display = 'none'
})

// -----------------------  Crear tarea -----------------------
const formCrearTarea = document.getElementById('form-crear-tarea')

formCrearTarea.addEventListener('submit', async (event) => {
    // prevenir el comportamiento por defecto del formulario
    event.preventDefault()

    // leer los datos del formulario
    const data = Object.fromEntries(new FormData(event.target))
    console.log(data)

    await crearTarea(data)

    // ocultar formulario de crear tarea
    wrapperFormCrear.style.display = 'none'

    // es necesario volver a renderizar las tareas
    renderTareas()
    
})

// -----------------------  Filtrar tareas por estado -----------------------
let estado = ''
const selectEstado = document.getElementById('select-estado')
selectEstado.addEventListener('change', (e) => {
    console.log(e.target.value)
    estado = e.target.value
    renderTareas.tareas()
})

window.addEventListener('load', renderTareas)