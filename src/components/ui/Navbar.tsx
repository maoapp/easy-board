import { Button } from "./button"

export const Navbar = () => {
  return (
    <div className="fixed top-0 w-full h-14 px-4 border-b shadow-sm bg-white flex items-center">
      <div className="md:max-w-screen-lg mx-auto flex items-center w-full justify-between">
        Easy Board
      </div>
      <div className="space-x-4 md:block md:w-auto flex items-center justify-between w-full">
        <Button>
          Login
        </Button>
      </div>
    </div>
  )
}