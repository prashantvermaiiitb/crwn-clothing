import './menu-item.styles.scss'
const MenuItem = ({ title, subtitle, imageUrl, size }) => {
    return (
        <div className={`menu-item${size ? ' '+size : ''}`}>
            <div className='background-image' style={{ backgroundImage: `url(${imageUrl})` }}></div>
            <div className="content">
                <h1 className="title">{title.toUpperCase()}</h1>
                <span className="subtitle">{subtitle.toUpperCase()}</span>
            </div>
        </div>
    );
}

export default MenuItem;