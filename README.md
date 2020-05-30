# StarWars

Primero instala las depencencias
* `npm install`

Puesdes ejecutar el codigo en tu máquina
* `npm run dev`


El código está dividido en dos carpetas
* server: todo el codigo del servidor en nodejs
* src: el código reactjs

## Server
Para el server he utilizado una base de datos ligera (sqlite3) y sequelize. 

Con respecto la autenticación  he utilizado jsonwebtoken y bcruyptjs (todo y que simplemente he creado un toquen cuando un usuario entra las credencialas y en las comunicaciones al la página de "Films" se necesita el token para poder ver las peliculas y caracteres).

### Test
Solo he podido instalar los paquetes no he tenido tiempo de poder hacer algun test 😥

## App
   Para entrar:
   * Crea Un Usuario
   * Has login
   * Entra a Films
   * Clica en cualquera de las peliculas y apareceran todos los caracteres de la misma