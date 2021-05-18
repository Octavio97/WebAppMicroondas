using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Cors;

namespace MicroondasAPI
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Configuración y servicios de API web
            // habilitar permisos para ingresar a esta api por angular
            config.EnableCors(new EnableCorsAttribute("http://localhost:4200", headers: "*", methods: "*")); // version desarrollo
            // config.EnableCors(new EnableCorsAttribute("http://192.168.1.105:80", headers: "*", methods: "*")); // version final
            // Rutas de API web
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }
}
