import React from 'react'
import './FavoriteCard.scss'

type FavoriteCardProps = {
    children: React.ReactNode
}

const FavoriteCard = ({ children }: FavoriteCardProps) =>
    <section className='favoriteCard'>
        {children}
    </section>


export default FavoriteCard
