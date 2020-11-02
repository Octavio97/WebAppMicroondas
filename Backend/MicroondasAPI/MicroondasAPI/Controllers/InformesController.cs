using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using MicroondasAPI.Models;

namespace MicroondasAPI.Controllers
{
    public class InformesController : ApiController
    {
        [HttpPost]
        [Route("api/MicroondasAPI/agregarInformes")]
        public IHttpActionResult agregarInformes(Informes informes)
        {
            try
            {
                var accion = SessionController.getInstance().Informes.Where(w => w.telefono == informes.telefono).FirstOrDefault();

                if (accion != null)
                {
                    return Ok(false);
                }

                Informes datos = new Informes
                {
                    idInformes = Guid.NewGuid(),
                    nombre = informes.nombre,
                    cp = informes.cp,
                    telefono = informes.telefono,
                    visto = informes.visto,
                    activo = informes.activo
                };

                SessionController.getInstance().Informes.Add(datos);

                SessionController.getInstance().SaveChanges();

                return Ok(true);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpPut]
        [Route("api/MicroondasAPI/eliminarInformes")]
        public IHttpActionResult eliminarInformes(string id)
        {
            try
            {
                Guid i = Guid.Parse(id.ToString());

                var accion = SessionController.getInstance().Informes.Where(w => w.idInformes == i).FirstOrDefault();

                if (accion == null)
                {
                    return Ok(false);
                }

                accion.activo = false;

                SessionController.getInstance().SaveChanges();

                return Ok(true);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpGet]
        [Route("api/MicroondasAPI/consultaInformes")]
        public IHttpActionResult consultaInformes()
        {
            try
            {
                var accion = SessionController.getInstance().Informes.ToList();

                var resultados = accion.Select(s => new
                {
                    idInformes = s.idInformes,
                    nombre = s.nombre,
                    cp = s.cp,
                    telefono = s.telefono,
                    visto = s.visto,
                    activo = s.activo
                });

                return Ok(resultados);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpPut]
        [Route("api/MicroondasAPI/modificarInformes")]
        public IHttpActionResult modificarInformes(Informes informes)
        {
            try
            {
                var accion = SessionController.getInstance().Informes.Where(w => w.idInformes == informes.idInformes).FirstOrDefault();

                if (accion == null)
                {
                    return Ok(false);
                }

                accion.nombre = informes.nombre;
                accion.cp = informes.cp;
                accion.telefono = informes.telefono;
                accion.visto = informes.visto;
                accion.activo = informes.activo;

                SessionController.getInstance().SaveChanges();

                return Ok(true);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpGet]
        [Route("api/MicroondasAPI/verInformes")]
        public IHttpActionResult verInformes(string id)
        {
            try
            {
                Guid i = Guid.Parse(id.ToString());

                var accion = SessionController.getInstance().Informes.Where(w => w.idInformes == i).FirstOrDefault();

                if (accion == null)
                {
                    return Ok(false);
                }

                var resultado = new
                {
                    idInformes = accion.idInformes,
                    nombre = accion.nombre,
                    cp = accion.cp,
                    telefono = accion.telefono,
                    visto = accion.visto,
                    activo = accion.activo
                };

                return Ok(resultado);
            }
            catch (Exception)
            {
                return (BadRequest());
            }
        }
    }
}
