'use client'

import { useGSAP } from '@gsap/react'
import React, { PropsWithChildren, useRef } from 'react'
import gsap from 'gsap'
import ScrollSmoother from 'gsap/ScrollSmoother'

const SmoothWrapper = (props: PropsWithChildren) => {
    const { children } = props

    const main = useRef(null)
    const smoother = useRef<ScrollSmoother | null>(null)

    return (
        <div id='smooth-wrapper' ref={main}>
            <div id='smooth-content'>{children}</div>
        </div>
    )
}

export default SmoothWrapper
