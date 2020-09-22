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
                var accion = SessionController.getInstance().Ciudad.Where(w => w.ciudad1 == ciudad.ciudad1).FirstOrDefault();

                // si no existe registro
                if (accion == null)
                {
                    Ciudad datos = new Ciudad()
                    {
                        idCiudad = Guid.NewGuid(),
                        ciudad1 = ciudad.ciudad1,
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

        [HttpGet]
        [Route("api/MicroondasAPI/consultaCiudad")]
        public IHttpActionResult consultaCiudad()
        {
            // Consultamos la tabla Ciudad
            var accion = SessionController.getInstance().Ciudad.ToList();

            if (accion == null)
            {
                return Ok(false);
            }

            // Estructuramos los datos
            var resultado = accion.Select(s => new
            {
                idCiudad = s.idCiudad,
                ciudad1 = s.ciudad1,
                idEstado = s.idEstado,
                activo = s.activo,
                Estado = new {
                    idEstado = s.Estado.idEstado,
                    estado1 = s.Estado.estado1,
                    activo = s.Estado.activo
                }
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
                var accion = SessionController.getInstance().Ciudad.Where(w => w.idCiudad == ciudad.idCiudad && w.ciudad1 == ciudad.ciudad1).FirstOrDefault();

                // si no existe registro
                if (accion != null)
                {
                    // Hacemos los cambios
                    accion.ciudad1 = ciudad.ciudad1;
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

        [HttpGet]
        [Route("api/MicroondasAPI/consultaUnicaCi")]
        public IHttpActionResult consultaUnicaCi(string id)
        {
            try
            {
                Guid i = Guid.Parse(id.ToString());

                var accion = SessionController.getInstance().Ciudad.Where(w => w.idEstado == i).ToList();

                if (accion == null)
                {
                    return Ok(false);
                }

                var resultado = accion.Select(s => new
                {
                    idCiudad = s.idCiudad,
                    ciudad1 = s.ciudad1,
                    idEstado = s.idEstado,
                    activo = s.activo,
                    Estado = new
                    {
                        idEstado = s.Estado.idEstado,
                        estado1 = s.Estado.estado1,
                        activo = s.Estado.activo
                    }
                });

                return Ok(resultado);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpGet]
        [Route("api/MicroondasAPI/consultaCinicio")]
        public IHttpActionResult consultaCinicio(string id)
        {
            try
            {
                Guid i = Guid.Parse(id.ToString());

                var consulta = SessionController.getInstance().Ciudad.Where(w => w.activo == true && w.idEstado == i).ToList();

                if (consulta == null)
                {
                    return Ok(false);
                }

                var resultado = consulta.Select(s => new {
                    idCiudad = s.idCiudad,
                    ciudad1 = s.ciudad1,
                    idEstado = s.idEstado,
                    activo = s.activo,
                    Estado = new
                    {
                        idEstado = s.Estado.idEstado,
                        estado1 = s.Estado.estado1,
                        activo = s.Estado.activo
                    }
                });

                return Ok(resultado);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpGet]
        [Route("api/MicroondasAPI/verCiudad")]
        public IHttpActionResult verCiudad(string id)
        {
            try
            {
                Guid i = Guid.Parse(id.ToString());

                var consulta = SessionController.getInstance().Ciudad.Where(w => w.idCiudad == i).FirstOrDefault();

                if (consulta == null)
                {
                    return Ok(false);
                }

                var resultado = new {
                    idCiudad = consulta.idCiudad,
                    ciudad1 = consulta.ciudad1,
                    idEstado = consulta.idEstado,
                    activo = consulta.activo,
                    Estado = new
                    {
                        idEstado = consulta.Estado.idEstado,
                        estado1 = consulta.Estado.estado1,
                        activo = consulta.Estado.activo
                    }
                };

                return Ok(resultado);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
    }
}
