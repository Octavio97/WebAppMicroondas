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
    
    public partial class PaqueteEquipo
    {
        public int idPE { get; set; }
        public Nullable<System.Guid> idPaquete { get; set; }
        public Nullable<System.Guid> idEquipo { get; set; }
    
        public virtual Equipo Equipo { get; set; }
        public virtual Paquete Paquete { get; set; }
    }
}
