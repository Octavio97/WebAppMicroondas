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
                    CP = new {
                        idCP = consulta.CodigoPostal.idCP,
                        codigo = consulta.CodigoPostal.codigo
                    },
                    Colonia = new {
                        idColonia = consulta.Colonia.idColonia,
                        colonia1 = consulta.Colonia.colonia1,
                    },
                    //Contrato = new {
                    //    idContrato = consulta.Contrato
                    //},
                    Ciudad = new {
                        idCiudad = consulta.Ciudad.idCiudad,
                        ciudad1 = consulta.Ciudad.ciudad1
                    },
                    Estado = new {
                        idEstado = consulta.idEstado,
                        estado1 = consulta.Estado.estado1
                    },
                    //Propiedad = new {

                    //},
                    Rol = new {
                        idRol = consulta.Rol.idRol,
                        rol1 = consulta.Rol.rol1
                    }
                };

                // regresamos el resultado
                return Ok(resultado);
            }
            catch (Exception)
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
