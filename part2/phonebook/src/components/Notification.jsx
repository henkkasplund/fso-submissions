const Notification = ({ text, nature }) => {
    if (text === null) {
        return null
    }
    return (
        <div className={ nature }>
            { text }
        </div>
    )
}

export default Notification