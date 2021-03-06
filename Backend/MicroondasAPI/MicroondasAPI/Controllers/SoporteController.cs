﻿using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using MicroondasAPI.Models;

namespace MicroondasAPI.Controllers
{
    public class SoporteController : ApiController
    {
        [HttpPost]
        [Route("api/MicroondasAPI/agregarSoporte")]
        public IHttpActionResult agregarSoporte(Soporte soporte)
        {
            try
            {
                var accion = SessionController.getInstance().Soporte.Where(w => w.Contrato.idUsuario == soporte.Contrato.idUsuario && w.fechaInicio == soporte.fechaInicio).FirstOrDefault();

                if (accion != null)
                {
                    return Ok(false);
                }

                var datos = new Soporte()
                {
                    idSoporte = Guid.NewGuid(),
                    problema = soporte.problema,
                    idTecnico = soporte.idTecnico,
                    idContrato = soporte.idContrato,
                    fechaInicio = soporte.fechaInicio,
                    fechaFinal = soporte.fechaFinal,
                    activo = soporte.activo,
                    idEstatus = soporte.idEstatus
                };

                SessionController.getInstance().Soporte.Add(datos);

                SessionController.getInstance().SaveChanges();

                return Ok(true);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpDelete]
        [Route("api/MicroondasAPI/eliminarSoporte")]
        public IHttpActionResult eliminarSoporte(string id)
        {
            try
            {
                Guid i = Guid.Parse(id.ToString());

                var accion = SessionController.getInstance().Soporte.Where(w => w.idSoporte == i).FirstOrDefault();

                if (accion == null)
                {
                    return Ok(false);
                }

                SessionController.getInstance().Soporte.Remove(accion);

                SessionController.getInstance().SaveChanges();

                return Ok(true
);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpGet]
        [Route("api/MicroondasAPI/consultaSoporte")]
        public IHttpActionResult consultaSoporte()
        {
            try
            {
                var accion = SessionController.getInstance().Soporte.ToList();

                if (accion == null)
                {
                    return Ok(false);
                }

                var resultado = accion.Select(s => new {
                    idSoporte = s.idSoporte,
                    problema = s.problema,
                    idTecnico = s.idTecnico,
                    idContrato = s.idContrato,
                    idEstatus = s.idEstatus,
                    fechaInicio = Convert.ToDateTime(s.fechaInicio).ToString("dd/MM/yyyy"),
                    fechaFinal = Convert.ToDateTime(s.fechaFinal).ToString("dd/MM/yyyy"),
                    activo = s.activo,
                    Estatus = new
                    {
                        idEstatus = s.Estatus.idEstatus,
                        estatus1 = s.Estatus.estatus1,
                        activo = s.Estatus.activo,
                    },
                    Contrato = new
                    {
                        idContrato = s.Contrato.idContrato,
                        pdf = s.Contrato.pdf,
                        archivo = s.Contrato.archivo,
                        fechaInicio = s.Contrato.fechaInicio,
                        fechaFinal = s.Contrato.fechaFinal,
                        idPaquete = s.Contrato.idPaquete,
                        idUsuario = s.Contrato.idUsuario,
                        activo = s.Contrato.activo,
                        Paquete = new
                        {
                            idPaquete = s.Contrato.Paquete.idPaquete,
                            nombre = s.Contrato.Paquete.nombre,
                            precio = s.Contrato.Paquete.precio,
                            activo = s.Contrato.Paquete.activo,
                            descripcion = s.Contrato.Paquete.descripcion
                        },
                        Usuario = new
                        {
                            idUsuario = s.Contrato.Usuario.idUsuario,
                            nombre = s.Contrato.Usuario.nombre,
                            apellido = s.Contrato.Usuario.apellido,
                            telefono = s.Contrato.Usuario.telefono,
                            correoE = s.Contrato.Usuario.correoE,
                            calle = s.Contrato.Usuario.calle,
                            numInt = s.Contrato.Usuario.numInt,
                            numExt = s.Contrato.Usuario.numExt,
                            idEstado = s.Contrato.Usuario.idEstado,
                            idCiudad = s.Contrato.Usuario.idCiudad,
                            idCP = s.Contrato.Usuario.idCP,
                            idColonia = s.Contrato.Usuario.idColonia,
                            idRol = s.Contrato.Usuario.idRol,
                            activo = s.Contrato.Usuario.activo,
                            contrasena = s.Contrato.Usuario.contrasena,
                            CP = new
                            {
                                idCP = s.Contrato.Usuario.CodigoPostal.idCP,
                                codigo = s.Contrato.Usuario.CodigoPostal.codigo
                            },
                            Colonia = new
                            {
                                idColonia = s.Contrato.Usuario.Colonia.idColonia,
                                colonia1 = s.Contrato.Usuario.Colonia.colonia1,
                            },
                            Ciudad = new
                            {
                                idCiudad = s.Contrato.Usuario.Ciudad.idCiudad,
                                ciudad1 = s.Contrato.Usuario.Ciudad.ciudad1
                            },
                            Estado = new
                            {
                                idEstado = s.Contrato.Usuario.idEstado,
                                estado1 = s.Contrato.Usuario.Estado.estado1
                            },
                            Rol = new
                            {
                                idRol = s.Contrato.Usuario.Rol.idRol,
                                rol1 = s.Contrato.Usuario.Rol.rol1
                            }
                        }
                    },
                    Tecnico = new
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

                return Ok(resultado);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpPut]
        [Route("api/MicroondasAPI/modificarSoporte")]
        public IHttpActionResult modificarSoporte(Soporte soporte)
        {
            try
            {
                Guid i = Guid.Parse(soporte.idSoporte.ToString());

                var accion = SessionController.getInstance().Soporte.Where(w => w.idSoporte == i).FirstOrDefault();

                if (accion == null)
                {
                    return Ok(false);
                }

                accion.problema = soporte.problema;
                accion.idTecnico = soporte.idTecnico;
                accion.idContrato = soporte.idContrato;
                accion.fechaInicio = soporte.fechaInicio;
                accion.fechaFinal = soporte.fechaFinal;
                accion.idEstatus = soporte.idEstatus;
                accion.activo = soporte.activo;

                SessionController.getInstance().SaveChanges();

                return Ok(true);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
        
        // Ver reportes de un cliente en especifico
        [HttpGet]
        [Route("api/MicroondasAPI/consultaUnicaSopU")]
        public IHttpActionResult consultaUnicaSopU(string id)
        {
            try
            {
                Guid i = Guid.Parse(id.ToString());

                var accion = SessionController.getInstance().Soporte.Where(w => w.idContrato == i).ToList();

                if (accion == null)
                {
                    return Ok(false);
                }

                var resultado = accion.Select(s => new {
                    idSoporte = s.idSoporte,
                    problema = s.problema,
                    idTecnico = s.idTecnico,
                    idContrato = s.idContrato,
                    idEstatus = s.idEstatus,
                    fechaInicio = Convert.ToDateTime(s.fechaInicio).ToString("dd/MM/yyyy"),
                    fechaFinal = Convert.ToDateTime(s.fechaFinal).ToString("dd/MM/yyyy"),
                    activo = s.activo,
                    Estatus = new
                    {
                        idEstatus = s.Estatus.idEstatus,
                        estatus1 = s.Estatus.estatus1,
                        activo = s.Estatus.activo,
                    },
                    Contrato = new
                    {
                        idContrato = s.Contrato.idContrato,
                        pdf = s.Contrato.pdf,
                        archivo = s.Contrato.archivo,
                        fechaInicio = s.Contrato.fechaInicio,
                        fechaFinal = s.Contrato.fechaFinal,
                        idPaquete = s.Contrato.idPaquete,
                        idUsuario = s.Contrato.idUsuario,
                        activo = s.Contrato.activo,
                        Paquete = new
                        {
                            idPaquete = s.Contrato.Paquete.idPaquete,
                            nombre = s.Contrato.Paquete.nombre,
                            precio = s.Contrato.Paquete.precio,
                            activo = s.Contrato.Paquete.activo,
                            descripcion = s.Contrato.Paquete.descripcion
                        },
                        Usuario = new
                        {
                            idUsuario = s.Contrato.Usuario.idUsuario,
                            nombre = s.Contrato.Usuario.nombre,
                            apellido = s.Contrato.Usuario.apellido,
                            telefono = s.Contrato.Usuario.telefono,
                            correoE = s.Contrato.Usuario.correoE,
                            calle = s.Contrato.Usuario.calle,
                            numInt = s.Contrato.Usuario.numInt,
                            numExt = s.Contrato.Usuario.numExt,
                            idEstado = s.Contrato.Usuario.idEstado,
                            idCiudad = s.Contrato.Usuario.idCiudad,
                            idCP = s.Contrato.Usuario.idCP,
                            idColonia = s.Contrato.Usuario.idColonia,
                            idRol = s.Contrato.Usuario.idRol,
                            activo = s.Contrato.Usuario.activo,
                            contrasena = s.Contrato.Usuario.contrasena,
                            CP = new
                            {
                                idCP = s.Contrato.Usuario.CodigoPostal.idCP,
                                codigo = s.Contrato.Usuario.CodigoPostal.codigo
                            },
                            Colonia = new
                            {
                                idColonia = s.Contrato.Usuario.Colonia.idColonia,
                                colonia1 = s.Contrato.Usuario.Colonia.colonia1,
                            },
                            Ciudad = new
                            {
                                idCiudad = s.Contrato.Usuario.Ciudad.idCiudad,
                                ciudad1 = s.Contrato.Usuario.Ciudad.ciudad1
                            },
                            Estado = new
                            {
                                idEstado = s.Contrato.Usuario.idEstado,
                                estado1 = s.Contrato.Usuario.Estado.estado1
                            },
                            Rol = new
                            {
                                idRol = s.Contrato.Usuario.Rol.idRol,
                                rol1 = s.Contrato.Usuario.Rol.rol1
                            }
                        }
                    },
                    Tecnico = new
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
                return Ok(resultado);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        // Ver reportes no atendidos
        [HttpGet]
        [Route("api/MicroondasAPI/consultaSopT")]
        public IHttpActionResult consultaSopT()
        {
            try
            {
                var accion = SessionController.getInstance().Soporte.Where(w => (w.Estatus.estatus1 == "problema" || w.Estatus.estatus1 == "en progreso") && w.activo == true).ToList();

                if (accion == null)
                {
                    return Ok(false);
                }

                var resultado = accion.Select(s => new {
                    idSoporte = s.idSoporte,
                    problema = s.problema,
                    idTecnico = s.idTecnico,
                    idContrato = s.idContrato,
                    idEstatus = s.idEstatus,
                    fechaInicio = Convert.ToDateTime(s.fechaInicio).ToString("dd/MM/yyyy"),
                    fechaFinal = Convert.ToDateTime(s.fechaFinal).ToString("dd/MM/yyyy"),
                    activo = s.activo,
                    Estatus = new
                    {
                        idEstatus = s.Estatus.idEstatus,
                        estatus1 = s.Estatus.estatus1,
                        activo = s.Estatus.activo,
                    },
                    Contrato = new
                    {
                        idContrato = s.Contrato.idContrato,
                        pdf = s.Contrato.pdf,
                        archivo = s.Contrato.archivo,
                        fechaInicio = s.Contrato.fechaInicio,
                        fechaFinal = s.Contrato.fechaFinal,
                        idPaquete = s.Contrato.idPaquete,
                        idUsuario = s.Contrato.idUsuario,
                        activo = s.Contrato.activo,
                        Paquete = new
                        {
                            idPaquete = s.Contrato.Paquete.idPaquete,
                            nombre = s.Contrato.Paquete.nombre,
                            precio = s.Contrato.Paquete.precio,
                            activo = s.Contrato.Paquete.activo,
                            descripcion = s.Contrato.Paquete.descripcion
                        },
                        Usuario = new
                        {
                            idUsuario = s.Contrato.Usuario.idUsuario,
                            nombre = s.Contrato.Usuario.nombre,
                            apellido = s.Contrato.Usuario.apellido,
                            telefono = s.Contrato.Usuario.telefono,
                            correoE = s.Contrato.Usuario.correoE,
                            calle = s.Contrato.Usuario.calle,
                            numInt = s.Contrato.Usuario.numInt,
                            numExt = s.Contrato.Usuario.numExt,
                            idEstado = s.Contrato.Usuario.idEstado,
                            idCiudad = s.Contrato.Usuario.idCiudad,
                            idCP = s.Contrato.Usuario.idCP,
                            idColonia = s.Contrato.Usuario.idColonia,
                            idRol = s.Contrato.Usuario.idRol,
                            activo = s.Contrato.Usuario.activo,
                            contrasena = s.Contrato.Usuario.contrasena,
                            CP = new
                            {
                                idCP = s.Contrato.Usuario.CodigoPostal.idCP,
                                codigo = s.Contrato.Usuario.CodigoPostal.codigo
                            },
                            Colonia = new
                            {
                                idColonia = s.Contrato.Usuario.Colonia.idColonia,
                                colonia1 = s.Contrato.Usuario.Colonia.colonia1,
                            },
                            Ciudad = new
                            {
                                idCiudad = s.Contrato.Usuario.Ciudad.idCiudad,
                                ciudad1 = s.Contrato.Usuario.Ciudad.ciudad1
                            },
                            Estado = new
                            {
                                idEstado = s.Contrato.Usuario.idEstado,
                                estado1 = s.Contrato.Usuario.Estado.estado1
                            },
                            Rol = new
                            {
                                idRol = s.Contrato.Usuario.Rol.idRol,
                                rol1 = s.Contrato.Usuario.Rol.rol1
                            }
                        }
                    },
                    Tecnico = new
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

                return Ok(resultado);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        // Agregar un reporte por parte del cliente
        [HttpPost]
        [Route("api/MicroondasAPI/agregarSoporteCli")]
        public IHttpActionResult agregarSoporteCli(Soporte soporte)
        {
            try
            {
                var accion = SessionController.getInstance().Soporte.Where(w => w.idContrato == soporte.idContrato && w.Estatus.estatus1 == "problema").FirstOrDefault();

                if (accion != null)
                {
                    return Ok(false);
                }

                var i = SessionController.getInstance().Estatus.Where(w => w.estatus1 == "problema").FirstOrDefault();
                var y = SessionController.getInstance().Usuario.Where(w => w.Rol.rol1 == "administrador").ToList();

                var datos = new Soporte()
                {
                    idSoporte = Guid.NewGuid(),
                    problema = soporte.problema,
                    idTecnico = y[0].idUsuario,
                    idContrato = soporte.idContrato,
                    fechaInicio = DateTime.Today,
                    fechaFinal = new DateTime(),
                    activo = true,
                    idEstatus = i.idEstatus
                };

                SessionController.getInstance().Soporte.Add(datos);

                SessionController.getInstance().SaveChanges();

                return Ok(true);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpGet]
        [Route("api/MicroondasAPI/verSoporte")]
        public IHttpActionResult verSoporte(string id)
        {
            try
            {
                Guid i = Guid.Parse(id.ToString());

                var accion = SessionController.getInstance().Soporte.Where(w => w.idSoporte == i).FirstOrDefault();

                if(accion == null)
                {
                    return Ok(false);
                }

                var resultado = new
                {
                    idSoporte = accion.idSoporte,
                    problema = accion.problema,
                    idTecnico = accion.idTecnico,
                    idContrato = accion.idContrato,
                    fechaInicio = Convert.ToDateTime(accion.fechaInicio).ToString("yyyy-MM-dd"),
                    fechaFinal = Convert.ToDateTime(accion.fechaFinal).ToString("yyyy-MM-dd"),
                    idEstatus = accion.idEstatus,
                    activo = accion.activo,
                    Estatus = new
                    {
                        idEstatus = accion.Estatus.idEstatus,
                        estatus1 = accion.Estatus.estatus1,
                        activo = accion.Estatus.activo
                    },
                    Contrato = new
                    {
                        idContrato = accion.Contrato.idContrato,
                        pdf = accion.Contrato.pdf,
                        archivo = accion.Contrato.archivo,
                        fechaInicio = accion.Contrato.fechaInicio,
                        fechaFinal = accion.Contrato.fechaFinal,
                        idPaquete = accion.Contrato.idPaquete,
                        idUsuario = accion.Contrato.idUsuario,
                        activo = accion.Contrato.activo,
                        Paquete = new
                        {
                            idPaquete = accion.Contrato.Paquete.idPaquete,
                            nombre = accion.Contrato.Paquete.nombre,
                            precio = accion.Contrato.Paquete.precio,
                            activo = accion.Contrato.Paquete.activo,
                            descripcion = accion.Contrato.Paquete.descripcion
                        },
                        Usuario = new
                        {
                            idUsuario = accion.Contrato.Usuario.idUsuario,
                            nombre = accion.Contrato.Usuario.nombre,
                            apellido = accion.Contrato.Usuario.apellido,
                            telefono = accion.Contrato.Usuario.telefono,
                            correoE = accion.Contrato.Usuario.correoE,
                            calle = accion.Contrato.Usuario.calle,
                            numInt = accion.Contrato.Usuario.numInt,
                            numExt = accion.Contrato.Usuario.numExt,
                            idEstado = accion.Contrato.Usuario.idEstado,
                            idCiudad = accion.Contrato.Usuario.idCiudad,
                            idCP = accion.Contrato.Usuario.idCP,
                            idColonia = accion.Contrato.Usuario.idColonia,
                            idRol = accion.Contrato.Usuario.idRol,
                            activo = accion.Contrato.Usuario.activo,
                            contrasena = accion.Contrato.Usuario.contrasena,
                            CP = new
                            {
                                idCP = accion.Contrato.Usuario.CodigoPostal.idCP,
                                codigo = accion.Contrato.Usuario.CodigoPostal.codigo
                            },
                            Colonia = new
                            {
                                idColonia = accion.Contrato.Usuario.Colonia.idColonia,
                                colonia1 = accion.Contrato.Usuario.Colonia.colonia1,
                            },
                            Ciudad = new
                            {
                                idCiudad = accion.Contrato.Usuario.Ciudad.idCiudad,
                                ciudad1 = accion.Contrato.Usuario.Ciudad.ciudad1
                            },
                            Estado = new
                            {
                                idEstado = accion.Contrato.Usuario.idEstado,
                                estado1 = accion.Contrato.Usuario.Estado.estado1
                            },
                            Rol = new
                            {
                                idRol = accion.Contrato.Usuario.Rol.idRol,
                                rol1 = accion.Contrato.Usuario.Rol.rol1
                            }
                        }
                    },
                    Tecnico = new
                    {
                        idUsuario = accion.Usuario.idUsuario,
                        nombre = accion.Usuario.nombre,
                        apellido = accion.Usuario.apellido,
                        telefono = accion.Usuario.telefono,
                        correoE = accion.Usuario.correoE,
                        calle = accion.Usuario.calle,
                        numInt = accion.Usuario.numInt,
                        numExt = accion.Usuario.numExt,
                        idEstado = accion.Usuario.idEstado,
                        idCiudad = accion.Usuario.idCiudad,
                        idCP = accion.Usuario.idCP,
                        idColonia = accion.Usuario.idColonia,
                        idRol = accion.Usuario.idRol,
                        activo = accion.Usuario.activo,
                        contrasena = accion.Usuario.contrasena,
                        CP = new
                        {
                            idCP = accion.Usuario.CodigoPostal.idCP,
                            codigo = accion.Usuario.CodigoPostal.codigo
                        },
                        Colonia = new
                        {
                            idColonia = accion.Usuario.Colonia.idColonia,
                            colonia1 = accion.Usuario.Colonia.colonia1,
                        },
                        Ciudad = new
                        {
                            idCiudad = accion.Usuario.Ciudad.idCiudad,
                            ciudad1 = accion.Usuario.Ciudad.ciudad1
                        },
                        Estado = new
                        {
                            idEstado = accion.Usuario.idEstado,
                            estado1 = accion.Usuario.Estado.estado1
                        },
                        Rol = new
                        {
                            idRol = accion.Usuario.Rol.idRol,
                            rol1 = accion.Usuario.Rol.rol1
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

        [HttpPut]
        [Route("api/MicroondasAPI/atenderSoporte")]
        public IHttpActionResult atenderSoporte(Soporte id)
        {
            try
            {
                var estatus = SessionController.getInstance().Estatus.Where(w => w.estatus1 == "en proceso").FirstOrDefault();

                var accion = SessionController.getInstance().Soporte.Where(w => w.idSoporte == id.idSoporte && w.Estatus.estatus1 == "problema").FirstOrDefault();

                if (accion == null)
                {
                    return Ok(false);
                }

                accion.idTecnico = id.idTecnico;
                accion.idEstatus = estatus.idEstatus;

                SessionController.getInstance().SaveChanges();

                return Ok(true);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        // Ver reportes del tecnico especifico
        [HttpGet]
        [Route("api/MicroondasAPI/consultaUnicaSoporteT")]
        public IHttpActionResult consultaUnicaSoporteT(string id)
        {
            try
            {
                Guid i = Guid.Parse(id.ToString());

                var accion = SessionController.getInstance().Soporte.Where(w => w.idTecnico == i && (w.Estatus.estatus1 == "problema" || w.Estatus.estatus1 == "en progreso")).ToList();

                if (accion.Count == 0)
                {
                    return Ok(false);
                }

                var resultado = accion.Select(s => new {
                    idSoporte = s.idSoporte,
                    problema = s.problema,
                    idTecnico = s.idTecnico,
                    idContrato = s.idContrato,
                    idEstatus = s.idEstatus,
                    fechaInicio = Convert.ToDateTime(s.fechaInicio).ToString("dd/MM/yyyy"),
                    fechaFinal = Convert.ToDateTime(s.fechaFinal).ToString("dd/MM/yyyy"),
                    activo = s.activo,
                    Estatus = new
                    {
                        idEstatus = s.Estatus.idEstatus,
                        estatus1 = s.Estatus.estatus1,
                        activo = s.Estatus.activo,
                    },
                    Contrato = new
                    {
                        idContrato = s.Contrato.idContrato,
                        pdf = s.Contrato.pdf,
                        archivo = s.Contrato.archivo,
                        fechaInicio = s.Contrato.fechaInicio,
                        fechaFinal = s.Contrato.fechaFinal,
                        idPaquete = s.Contrato.idPaquete,
                        idUsuario = s.Contrato.idUsuario,
                        activo = s.Contrato.activo,
                        Paquete = new
                        {
                            idPaquete = s.Contrato.Paquete.idPaquete,
                            nombre = s.Contrato.Paquete.nombre,
                            precio = s.Contrato.Paquete.precio,
                            activo = s.Contrato.Paquete.activo,
                            descripcion = s.Contrato.Paquete.descripcion
                        },
                        Usuario = new
                        {
                            idUsuario = s.Contrato.Usuario.idUsuario,
                            nombre = s.Contrato.Usuario.nombre,
                            apellido = s.Contrato.Usuario.apellido,
                            telefono = s.Contrato.Usuario.telefono,
                            correoE = s.Contrato.Usuario.correoE,
                            calle = s.Contrato.Usuario.calle,
                            numInt = s.Contrato.Usuario.numInt,
                            numExt = s.Contrato.Usuario.numExt,
                            idEstado = s.Contrato.Usuario.idEstado,
                            idCiudad = s.Contrato.Usuario.idCiudad,
                            idCP = s.Contrato.Usuario.idCP,
                            idColonia = s.Contrato.Usuario.idColonia,
                            idRol = s.Contrato.Usuario.idRol,
                            activo = s.Contrato.Usuario.activo,
                            contrasena = s.Contrato.Usuario.contrasena,
                            CP = new
                            {
                                idCP = s.Contrato.Usuario.CodigoPostal.idCP,
                                codigo = s.Contrato.Usuario.CodigoPostal.codigo
                            },
                            Colonia = new
                            {
                                idColonia = s.Contrato.Usuario.Colonia.idColonia,
                                colonia1 = s.Contrato.Usuario.Colonia.colonia1,
                            },
                            Ciudad = new
                            {
                                idCiudad = s.Contrato.Usuario.Ciudad.idCiudad,
                                ciudad1 = s.Contrato.Usuario.Ciudad.ciudad1
                            },
                            Estado = new
                            {
                                idEstado = s.Contrato.Usuario.idEstado,
                                estado1 = s.Contrato.Usuario.Estado.estado1
                            },
                            Rol = new
                            {
                                idRol = s.Contrato.Usuario.Rol.idRol,
                                rol1 = s.Contrato.Usuario.Rol.rol1
                            }
                        }
                    },
                    Tecnico = new
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

                return Ok(resultado);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpDelete]
        [Route("api/MicroondasAPI/cancelarSoporte")]
        public IHttpActionResult cancelarSoporte(string id)
        {
            try
            {
                Guid i = Guid.Parse(id.ToString());

                var accion = SessionController.getInstance().Soporte.Where(w => w.idSoporte == i).FirstOrDefault();

                if (accion == null)
                {
                    return Ok(false);
                }

                SessionController.getInstance().Soporte.Remove(accion);

                SessionController.getInstance().SaveChanges();

                return Ok(true);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpGet]
        [Route("api/MicroondasAPI/buscarSoporte")]
        public IHttpActionResult buscarSoporte(string key)
        {
            try
            {
                var accion = SessionController.getInstance().Soporte.Where(w =>
                    w.problema.Contains(key) ||
                    w.Estatus.estatus1.Contains(key) ||
                    w.Usuario.nombre.Contains(key) ||
                    w.Usuario.apellido.Contains(key) ||
                    w.Contrato.Usuario.nombre.Contains(key) ||
                    w.Contrato.Usuario.apellido.Contains(key)
                ).ToList();

                if (accion.Count == 0)
                {
                    DateTime dia = DateTime.ParseExact(key, "dd/MM/yyyy", CultureInfo.InvariantCulture);

                    accion = SessionController.getInstance().Soporte.Where(w =>
                        w.fechaInicio == dia ||
                        w.fechaFinal == dia
                    ).ToList();

                    if (accion.Count == 0)
                    {
                        return Ok(false);
                    }
                }

                var resultado = accion.Select(s => new {
                    idSoporte = s.idSoporte,
                    problema = s.problema,
                    idTecnico = s.idTecnico,
                    idContrato = s.idContrato,
                    idEstatus = s.idEstatus,
                    fechaInicio = Convert.ToDateTime(s.fechaInicio).ToString("dd/MM/yyyy"),
                    fechaFinal = Convert.ToDateTime(s.fechaFinal).ToString("dd/MM/yyyy"),
                    activo = s.activo,
                    Estatus = new
                    {
                        idEstatus = s.Estatus.idEstatus,
                        estatus1 = s.Estatus.estatus1,
                        activo = s.Estatus.activo,
                    },
                    Contrato = new
                    {
                        idContrato = s.Contrato.idContrato,
                        pdf = s.Contrato.pdf,
                        archivo = s.Contrato.archivo,
                        fechaInicio = s.Contrato.fechaInicio,
                        fechaFinal = s.Contrato.fechaFinal,
                        idPaquete = s.Contrato.idPaquete,
                        idUsuario = s.Contrato.idUsuario,
                        activo = s.Contrato.activo,
                        Paquete = new
                        {
                            idPaquete = s.Contrato.Paquete.idPaquete,
                            nombre = s.Contrato.Paquete.nombre,
                            precio = s.Contrato.Paquete.precio,
                            activo = s.Contrato.Paquete.activo,
                            descripcion = s.Contrato.Paquete.descripcion
                        },
                        Usuario = new
                        {
                            idUsuario = s.Contrato.Usuario.idUsuario,
                            nombre = s.Contrato.Usuario.nombre,
                            apellido = s.Contrato.Usuario.apellido,
                            telefono = s.Contrato.Usuario.telefono,
                            correoE = s.Contrato.Usuario.correoE,
                            calle = s.Contrato.Usuario.calle,
                            numInt = s.Contrato.Usuario.numInt,
                            numExt = s.Contrato.Usuario.numExt,
                            idEstado = s.Contrato.Usuario.idEstado,
                            idCiudad = s.Contrato.Usuario.idCiudad,
                            idCP = s.Contrato.Usuario.idCP,
                            idColonia = s.Contrato.Usuario.idColonia,
                            idRol = s.Contrato.Usuario.idRol,
                            activo = s.Contrato.Usuario.activo,
                            contrasena = s.Contrato.Usuario.contrasena,
                            CP = new
                            {
                                idCP = s.Contrato.Usuario.CodigoPostal.idCP,
                                codigo = s.Contrato.Usuario.CodigoPostal.codigo
                            },
                            Colonia = new
                            {
                                idColonia = s.Contrato.Usuario.Colonia.idColonia,
                                colonia1 = s.Contrato.Usuario.Colonia.colonia1,
                            },
                            Ciudad = new
                            {
                                idCiudad = s.Contrato.Usuario.Ciudad.idCiudad,
                                ciudad1 = s.Contrato.Usuario.Ciudad.ciudad1
                            },
                            Estado = new
                            {
                                idEstado = s.Contrato.Usuario.idEstado,
                                estado1 = s.Contrato.Usuario.Estado.estado1
                            },
                            Rol = new
                            {
                                idRol = s.Contrato.Usuario.Rol.idRol,
                                rol1 = s.Contrato.Usuario.Rol.rol1
                            }
                        }
                    },
                    Tecnico = new
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

                return Ok(resultado);
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }
    }
}
