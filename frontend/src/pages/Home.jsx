export default function Home() {
  return (
    <div>
      <div className="relative h-screen bg-gray-900 text-white">
        {/* Imagen de fondo */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1524232833434-c5fdd3b81a5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDEwfHxjb25mZXJlbmNlfGVufDB8fHx8MTY3OTc3NTk1Ng&ixlib=rb-4.0.3&q=80&w=1080')",
            filter: "brightness(50%)",
          }}></div>

        {/* Contenido */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center">
          <h1 className="text-4xl font-bold mb-4">
            Bienvenido a Nuestro Sistema de Reservas de Salas
          </h1>
          <p className="text-lg mb-8 max-w-2xl">
            Nuestra plataforma permite a los usuarios realizar reservas de salas
            de forma ágil y organizada. Administra tus espacios con facilidad y
            eficiencia.
          </p>
          <a
            href="/dashboard/user"
            className="px-6 py-3 text-lg font-medium bg-blue-600 hover:bg-blue-700 rounded-lg">
            Comenzar Reservas
          </a>
        </div>
      </div>
    </div>
  );
}
