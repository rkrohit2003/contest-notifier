import React from 'react'
import "./Footer.css"

export const Footer = () => {
  return (
    <footer className="text-bg-dark p-2 bg-secondary">
        <p className='text-center'>Copyright &copy; {new Date().getFullYear()} <a className='White' href="https://www.linkedin.com/in/rohit-kumar-39a888212/">Rohit Kumar</a>. All rights reserved.</p>
    </footer>
  )
}
