import NavigationButton from './NavigationButton'
import Logo from '../Logo/Logo'
import { NavigationClient } from './Navigation.Client'
import Link from 'next/link'

export const menuItems: { name: string; href: string }[] = [
  // { name: 'Home', href: '#home' },
  // { name: 'About', href: '#about' },
  // { name: 'Services', href: '#services' },
  // { name: 'Portfolio', href: '#portfolio' },
  // { name: 'Contact', href: '#contact' },
]

export function Navigation() {
  return (
    <>
      <nav
        id="navbar"
        className="fixed top-0 left-0 right-0 bg-gray-900/70 backdrop-blur-lg border-b border-cyan-500/30 z-50 transition-all duration-300"
      >
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href={'/'}>
              <Logo slogan="UnsereKollektion" size="large" />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {menuItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="nav-link text-gray-300 hover:text-cyan-400 px-4 py-2 rounded-md transition-colors duration-200"
                >
                  {item.name}
                </a>
              ))}
              <div className="relative ml-4 group">
                <div className="absolute -inset-0.5 bg-linear-to-r from-indigo-600/50 to-purple-600/50 rounded-lg blur opacity-75 group-hover:opacity-100 transition-all duration-500"></div>
                <Link
                  href={'/dashboard'}
                  className="contact-btn px-4 py-2 bg-linear-to-r from-indigo-900/90 to-purple-900/90 rounded-lg text-white text-sm font-medium relative z-10 flex items-center justify-center gap-2 group-hover:from-indigo-800/90 group-hover:to-purple-800/90 transition-all duration-300"
                >
                  <span className="bg-linear-to-r from-cyan-300 to-indigo-300 bg-clip-text text-transparent">
                    Dashboard
                  </span>
                </Link>
              </div>
            </div>

            <NavigationButton />
          </div>

          {/* Mobile Menu */}
          <div
            id="mobile-menu"
            className="md:hidden h-0 overflow-hidden transition-all duration-300 ease-in-out"
          >
            <div className="pt-2 pb-4 space-y-1">
              {menuItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="mobile-nav-link block text-gray-300 hover:text-cyan-400 hover:bg-gray-800/50 px-4 py-2 rounded-md transition-colors duration-200"
                >
                  {item.name}
                </a>
              ))}
              <div className="px-4 pt-2">
                <Link
                  href={'/dashboard'}
                  className="contact-btn w-full px-4 py-2 bg-linear-to-r from-indigo-700 to-purple-700 rounded-lg text-white text-sm font-medium flex items-center justify-center gap-2 hover:from-indigo-600 hover:to-purple-600 transition-all duration-300"
                >
                  <span className="bg-linear-to-r from-cyan-300 to-indigo-300 bg-clip-text text-transparent">
                    Dashboard
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* <Socials X="#" Instagram="#" LinkedIn="#" /> */}
      </nav>
      <NavigationClient />
    </>
  )
}
