const http = require('http')

const url = require('url')

const fs = require('fs')

const PORT = process.env.PORT || 3000;

http
    .createServer(function (req, res) {
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
    .listen(PORT, () => console.log('Server running'))