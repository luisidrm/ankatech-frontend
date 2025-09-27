import { ToggleGroup } from "./ui/toggle-group";

export default function Bottom() {
  return (
    <div className="w-full h-auto bg-transparent flex justify-center place-items-center mb-2">
      <div>
        <h1>Movimientos</h1>
        <ToggleGroup type="single">

        </ToggleGroup>
      </div>
      <div className="w-full p-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">

      </div>
      <div className="w-full p-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">

      </div>
    </div>
  )
}