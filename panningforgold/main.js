fs = require('fs');
files = ['01.html', '02.html','03.html','04.html','05.html', '06.html'];

//Regex
let html = /<!--.+-->|<!--.|.-->/,
    comment = /\/\/|\/\*/,
    dirIP = /\b(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b/,
    email = /[\w._%+-]+@[\w.-]+\.[A-Z]{2,}/i,
    sql = /SELECT|UPDATE|DELETE|INSERT/i,
    conexion = /\w(?=;){4}/,
    hidden = /type="hidden"/;

//Contadores globales para el resumen
let rhtml = 0,
    rcomment = 0,
    rip = 0,
    remail = 0,
    rsql = 0,
    rconexion = 0,
    rhidden = 0;         

    function leerArchivos() {
        //Cosa que genera txt
        let stream = fs.createWriteStream("ResultadosPruebasDiana.txt");
        stream.once('open', (fd) => {
        files.forEach(file => {
            
            let archivo = fs.readFileSync(file, 'utf-8');

                    //contadores para cada html
                    let chtml = 0,
                    ccomment = 0,
                    cip = 0,
                    cemail = 0,
                    csql = 0,
                    cconexion = 0,
                    chidden = 0;
                    let lineas = archivo.split("\n");
                //Sumar por archivo individual
                lineas.forEach(linea => {
                    if(html.test(linea)) {
                        chtml++;
                        rhtml++;
                    }
                    if(comment.test(linea)) {
                        ccomment++;
                        rcomment++;
                    }
                    if(dirIP.test(linea)) {
                        cip++;
                        rip++;
                    }
                    if(email.test(linea)) {
                        cemail++;
                        remail++;
                    }
                    if(sql.test(linea)) {
                        csql++;
                        rsql++;
                    }
                    if(conexion.test(linea)) {
                        cconexion++;
                        rconexion++;
                    }
                    if(hidden.test(linea)) {
                        chidden++;
                        rhidden++;
                    }
                });
                stream.write("\n***" + file + "***");
                stream.write("\nComentarios HTML: " + chtml);
                stream.write("\nComentarios de la app: " + ccomment);
                stream.write("\nDirecciones IP: " + cip);
                stream.write("\nDirecciones de correo electrónico: " + cemail);
                stream.write("\nConsultas SQL: " + csql);
                stream.write("\nCadenas de conexión a la base de datos: " + cconexion);
                stream.write("\nCampos ocultos de entrada: " + chidden);  
                //Imprimir resultados de cada html
                console.log("\n***" + file + "***");
                console.log("Comentarios HTML: " + chtml);
                console.log("Comentarios de la app: " + ccomment);
                console.log("Direcciones IP: " + cip);
                console.log("Direcciones de correo electrónico: " + cemail);
                console.log("Consultas SQL: " + csql);
                console.log("Cadenas de conexión a la base de datos: " + cconexion);
                console.log("Campos ocultos de entrada: " + chidden);     
        });
        stream.write("\n***Resumen***");
        stream.write("\nComentarios HTML: " + rhtml);
        stream.write("\nComentarios de la app: " + rcomment);
        stream.write("\nDirecciones IP: " + rip);
        stream.write("\nDirecciones de correo electrónico: " + remail);
        stream.write("\nConsultas SQL: " + rsql);
        stream.write("\nCadenas de conexión a la base de datos: " + rconexion);
        stream.write("\nCampos ocultos de entrada: " + rhidden + "\n");

    console.log("\n***Resumen***");
    console.log("Comentarios HTML: " + rhtml);
    console.log("Comentarios de la app: " + rcomment);
    console.log("Direcciones IP: " + rip);
    console.log("Direcciones de correo electrónico: " + remail);
    console.log("Consultas SQL: " + rsql);
    console.log("Cadenas de conexión a la base de datos: " + rconexion);
    console.log("Campos ocultos de entrada: " + rhidden);
    stream.end();
    });
}

leerArchivos();