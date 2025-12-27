import React from 'react'
import Image from 'next/image'
import logoSvg from './CanalesSolutionsLogo.svg'

type LogoArgs = {
  slogan?: string
  svgFilter?: string
  size?: 'small' | 'medium' | 'large' | string
}

// Adjust the SVG filter here
const SVG_FILTER = 'brightness(1.5) saturate(1.2) hue-rotate(0deg)'

const Logo = ({ slogan, svgFilter, size = 'medium' }: LogoArgs) => {
  const logoSize =
    size === 'small'
      ? 'w-8 h-8'
      : size === 'medium'
        ? 'w-10 h-10'
        : size === 'large'
          ? 'w-12 h-12'
          : size

  return (
    <div className="flex items-center">
      <div className="relative mr-2">
        <div className="absolute inset-0 bg-cyan-400/30 rounded-md blur-sm"></div>
        <div
          className={`${logoSize} rounded-md bg-linear-to-br from-indigo-600 to-purple-600 border border-indigo-400/30 flex items-center justify-center relative shadow-lg shadow-indigo-800/20`}
        >
          <div className="absolute inset-0.75 bg-gray-900 rounded-sm flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-br from-indigo-900/20 to-purple-900/20"></div>
            {/* <div className="font-bold text-lg bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              CS
            </div> */}
            <Image
              src={logoSvg}
              alt="Canales Solutions Logo"
              className={`w-[90%] h-[90%]`}
              style={{ filter: svgFilter ? svgFilter : SVG_FILTER }}
            />
          </div>
        </div>
      </div>

      {slogan && (
        <div className="text-xl font-medium bg-linear-to-r from-indigo-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent flex items-center">
          {slogan}
        </div>
      )}
    </div>
  )
}

export default Logo
