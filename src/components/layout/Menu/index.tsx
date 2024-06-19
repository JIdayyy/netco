import { useAppContext } from '$contexts/AppContext';

export default function Menu() {
  const { isMenuOpen, toggleMenu } = useAppContext();

  return (
    <>
      <div
        className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-10"
        onClick={toggleMenu}
        style={{ display: isMenuOpen ? 'block' : 'none' }}
      />
      <div
        className={`fixed top-0 left-0 w-72 h-full bg-white z-20 ${
          isMenuOpen ? '-translate-x-0' : '-translate-x-[100%]'
        } transform transition-transform duration-300`}
      >
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
          <button onClick={toggleMenu}>Close</button>
        </div>
        <div className="h-full flex flex-col justify-center items-center">
          <nav>
            <ul>
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">About</a>
              </li>
              <li>
                <a href="#">Services</a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}
