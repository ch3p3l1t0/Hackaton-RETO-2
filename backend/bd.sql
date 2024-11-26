create type Rol as enum('cliente', 'admin')

create table Usuario(
idUsuario serial PRIMARY KEY,
nombre varchar(50)NOT NULL,
apellido varchar(50)NOT NULL,
empresa varchar(255)NOT NULL,
correo varchar(100)UNIQUE NOT NULL,
contraseña varchar(255)NOT NULL,
rol Rol
)

select * from Usuario

insert into Usuario values (1,'juan','gil','Sony','juangil123@gmail.com','password123','cliente')

create type EstadoReserva as enum ('en espera','aceptada')

create table Reservaciones(
idReservaciones serial PRIMARY KEY,
estadoReserva EstadoReserva,
hora time NOT NULL,
fecha Date NOT NULL,
razon varchar(255)NOT NULL,
idUsuario serial,
FOREIGN KEY (idUsuario) references Usuario(idUsuario)
)


create type Disponibilidad as enum ('si','no')
create type EstadoSala as enum ('abierto','cerrado')

create table Salas(
idSalas serial PRIMARY KEY,
disponibilidad Disponibilidad,
estadosala EstadoSala,
idReservaciones serial,
FOREIGN KEY (idReservaciones) references Reservaciones (idReservaciones)
)