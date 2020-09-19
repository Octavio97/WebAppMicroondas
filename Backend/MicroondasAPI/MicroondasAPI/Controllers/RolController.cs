using MicroondasAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace MicroondasAPI.Controllers
{
    public class RolController : ApiController
    {
        [HttpPost]
        [Route("api/MicroondasAPI/agregarRol")]
        public IHttpActionResult agregarRol(Rol rol)
        {
            try
            {
                // variable a devolver
                bool i = false;

                // buscamos si existe el rol a ingresar
                var accion = SessionController.getInstance().Rol.Where(w => w.rol1 == rol.rol1).FirstOrDefault();

                // si no existe
                if (accion == null)
                {
                    // estructuramos los datos
                    Rol datos = new Rol()
                    {
                        idRol = Guid.NewGuid(),
                        rol1 = rol.rol1,
                        activo = rol.activo
                    };

                    // guardamos los datos
                    SessionController.getInstance().Rol.Add(datos);

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
        [Route("api/MicroondasAPI/eliminarRol")]
        public IHttpActionResult eliminarRol(string id)
        {
            try
            {
                // convertimos el id en guid
                Guid guid = Guid.Parse(id.ToString());

                // buscamos el rol a eliminar
                var accion = SessionController.getInstance().Rol.Where(w => w.idRol == guid).FirstOrDefault();

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

        [HttpGet]
        [Route("api/MicroondasAPI/consultaRol")]
        public IHttpActionResult consultaRol()
        {
            try
            {
                // consultamos la tabla rol
                var accion = SessionController.getInstance().Rol.ToList();

                // estructuramos los datos
                var resultado = accion.Select(s => new
                {
                    idRol = s.idRol,
                    rol1 = s.rol1,
                    activo = s.activo
                });

                // Devolvemos los datos
                return Ok(resultado);
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpPut]
        [Route("api/MicroondasAPI/modificarRol")]
        public IHttpActionResult modificarRol(Rol rol)
        {
            try
            {
                // variable para devolver
                bool i = false;

                // buscamos si existe el rol a ingresar
                var accion = SessionController.getInstance().Rol.Where(w => w.rol1 == rol.rol1 && w.idRol == rol.idRol).FirstOrDefault();

                // si no existe
                if (accion != null)
                {
                    // Hacemos los cambios
                    accion.rol1 = rol.rol1;
                    accion.activo = rol.activo;

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
        [Route("api/MicroondasAPI/verRol")]
        public IHttpActionResult verRol(string id)
        {
            try
            {
                Guid i = Guid.Parse(id.ToString());

                var consulta = SessionController.getInstance().Rol.Where(w => w.idRol == i).FirstOrDefault();

                var resultado = new {
                    idRol = consulta.idRol,
                    rol1 = consulta.rol1,
                    activo = consulta.activo,
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
