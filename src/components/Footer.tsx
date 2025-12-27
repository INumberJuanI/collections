import Logo from './Logo/Logo'
import { menuItems } from './Navigation/Navigation'
import Socials from './Socials'

export function Footer() {
  return (
    <footer className="bg-gray-900/80 backdrop-blur-lg border-t border-gray-800">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <Logo slogan="UnsereKollektion" />

          <div className="flex justify-center mb-4 md:mb-0">
            {menuItems &&
              menuItems.map((item, index) => (
                <a
                  href={item.href}
                  key={index}
                  className="text-gray-400 hover:text-cyan-400 mx-2 transition-colors"
                >
                  {item.name}
                </a>
              ))}
          </div>

          <Socials X="#" Instagram="#" LinkedIn="#" />
        </div>
        <div className="text-center text-gray-500 text-sm mt-8">
          © 2025 Canales Solutions. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
