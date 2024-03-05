import Link from 'next/link'
import cn from 'classnames'

export const Breadcrumbs = ({
    crumbs
}: {
    crumbs: { label: string; path: string }[]
}) => {
    return (
        <div>
            {crumbs.map((crumb, index) => (
                <span key={index}>
                    <Link
                        className={cn('hover:underline', {
                            underline: index >= crumbs.length - 1
                        })}
                        // @ts-ignore
                        href={crumb.path}
                    >
                        {crumb.label}
                    </Link>
                    {index < crumbs.length - 1 && <span> / </span>}
                </span>
            ))}
        </div>
    )
}
