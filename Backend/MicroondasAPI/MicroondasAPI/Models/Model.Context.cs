﻿//------------------------------------------------------------------------------
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
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class MicroondasEntities : DbContext
    {
        public MicroondasEntities()
            : base("name=MicroondasEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<Ciudad> Ciudad { get; set; }
        public virtual DbSet<CodigoPostal> CodigoPostal { get; set; }
        public virtual DbSet<Colonia> Colonia { get; set; }
        public virtual DbSet<Contrato> Contrato { get; set; }
        public virtual DbSet<Equipo> Equipo { get; set; }
        public virtual DbSet<Estado> Estado { get; set; }
        public virtual DbSet<Estatus> Estatus { get; set; }
        public virtual DbSet<Paquete> Paquete { get; set; }
        public virtual DbSet<PaqueteEquipo> PaqueteEquipo { get; set; }
        public virtual DbSet<Propiedad> Propiedad { get; set; }
        public virtual DbSet<Rol> Rol { get; set; }
        public virtual DbSet<Soporte> Soporte { get; set; }
        public virtual DbSet<Usuario> Usuario { get; set; }
    }
}
