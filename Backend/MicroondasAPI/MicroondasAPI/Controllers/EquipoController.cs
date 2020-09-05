using MicroondasAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace MicroondasAPI.Controllers
{
    public class EquipoController : ApiController
    {
        [HttpPost]
        [Route("api/MicroondasAPI/agregarEquipo")]
        public IHttpActionResult agregarEquipo(Equipo equipo)
        {
            try
            {
                // variable a devolver
                bool i = false;

                // buscamos si existe el equipo a ingresar
                var accion = SessionController.getInstance().Equipo.Where(w => w.equipo1 == equipo.equipo1).FirstOrDefault();

                // si no existe
                if (accion == null)
                {
                    // estructuramos los datos
                    Equipo datos = new Equipo()
                    {
                        idEquipo = Guid.NewGuid(),
                        equipo1 = equipo.equipo1,
                        activo = equipo.activo
                    };

                    // guardamos los datos
                    SessionController.getInstance().Equipo.Add(datos);

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
        [Route("api/MicroondasAPI/eliminarEquipo")]
        public IHttpActionResult eliminarEquipo(string id)
        {
            try
            {
                // convertimos el id en guid
                Guid guid = Guid.Parse(id.ToString());

                // buscamos al equipo a eliminar
                var accion = SessionController.getInstance().Equipo.Where(w => w.idEquipo == guid).FirstOrDefault();

                // Deshabilitamos al equipo
                accion.activo = false;

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
        [Route("api/MicroondasAPI/consultaEquipo")]
        public IHttpActionResult consultaEquipo()
        {
            try
            {
                // consultamos la tabla equipo
                var accion = SessionController.getInstance().Equipo.ToList();

                // estructuramos los datos
                var resultado = accion.Select(s => new
                {
                    idEquipo = s.idEquipo,
                    equipo1 = s.equipo1,
                    activo = s.activo
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
        [Route("api/MicroondasAPI/modificarEquipo")]
        public IHttpActionResult modificarEquipo(Equipo equipo)
        {
            try
            {
                // variable para devolver
                bool i = false;

                // buscamos si existe el equipo a ingresar
                var accion = SessionController.getInstance().Equipo.Where(w => w.idEquipo == equipo.idEquipo).FirstOrDefault();

                // si no existe
                if (accion == null)
                {
                    // Hacemos los cambios
                    accion.equipo1 = equipo.equipo1;
                    accion.activo = equipo.activo;

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
