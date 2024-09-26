export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full bg-transparent p-4 flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <div className="h-8 w-8 bg-black rounded-full"></div>
        <span className="text-lg font-semibold">ReviewIt</span>
      </div>

      <div className="flex space-x-6 text-sm">
        <a href="#" className="hover:underline">
          Wall Of Love
        </a>
        <a href="#" className="hover:underline">
          Pricing
        </a>
        <a href="#" className="hover:underline">
          About
        </a>
      </div>

      <div>
        <button className="bg-gray-200 text-black py-2 px-4 rounded-md hover:bg-gray-300">
          Sign Up
        </button>
      </div>
    </nav>
  );
}
