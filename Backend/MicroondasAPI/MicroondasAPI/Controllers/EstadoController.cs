using MicroondasAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace MicroondasAPI.Controllers
{
    public class EstadoController : ApiController
    {
        [HttpPost]
        [Route("api/MicroondasAPI/agregarEstado")]
        public IHttpActionResult agregarEstado(Estado estado)
        {
            try
            {
                // variable para devolver
                bool i = false;

                // buscamos si existe el estado a ingresar
                var accion = SessionController.getInstance().Estado.Where(w => w.estado1 == estado.estado1).FirstOrDefault();

                // si no existe
                if (accion == null)
                {
                    // estructuramos los datos
                    Estado datos = new Estado()
                    {
                        idEstado = Guid.NewGuid(),
                        estado1 = estado.estado1,
                        activo = estado.activo
                    };

                    // guardamos los datos
                    SessionController.getInstance().Estado.Add(datos);

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
        [Route("api/MicroondasAPI/eliminarEstado")]
        public IHttpActionResult eliminarEstado(string id)
        {
            try
            {
                // convertimos el id en guid
                Guid guid = Guid.Parse(id.ToString());

                // buscamos al estado a eliminar
                var accion = SessionController.getInstance().Estado.Where(w => w.idEstado == guid).FirstOrDefault();

                // Deshabilitamos al estado
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
        [Route("api/MicroondasAPI/consultaEstado")]
        public IHttpActionResult consultaEstado()
        {
            try
            {
                // consultamos la tabla estado
                var accion = SessionController.getInstance().Estado.ToList();

                // estructuramos los datos
                var resultado = accion.Select(s => new
                {
                    idEstado = s.idEstado,
                    estado1 = s.estado1,
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
        [Route("api/MicroondasAPI/modificarEstado")]
        public IHttpActionResult modificarEstado(Estado estado)
        {
            try
            {
                // variable para devolver
                bool i = false;

                // buscamos si existe el estado a ingresar
                var accion = SessionController.getInstance().Estado.Where(w => w.estado1 == estado.estado1).FirstOrDefault();

                // si no existe
                if (accion == null)
                {
                    // Hacemos los cambios
                    accion.estado1 = estado.estado1;
                    accion.activo = estado.activo;

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
        [Route("api/MicroondasAPI/consultaEInicio")]
        public IHttpActionResult consultaEInicio()
        {
            try
            {
                var consulta = SessionController.getInstance().Estado.Where(w => w.activo == true).ToList();

                var resultado = consulta.Select(s => new
                {
                    idEstado = s.idEstado,
                    estado1 = s.estado1,
                    activo = s.activo
                });

                return Ok(resultado);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpGet]
        [Route("api/MicroondasAPI/verEstado")]
        public IHttpActionResult verEstado(string id)
        {
            try
            {
                Guid i = Guid.Parse(id.ToString());

                var consulta = SessionController.getInstance().Estado.Where(w => w.idEstado == i).FirstOrDefault();

                var resultado = new
                {
                    idEstado = consulta.idEstado,
                    estado1 = consulta.estado1,
                    activo = consulta.activo,
                    Ciudad = consulta.Ciudad,
                    Usuario = consulta.Usuario
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
