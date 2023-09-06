export default function PinContainer({ setShowPinContainer }) {
  return (
    <div
      className={`fixed inset-0 flex justify-center items-center z-50
      } bg-black bg-opacity-70`}
    >
      <div className="bg-white p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Ingrese su PIN de 4 dígitos</h2>
        <input
          type="password"
          onChange={() => {}}
          maxLength={4}
          className="p-2 border border-gray-300 rounded-md mb-4"
        />
        <div className="flex justify-end">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md mr-2"
            onClick={() => { setShowPinContainer(false) }}
          >
            Cancelar
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-md"
            onClick={() => {}}
          >
            Enviar
          </button>
        </div>
      </div>
    </div>

  )
}
