import React from 'react'
import styles from "../page.module.css"
import Image from 'next/image'

const Header = () => {
    return (
        <div className={styles.header}>
            <div>
                <Image
                    src="/images/breakaway_logo.png"
                    alt="Breakaway Logo"
                    layout="fill"
                    objectFit="contain"
                />
            </div>
        </div>
    )
}

export default Header