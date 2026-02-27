interface props {
    displayedArtist: string
}

export default function ({ displayedArtist }: props) {
    if (displayedArtist?.length === 0) {
        return <></>
    }

    return <p>You have searched for: {displayedArtist}</p>
}