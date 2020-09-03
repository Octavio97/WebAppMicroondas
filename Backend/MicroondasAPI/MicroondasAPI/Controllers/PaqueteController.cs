using MicroondasAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace MicroondasAPI.Controllers
{
    public class PaqueteController : ApiController
    {
        [HttpPost]
        [Route("api/MicroondasAPI/agregarPaquete")]
        public IHttpActionResult agregarPaquete(Paquete paquete)
        {
            try
            {
                // variable a devolver
                bool i = false;

                // buscamos si existe el paquete a ingresar
                var accion = SessionController.getInstance().Paquete.Where(w => w.NOMBRE == paquete.NOMBRE).FirstOrDefault();

                // si no existe
                if (accion == null)
                {
                    // estructuramos los datos
                    Paquete datos = new Paquete()
                    {
                        idPaquete = Guid.NewGuid(),
                        NOMBRE = paquete.NOMBRE,
                        precio = paquete.precio,
                        activo = paquete.activo
                    };

                    // guardamos los datos
                    SessionController.getInstance().Paquete.Add(datos);

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
        [Route("api/MicroondasAPI/eliminarPaquete")]
        public IHttpActionResult eliminarPaquete(string id)
        {
            try
            {
                // convertimos el id en guid
                Guid guid = Guid.Parse(id.ToString());

                // buscamos el rol a eliminar
                var accion = SessionController.getInstance().Paquete.Where(w => w.idPaquete == guid).FirstOrDefault();

                // Deshabilitamos el rol
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

        [HttpPost]
        [Route("api/MicroondasAPI/consultaPaquete")]
        public IHttpActionResult consultaPaquete()
        {
            try
            {
                // consultamos la tabla paquete
                var accion = SessionController.getInstance().Paquete.ToList();

                // estructuramos los datos
                var resultado = accion.Select(s => new
                {
                    idPaquete = s.idPaquete,
                    nombre = s.NOMBRE,
                    precio = s.precio,
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

        [HttpPost]
        [Route("api/MicroondasAPI/modificarPaquete")]
        public IHttpActionResult modificarPaquete(Paquete paquete)
        {
            try
            {
                // variable para devolver
                bool i = false;

                // buscamos si existe el rol a ingresar
                var accion = SessionController.getInstance().Paquete.Where(w => w.NOMBRE == paquete.NOMBRE).FirstOrDefault();

                // si no existe
                if (accion == null)
                {
                    // Hacemos los cambios
                    accion.NOMBRE = paquete.NOMBRE;
                    accion.precio = paquete.precio;
                    accion.activo = paquete.activo;

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
