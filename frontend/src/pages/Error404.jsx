export default function Error404() {
  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="text-center">
        <h1 className="mb-4 text-9xl font-semibold ">404</h1>
        <span className="text-red-600 uppercase text-3xl">
          pagina no encontrada
        </span>
        <p className="mb-4 text-lg text-gray-600">
          ¡Uy! Parece que te has perdido. 🫠
        </p>
        <div className="animate-bounce">
          <svg
            className="mx-auto h-16 w-16 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
          </svg>
        </div>
        <p className="mt-4 text-gray-600">
          Let&apos;s get you back{" "}
          <a
            href="/"
            className="text-blue-500">
            home
          </a>
          .
        </p>
      </div>
    </div>
  );
}
