import React from 'react'
import { MainNav } from './ui/main-nav';
import { Search } from './ui/search';
import { ModeToggle } from './ui/mode-toggle';

type Props = {}

const Nav = (props: Props) => {
    return (
        <div className="border-b">
            <div className="flex h-16 items-center px-4">
                <MainNav className="mx-6" />
                <div className="ml-auto flex items-center space-x-4">
                    <Search />
                    <ModeToggle />
                    {/* <UserNav /> */}
                </div>
            </div>
        </div>
    )
}

export default Nav