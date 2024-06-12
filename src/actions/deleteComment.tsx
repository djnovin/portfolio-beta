'use server'

import { prisma } from 'auth'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

interface DeleteCommentButtonProps {
    comment: {
        id: string
    }
    params: {
        slug: string
    }
    inViewRoute: boolean
}

export const deleteComment = async (props: DeleteCommentButtonProps) => {
    const { comment, params, inViewRoute = false } = props
    prisma.comment.delete({
        where: {
            id: comment.id
        }
    })

    if (inViewRoute) {
        redirect(`/blog/${params.slug}`)
    } else {
        revalidatePath(`/blog/${params.slug}`)
    }
}
