using MicroondasAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace MicroondasAPI.Controllers
{
    public class PaqueteEquipoController : ApiController
    {
        [HttpPost]
        [Route("api/MicroondasAPI/agregarPaqueteEquipo")]
        public IHttpActionResult agregarPaqueteEquipo(PaqueteEquipo pe)
        {
            try
            {
                // variable a devolver
                bool i = false;

                // buscamos si existe el paquete equipo a ingresar
                var accion = SessionController.getInstance().PaqueteEquipo.Where(w => w.idPaquete == pe.idPaquete && w.idEquipo == pe.idEquipo).FirstOrDefault();

                // si no existe
                if (accion == null)
                {
                    // estructuramos los datos
                    PaqueteEquipo datos = new PaqueteEquipo()
                    {
                        idEquipo = pe.idEquipo,
                        idPaquete = pe.idPaquete
                    };

                    // guardamos los datos
                    SessionController.getInstance().PaqueteEquipo.Add(datos);

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

        [HttpPut]
        [Route("api/MicroondasAPI/eliminarPaqueteEquipo")]
        public IHttpActionResult eliminarPaqueteEquipo(string id)
        {
            try
            {
                // convertimos el id en guid
                Guid guid = Guid.Parse(id.ToString());

                // buscamos al paquete equipo a eliminar
                var accion = SessionController.getInstance().PaqueteEquipo.Where(w => w.idPaquete == guid).FirstOrDefault();

                // Eliminamos la relacion
                SessionController.getInstance().PaqueteEquipo.Remove(accion);

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

        [HttpGet]
        [Route("api/MicroondasAPI/consultaPaqueteEquipo")]
        public IHttpActionResult consultaPaqueteEquipo()
        {
            try
            {
                // consultamos la tabla PaqueteEquipo
                var accion = SessionController.getInstance().PaqueteEquipo.ToList();

                // estructuramos los datos
                var resultado = accion.Select(s => new
                {
                    idPE = s.idPE,
                    idEquipo = s.idEquipo,
                    idPaquete = s.idPaquete
                });

                // Devolvemos los datos
                return Ok(resultado);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpPut]
        [Route("api/MicroondasAPI/modificarPaqueteEquipo")]
        public IHttpActionResult modificarPaqueteEquipo(PaqueteEquipo pe)
        {
            try
            {
                // variable para devolver
                bool i = false;

                // buscamos si existe el PaqueteEquipo a ingresar
                var accion = SessionController.getInstance().PaqueteEquipo.Where(w => w.idPaquete == pe.idPaquete).FirstOrDefault();

                // si no existe
                if (accion == null)
                {
                    // Hacemos los cambios
                    accion.idPaquete = pe.idPaquete;
                    accion.idEquipo = pe.idEquipo;

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
