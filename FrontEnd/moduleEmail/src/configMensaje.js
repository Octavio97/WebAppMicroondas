const nodemailer = require('nodemailer');
module.exports = (formulario) => {
 var transporter = nodemailer.createTransport({
 service: 'gmail',
 auth: {
 user: 'octavio.gastelum@tectijuana.edu.mx', // Cambialo por tu email
 pass: 'otorrinolaringologo69' // Cambialo por tu password
 }
 });
const mailOptions = {
 from: '"Soluciones TJ" <octavio.gastelum@tectijuana.edu.mx>',
 to: formulario.correoE, // Cambia esta parte por el destinatario
 subject: 'Recuperar contraseña',
 html: `
 <html>
 <head>
     <title>Prueba</title>
     <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous">
 </head>
 <body>
     <div class="d-flex justify-content-center">
         <div class="d-flex flex-column bd-highlight mb-3 border border-primary rounded">
             <img src="https://scontent.ftij3-1.fna.fbcdn.net/v/t1.0-9/12063602_1631592270448434_8923984269839338440_n.png?_nc_cat=101&ccb=2&_nc_sid=7aed08&_nc_ohc=X2qkbo6G_sUAX8JjP8F&_nc_ht=scontent.ftij3-1.fna&oh=5c7e880ea910fd1513dace1a9fc0f115&oe=5FD412D6" alt="logo">
             <h1>Esta es tu contraseña</h1>
             <h2>${ formulario.contrasena }</h2>
             <br><br>
             <p>Recuerda tenerla en un lugar seguro y sea fácil de recordar</p>
             <p>Ir al <a href="localhost:4200/login">login</a></p>
         </div>
     </div>
 </body>
</html>
 `
 };
transporter.sendMail(mailOptions, function (err, info) {
 if (err)
 console.log(err)
 else
 console.log(info);
 });
}