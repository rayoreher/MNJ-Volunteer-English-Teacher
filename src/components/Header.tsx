import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ChevronDown, Facebook, Instagram, Menu, Twitter, X, Youtube } from 'lucide-react';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const sideMenuRef = useRef<HTMLDivElement>(null)
  const toggleButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sideMenuRef.current &&
        !sideMenuRef.current.contains(event.target as Node) &&
        !toggleButtonRef.current?.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <>
      <div className="bg-lime-600 text-white py-2">
        <div className="container mx-auto px-4 py-1 flex justify-end space-x-4">
          {/* <Link href="#" className="hover:text-lime-200"><Facebook size={20} /></Link>
          <Link href="#" className="hover:text-lime-200"><Twitter size={20} /></Link> */}
          <Link href="https://www.instagram.com/freedomnoppadon?igsh=a2EwaGpveHl0cnJv" target="_blank" className="hover:text-lime-200"><Instagram size={20} /></Link>
          {/* <Link href="#" className="hover:text-lime-200"><Youtube size={20} /></Link> */}
        </div>
      </div>

      {/* Sticky Header with responsive menu */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-8 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-lime-600">MNJ Volunteer Teaching Project</Link>
          <nav className="hidden md:flex space-x-6">
            <Link href="/" className="text-lime-800 hover:text-lime-600">Home</Link>
            <div className="relative group">
              <Link href="#" className="text-lime-800 hover:text-lime-600">Get Involved <ChevronDown style={{ display: 'inline' }}/></Link>
              <div className="absolute left-0 mt-0 hidden group-hover:block bg-white shadow-lg rounded-md w-auto min-w-max">
                <ul className="py-2">
                  <li><Link href="/volunteer" className="block px-4 py-2 text-lime-800 hover:text-lime-600 hover:bg-gray-100">Volunteer</Link></li>
                  {/* <li><Link href="#" className="block px-4 py-2 text-lime-800 hover:text-lime-600 hover:bg-gray-100">Donate</Link></li> */}
                </ul>
              </div>
            </div>
            <Link href="/about" className="text-lime-800 hover:text-lime-600">About</Link>
          </nav>
          <button
            ref={toggleButtonRef}
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>
      {isMobileMenuOpen && (
        <div
          ref={sideMenuRef}
          className="fixed inset-y-0 right-0 w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out"
        >
          <nav className="flex flex-col p-4 space-y-4">
          <button
            ref={toggleButtonRef}
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
            <Link href="/" className="text-lime-800 hover:text-lime-600" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
            <Link href="/about" className="text-lime-800 hover:text-lime-600" onClick={() => setIsMobileMenuOpen(false)}>About</Link>
            <Link href="/volunteer" className="text-lime-800 hover:text-lime-600" onClick={() => setIsMobileMenuOpen(false)}>Volunteer</Link>
          </nav>
        </div>
      )}
    </>
  );
};

export default Header;
