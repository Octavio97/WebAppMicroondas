using MicroondasAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace MicroondasAPI.Controllers
{
    public class AntenaController : ApiController
    {
        [HttpPost]
        [Route("api/MicoondasAPI/agregarAntena")]
        public IHttpActionResult agregarAntena(Antena antena)
        {
            try
            {
                var accion = SessionController.getInstance().Antena.Where(w => w.numExt == antena.numExt).FirstOrDefault();

                if (accion != null)
                {
                    return Ok(false);
                }

                var datos = new Antena
                {
                    idAntena = Guid.NewGuid(),
                    idEstado = antena.idEstado,
                    idCiudad = antena.idCiudad,
                    idCP = antena.idCP,
                    idColonia = antena.idColonia,
                    calle = antena.calle,
                    numExt = antena.numExt,
                    lat = antena.lat,
                    lon = antena.lon,
                    activo = antena.activo
                };

                SessionController.getInstance().Antena.Add(datos);

                SessionController.getInstance().SaveChanges();

                return Ok(true);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpDelete]
        [Route("api/MicoondasAPI/eliminarAntena")]
        public IHttpActionResult eliminarAntena(string id)
        {
            try
            {
                Guid i = Guid.Parse(id.ToString());

                var accion = SessionController.getInstance().Antena.Where(w => w.idAntena == i).FirstOrDefault();

                if (accion == null)
                {
                    return Ok(false);
                }

                SessionController.getInstance().Antena.Remove(accion);

                SessionController.getInstance().SaveChanges();

                return Ok(true);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpGet]
        [Route("api/MicoondasAPI/consultarAntena")]
        public IHttpActionResult consultarAntena()
        {
            try
            {
                var accion = SessionController.getInstance().Antena.ToList();

                if (accion == null)
                {
                    return Ok(false);
                }

                var resultado = accion.Select(s => new
                {
                    idAntena = s.idAntena,
                    idEstado = s.idEstado,
                    idCiudad = s.idCiudad,
                    idCP = s.idCP,
                    idColonia = s.idColonia,
                    calle = s.calle,
                    numExt = s.numExt,
                    lat = s.lat,
                    lon = s.lon,
                    activo = s.activo,
                    Estado = new
                    {
                        estado1 = s.Estado.estado1
                    },
                    Ciudad = new
                    {
                        ciudad1 = s.Ciudad.ciudad1
                    },
                    CP = new
                    {
                        codigo = s.CodigoPostal.codigo
                    },
                    Colonia = new
                    {
                        colonia1 = s.Colonia.colonia1
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
        [Route("api/MicoondasAPI/modificarAntena")]
        public IHttpActionResult modificarAntena(Antena antena)
        {
            try
            {
                var accion = SessionController.getInstance().Antena.Where(w => w.idAntena == antena.idAntena).FirstOrDefault();

                if (accion == null)
                {
                    return Ok(false);
                }

                accion.idEstado = antena.idEstado;
                accion.idCiudad = antena.idCiudad;
                accion.idCP = antena.idCP;
                accion.idColonia = antena.idColonia;
                accion.calle = antena.calle;
                accion.numExt = antena.numExt;
                accion.lat = antena.lat;
                accion.lon = antena.lon;
                accion.activo = antena.activo;

                SessionController.getInstance().SaveChanges();

                return Ok(true);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpDelete]
        [Route("api/MicoondasAPI/verAntena")]
        public IHttpActionResult verAntena(string id)
        {
            try
            {
                Guid i = Guid.Parse(id.ToString());

                var accion = SessionController.getInstance().Antena.Where(w => w.idAntena == i).FirstOrDefault();

                if (accion == null)
                {
                    return Ok(false);
                }

                var resultado = new
                {
                    idAntena = accion.idAntena,
                    idEstado = accion.idEstado,
                    idCiudad = accion.idCiudad,
                    idCP = accion.idCP,
                    idColonia = accion.idColonia,
                    calle = accion.calle,
                    numExt = accion.numExt,
                    lat = accion.lat,
                    lon = accion.lon,
                    activo = accion.activo,
                    Estado = new
                    {
                        estado1 = accion.Estado.estado1
                    },
                    Ciudad = new
                    {
                        ciudad1 = accion.Ciudad.ciudad1
                    },
                    CP = new
                    {
                        codigo = accion.CodigoPostal.codigo
                    },
                    Colonia = new
                    {
                        colonia1 = accion.Colonia.colonia1
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
