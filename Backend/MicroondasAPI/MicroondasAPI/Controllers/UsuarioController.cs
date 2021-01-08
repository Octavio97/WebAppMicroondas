using MicroondasAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace MicroondasAPI.Controllers
{
    public class UsuarioController : ApiController
    {
        [HttpPost]
        [Route("api/MicroondasAPI/agregarUsuario")]
        public IHttpActionResult agregarUsuarios(Usuario usuario)
        {
            try
            {
                // variable para identificar si se guardo el usuario
                bool i = false;

                // comprobamos si el usuario existe por medio del correoE
                if (SessionController.getInstance().Usuario.Where(w => w.correoE == usuario.correoE).FirstOrDefault() == null)
                {
                    // Guardamos los datos para convertirlos a datos para la clase Usuario
                    Usuario tabla = new Usuario()
                    {
                        idUsuario = Guid.NewGuid(),
                        nombre = usuario.nombre,
                        apellido = usuario.apellido,
                        telefono = usuario.telefono,
                        correoE = usuario.correoE,
                        calle = usuario.calle,
                        numInt = usuario.numInt,
                        numExt = usuario.numExt,
                        idEstado = usuario.idEstado,
                        idCiudad = usuario.idCiudad,
                        idColonia = usuario.idColonia,
                        idCP = usuario.idCP,
                        idRol = usuario.idRol,
                        activo = usuario.activo,
                        contrasena = usuario.contrasena
                    };
                    // Agregamos el registro
                    SessionController.getInstance().Usuario.Add(tabla);
                    // Agregamos los cambios
                    SessionController.getInstance().SaveChanges();
                    // Verdadero al  saber que se realizo correctamente
                    i = true;
                }
                // Regresamos verdadero como accion exitosa
                return Ok(i);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
        
        [HttpDelete]
        [Route("api/MicroondasAPI/eliminarUsuario")]
        public IHttpActionResult eliminarUsuario(string id)
        {
            try
            {
                // convertimosel id en GUID
                var guid = Guid.Parse(id.ToString());

                // Buscamos al usuario a eliminar
                var accion = SessionController.getInstance().Usuario.Where(w => w.idUsuario == guid).FirstOrDefault();

                if (accion == null)
                {
                    return Ok(false);
                }

                SessionController.getInstance().Usuario.Remove(accion);

                // Guardamos los cambios
                SessionController.getInstance().SaveChanges();

                // regresamos verdadero cono accion exitosa
                return Ok(true);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpGet]
        [Route("api/MicroondasAPI/consultaUsuario")]
        public IHttpActionResult consultaUsuario()
        {
            try
            {
                // Consultamos a todos los usuarios
                var accion = SessionController.getInstance().Usuario.ToList();

                if (accion == null)
                {
                    return Ok(false);
                }

                // Ajustamos los datos para devolverlso
                var resultado = accion.Select(s => new
                {
                    idUsuario = s.idUsuario,
                    nombre = s.nombre,
                    apellido = s.apellido,
                    telefono = s.telefono,
                    correoE = s.correoE,
                    calle = s.calle,
                    numInt = s.numInt,
                    numExt = s.numExt,
                    idEstado= s.idEstado,
                    idCiudad = s.idCiudad,
                    idCP = s.idCP,
                    idColonia = s.idColonia,
                    idRol = s.idRol,
                    activo = s.activo,
                    contrasena = s.contrasena,
                    CP = new
                    {
                        idCP = s.CodigoPostal.idCP,
                        codigo = s.CodigoPostal.codigo
                    },
                    Colonia = new
                    {
                        idColonia = s.Colonia.idColonia,
                        colonia1 = s.Colonia.colonia1,
                    },
                    Ciudad = new
                    {
                        idCiudad = s.Ciudad.idCiudad,
                        ciudad1 = s.Ciudad.ciudad1
                    },
                    Estado = new
                    {
                        idEstado = s.idEstado,
                        estado1 = s.Estado.estado1
                    },
                    Rol = new
                    {
                        idRol = s.Rol.idRol,
                        rol1 = s.Rol.rol1
                    }
                });

                // manda resultados
                return Ok(resultado);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpPut]
        [Route("api/MicroondasAPI/modificarUsuario")]
        public IHttpActionResult modificarUsuario(Usuario usuario)
        {
            try
            {
                // variable para identificar si se guardo el usuario
                bool i = false;

                // Buscamos si existe un registro con un correo o telefono similar
                var accion = SessionController.getInstance().Usuario.Where(w => w.correoE == usuario.correoE || w.telefono == usuario.telefono).ToList();

                // si no existe un registro previo
                if (accion != null)
                {
                    // buscamos al usuario a modificar
                    var consulta = SessionController.getInstance().Usuario.Where(w => w.idUsuario == usuario.idUsuario && w.correoE == usuario.correoE).FirstOrDefault();

                    // aplicamos los cambios
                    consulta.nombre = usuario.nombre;
                    consulta.apellido = usuario.apellido;
                    consulta.telefono = usuario.telefono;
                    consulta.correoE = usuario.correoE;
                    consulta.calle = usuario.calle;
                    consulta.numExt = usuario.numExt;
                    consulta.numInt = usuario.numInt;
                    consulta.idEstado = usuario.idEstado;
                    consulta.idCiudad = usuario.idCiudad;
                    consulta.idColonia = usuario.idColonia;
                    consulta.idCP = usuario.idCP;
                    consulta.idRol = usuario.idRol;
                    consulta.activo = usuario.activo;
                    consulta.contrasena = usuario.contrasena;

                    // ejecutan los cambios
                    SessionController.getInstance().SaveChanges();
                    
                    // resutado exitoso
                    i = true;
                }
                // devuelve el valor final
                return Ok(i);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpGet]
        [Route("api/MicroondasAPI/verUsuario")]
        public IHttpActionResult verUsuario(string id)
        {
            try
            {
                Guid i = Guid.Parse(id.ToString());

                var consulta = SessionController.getInstance().Usuario.Where(w => w.idUsuario == i).FirstOrDefault();

                if (consulta == null)
                {
                    return Ok(false);
                }

                var resultado = new {
                    idUsuario = consulta.idUsuario,
                    nombre = consulta.nombre,
                    apellido = consulta.apellido,
                    telefono = consulta.telefono,
                    correoE = consulta.correoE,
                    calle = consulta.calle,
                    numInt = consulta.numInt,
                    numExt = consulta.numExt,
                    idColonia = consulta.idColonia,
                    idCP = consulta.idCP,
                    idRol = consulta.idRol,
                    activo = consulta.activo,
                    contrasena = consulta.contrasena,
                    idEstado = consulta.idEstado,
                    idCiudad = consulta.idCiudad,
                    CP = new
                    {
                        idCP = consulta.CodigoPostal.idCP,
                        codigo = consulta.CodigoPostal.codigo
                    },
                    Colonia = new
                    {
                        idColonia = consulta.Colonia.idColonia,
                        colonia1 = consulta.Colonia.colonia1,
                    },
                    Ciudad = new
                    {
                        idCiudad = consulta.Ciudad.idCiudad,
                        ciudad1 = consulta.Ciudad.ciudad1
                    },
                    Estado = new
                    {
                        idEstado = consulta.idEstado,
                        estado1 = consulta.Estado.estado1
                    },
                    Propiedad = new {
                        idPropiedad = consulta.Propiedad
                    },
                    Rol = new
                    {
                        idRol = consulta.Rol.idRol,
                        rol1 = consulta.Rol.rol1
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
        [Route("api/MicroondasAPI/verCliente")]
        public IHttpActionResult verCliente()
        {
            try
            {
                var accion = SessionController.getInstance().Usuario.Where(w => w.activo == true && w.Rol.rol1 == "cliente").ToList();

                if (accion == null)
                {
                    return Ok(false);
                }

                var resultado = accion.Select(s => new
                {
                    idUsuario = s.idUsuario,
                    nombre = s.nombre,
                    apellido = s.apellido,
                    telefono = s.telefono,
                    correoE = s.correoE,
                    calle = s.calle,
                    numInt = s.numInt,
                    numExt = s.numExt,
                    idEstado = s.idEstado,
                    idCiudad = s.idCiudad,
                    idCP = s.idCP,
                    idColonia = s.idColonia,
                    idRol = s.idRol,
                    activo = s.activo,
                    contrasena = s.contrasena,
                    CP = new
                    {
                        idCP = s.CodigoPostal.idCP,
                        codigo = s.CodigoPostal.codigo
                    },
                    Colonia = new
                    {
                        idColonia = s.Colonia.idColonia,
                        colonia1 = s.Colonia.colonia1,
                    },
                    Ciudad = new
                    {
                        idCiudad = s.Ciudad.idCiudad,
                        ciudad1 = s.Ciudad.ciudad1
                    },
                    Estado = new
                    {
                        idEstado = s.idEstado,
                        estado1 = s.Estado.estado1
                    },
                    Rol = new
                    {
                        idRol = s.Rol.idRol,
                        rol1 = s.Rol.rol1
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
        [Route("api/MicroondasAPI/verTecnico")]
        public IHttpActionResult verTecnico()
        {
            try
            {
                var accion = SessionController.getInstance().Usuario.Where(w => w.activo == true && w.Rol.rol1 == "técnico").ToList();

                if (accion == null)
                {
                    return Ok(false);
                }

                var resultado = accion.Select(s => new
                {
                    idUsuario = s.idUsuario,
                    nombre = s.nombre,
                    apellido = s.apellido,
                    telefono = s.telefono,
                    correoE = s.correoE,
                    calle = s.calle,
                    numInt = s.numInt,
                    numExt = s.numExt,
                    idEstado = s.idEstado,
                    idCiudad = s.idCiudad,
                    idCP = s.idCP,
                    idColonia = s.idColonia,
                    idRol = s.idRol,
                    activo = s.activo,
                    contrasena = s.contrasena,
                    CP = new
                    {
                        idCP = s.CodigoPostal.idCP,
                        codigo = s.CodigoPostal.codigo
                    },
                    Colonia = new
                    {
                        idColonia = s.Colonia.idColonia,
                        colonia1 = s.Colonia.colonia1,
                    },
                    Ciudad = new
                    {
                        idCiudad = s.Ciudad.idCiudad,
                        ciudad1 = s.Ciudad.ciudad1
                    },
                    Estado = new
                    {
                        idEstado = s.idEstado,
                        estado1 = s.Estado.estado1
                    },
                    Rol = new
                    {
                        idRol = s.Rol.idRol,
                        rol1 = s.Rol.rol1
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
        [Route("api/MicroondasAPI/buscarUsuario")]
        public IHttpActionResult buscarUsuario(string key)
        {
            try
            {
                var accion = SessionController.getInstance().Usuario.Where(w =>
                    w.nombre.Contains(key) ||
                    w.apellido.Contains(key) ||
                    w.telefono.Contains(key) ||
                    w.numInt.Contains(key) ||
                    w.Estado.estado1.Contains(key) ||
                    w.Ciudad.ciudad1.Contains(key) ||
                    w.Colonia.colonia1.Contains(key) ||
                    w.correoE.Contains(key) ||
                    w.contrasena.Contains(key)
                ).ToList();

                if (accion.Count == 0)
                {
                    int num = Convert.ToInt32(key);

                    accion = SessionController.getInstance().Usuario.Where(w =>
                    w.numExt ==  num ||
                    w.CodigoPostal.codigo == num
                    ).ToList();

                    if (accion.Count == 0)
                    {
                        return Ok(false);
                    }
                }

                // Ajustamos los datos para devolverlso
                var resultado = accion.Select(s => new
                {
                    idUsuario = s.idUsuario,
                    nombre = s.nombre,
                    apellido = s.apellido,
                    telefono = s.telefono,
                    correoE = s.correoE,
                    calle = s.calle,
                    numInt = s.numInt,
                    numExt = s.numExt,
                    idEstado = s.idEstado,
                    idCiudad = s.idCiudad,
                    idCP = s.idCP,
                    idColonia = s.idColonia,
                    idRol = s.idRol,
                    activo = s.activo,
                    contrasena = s.contrasena,
                    CP = new
                    {
                        idCP = s.CodigoPostal.idCP,
                        codigo = s.CodigoPostal.codigo
                    },
                    Colonia = new
                    {
                        idColonia = s.Colonia.idColonia,
                        colonia1 = s.Colonia.colonia1,
                    },
                    Ciudad = new
                    {
                        idCiudad = s.Ciudad.idCiudad,
                        ciudad1 = s.Ciudad.ciudad1
                    },
                    Estado = new
                    {
                        idEstado = s.idEstado,
                        estado1 = s.Estado.estado1
                    },
                    Rol = new
                    {
                        idRol = s.Rol.idRol,
                        rol1 = s.Rol.rol1
                    }
                });

                // manda resultados
                return Ok(resultado);
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }
    }
}
