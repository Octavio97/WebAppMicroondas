using MicroondasAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace MicroondasAPI.Controllers
{
    public class PropiedadController : ApiController
    {
        [HttpPost]
        [Route("api/MicroondasAPI/agregarPropiedad")]
        public IHttpActionResult agregarPropiedad(Propiedad propiedad)
        {
            try
            {
                // variable a devolver
                bool i = false;

                // buscamos si existe la propiedad a ingresar
                var accion = SessionController.getInstance().Propiedad.Where(w => w.idUsuario == propiedad.idUsuario && w.idEquipo == propiedad.idEquipo).FirstOrDefault();

                // si no existe
                if (accion == null)
                {
                    // estructuramos los datos
                    Propiedad datos = new Propiedad()
                    {
                        idPropiedad = Guid.NewGuid(),
                        idEquipo = propiedad.idPropiedad,
                        idUsuario = propiedad.idUsuario
                    };

                    // guardamos los datos
                    SessionController.getInstance().Propiedad.Add(datos);

                    // ejecutamos la accion
                    SessionController.getInstance().SaveChanges();

                    // estado exitoso
                    i = true;
                }

                //devolvemos el valor
                return Ok(i);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpPost]
        [Route("api/MicroondasAPI/eliminarPropiedad")]
        public IHttpActionResult eliminarPropiedad(string id)
        {
            try
            {
                // convertimos el id en guid
                Guid guid = Guid.Parse(id.ToString());

                // buscamos al equipo a eliminar
                var accion = SessionController.getInstance().Propiedad.Where(w => w.idPropiedad == guid).FirstOrDefault();

                // Eliminamos la propiedad
                SessionController.getInstance().Propiedad.Remove(accion);

                // ejecutamos las acciones
                SessionController.getInstance().SaveChanges();

                // devolvemos exito
                return Ok(true);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpPost]
        [Route("api/MicroondasAPI/consultaPropiedad")]
        public IHttpActionResult consultaPropiedad()
        {
            try
            {
                // consultamos la tabla propiedad
                var accion = SessionController.getInstance().Propiedad.ToList();

                // estructuramos los datos
                var resultado = accion.Select(s => new
                {
                    idPropiedad = s.idPropiedad,
                    idEquipo = s.idEquipo,
                    idUsuario = s.idUsuario
                });

                // Devolvemos los datos
                return Ok(resultado);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpPost]
        [Route("api/MicroondasAPI/modificarPropiedad")]
        public IHttpActionResult modificarPropiedad(Propiedad propiedad)
        {
            try
            {
                // variable para devolver
                bool i = false;

                // buscamos si existe la propiedad a ingresar
                var accion = SessionController.getInstance().Propiedad.Where(w => w.idPropiedad == propiedad.idPropiedad).FirstOrDefault();

                // si no existe
                if (accion == null)
                {
                    // Hacemos los cambios
                    accion.idUsuario = propiedad.idUsuario;
                    accion.idPropiedad = propiedad.idPropiedad;

                    // ejecutamos la accion
                    SessionController.getInstance().SaveChanges();

                    // estado exitoso
                    i = true;
                }

                //devolvemos el valor
                return Ok(i);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
    }
}
