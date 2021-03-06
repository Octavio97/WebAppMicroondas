﻿using MicroondasAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace MicroondasAPI.Controllers
{
    public class EstatusController : ApiController
    {
        [HttpPost]
        [Route("api/MicroondasAPI/agregarEstatus")]
        public IHttpActionResult agregarEstatus(Estatus estatus)
        {
            try
            {
                // variable a devolver
                bool i = false;

                // buscamos si existe el estatus a ingresar
                var accion = SessionController.getInstance().Estatus.Where(w => w.estatus1 == estatus.estatus1).FirstOrDefault();

                // si no existe
                if (accion == null)
                {
                    // estructuramos los datos
                    Estatus datos = new Estatus()
                    {
                        idEstatus = Guid.NewGuid(),
                        estatus1 = estatus.estatus1,
                        activo = estatus.activo
                    };

                    // guardamos los datos
                    SessionController.getInstance().Estatus.Add(datos);

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
        [Route("api/MicroondasAPI/eliminarEstatus")]
        public IHttpActionResult eliminarEstatus(string id)
        {
            try
            {
                // convertimos el id en guid
                Guid guid = Guid.Parse(id.ToString());

                // buscamos el estatus a eliminar
                var accion = SessionController.getInstance().Estatus.Where(w => w.idEstatus == guid).FirstOrDefault();

                if (accion == null)
                {
                    return Ok(false);
                }

                SessionController.getInstance().Estatus.Remove(accion);

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
        [Route("api/MicroondasAPI/consultaEstatus")]
        public IHttpActionResult consultaEstatus()
        {
            try
            {
                // consultamos la tabla estatus
                var accion = SessionController.getInstance().Estatus.ToList();

                if (accion == null)
                {
                    return Ok(false);
                }

                // estructuramos los datos
                var resultado = accion.Select(s => new
                {
                    idEstatus= s.idEstatus,
                    estatus1 = s.estatus1,
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
        [Route("api/MicroondasAPI/modificarEstatus")]
        public IHttpActionResult modificarEstatus(Estatus estatus)
        {
            try
            {
                // variable para devolver
                bool i = false;

                // buscamos si existe el estatus a ingresar
                var accion = SessionController.getInstance().Estatus.Where(w => w.estatus1 == estatus.estatus1 && w.idEstatus == estatus.idEstatus).FirstOrDefault();

                // si no existe
                if (accion != null)
                {
                    // Hacemos los cambios
                    accion.estatus1 = estatus.estatus1;
                    accion.activo = estatus.activo;

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
        [Route("api/MicroondasAPI/verEstatus")]
        public IHttpActionResult verEstatus(string id)
        {
            try
            {
                Guid i = Guid.Parse(id.ToString());

                var consulta = SessionController.getInstance().Estatus.Where(w => w.idEstatus == i).FirstOrDefault();

                if (consulta == null)
                {
                    return Ok(false);
                }

                var respuesta = new
                {
                    idEstatus = consulta.idEstatus,
                    estatus1 = consulta.estatus1,
                    activo = consulta.activo,
                };

                return Ok(respuesta);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpGet]
        [Route("api/MicroondasAPI/consultaUnicaEstatus")]
        public IHttpActionResult consultaUnicaEstatus (string estatus)
        {
            try
            {
                var consulta = SessionController.getInstance().Estatus.Where(w => w.estatus1 == estatus).FirstOrDefault();

                if (consulta == null)
                {
                    return Ok(false);
                }

                var respuesta = new
                {
                    idEstatus = consulta.idEstatus,
                    estatus1 = consulta.estatus1,
                    activo = consulta.activo,
                };

                return Ok(respuesta);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpGet]
        [Route("api/MicroondasAPI/buscarEstatus")]
        public IHttpActionResult buscarEstatus(string key)
        {
            try
            {
                var accion = SessionController.getInstance().Estatus.Where(w =>
                    w.estatus1.Contains(key)
                ).ToList();

                if (accion.Count == 0)
                {
                    return Ok(false);
                }

                // estructuramos los datos
                var resultado = accion.Select(s => new
                {
                    idEstatus = s.idEstatus,
                    estatus1 = s.estatus1,
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
    }
}
