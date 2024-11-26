http://localhost:5000/reserver/create

{
    "estadoReserva": "en espera",
    "hora": "10:00:00",
    "fecha": "2024-11-27",
    "razon": "Reunion de alto nivel",
    "idUsuario": 2
}

http://localhost:5000/auth/register
{
    "nombre": "Juanitos",
    "apellido": "Perez",
    "empresa": "Junitos Organizados",
    "correo": "jeperea45@example.com",
    "contraseña": "Juanito123",
    "rol": "admin"
}


http://localhost:5000/admin/reservas/cambiar-estado
{
    "idReservaciones": 1,
    "estadoReserva": "aceptada"
}