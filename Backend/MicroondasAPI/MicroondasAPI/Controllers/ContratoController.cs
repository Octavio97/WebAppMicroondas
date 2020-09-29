using MicroondasAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace MicroondasAPI.Controllers
{
    public class ContratoController : ApiController
    {
        [HttpPost]
        [Route("api/MicroondasAPI/agregarContrato")]
        public IHttpActionResult agregarContrato(Contrato contrato)
        {
            try
            {
                // buscamos si existe el contrato a ingresar
                var accion = SessionController.getInstance().Contrato.Where(w => w.idUsuario == contrato.idUsuario).FirstOrDefault();

                // si no existe
                if (accion != null)
                {
                    return Ok(false);
                }

                // estructuramos los datos
                Contrato datos = new Contrato()
                {
                    idContrato = Guid.NewGuid(),
                    pdf = contrato.pdf,
                    archivo = contrato.archivo,
                    fechaInicio = contrato.fechaInicio,
                    fechaFinal = contrato.fechaFinal,
                    idPaquete = contrato.idPaquete,
                    idUsuario = contrato.idUsuario,
                    activo = contrato.activo
                };

                // guardamos los datos
                SessionController.getInstance().Contrato.Add(datos);

                // ejecutamos la accion
                SessionController.getInstance().SaveChanges();

                //devolvemos el valor
                return Ok(true);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpPut]
        [Route("api/MicroondasAPI/eliminarContrato")]
        public IHttpActionResult eliminarContrato(string id)
        {
            try
            {
                // convertimos el id en guid
                Guid guid = Guid.Parse(id.ToString());

                // buscamos el contrato a eliminar
                var accion = SessionController.getInstance().Contrato.Where(w => w.idContrato == guid).FirstOrDefault();

                // Deshabilitamos el contrato
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
        [Route("api/MicroondasAPI/consultaContrato")]
        public IHttpActionResult consultaContrato()
        {
            try
            {
                // consultamos la tabla contrato
                var accion = SessionController.getInstance().Contrato.ToList();

                if (accion == null)
                {
                    return Ok(false);
                }
                // estructuramos los datos
                var resultado = accion.Select(s => new
                {
                    idContrato = s.idContrato,
                    pdf = s.pdf,
                    archivo = s.archivo,
                    fechaInicio = Convert.ToDateTime(s.fechaInicio).ToString("dd/MM/yyyy"),
                    fechaFinal = Convert.ToDateTime(s.fechaFinal).ToString("dd/MM/yyyy"),
                    idPaquete = s.idPaquete,
                    idUsuario = s.idUsuario,
                    activo = s.activo,
                    Paquete = new
                    {
                        idPaquete = s.Paquete.idPaquete,
                        nombre = s.Paquete.nombre,
                        precio = s.Paquete.precio,
                        activo = s.Paquete.activo,
                        descripcion = s.Paquete.descripcion
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
        [Route("api/MicroondasAPI/modificarContrato")]
        public IHttpActionResult modificarContrato(Contrato contrato)
        {
            try
            {
                // variable para devolver
                bool i = false;

                // buscamos si existe el contrato a ingresar
                var accion = SessionController.getInstance().Contrato.Where(w => w.idUsuario == contrato.idUsuario && w.idPaquete == contrato.idPaquete && w.fechaInicio == contrato.fechaInicio).FirstOrDefault();

                // si no existe
                if (accion != null)
                {
                    // Hacemos los cambios
                    accion.idContrato = contrato.idContrato;
                    accion.pdf = contrato.pdf;
                    accion.archivo = contrato.archivo;
                    accion.fechaInicio = contrato.fechaInicio;
                    accion.fechaFinal = contrato.fechaFinal;
                    accion.idPaquete = contrato.idPaquete;
                    accion.idUsuario = contrato.idUsuario;
                    accion.activo = contrato.activo;

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
        [Route("api/MicroondasAPI/verContrato")]
        public IHttpActionResult verContrato(string id)
        {
            try
            {
                Guid i = Guid.Parse(id.ToString());

                var consulta = SessionController.getInstance().Contrato.Where(w => w.idContrato == i).FirstOrDefault();

                if (consulta == null)
                {
                    return Ok(false);
                }

                var resultado = new
                {
                    idContrato = consulta.idContrato,
                    pdf = consulta.pdf,
                    archivo = consulta.archivo,
                    fechaInicio = Convert.ToDateTime(consulta.fechaInicio).ToString("yyyy-MM-dd"),
                    fechaFinal = Convert.ToDateTime(consulta.fechaFinal).ToString("yyyy-MM-dd"),
                    idPaquete = consulta.idPaquete,
                    idUsuario = consulta.idUsuario,
                    activo = consulta.activo,
                    Paquete = new
                    {
                        idPaquete = consulta.Paquete.idPaquete,
                        nombre = consulta.Paquete.nombre,
                        precio = consulta.Paquete.precio,
                        activo = consulta.Paquete.activo,
                        descripcion = consulta.Paquete.descripcion
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

        [HttpGet]
        [Route("api/MicroondasAPI/consultaUnicaCli")]
        public IHttpActionResult consultaUnicaCli(string id)
        {
            try
            {
                Guid i = Guid.Parse(id.ToString());

                var consulta = SessionController.getInstance().Contrato.Where(w => w.idUsuario == i).FirstOrDefault();

                if(consulta == null)
                {
                    return Ok(false);
                }

                var resultado = new
                {
                    idContrato = consulta.idContrato,
                    pdf = consulta.pdf,
                    archivo = consulta.archivo,
                    fechaInicio = Convert.ToDateTime(consulta.fechaInicio).ToString("yyyy-MM-dd"),
                    fechaFinal = Convert.ToDateTime(consulta.fechaFinal).ToString("yyyy-MM-dd"),
                    idPaquete = consulta.idPaquete,
                    idUsuario = consulta.idUsuario,
                    activo = consulta.activo,
                    Paquete = new
                    {
                        idPaquete = consulta.Paquete.idPaquete,
                        nombre = consulta.Paquete.nombre,
                        precio = consulta.Paquete.precio,
                        activo = consulta.Paquete.activo,
                        descripcion = consulta.Paquete.descripcion
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

        [HttpPost]
        [Route("api/MicroondasAPI/altaContratoCli")]
        public IHttpActionResult altaContratoCli(Contrato contrato)
        {
            try
            {
                var accion = SessionController.getInstance().Contrato.Where(w => w.fechaInicio == DateTime.Today && w.idUsuario == contrato.idUsuario).FirstOrDefault();

                if (accion == null)
                {
                    return Ok(false);
                }

                var accion2 = SessionController.getInstance().Estatus.Where(w => w.estatus1 == "problema").FirstOrDefault();

                // estructuramos los datos
                Contrato datos = new Contrato()
                {
                    idContrato = Guid.NewGuid(),
                    pdf = contrato.pdf,
                    archivo = contrato.archivo,
                    fechaInicio = DateTime.Today,
                    fechaFinal = contrato.fechaFinal,
                    idPaquete = contrato.idPaquete,
                    idUsuario = contrato.idUsuario,
                    activo = contrato.activo
                };

                SessionController.getInstance().Contrato.Add(datos);

                SessionController.getInstance().SaveChanges();

                return Ok(true);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
    }
}
