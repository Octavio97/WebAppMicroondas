//------------------------------------------------------------------------------
// <auto-generated>
//     Este código se generó a partir de una plantilla.
//
//     Los cambios manuales en este archivo pueden causar un comportamiento inesperado de la aplicación.
//     Los cambios manuales en este archivo se sobrescribirán si se regenera el código.
// </auto-generated>
//------------------------------------------------------------------------------

namespace MicroondasAPI.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class Soporte
    {
        public System.Guid idSoporte { get; set; }
        public string problema { get; set; }
        public Nullable<System.Guid> idTecnico { get; set; }
        public Nullable<System.Guid> idContrato { get; set; }
        public Nullable<System.DateTime> fechaInicio { get; set; }
        public Nullable<System.DateTime> fechaFinal { get; set; }
        public Nullable<bool> activo { get; set; }
    
        public virtual Contrato Contrato { get; set; }
        public virtual Usuario Usuario { get; set; }
    }
}
