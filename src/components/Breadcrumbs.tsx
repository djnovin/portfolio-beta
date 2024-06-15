import { ComponentProps } from 'react'
import Link from 'next/link'
import cn from 'classnames'

export interface BreadCrumbsProps {
    crumbs: { label: string; path: string }[]
}

export const Breadcrumbs = (
    props: BreadCrumbsProps & Pick<ComponentProps<'nav'>, 'className'>
) => {
    const { crumbs, ...rest } = props

    return (
        <nav {...rest} aria-label='Breadcrumb' className={cn(rest.className)}>
            {crumbs.map((crumb, index) => (
                <span key={index}>
                    <Link
                        className={cn('hover:underline', {
                            underline: index >= crumbs.length - 1
                        })}
                        href={{
                            pathname: crumb.path
                        }}
                        aria-current={
                            index === crumbs.length - 1 ? 'page' : undefined
                        }
                    >
                        {crumb.label}
                    </Link>
                    {index < crumbs.length - 1 && <span> / </span>}
                </span>
            ))}
        </nav>
    )
}
