CREATE DATABASE Microondas

USE Microondas 

CREATE TABLE Rol (
    idRol UNIQUEIDENTIFIER PRIMARY KEY,
    rol VARCHAR(30),
    activo BIT
);

CREATE TABLE Estatus (
    idEstatus UNIQUEIDENTIFIER PRIMARY KEY,
    estatus VARCHAR(30),
    activo BIT
);

CREATE TABLE Estado (
    idEstado UNIQUEIDENTIFIER PRIMARY KEY,
    estado VARCHAR(30),
    activo BIT
);

CREATE TABLE Ciudad (
    idCiudad UNIQUEIDENTIFIER PRIMARY KEY,
    ciudad VARCHAR(50),
    idEstado UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Estado(idEstado),
    activo BIT
);

CREATE TABLE CodigoPostal (
    idCP UNIQUEIDENTIFIER PRIMARY KEY,
    codigo INT,
    idCiudad UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Ciudad(idCiudad),
    activo BIT
);

CREATE TABLE Paquete (
    idPaquete UNIQUEIDENTIFIER PRIMARY KEY,
    nombre VARCHAR(30),
    precio MONEY,
    descripcion VARCHAR(max),
    imagen IMAGE,
    activo BIT
);

CREATE TABLE Equipo (
    idEquipo UNIQUEIDENTIFIER PRIMARY KEY,
    equipo VARCHAR(30),
    activo BIT
);

CREATE TABLE PaqueteEquipo (
    idPE INT IDENTITY PRIMARY KEY,
    idPaquete UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Paquete(idPaquete),
    idEquipo UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Equipo(idEquipo)
);

CREATE TABLE Colonia (
    idColonia UNIQUEIDENTIFIER PRIMARY KEY,
    colonia VARCHAR(50),
    idCP UNIQUEIDENTIFIER FOREIGN KEY REFERENCES CodigoPostal(idCP),
    activo BIT
);

CREATE TABLE Usuario (
    idUsuario UNIQUEIDENTIFIER PRIMARY KEY,
    nombre VARCHAR(50),
    apellido VARCHAR(50),
    telefono VARCHAR(50),
    correoE VARCHAR (50),
    contrasena VARCHAR(16),
    calle VARCHAR (50),
    numInt NCHAR,
    numExt INT,
    idEstado UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Estado(idEstado),
    idCiudad UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Ciudad(idCiudad),
    idColonia UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Colonia(idColonia),
    idCP UNIQUEIDENTIFIER FOREIGN KEY REFERENCES CodigoPostal(idCP),
    idRol UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Rol(idRol), 
    activo BIT
);

CREATE TABLE Propiedad (
    idPropiedad UNIQUEIDENTIFIER PRIMARY KEY,
    idUsuario UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Usuario(idUsuario), 
    idEquipo UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Equipo(idEquipo)
);

CREATE TABLE Contrato (
    idContrato UNIQUEIDENTIFIER PRIMARY KEY,
    pdf BINARY,
    archivo VARCHAR(20),
    fechaInicio DATE, 
    fechaFinal DATE,
    idUsuario UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Usuario(idUsuario),
    idPaquete UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Paquete(idPaquete),
    activo BIT
);

CREATE TABLE Soporte (
    idSoporte UNIQUEIDENTIFIER PRIMARY KEY,
    problema VARCHAR(MAX),
    idTecnico UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Usuario(idUsuario),
    idContrato UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Contrato(idContrato),
    idEstatus UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Estatus(idEstatus),
    fechaInicio DATE,
    fechaFinal DATE,
    activo bit
);

CREATE TABLE Informes(
    idInformes UNIQUEIDENTIFIER PRIMARY KEY,
    nombre VARCHAR(50),
    cp int,
    telefono VARCHAR(30),
    visto BIT,
    activo BIT
);

CREATE TABLE SlideImg (
    idSlide UNIQUEIDENTIFIER PRIMARY KEY,
    nombre VARCHAR(30),
    imagen IMAGE,
    descripcion VARCHAR(MAX)
);

CREATE TABLE Antena (
    idAntena UNIQUEIDENTIFIER PRIMARY KEY,
    idEstado UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Estado(idEstado),
    idCiudad UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Ciudad(idCiudad),
    idCP UNIQUEIDENTIFIER FOREIGN KEY REFERENCES CodigoPostal(idCP),
    idColonia UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Colonia(idColonia),
    calle VARCHAR(50),
    numExt int,
    lat DECIMAL,
    lon DECIMAL,
    activo bit
);
