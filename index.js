//Modulos requeridos
const http = require('http')

const url = require('url')

const fs = require('fs')

//Creacion servidor
http
    .createServer(function (req, res) {
        // se definen variables con la query y la fecha, ademas del template para el contenido del archivo
        const params = url.parse(req.url, true).query
        const archivo = params.file
        const nombre = params.name
        const nuevoNombre = params.newName
        const contenido = params.content
        const date = new Date()
        const day = `${(date.getDate())}`.padStart(2, '0')
        const month = `${(date.getMonth() + 1)}`.padStart(2, '0')
        const year = date.getFullYear()
        const template = `${day}/${month}/${year}
        ${contenido}`


        // los if para las diferentes rutas
        if (req.url.includes('/crear')) {
            fs.writeFile(archivo, template, (err) => {
                if (err == null) {

                    res.write('File created successfully!')
                    res.end()

                } else {
                    console.log(err)
                    res.end()
                }
            })
        }
        
        if (req.url.includes('/leer')) {
            fs.readFile(archivo, (err, data) => {
                if (err == null) {
                    res.write(data)
                    res.end()
                } else {
                    console.log(err)
                    res.end()

                }
            })
        }
        
        if (req.url.includes('/renombrar')) {
            fs.rename(nombre, nuevoNombre, (err, data) => {
                if (err == null) {
                    res.write(`File ${nombre} renamed to ${nuevoNombre}`)
                    res.end()
                } else {
                    console.log(err)
                    res.end()
                }
            })
        }
       
        if (req.url.includes('/eliminar')) {
            fs.unlink(archivo, (err, data) => {
                if (err == null) {
                    res.write(`Deleting file ${archivo}, refer to the console for more info`)
                    //funcion con setTimeout para enviar el mensaje por consola después de 3 segundos
                    setTimeout(() => {

                        console.log(`File ${archivo} deleted successfully`)

                    }, 3000
                    )
                    res.end()
                } else {
                    console.log(err)
                    res.end()
                }
            })
        }
    })
    .listen(8080, () => console.log('Listening on port 8080'))