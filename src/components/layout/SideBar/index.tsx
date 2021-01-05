import React from 'react'
import { sideBarItemsMenu, sideBarItemsProjects, sideBarItemsTeams } from './sideBarItems'
import './sideBar.scss'
import { SidebarMenu } from '../../SidebarMenu'

export const SideBar = () => {
    return (
        <div className='sidebar'>
            <div>
                <span className='sidebar__header'>Projectus</span>
            </div>
            <div className='sidebar__profile'>
                <img
                    className='sidebar__profile--img'
                    src='https://via.placeholder.com/48'
                    alt='avatar'
                />
                <div className='sidebar__profile--info'>
                    <span className='sidebar__profile--info name'>Name Surname</span>
                    <span className='sidebar__profile--info vacancy'>Product Owner</span>
                </div>
                <button className='sidebar__profile--showmore button'>
                    <i className='fas fa-ellipsis-h' />
                </button>
            </div>
            <div className='sidebar__tasks'>
                <div className='sidebar__tasks completed'>
                    <span className='completed__count'>372</span>
                    <span className='completed__title'>Completed Tasks</span>
                </div>
                <div className='sidebar__tasks open-tasks'>
                    <span className='open-tasks__count'>11</span>
                    <span className='open-tasks__title'>Open Tasks</span>
                </div>
            </div>

            <SidebarMenu items={sideBarItemsMenu} title='Menu' />
            <SidebarMenu items={sideBarItemsProjects} title='Projects' />
            <SidebarMenu items={sideBarItemsTeams} title='Teams' />
        </div>
    )
}
