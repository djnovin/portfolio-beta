import cn from 'classnames'
import { ComponentProps } from 'react'
import { Tag } from '@/types/index'

export interface CategoryProps {
    tags: Tag
}

export const Tags = (props: CategoryProps & ComponentProps<'div'>) => {
    const { tags, ...rest } = props

    const getAriaLabel = (tags: Tag) => {
        if (tags.includes('actix')) return 'Actix'
        if (tags.includes('angular')) return 'Angular'
        if (tags.includes('axum')) return 'Axum'
        if (tags.includes('backend')) return 'Backend'
        if (tags.includes('express')) return 'Express'
        if (tags.includes('frontend')) return 'Frontend'
        if (tags.includes('fullstack')) return 'Fullstack'
        if (tags.includes('mongodb')) return 'MongoDB'
        if (tags.includes('mysql')) return 'MySQL'
        if (tags.includes('nextjs')) return 'Next.js'
        if (tags.includes('postgres')) return 'PostgreSQL'
        if (tags.includes('react')) return 'React'
        if (tags.includes('rust')) return 'Rust'
        if (tags.includes('svelte')) return 'Svelte'
        if (tags.includes('typescript')) return 'TypeScript'
        if (tags.includes('vue')) return 'Vue.js'
        return 'Tag'
    }

    return (
        <div
            aria-label={getAriaLabel(tags)}
            className={cn(
                'px-2 py-1 text-xs font-mono rounded-full group',
                {
                    'bg-blue-200 text-blue-800 group-hover:bg-blue-300':
                        (tags && tags.includes('axum')) ||
                        (tags && tags.includes('frontend')) ||
                        (tags && tags.includes('mysql')) ||
                        (tags && tags.includes('nextjs')) ||
                        (tags && tags.includes('postgres')) ||
                        (tags && tags.includes('react')) ||
                        (tags && tags.includes('svelte')) ||
                        (tags && tags.includes('typescript')),
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
            {...rest}
        >
            {tags}
        </div>
    )
}
