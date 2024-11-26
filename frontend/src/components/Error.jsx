/* eslint-disable react/prop-types */
export default function Error({ children }) {
  return (
    <p className="my-4 bg-red-700 p-3 text-center text-sm font-bold uppercase text-white rounded-3xl">
      {children}
    </p>
  );
}
