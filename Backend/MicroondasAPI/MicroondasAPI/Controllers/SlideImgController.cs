using MicroondasAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace MicroondasAPI.Controllers
{
    public class SlideImgController : ApiController
    {
        [HttpPost]
        [Route("api/MicroondasAPI/agregarSlideImg")]
        public IHttpActionResult agregarSlideImg(SlideImg slideImg)
        {
            try
            {
                var accion = SessionController.getInstance().SlideImg.Where(w => w.nombre == slideImg.nombre).FirstOrDefault();

                if (accion != null)
                {
                    return Ok(false);
                }

                var datos = new SlideImg
                {
                    idSlide = Guid.NewGuid(),
                    nombre = slideImg.nombre,
                    descripcion = slideImg.descripcion,
                    imagen = slideImg.imagen
                };

                SessionController.getInstance().SlideImg.Add(datos);

                SessionController.getInstance().SaveChanges();

                return Ok(true);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpDelete]
        [Route("api/MicroondasAPI/eliminarSlideImg")]
        public IHttpActionResult eliminarSlideImg(string id)
        {
            try
            {
                Guid i = Guid.Parse(id.ToString());

                var accion = SessionController.getInstance().SlideImg.Where(w => w.idSlide == i).FirstOrDefault();

                if (accion == null)
                {
                    return Ok(false);
                }

                SessionController.getInstance().SlideImg.Remove(accion);

                SessionController.getInstance().SaveChanges();

                return Ok(true);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpGet]
        [Route("api/MicroondasAPI/consultaSlideImg")]
        public IHttpActionResult consultaSlideImg()
        {
            try
            {
                var consulta = SessionController.getInstance().SlideImg.ToList();

                var resultado = consulta.Select(s => new
                {
                    idSlide = s.idSlide,
                    nombre = s.nombre,
                    imagen = s.imagen,
                    descripcion = s.descripcion
                });

                return Ok(resultado);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpPut]
        [Route("api/MicroondasAPI/modificarSlideImg")]
        public IHttpActionResult modificarSlideImg(SlideImg slideImg)
        {
            try
            {
                var accion = SessionController.getInstance().SlideImg.Where(w => w.idSlide == slideImg.idSlide).FirstOrDefault();

                if (accion == null)
                {
                    return Ok(false);
                }

                accion.nombre = slideImg.nombre;
                accion.imagen = slideImg.imagen;
                accion.descripcion = slideImg.descripcion;

                SessionController.getInstance().SaveChanges();

                return Ok(true);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpGet]
        [Route("api/MicroondasAPI/verSlideImg")]
        public IHttpActionResult verSlideImg(string id)
        {
            try
            {
                Guid i = Guid.Parse(id.ToString());

                var accion = SessionController.getInstance().SlideImg.Where(w => w.idSlide == i).FirstOrDefault();

                if (accion == null)
                {
                    return Ok(false);
                }

                var resultado = new
                {
                    idSlide = accion.idSlide,
                    nombre = accion.nombre,
                    imagen = accion.imagen,
                    descripcion = accion.descripcion
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
