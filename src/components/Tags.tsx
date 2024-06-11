import cn from 'classnames'
import { ComponentProps } from 'react'
import { Tag } from '@/types/index'

interface CategoryProps {
    tags: Tag
}

export const Tags = (props: CategoryProps & ComponentProps<'div'>) => {
    const { tags, ...rest } = props

    return (
        <div
            {...rest}
            className={cn(
                'px-2 py-1 text-xs font-mono',
                {
                    'bg-blue-200 text-blue-800 group-hover:bg-blue-300':
                        (tags && tags.includes('frontend')) ||
                        (tags && tags.includes('typescript')) ||
                        (tags && tags.includes('react')) ||
                        (tags && tags.includes('svelte')) ||
                        (tags && tags.includes('postgres')) ||
                        (tags && tags.includes('mysql')) ||
                        (tags && tags.includes('nextjs')) ||
                        (tags && tags.includes('axum')),
                    'bg-green-200 text-green-800 group-hover:bg-green-300':
                        (tags && tags.includes('backend')) ||
                        (tags && tags.includes('express')) ||
                        (tags && tags.includes('mongodb')) ||
                        (tags && tags.includes('vue')),
                    'bg-yellow-200 text-yellow-800 group-hover:bg-yellow-300':
                        tags && tags.includes('fullstack'),
                    'bg-red-200 text-red-800 group-hover:bg-red-300':
                        (tags && tags.includes('actix')) ||
                        (tags && tags.includes('angular')) ||
                        (tags && tags.includes('rust'))
                },
                props.className
            )}
        >
            {tags}
        </div>
    )
}
