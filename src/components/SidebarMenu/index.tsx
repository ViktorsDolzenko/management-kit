import React from 'react'

import { sidebarItemType } from './type'

import './style.scss'

interface SidebarMenuProps {
    items: sidebarItemType[]
    title: string
}

const SidebarMenu = ({ items, title }: SidebarMenuProps) => {
    return (
        <div className='SidebarMenu'>
            <span className='SidebarMenu__title'>{title}</span>
            <ul className='SidebarMenu__items'>
                {items.map((item, index) => {
                    return (
                        <li className='SidebarMenu__item' key={item.title}>
                            {item.image && (
                                <img
                                    src={item.image}
                                    alt={`${item.title}`}
                                    className='SidebarMenu__item--image'
                                />
                            )}

                            {item.title}

                            {Boolean(item.users?.length) &&
                                item.users?.map((user) => <img src={user} alt='' />)}
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export { SidebarMenu }
