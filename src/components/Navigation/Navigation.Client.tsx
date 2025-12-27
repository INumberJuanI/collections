'use client'

import { useEffect } from 'react'

export function NavigationClient() {
  useEffect(() => {
    // DOM Elements
    const navbar = document.getElementById('navbar')
    const mobileMenuButton = document.getElementById('mobile-menu-button')
    const mobileMenu = document.getElementById('mobile-menu')
    const navLinks = document.querySelectorAll('.nav-link')
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link')
    const sections = document.querySelectorAll('section')

    if (!navbar || !mobileMenuButton || !mobileMenu) return

    // Mobile Menu Toggle
    const handleMobileMenuClick = () => {
      mobileMenuButton.classList.toggle('active')

      if (mobileMenu.classList.contains('open')) {
        mobileMenu.style.height = '0'
        mobileMenu.classList.remove('open')
      } else {
        mobileMenu.classList.add('open')
        mobileMenu.style.height = `${mobileMenu.scrollHeight}px`
      }
    }

    mobileMenuButton.addEventListener('click', handleMobileMenuClick)

    // Close mobile menu when a link is clicked
    const closeMobileMenu = () => {
      mobileMenuButton.classList.remove('active')
      mobileMenu.style.height = '0'
      mobileMenu.classList.remove('open')
    }

    mobileNavLinks.forEach((link) => {
      link.addEventListener('click', closeMobileMenu)
    })

    // Highlight current section in navbar
    const highlightCurrentSection = () => {
      let current = ''

      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 100
        const sectionHeight = section.offsetHeight

        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
          current = section.getAttribute('id') || ''
        }
      })

      navLinks.forEach((link) => {
        link.classList.remove('active')
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active')
        }
      })

      mobileNavLinks.forEach((link) => {
        link.classList.remove('active')
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active')
        }
      })
    }

    // Navbar scroll effect
    const handleScroll = () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled')
      } else {
        navbar.classList.remove('scrolled')
      }

      highlightCurrentSection()
    }

    window.addEventListener('scroll', handleScroll)

    // Smooth scroll for nav links
    navLinks.forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault()
        const targetId = link.getAttribute('href')
        if (!targetId) return

        const targetSection = document.querySelector(targetId)

        if (targetSection) {
          const offsetTop = (targetSection as HTMLElement).offsetTop - 70
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth',
          })

          // Highlight the section briefly
          targetSection.classList.add('section-highlight')
          setTimeout(() => {
            targetSection.classList.remove('section-highlight')
          }, 1000)
        }
      })
    })

    // Scroll animations for sections
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('section-visible')
          }
        })
      },
      { threshold: 0.1 },
    )

    sections.forEach((section) => {
      section.classList.add('section-hidden')
      observer.observe(section)
    })

    // Initialize active section on page load
    highlightCurrentSection()

    // Make header text visible with animation
    setTimeout(() => {
      const headerText = document.querySelector('.text-6xl')
      if (headerText) {
        ;(headerText as HTMLElement).style.opacity = '1'
        ;(headerText as HTMLElement).style.transform = 'translateY(0)'
      }
    }, 300)

    // Cleanup
    return () => {
      mobileMenuButton.removeEventListener('click', handleMobileMenuClick)
      mobileNavLinks.forEach((link) => {
        link.removeEventListener('click', closeMobileMenu)
      })
      window.removeEventListener('scroll', handleScroll)
      observer.disconnect()
    }
  }, [])

  return null
}
