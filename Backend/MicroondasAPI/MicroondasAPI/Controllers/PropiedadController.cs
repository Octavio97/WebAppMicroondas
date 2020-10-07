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
        public IHttpActionResult agregarPropiedad(Propiedad propiedad, Equipo[] equipos)
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
            catch (Exception)
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
                var accion = SessionController.getInstance().Propiedad.ToList();

                if (accion == null)
                {
                    return Ok(false);
                }

                // estructuramos los datos
                var resultado = accion.Select(s => new
                {
                    idPropiedad = s.idPropiedad,
                    idEquipo = s.idEquipo,
                    idUsuario = s.idUsuario,
                    Equipo = new {
                        idEquipo = s.Equipo.idEquipo,
                        equipo1 = s.Equipo.equipo1,
                        activo = s.Equipo.activo
                    },
                    Usuario = new {
                        idUsuario = s.Usuario.idUsuario,
                        nombre = s.Usuario.nombre,
                        apellido = s.Usuario.apellido,
                        telefono = s.Usuario.telefono,
                        correoE = s.Usuario.correoE,
                        calle = s.Usuario.calle,
                        numInt = s.Usuario.numInt,
                        numExt = s.Usuario.numExt,
                        idEstado = s.Usuario.idEstado,
                        idCiudad = s.Usuario.idCiudad,
                        idCP = s.Usuario.idCP,
                        idColonia = s.Usuario.idColonia,
                        idRol = s.Usuario.idRol,
                        activo = s.Usuario.activo,
                        contrasena = s.Usuario.contrasena,
                        CP = new
                        {
                            idCP = s.Usuario.CodigoPostal.idCP,
                            codigo = s.Usuario.CodigoPostal.codigo
                        },
                        Colonia = new
                        {
                            idColonia = s.Usuario.Colonia.idColonia,
                            colonia1 = s.Usuario.Colonia.colonia1,
                        },
                        //Contrato = new {
                        //    idContrato = consulta.Contrato
                        //},
                        Ciudad = new
                        {
                            idCiudad = s.Usuario.Ciudad.idCiudad,
                            ciudad1 = s.Usuario.Ciudad.ciudad1
                        },
                        Estado = new
                        {
                            idEstado = s.Usuario.idEstado,
                            estado1 = s.Usuario.Estado.estado1
                        },
                        //Propiedad = new {

                        //},
                        Rol = new
                        {
                            idRol = s.Usuario.Rol.idRol,
                            rol1 = s.Usuario.Rol.rol1
                        }
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
        public IHttpActionResult modificarPropiedad(Propiedad propiedad)
        {
            try
            {
                // variable para devolver
                bool i = false;

                // buscamos si existe la propiedad a ingresar
                var accion = SessionController.getInstance().Propiedad.Where(w => w.idPropiedad == propiedad.idPropiedad).FirstOrDefault();

                // si no existe
                if (accion != null)
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

        [HttpGet]
        [Route("api/MicroondasApi/verPropiedad")]
        public IHttpActionResult verPropiedad(string id)
        {
            try
            {
                Guid i = Guid.Parse(id.ToString());

                var consulta = SessionController.getInstance().Propiedad.Where(w => w.idPropiedad == i).FirstOrDefault();

                if (consulta == null)
                {
                    return Ok(false);
                }

                var resultado = new {
                    idPropiedad = consulta.idPropiedad,
                    idEquipo = consulta.idEquipo,
                    idUsuario = consulta.idUsuario,
                    Equipo = new
                    {
                        idEquipo = consulta.Equipo.idEquipo,
                        equipo1 = consulta.Equipo.equipo1,
                        activo = consulta.Equipo.activo
                    },
                    Usuario = new
                    {
                        idUsuario = consulta.Usuario.idUsuario,
                        nombre = consulta.Usuario.nombre,
                        apellido = consulta.Usuario.apellido,
                        telefono = consulta.Usuario.telefono,
                        correoE = consulta.Usuario.correoE,
                        calle = consulta.Usuario.calle,
                        numInt = consulta.Usuario.numInt,
                        numExt = consulta.Usuario.numExt,
                        idEstado = consulta.Usuario.idEstado,
                        idCiudad = consulta.Usuario.idCiudad,
                        idCP = consulta.Usuario.idCP,
                        idColonia = consulta.Usuario.idColonia,
                        idRol = consulta.Usuario.idRol,
                        activo = consulta.Usuario.activo,
                        contrasena = consulta.Usuario.contrasena,
                        CP = new
                        {
                            idCP = consulta.Usuario.CodigoPostal.idCP,
                            codigo = consulta.Usuario.CodigoPostal.codigo
                        },
                        Colonia = new
                        {
                            idColonia = consulta.Usuario.Colonia.idColonia,
                            colonia1 = consulta.Usuario.Colonia.colonia1,
                        },
                        //Contrato = new {
                        //    idContrato = consulta.Contrato
                        //},
                        Ciudad = new
                        {
                            idCiudad = consulta.Usuario.Ciudad.idCiudad,
                            ciudad1 = consulta.Usuario.Ciudad.ciudad1
                        },
                        Estado = new
                        {
                            idEstado = consulta.Usuario.idEstado,
                            estado1 = consulta.Usuario.Estado.estado1
                        },
                        //Propiedad = new {

                        //},
                        Rol = new
                        {
                            idRol = consulta.Usuario.Rol.idRol,
                            rol1 = consulta.Usuario.Rol.rol1
                        }
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
