using MicroondasAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace MicroondasAPI.Controllers
{
    public class ColoniaController : ApiController
    {
        [HttpPost]
        [Route("api/MicroondasAPI/agregarColonia")]
        public IHttpActionResult agregarColonia(Colonia colonia)
        {
            try
            {
                // variable a devolver
                bool i = false;

                // buscamos si existe la colonia a ingresar
                var accion = SessionController.getInstance().Colonia.Where(w => w.colonia1 == colonia.colonia1).FirstOrDefault();

                // si no existe
                if (accion == null)
                {
                    // estructuramos los datos
                    Colonia datos = new Colonia()
                    {
                        idColonia = Guid.NewGuid(),
                        colonia1 = colonia.colonia1,
                        idCP = colonia.idCP,
                        activo = colonia.activo
                    };

                    // guardamos los datos
                    SessionController.getInstance().Colonia.Add(datos);

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
        [Route("api/MicroondasAPI/eliminarColonia")]
        public IHttpActionResult eliminarColonia(string id)
        {
            try
            {
                // convertimos el id en guid
                Guid guid = Guid.Parse(id.ToString());

                // buscamos la colonia a eliminar
                var accion = SessionController.getInstance().Colonia.Where(w => w.idColonia == guid).FirstOrDefault();

                // Deshabilitamos la colonia
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
        [Route("api/MicroondasAPI/consultaColonia")]
        public IHttpActionResult consultaColonia()
        {
            try
            {
                // consultamos la tabla colonia
                var accion = SessionController.getInstance().Colonia.ToList();

                // estructuramos los datos
                var resultado = accion.Select(s => new
                {
                    idColonia = s.idColonia,
                    colonia1 = s.colonia1,
                    idCP = s.CodigoPostal.codigo,
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
        [Route("api/MicroondasAPI/modificarColonia")]
        public IHttpActionResult modificarColonia(Colonia colonia)
        {
            try
            {
                // variable para devolver
                bool i = false;

                // buscamos si existe la colonia a ingresar
                var accion = SessionController.getInstance().Colonia.Where(w => w.colonia1 == colonia.colonia1).FirstOrDefault();

                // si no existe
                if (accion == null)
                {
                    // Hacemos los cambios
                    accion.colonia1 = colonia.colonia1;
                    accion.idCP = colonia.idCP;
                    accion.activo = colonia.activo;

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

        [HttpGet]
        [Route("api/MicroondasAPI/consultaUnicaCo")]
        public IHttpActionResult consultaUnicaCo(string id)
        {
            try
            {
                Guid i = Guid.Parse(id.ToString());

                var accion = SessionController.getInstance().Colonia.Where(w => w.idCP == i).ToList();

                var resultado = accion.Select(s => new {
                    idColonia = s.idColonia,
                    colonia1 = s.colonia1
                });

                return Ok(resultado);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
    }
}
