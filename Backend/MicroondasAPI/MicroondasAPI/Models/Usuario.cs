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
    
    public partial class Usuario
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Usuario()
        {
            this.Contrato = new HashSet<Contrato>();
            this.Propiedad = new HashSet<Propiedad>();
        }
    
        public System.Guid idUsuario { get; set; }
        public string nombre { get; set; }
        public string apellido { get; set; }
        public string telefono { get; set; }
        public string correoE { get; set; }
        public string calle { get; set; }
        public string numInt { get; set; }
        public Nullable<int> numExt { get; set; }
        public Nullable<System.Guid> idColonia { get; set; }
        public Nullable<System.Guid> idCP { get; set; }
        public Nullable<System.Guid> idRol { get; set; }
        public Nullable<bool> activo { get; set; }
        public string contrasena { get; set; }
        public Nullable<System.Guid> idEstado { get; set; }
        public Nullable<System.Guid> idCiudad { get; set; }
    
        public virtual Ciudad Ciudad { get; set; }
        public virtual CodigoPostal CodigoPostal { get; set; }
        public virtual Colonia Colonia { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Contrato> Contrato { get; set; }
        public virtual Estado Estado { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Propiedad> Propiedad { get; set; }
        public virtual Rol Rol { get; set; }
    }
}
