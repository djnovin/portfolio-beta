'use server'

import { prisma } from 'auth'
import { revalidatePath } from 'next/cache'

interface DeleteCommentButtonProps {
    comment: {
        id: string
    }
    params: {
        slug: string
    }
}

export const deleteComment = async (props: DeleteCommentButtonProps) => {
    const { comment, params } = props
    prisma.comment.delete({
        where: {
            id: comment.id
        }
    })

    revalidatePath(`/blog/${params.slug}`)
}
