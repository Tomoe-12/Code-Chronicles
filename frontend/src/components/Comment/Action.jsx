
const action = ({ handleClick, type, className }) => {
    return (
        <div className={className} onClick={handleClick}>
            {type}
        </div>
    )
}

export default action