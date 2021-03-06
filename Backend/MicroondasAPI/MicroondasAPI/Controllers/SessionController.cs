﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using MicroondasAPI.Models;

namespace MicroondasAPI.Controllers
{
    public class SessionController : ApiController
    {
        private static MicroondasEntities bd;

        [HttpGet]
        [Route("api/MicroondasAPI/login")]
        public IHttpActionResult login(string correo, string contra)
        {
            try
            {
                // consultar usuaro para inicio de sesion
                var consulta = SessionController.getInstance().Usuario.Where(w => w.correoE == correo && w.contrasena == contra && 
                (w.Rol.rol1 == "administrador" || w.Rol.rol1 == "técnico" || w.Rol.rol1 == "cliente" || w.Rol.rol1 == "secretario") && w.activo == true).FirstOrDefault();

                if (consulta == null)
                {
                    return Ok(consulta);
                }
                // regresar usuario con los objetos que tiene en angular
                var resultado = new
                {
                    idUsuario = consulta.idUsuario,
                    nombre = consulta.nombre,
                    apellido = consulta.apellido,
                    telefono = consulta.telefono,
                    correoE = consulta.correoE,
                    contrasena = consulta.contrasena,
                    calle = consulta.calle,
                    numInt = consulta.numInt,
                    numExt = consulta.numExt,
                    idEstado = consulta.idEstado,
                    idCiudad = consulta.idCiudad,
                    idColonia = consulta.idColonia,
                    idCP = consulta.idCP,
                    idRol = consulta.idRol,
                    activo = consulta.activo,
                    CP = new {
                        idCP = consulta.CodigoPostal.idCP,
                        codigo = consulta.CodigoPostal.codigo
                    },
                    Colonia = new {
                        idColonia = consulta.Colonia.idColonia,
                        colonia1 = consulta.Colonia.colonia1,
                    },
                    //Contrato = new {
                    //    idContrato = consulta.Contrato
                    //},
                    Ciudad = new {
                        idCiudad = consulta.Ciudad.idCiudad,
                        ciudad1 = consulta.Ciudad.ciudad1
                    },
                    Estado = new {
                        idEstado = consulta.idEstado,
                        estado1 = consulta.Estado.estado1
                    },
                    //Propiedad = new {

                    //},
                    Rol = new {
                        idRol = consulta.Rol.idRol,
                        rol1 = consulta.Rol.rol1
                    }
                };

                // regresamos el resultado
                return Ok(resultado);
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }

        public static MicroondasEntities getInstance()
        {
            try
            {
                // si la instancia esta nula
                if (bd == null)
                {
                    bd = new MicroondasEntities(); // creamos la instancia
                }
                return bd;
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpGet]
        [Route("api/MicroondasAPI/verContrasena")]
        public IHttpActionResult verContrasena(string correo)
        {
            try
            {
                var accion = SessionController.getInstance().Usuario.Where(w => w.correoE == correo).FirstOrDefault();

                if (accion == null)
                {
                    return Ok(false);
                }

                var resultado = new
                {
                    nombre = accion.nombre,
                    apellido = accion.apellido,
                    correoE = accion.correoE,
                    contrasena = accion.contrasena
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
