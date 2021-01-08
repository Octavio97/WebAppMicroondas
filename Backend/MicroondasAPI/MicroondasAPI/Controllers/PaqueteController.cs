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
                var accion = SessionController.getInstance().Paquete.Where(w => w.nombre == paquete.nombre).FirstOrDefault();

                // si no existe
                if (accion == null)
                {
                    // estructuramos los datos
                    Paquete datos = new Paquete()
                    {
                        idPaquete = Guid.NewGuid(),
                        nombre = paquete.nombre,
                        precio = paquete.precio,
                        activo = paquete.activo,
                        descripcion = paquete.descripcion,
                        imagen = paquete.imagen
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

        [HttpDelete]
        [Route("api/MicroondasAPI/eliminarPaquete")]
        public IHttpActionResult eliminarPaquete(string id)
        {
            try
            {
                // convertimos el id en guid
                Guid guid = Guid.Parse(id.ToString());

                // buscamos el rol a eliminar
                var accion = SessionController.getInstance().Paquete.Where(w => w.idPaquete == guid).FirstOrDefault();

                if (accion == null)
                {
                    return Ok(false);
                }

                SessionController.getInstance().Paquete.Remove(accion);

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
        [Route("api/MicroondasAPI/consultaPaquete")]
        public IHttpActionResult consultaPaquete()
        {
            try
            {
                // consultamos la tabla paquete
                var accion = SessionController.getInstance().Paquete.ToList();

                if (accion == null)
                {
                    return Ok(false);
                }

                // estructuramos los datos
                var resultado = accion.Select(s => new
                {
                    idPaquete = s.idPaquete,
                    nombre = s.nombre,
                    precio = s.precio,
                    activo = s.activo,
                    descripcion = s.descripcion,
                    imagen = s.imagen
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
        [Route("api/MicroondasAPI/modificarPaquete")]
        public IHttpActionResult modificarPaquete(Paquete paquete)
        {
            try
            {
                // variable para devolver
                bool i = false;

                // buscamos si existe el rol a ingresar
                var accion = SessionController.getInstance().Paquete.Where(w => w.nombre == paquete.nombre && w.idPaquete == paquete.idPaquete).FirstOrDefault();

                // si no existe
                if (accion != null)
                {
                    // Hacemos los cambios
                    accion.nombre = paquete.nombre;
                    accion.precio = paquete.precio;
                    accion.activo = paquete.activo;
                    accion.descripcion = paquete.descripcion;
                    accion.imagen = paquete.imagen;

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
        [Route("api/MicroondasAPI/consultaUnicaPaq")]
        public IHttpActionResult consultaUnicaPaq()
        {
            try
            {
                // buscamos los paquetes activos
                var accion = SessionController.getInstance().Paquete.Where(w => w.activo == true).ToList();

                if (accion == null)
                {
                    return Ok(false);
                }

                // estructuramos la informacion
                var resultado = accion.Select(s => new
                {
                    idPaquete = s.idPaquete,
                    nombre = s.nombre
                });

                // Devolvemos los datos
                return Ok(resultado);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpGet]
        [Route("api/MicroondasAPI/verPaquete")]
        public IHttpActionResult verPaquete(string id)
        {
            try
            {
                Guid i = Guid.Parse(id.ToString());

                var consulta = SessionController.getInstance().Paquete.Where(w => w.idPaquete == i).FirstOrDefault();

                if (consulta == null)
                {
                    return Ok(false);
                }

                var resultado = new {
                    idPaquete = consulta.idPaquete,
                    nombre = consulta.nombre,
                    precio = consulta.precio,
                    activo = consulta.activo,
                    descripcion = consulta.descripcion,
                    imagen = consulta.imagen
                };

                return Ok(resultado);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpGet]
        [Route("api/MicroondasAPI/buscarPaquete")]
        public IHttpActionResult buscarPaquete(string key)
        {
            try
            {
                var accion = SessionController.getInstance().Paquete.Where(w =>
                    w.nombre.Contains(key) ||
                    w.descripcion.Contains(key)
                ).ToList();

                if (accion.Count == 0)
                {
                    decimal num = Convert.ToDecimal(key);

                    accion = SessionController.getInstance().Paquete.Where(w =>
                        w.precio == num
                    ).ToList();

                    if (accion.Count == 0)
                    {
                        return Ok(false);
                    }
                }

                // estructuramos los datos
                var resultado = accion.Select(s => new
                {
                    idPaquete = s.idPaquete,
                    nombre = s.nombre,
                    precio = s.precio,
                    activo = s.activo,
                    descripcion = s.descripcion,
                    imagen = s.imagen
                });

                // Devolvemos los datos
                return Ok(resultado);
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }
    }
}
