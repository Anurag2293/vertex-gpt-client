'use client'

import { usePathname } from 'next/navigation'
import Link from "next/link"

import { cn } from "@/lib/utils"

const NavLinks = [
    { link: '/', title: 'Overview'},
    { link: '/text-prompt', title: 'Text'},
    { link: '/image-prompt', title: 'Image'},
    { link: '/about', title: 'About'},
]

export function MainNav({
    className,
    ...props
}: React.HTMLAttributes<HTMLElement>) {
    const pathname = usePathname()

    return (
        <nav
            className={cn("flex items-center space-x-4 lg:space-x-6", className)}
            {...props}
        >
            {NavLinks.map(({ link, title }) => (
                <Link
                key={link}
                href={link}
                className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    pathname === link ? "text-primary" : "text-muted-foreground"
                    )}
                    >
                    {title}
                </Link>
            ))}
            {/* <h1>{pathname}</h1> */}
        </nav>
    )
}