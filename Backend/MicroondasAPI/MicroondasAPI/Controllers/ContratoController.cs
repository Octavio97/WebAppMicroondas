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
                // variable a devolver
                bool i = false;

                // buscamos si existe el contrato a ingresar
                var accion = SessionController.getInstance().Contrato.Where(w => w.idUsuario == contrato.idUsuario).FirstOrDefault();

                // si no existe
                if (accion == null)
                {
                    // estructuramos los datos
                    Contrato datos = new Contrato()
                    {
                        idContrato = Guid.NewGuid(),
                        Pdf = contrato.Pdf,
                        archivo = contrato.archivo,
                        fechaInicio = contrato.fechaInicio,
                        fechaFinal = contrato.fechaFinal,
                        idPaquete = contrato.idPaquete,
                        idEstatus = contrato.idEstatus,
                        idUsuario = contrato.idUsuario,
                        activo = contrato.activo
                    };

                    // guardamos los datos
                    SessionController.getInstance().Contrato.Add(datos);

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
        [Route("api/MicroondasAPI/consultaPaquete")]
        public IHttpActionResult consultaPaquete()
        {
            try
            {
                // consultamos la tabla contrato
                var accion = SessionController.getInstance().Contrato.ToList();

                // estructuramos los datos
                var resultado = accion.Select(s => new
                {
                    idContrato = s.idContrato,
                    pdf = s.Pdf,
                    archivo = s.archivo,
                    fechaInicio = s.fechaInicio,
                    fechaFinal = s.fechaFinal,
                    idPaquete = s.idPaquete,
                    idEstatus = s.idEstatus,
                    idUsuario = s.idUsuario,
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
        [Route("api/MicroondasAPI/modificarPaquete")]
        public IHttpActionResult modificarPaquete(Contrato contrato)
        {
            try
            {
                // variable para devolver
                bool i = false;

                // buscamos si existe el contrato a ingresar
                var accion = SessionController.getInstance().Contrato.Where(w => w.idUsuario == contrato.idUsuario && w.idPaquete == contrato.idPaquete && w.fechaInicio == contrato.fechaInicio).FirstOrDefault();

                // si no existe
                if (accion == null)
                {
                    // Hacemos los cambios
                    accion.idContrato = contrato.idContrato;
                    accion.Pdf = contrato.Pdf;
                    accion.archivo = contrato.archivo;
                    accion.fechaInicio = contrato.fechaInicio;
                    accion.fechaFinal = contrato.fechaFinal;
                    accion.idPaquete = contrato.idPaquete;
                    accion.idEstatus = contrato.idEstatus;
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
    }
}
