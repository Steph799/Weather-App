import React from 'react'
import './Card.scss'

type CardProps = {
  children: React.ReactNode
}

function Card({ children }: CardProps) {
  return (
    <section className='card'>
      {children}
    </section>
  )
}

export default Card
