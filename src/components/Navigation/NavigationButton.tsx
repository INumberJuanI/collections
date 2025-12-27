import React from 'react'

const NavigationButton = () => {
  return (
    <div className="flex md:hidden">
      <button
        id="mobile-menu-button"
        className="relative w-10 h-10 focus:outline-none group"
        aria-label="Toggle menu"
      >
        <div className="absolute w-5 transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
          <span className="block h-0.5 w-5 bg-cyan-400 mb-1 transform transition duration-300 ease-in-out group-[.active]:rotate-90 group-[.active]:translate-y-2"></span>
          <span className="block h-0.5 w-5 bg-cyan-400 mb-1 transform transition duration-300 ease-in-out group-[.active]:opacity-0"></span>
          <span className="block h-0.5 w-5 bg-cyan-400 transform transition duration-300 ease-in-out group-[.active]:-rotate-90 group-[.active]:-translate-y-2"></span>
        </div>
      </button>
    </div>
  )
}

export default NavigationButton
