using MicroondasAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace MicroondasAPI.Controllers
{
    public class CiudadController : ApiController
    {
        [HttpPost]
        [Route("api/MicroondasAPI/agregarCiudad")]
        public IHttpActionResult agregarCiudad(Ciudad ciudad)
        {
            try
            {
                // variable a devolver
                bool i = false;

                // hacemos consulta si ya existe esa ciudad
                var accion = SessionController.getInstance().Ciudad.Where(w => w.Ciudad1 == ciudad.Ciudad1).FirstOrDefault();

                // si no existe registro
                if (accion == null)
                {
                    Ciudad datos = new Ciudad()
                    {
                        idCiudad = Guid.NewGuid(),
                        Ciudad1 = ciudad.Ciudad1,
                        idEstado = ciudad.idEstado,
                        activo = ciudad.activo
                    };

                    // Realizamos la insercion
                    SessionController.getInstance().Ciudad.Add(datos);

                    // Ejecutamos los cambios
                    SessionController.getInstance().SaveChanges();

                    // resultado exitoso
                    i = true;
                }

                // Devolvemos el valor final
                return Ok(i);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpPut]
        [Route("api/MicroondasAPI/eliminarCiudad")]
        public IHttpActionResult eliminarCiudad(string id)
        {
            try
            {
                // convertimos el id en guid
                Guid guid = Guid.Parse(id.ToString());

                // Buscamos la ciudad a eliminar
                var accion = SessionController.getInstance().Ciudad.Where(w => w.idCiudad == guid).FirstOrDefault();

                // Deshablilitamos la ciudad
                accion.activo = false;

                // Ejecutamos los cambios
                SessionController.getInstance().SaveChanges();

                // Devolvemos el resultado
                return Ok(true);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpPut]
        [Route("api/MicroondasAPI/consultaCiudad")]
        public IHttpActionResult consultaCiudad()
        {
            // Consultamos la tabla Ciudad
            var accion = SessionController.getInstance().Ciudad.ToList();

            // Estructuramos los datos
            var resultado = accion.Select(s => new
            {
                idCiudad = s.idCiudad,
                ciudad1 = s.Ciudad1,
                idEstado = s.idEstado,
                activo = s.activo
            });

            // Devolvemos los datos
            return Ok(resultado);
        }

        [HttpPut]
        [Route("api/MicroondasAPI/modificarCiudad")]
        public IHttpActionResult modificarCiudad(Ciudad ciudad)
        {
            try
            {
                // variable a devolver
                bool i = false;

                // hacemos consulta si ya existe esa ciudad
                var accion = SessionController.getInstance().Ciudad.Where(w => w.Ciudad1 == ciudad.Ciudad1).FirstOrDefault();

                // si no existe registro
                if (accion == null)
                {
                    // Hacemos los cambios
                    accion.Ciudad1 = ciudad.Ciudad1;
                    accion.idEstado = ciudad.idEstado;
                    accion.activo = ciudad.activo;

                    // Ejecutamos los cambios
                    SessionController.getInstance().SaveChanges();

                    // resultado exitoso
                    i = true;
                }

                // Devolvemos el valor final
                return Ok(i);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
    }
}
