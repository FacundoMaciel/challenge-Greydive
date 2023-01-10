# Getting Started with Create React App
# Primeros pasos con Create React App

Este proyecto fue iniciado con // 
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


## Available Scripts

➔ En el directorio del proyecto, puede ejecutar:

➔ In the project directory, you can run:


### `npm start`

➔ Runs the app in the development mode.\
    Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

➔ Ejecuta la aplicación en el modo de desarrollo.\
    Abra [http://localhost:3000](http://localhost:3000) para verlo en su navegador.

➔ The page will reload when you make changes.\
    You may also see any lint errors in the console.

➔ La página se volverá a cargar cuando realice cambios.\
    También puede ver errores en la consola.

### `npm test`

➔ Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

➔ Inicia el corredor de prueba en el modo observador interactivo.\
Consulte la sección sobre [ejecutar pruebas] (https://facebook.github.io/create-react-app/docs/running-tests) para obtener más información.

### `npm run build`

➔ Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

➔ Construye la aplicación para producción en la carpeta `build`.\
Empaqueta correctamente React en modo de producción y optimiza la compilación para obtener el mejor rendimiento.

 -The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

 -La compilación se minimiza y los nombres de archivo incluyen los hashes.\
¡Tu aplicación está lista para ser implementada!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

Consulte la sección sobre [deployment](https://facebook.github.io/create-react-app/docs/deployment) para obtener más información.

<h1 align="center">Desafío Greydive</h1>

## El desafío consiste en:

➔ Realizar una app en React.js que lea un archivo JSON proporcionado por la empresa y genere con cada ítem una interfaz de formulario de encuesta

➔ Las respuestas de la encuesta deben ser enviadas a una base de datos de Firebase.

➔ Por último, traé las respuestas de la base de datos ya mencionada y mostralas en la misma app pero en otra ruta. Al presionar “enviar” en el formulario tiene que aparecer un mensaje y el acceso a esa ruta en donde estarán las respuestas.


# Estructura de la página:

   Formulario: 
   
      - Campos para nombre completo, email, fecha de nacimiento, pais de origen, aceptar terminos y condiciones y botón enviar
  
   Usuarios lista, menú desplegable y gráfico en otra ruta (/users):
   
      - Tabla con los datos de los usuarios
      - Grafico de barras verticales y menu de despliegue con la cantidad de usuarios por pais
    
# Funcionalidad:

   - Base de datos creada en Firebase conectada mediante credenciales, método initializeApp a la aplicación y utilizando una variable constante llamada (db) en donde se almacenan para cada componente mediante el metodo getFirestore dichos datos.

   - Al ingresar a la app se muestra el formulario con los campos correspondientes a un archivo JSON proporcionado para el     challenge (un campo por cada item) aplicando lógicas de operadores ternarios y condicionales. Verificaciones de formulario para tipos de datos con HTML5.
  
   - Al completar el formulario correctamente se utiliza el método de Firebase/Firestore addDocs() para enviar la información a     una base de datos creada en Firebase, disparando mendiante el evento submit una alerta creada con sweetalert2 en donde se muestra un mensaje indicando el éxito del registro y un boton para dirigirse a la ruta donde se encuentra la tabla con todos los usuarios junto a un gráfico y menú desplegable que contienen la cantidad de usuarios por pais obtenidos mediante otro método de Firebase/Firestore getDocs()
  
  - Por último un boton en la tabla de usuarios para poder eliminarlos mendiante el método de Firebase/Firestore deleteDoc()
  
# Deploy:

  Vercel. URL:
  
    https://challenge-graydive.vercel.app/
      

