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
                        idEquipo = propiedad.idEquipo,
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
            catch (Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpDelete]
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

        [HttpGet]
        [Route("api/MicroondasAPI/consultaPropiedad")]
        public IHttpActionResult consultaPropiedad()
        {
            try
            {
                // consultamos la tabla propiedad
                var accion = SessionController.getInstance().Propiedad.
                    Join(
                        SessionController.getInstance().Usuario,
                        propiedad => propiedad.idUsuario,
                        usuario => usuario.idUsuario,
                        (propiedad, usuario) => new
                        {
                            propiedad,
                            usuario
                        }
                    ).ToList();

                if (accion == null)
                {
                    return Ok(false);
                }

                var resultado = accion.GroupBy(g => new { g.usuario.idUsuario, g.usuario.nombre, g.usuario.apellido }).
                    Select(s => new
                    {
                        idUsuario = s.Key.idUsuario,
                        count = s.Count(),
                        Usuario = new
                        {
                            idUsuario = s.Key.idUsuario,
                            nombre = s.Key.nombre,
                            apellido = s.Key.apellido
                        }
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
        [Route("api/MicroondasAPI/modificarPropiedad")]
        public IHttpActionResult modificarPropiedad(string id)
        {
            try
            {
                // variable para devolver
                bool i = false;

                Guid guid = Guid.Parse(id.ToString());

                // buscamos si existe la propiedad a ingresar
                var accion = SessionController.getInstance().Propiedad.Where(w => w.idUsuario == guid).ToList();

                // si no existe
                if (accion != null)
                {
                    for (int io = 0; io < accion.Count; io++)
                    {
                        SessionController.getInstance().Propiedad.Remove(accion[io]);
                    }

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
        [Route("api/MicroondasApi/verPropiedad")]
        public IHttpActionResult verPropiedad(string id)
        {
            try
            {
                Guid i = Guid.Parse(id.ToString());

                var consulta = SessionController.getInstance().Propiedad.Where(w => w.idUsuario == i).ToList();

                if (consulta == null)
                {
                    return Ok(false);
                }

                var resultado = consulta.Select(s => new
                {
                    //idPropiedad = s.idPropiedad,
                    //idEquipo = s.idEquipo,
                    //idUsuario = s.idUsuario,
                    Equipo = new
                    {
                        idEquipo = s.Equipo.idEquipo,
                        equipo1 = s.Equipo.equipo1,
                        activo = s.Equipo.activo
                    },
                    Usuario = new
                    {
                        idUsuario = s.Usuario.idUsuario,
                        nombre = s.Usuario.nombre,
                        apellido = s.Usuario.apellido,
                        telefono = s.Usuario.telefono,
                        correoE = s.Usuario.correoE,
                        calle = s.Usuario.calle,
                        numInt = s.Usuario.numInt,
                        numExt = s.Usuario.numExt,
                        idColonia = s.Usuario.idColonia,
                        idCP = s.Usuario.idCP,
                        idRol = s.Usuario.idRol,
                        activo = s.Usuario.activo,
                        contrasena = s.Usuario.contrasena,
                        idEstado = s.Usuario.idEstado,
                        idCiudad = s.Usuario.idCiudad
                    }
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