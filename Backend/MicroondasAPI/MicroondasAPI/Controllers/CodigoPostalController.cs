﻿using MicroondasAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace MicroondasAPI.Controllers
{
    public class CodigoPostalController : ApiController
    {
        [HttpPost]
        [Route("api/MicroondasAPI/agregarCP")]
        public IHttpActionResult agregarCP(CodigoPostal cp)
        {
            try
            {
                // variable a devolver
                bool i = false;

                // buscamos si existe el codigo postal a ingresar
                var accion = SessionController.getInstance().CodigoPostal.Where(w => w.codigo == cp.codigo).FirstOrDefault();

                // si no existe
                if (accion == null)
                {
                    // estructuramos los datos
                    CodigoPostal datos = new CodigoPostal()
                    {
                        idCP = Guid.NewGuid(),
                        codigo = cp.codigo,
                        idCiudad = cp.idCiudad,
                        activo = cp.activo
                    };

                    // guardamos los datos
                    SessionController.getInstance().CodigoPostal.Add(datos);

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
        [Route("api/MicroondasAPI/eliminarCP")]
        public IHttpActionResult eliminarCP(string id)
        {
            try
            {
                // convertimos el id en guid
                Guid guid = Guid.Parse(id.ToString());

                // buscamos al codigo postal a eliminar
                var accion = SessionController.getInstance().CodigoPostal.Where(w => w.idCP == guid).FirstOrDefault();

                // Deshabilitamos al codigo postal
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
        [Route("api/MicroondasAPI/consultaCP")]
        public IHttpActionResult consultaCP()
        {
            try
            {
                // consultamos la tabla codigo postal
                var accion = SessionController.getInstance().CodigoPostal.ToList();

                // estructuramos los datos
                var resultado = accion.Select(s => new
                {
                    idCP = s.idCP,
                    codigo = s.codigo,
                    idCiudad = s.idCiudad,
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
        [Route("api/MicroondasAPI/modificarCP")]
        public IHttpActionResult modificarCP(CodigoPostal cp)
        {
            try
            {
                // variable para devolver
                bool i = false;

                // buscamos si existe el codigo postal a ingresar
                var accion = SessionController.getInstance().CodigoPostal.Where(w => w.codigo == cp.codigo).FirstOrDefault();

                // si no existe
                if (accion == null)
                {
                    // Hacemos los cambios
                    accion.codigo = cp.codigo;
                    accion.idCiudad = cp.idCiudad;
                    accion.activo = cp.activo;

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
        [Route("api/MicroondasAPI/consultaUnicaCP")]
        public IHttpActionResult consultaUnicaCP(string id)
        {
            try
            {
                Guid i = Guid.Parse(id.ToString());

                var accion = SessionController.getInstance().CodigoPostal.Where(w => w.idCiudad == i).ToList();

                var resultado = accion.Select(s => new
                {
                    idCP = s.idCP,
                    codigo = s.codigo
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
