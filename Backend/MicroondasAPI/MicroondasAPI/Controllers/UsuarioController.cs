using MicroondasAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace MicroondasAPI.Controllers
{
    public class UsuarioController : ApiController
    {
        [HttpPost]
        [Route("api/MicroondasAPI/agregarUsuario")]
        public IHttpActionResult agregarUsuarios(Usuario usuario)
        {
            try
            {
                // variable para identificar si se guardo el usuario
                bool i = false;

                // comprobamos si el usuario existe por medio del correoE
                if (SessionController.getInstance().Usuario.Where(w => w.correoE == usuario.correoE).FirstOrDefault() == null)
                {
                    // Guardamos los datos para convertirlos a datos para la clase Usuario
                    Usuario tabla = new Usuario()
                    {
                        idUsuario = Guid.NewGuid(),
                        nombre = usuario.nombre,
                        apellido = usuario.apellido,
                        telefono = usuario.telefono,
                        correoE = usuario.correoE,
                        calle = usuario.calle,
                        numInt = usuario.numInt,
                        numExt = usuario.numExt,
                        idEstado = usuario.idEstado,
                        idCiudad = usuario.idCiudad,
                        idColonia = usuario.idColonia,
                        idCP = usuario.idCP,
                        idRol = usuario.idRol,
                        Activo = usuario.Activo,
                        contrasena = usuario.contrasena
                    };
                    // Agregamos el registro
                    SessionController.getInstance().Usuario.Add(tabla);
                    // Agregamos los cambios
                    SessionController.getInstance().SaveChanges();
                    // Verdadero al  saber que se realizo correctamente
                    i = true;
                }
                // Regresamos verdadero como accion exitosa
                return Ok(i);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
        
        [HttpPut]
        [Route("api/MicroondasAPI/eliminarUsuario")]
        public IHttpActionResult eliminarUsuario(string id)
        {
            try
            {
                // convertimosel id en GUID
                var guid = Guid.Parse(id.ToString());

                // Buscamos al usuario a eliminar
                var accion = SessionController.getInstance().Usuario.Where(w => w.idUsuario == guid).FirstOrDefault();

                // Deshabilitamos al usuario
                accion.Activo = false;

                // Guardamos los cambios
                SessionController.getInstance().SaveChanges();

                // regresamos verdadero cono accion exitosa
                return Ok(true);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpGet]
        [Route("api/MicroondasAPI/consultaUsuario")]
        public IHttpActionResult consultaUsuario()
        {
            try
            {
                // Consultamos a todos los usuarios
                var accion = SessionController.getInstance().Usuario.ToList();

                // Ajustamos los datos para devolverlso
                var resultado = accion.Select(s => new
                {
                    idUsuario = s.idUsuario,
                    nombre = s.nombre,
                    apellido = s.apellido,
                    telefono = s.telefono,
                    correoE = s.correoE,
                    calle = s.calle,
                    numInt = s.numInt,
                    numExt = s.numExt,
                    idEstado= s.Estado.estado1,
                    idCiudad = s.Ciudad.Ciudad1,
                    idCP = s.CodigoPostal.codigo,
                    idColonia = s.Colonia.colonia1,
                    idRol = s.Rol.rol1,
                    Activo = s.Activo,
                    contrasena = s.contrasena
                });

                // manda resultados
                return Ok(resultado);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpPost]
        [Route("api/MicroondasAPI/modificarUsuario")]
        public IHttpActionResult modificarUsuario(Usuario usuario)
        {
            try
            {
                // variable para identificar si se guardo el usuario
                bool i = false;

                // Buscamos si existe un registro con un correo o telefono similar
                var accion = SessionController.getInstance().Usuario.Where(w => w.correoE == usuario.correoE || w.telefono == usuario.telefono).ToList();

                // si no existe un registro previo
                if (accion == null)
                {
                    // buscamos al usuario a modificar
                    var consulta = SessionController.getInstance().Usuario.Where(w => w.idUsuario == usuario.idUsuario).FirstOrDefault();

                    // aplicamos los cambios
                    consulta.nombre = usuario.nombre;
                    consulta.apellido = usuario.apellido;
                    consulta.telefono = usuario.telefono;
                    consulta.correoE = usuario.correoE;
                    consulta.calle = usuario.calle;
                    consulta.numExt = usuario.numExt;
                    consulta.numInt = usuario.numInt;
                    consulta.idEstado = usuario.idEstado;
                    consulta.idCiudad = usuario.idCiudad;
                    consulta.idColonia = usuario.idColonia;
                    consulta.idCP = usuario.idCP;
                    consulta.idRol = usuario.idRol;
                    consulta.Activo = usuario.Activo;
                    consulta.contrasena = usuario.contrasena;

                    // ejecutan los cambios
                    SessionController.getInstance().SaveChanges();
                    
                    // resutado exitoso
                    i = true;
                }
                // devuelve el valor final
                return Ok(i);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
    }
}
