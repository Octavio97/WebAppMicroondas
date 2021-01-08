using MicroondasAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace MicroondasAPI.Controllers
{
    public class ColoniaController : ApiController
    {
        [HttpPost]
        [Route("api/MicroondasAPI/agregarColonia")]
        public IHttpActionResult agregarColonia(Colonia colonia)
        {
            try
            {
                // variable a devolver
                bool i = false;

                // buscamos si existe la colonia a ingresar
                var accion = SessionController.getInstance().Colonia.Where(w => w.colonia1 == colonia.colonia1).FirstOrDefault();

                // si no existe
                if (accion == null)
                {
                    // estructuramos los datos
                    Colonia datos = new Colonia()
                    {
                        idColonia = Guid.NewGuid(),
                        colonia1 = colonia.colonia1,
                        idCP = colonia.idCP,
                        activo = colonia.activo
                    };

                    // guardamos los datos
                    SessionController.getInstance().Colonia.Add(datos);

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
        [Route("api/MicroondasAPI/eliminarColonia")]
        public IHttpActionResult eliminarColonia(string id)
        {
            try
            {
                // convertimos el id en guid
                Guid guid = Guid.Parse(id.ToString());

                // buscamos la colonia a eliminar
                var accion = SessionController.getInstance().Colonia.Where(w => w.idColonia == guid).FirstOrDefault();

                if (accion == null)
                {
                    return Ok(false);
                }

                SessionController.getInstance().Colonia.Remove(accion);

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
        [Route("api/MicroondasAPI/consultaColonia")]
        public IHttpActionResult consultaColonia()
        {
            try
            {
                // consultamos la tabla colonia
                var accion = SessionController.getInstance().Colonia.ToList();

                if (accion == null)
                {
                    return Ok(false);
                }

                // estructuramos los datos
                var resultado = accion.Select(s => new
                {
                    idColonia = s.idColonia,
                    colonia1 = s.colonia1,
                    idCP = s.idCP,
                    activo = s.activo,
                    CP = new {
                        idCP = s.CodigoPostal.idCP,
                        codigo = s.CodigoPostal.codigo,
                        idCiudad = s.CodigoPostal.idCiudad,
                        activo = s.CodigoPostal.activo,
                        Ciudad = new
                        {
                            idCiudad = s.CodigoPostal.Ciudad.idCiudad,
                            ciudad1 = s.CodigoPostal.Ciudad.ciudad1,
                            idEstado = s.CodigoPostal.Ciudad.idEstado,
                            activo = s.CodigoPostal.activo,
                            Estado = new
                            {
                                idEstado = s.CodigoPostal.Ciudad.Estado.idEstado,
                                estado1 = s.CodigoPostal.Ciudad.Estado.estado1,
                                activo = s.CodigoPostal.Ciudad.Estado.activo
                            }
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
        [Route("api/MicroondasAPI/modificarColonia")]
        public IHttpActionResult modificarColonia(Colonia colonia)
        {
            try
            {
                // variable para devolver
                bool i = false;

                // buscamos si existe la colonia a ingresar
                var accion = SessionController.getInstance().Colonia.Where(w => w.colonia1 == colonia.colonia1 && w.idColonia == colonia.idColonia).FirstOrDefault();

                // si no existe
                if (accion != null)
                {
                    // Hacemos los cambios
                    accion.colonia1 = colonia.colonia1;
                    accion.idCP = colonia.idCP;
                    accion.activo = colonia.activo;

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
        [Route("api/MicroondasAPI/consultaUnicaCo")]
        public IHttpActionResult consultaUnicaCo(string id)
        {
            try
            {
                Guid i = Guid.Parse(id.ToString());

                var accion = SessionController.getInstance().Colonia.Where(w => w.idCP == i).ToList();

                if (accion == null)
                {
                    return Ok(false);
                }

                var resultado = accion.Select(s => new {
                    idColonia = s.idColonia,
                    colonia1 = s.colonia1,
                    idCP = s.idCP,
                    activo = s.activo,
                    CP = new
                    {
                        idCP = s.CodigoPostal.idCP,
                        codigo = s.CodigoPostal.codigo,
                        idCiudad = s.CodigoPostal.idCiudad,
                        activo = s.CodigoPostal.activo,
                        Ciudad = new
                        {
                            idCiudad = s.CodigoPostal.Ciudad.idCiudad,
                            ciudad1 = s.CodigoPostal.Ciudad.ciudad1,
                            idEstado = s.CodigoPostal.Ciudad.idEstado,
                            activo = s.CodigoPostal.activo,
                            Estado = new
                            {
                                idEstado = s.CodigoPostal.Ciudad.Estado.idEstado,
                                estado1 = s.CodigoPostal.Ciudad.Estado.estado1,
                                activo = s.CodigoPostal.Ciudad.Estado.activo
                            }
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

        [HttpGet]
        [Route("api/MicroondasAPI/verColonia")]
        public IHttpActionResult verColonia(string id)
        {
            try
            {
                Guid i = Guid.Parse(id.ToString());

                var consulta = SessionController.getInstance().Colonia.Where(w => w.idColonia == i).FirstOrDefault();

                if (consulta == null)
                {
                    return Ok(false);
                }

                var resultado = new {
                    idColonia = consulta.idColonia,
                    colonia1 = consulta.colonia1,
                    idCP = consulta.idCP,
                    activo = consulta.activo,
                    CP = new
                    {
                        idCP = consulta.CodigoPostal.idCP,
                        codigo = consulta.CodigoPostal.codigo,
                        idCiudad = consulta.CodigoPostal.idCiudad,
                        activo = consulta.CodigoPostal.activo,
                        Ciudad = new
                        {
                            idCiudad = consulta.CodigoPostal.Ciudad.idCiudad,
                            ciudad1 = consulta.CodigoPostal.Ciudad.ciudad1,
                            idEstado = consulta.CodigoPostal.Ciudad.idEstado,
                            activo = consulta.CodigoPostal.activo,
                            Estado = new
                            {
                                idEstado = consulta.CodigoPostal.Ciudad.Estado.idEstado,
                                estado1 = consulta.CodigoPostal.Ciudad.Estado.estado1,
                                activo = consulta.CodigoPostal.Ciudad.Estado.activo
                            }
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
        [Route("api/MicroondasAPI/consultaCoInicio")]
        public IHttpActionResult consultaCoInicio(string id)
        {
            try
            {
                Guid i = Guid.Parse(id.ToString());

                var accion = SessionController.getInstance().Colonia.Where(w => w.activo == true && w.idCP == i).ToList();

                if (accion == null)
                {
                    return Ok(false);
                }

                var resultado = accion.Select(s => new {
                    idColonia = s.idColonia,
                    colonia1 = s.colonia1,
                    idCP = s.idCP,
                    activo = s.activo,
                    CP = new
                    {
                        idCP = s.CodigoPostal.idCP,
                        codigo = s.CodigoPostal.codigo,
                        idCiudad = s.CodigoPostal.idCiudad,
                        activo = s.CodigoPostal.activo,
                        Ciudad = new
                        {
                            idCiudad = s.CodigoPostal.Ciudad.idCiudad,
                            ciudad1 = s.CodigoPostal.Ciudad.ciudad1,
                            idEstado = s.CodigoPostal.Ciudad.idEstado,
                            activo = s.CodigoPostal.activo,
                            Estado = new
                            {
                                idEstado = s.CodigoPostal.Ciudad.Estado.idEstado,
                                estado1 = s.CodigoPostal.Ciudad.Estado.estado1,
                                activo = s.CodigoPostal.Ciudad.Estado.activo
                            }
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

        [HttpGet]
        [Route("api/MicroondasAPI/buscarColonia")]
        public IHttpActionResult buscarColonia(string key)
        {
            try
            {
                var accion = SessionController.getInstance().Colonia.Where(w =>
                    w.colonia1.Contains(key) ||
                    w.CodigoPostal.Ciudad.ciudad1.Contains(key) ||
                    w.CodigoPostal.Ciudad.Estado.estado1.Contains(key)
                ).ToList();

                if (accion.Count == 0)
                {
                    int num = Convert.ToInt32(key);

                    accion = SessionController.getInstance().Colonia.Where(w =>
                        w.CodigoPostal.codigo == num
                    ).ToList();

                    if (accion.Count == 0)
                    {
                        return Ok(false);
                    }
                }

                // estructuramos los datos
                var resultado = accion.Select(s => new
                {
                    idColonia = s.idColonia,
                    colonia1 = s.colonia1,
                    idCP = s.idCP,
                    activo = s.activo,
                    CP = new
                    {
                        idCP = s.CodigoPostal.idCP,
                        codigo = s.CodigoPostal.codigo,
                        idCiudad = s.CodigoPostal.idCiudad,
                        activo = s.CodigoPostal.activo,
                        Ciudad = new
                        {
                            idCiudad = s.CodigoPostal.Ciudad.idCiudad,
                            ciudad1 = s.CodigoPostal.Ciudad.ciudad1,
                            idEstado = s.CodigoPostal.Ciudad.idEstado,
                            activo = s.CodigoPostal.activo,
                            Estado = new
                            {
                                idEstado = s.CodigoPostal.Ciudad.Estado.idEstado,
                                estado1 = s.CodigoPostal.Ciudad.Estado.estado1,
                                activo = s.CodigoPostal.Ciudad.Estado.activo
                            }
                        }
                    }
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
