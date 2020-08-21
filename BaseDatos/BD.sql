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

CREATE TABLE Propiedad (
    idPropiedad UNIQUEIDENTIFIER PRIMARY KEY,
    propiedad VARCHAR(30),
    activo BIT
);

CREATE TABLE CodigoPostal (
    idCP UNIQUEIDENTIFIER PRIMARY KEY,
    codigo INT,
    activo BIT
);

CREATE TABLE Paquete (
    idPaquete UNIQUEIDENTIFIER PRIMARY KEY,
    NOMBRE VARCHAR(30),
    precio MONEY,
    activo BIT
);

CREATE TABLE Equipo (
    idEquipo UNIQUEIDENTIFIER PRIMARY KEY,
    equipo VARCHAR(30),
    idPropiedad UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Propiedad(idPropiedad)
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

CREATE TABLE Contrato (
    idContrato UNIQUEIDENTIFIER PRIMARY KEY,
    Pdf BINARY,
    archivo VARCHAR(20),
    idPaquete UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Paquete(idPaquete),
    idEstatus UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Estatus(idEstatus),
    activo BIT
);

CREATE TABLE Usuario (
    idUsuario UNIQUEIDENTIFIER PRIMARY KEY,
    nombre VARCHAR(50),
    apellido VARCHAR(50),
    telefono VARCHAR(50),
    correoE VARCHAR (50),
    calle VARCHAR (50),
    numInt NCHAR,
    numExt INT,
    idColonia UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Colonia(idColonia),
    idCP UNIQUEIDENTIFIER FOREIGN KEY REFERENCES CodigoPostal(idCP),
    idRol UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Rol(idRol), 
    idContrato UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Contrato(idContrato),
    Activo BIT
);
