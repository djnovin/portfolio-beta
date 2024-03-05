import cn from 'classnames'
import { ComponentProps } from 'react'

interface CategoryProps {
    category: string
}

export const Category = (props: CategoryProps & ComponentProps<'div'>) => {
    const { category, ...rest } = props

    return (
        <div
            {...rest}
            className={cn(
                'px-2 py-1 rounded-full inline-block text-xs',
                {
                    'bg-blue-200 text-blue-800 group-hover:bg-blue-300':
                        category === 'frontend',
                    'bg-green-200 text-green-800: group-hover:bg-green-300':
                        category === 'backend',
                    'bg-yellow-200 text-yellow-800 group-hover:bg-yellow-300':
                        category === 'fullstack'
                },
                props.className
            )}
        >
            {category}
        </div>
    )
}
