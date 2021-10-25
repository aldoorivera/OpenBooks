const express = require('express');
const morgan = require('morgan');
const app = express();
app.set('port', process.env.port || 3001);
app.use(morgan('dev'));
app.set(express.urlencoded({ extended: false }));
app.use(express.json());
app.set('json space', 2);
app.listen(app.get('port'), () => {
    console.log('Servidor iniciado en el puerto ' + app.get('port'));
});

//app.use('/OpenBooks', require('./routes'));
app.use('/OpenBooks/libro', require('./routes/libros'));
app.use('/OpenBooks/autor', require('./routes/autores'));
app.use('/OpenBooks/genero', require('./routes/generosLiterarios'));
app.use('/OpenBooks/usuario', require('./routes/usuarios'));
app.use('/OpenBooks/marcador', require('./routes/marcadores'));
app.use('/OpenBooks/generosLibro', require('./routes/librocategorias'));