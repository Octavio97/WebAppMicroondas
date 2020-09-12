using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using MicroondasAPI.Models;

namespace MicroondasAPI.Controllers
{
    public class SessionController : ApiController
    {
        private static MicroondasEntities bd;

        [HttpGet]
        [Route("api/MicroondasAPI/login")]
        public IHttpActionResult login(string correo, string contra)
        {
            try
            {
                // consultar usuaro para inicio de sesion
                var consulta = getInstance().Usuario.Where(w => w.correoE == correo && w.contrasena == contra).FirstOrDefault();

                // regresar usuario con los objetos que tiene en angular
                var resultado = new
                {
                    idUsuario = consulta.idUsuario,
                    nombre = consulta.nombre,
                    apellido = consulta.apellido,
                    telefono = consulta.telefono,
                    correoE = consulta.correoE,
                    contrasena = consulta.contrasena,
                    calle = consulta.calle,
                    numInt = consulta.numInt,
                    numExt = consulta.numExt,
                    idEstado = consulta.idEstado,
                    idCiudad = consulta.idCiudad,
                    idColonia = consulta.idColonia,
                    idCP = consulta.idCP,
                    idRol = consulta.idRol,
                    activo = consulta.activo,
                    //CP = consulta.CodigoPostal,
                    //Colonia = consulta.Colonia,    
                    //Contrato = consulta.Contrato,
                    //Ciudad = consulta.Ciudad,
                    //Estado = consulta.Estado,
                    //Propiedad = consulta.Propiedad,
                    //Rol = consulta.Rol
                };

                // regresamos el resultado
                return Ok(resultado);
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }

        public static MicroondasEntities getInstance()
        {
            try
            {
                // si la instancia esta nula
                if (bd == null)
                {
                    bd = new MicroondasEntities(); // creamos la instancia
                }
                return bd;
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
