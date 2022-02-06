import './menu-item.styles.scss'
import { useNavigate } from "react-router-dom"

const MenuItem = ({ title, subtitle, imageUrl, size, linkUrl }) => {
    const navigate = useNavigate();
    return (
        <div className={`menu-item${size ? ' ' + size : ''}`}>
            <div className='background-image' style={{ backgroundImage: `url(${imageUrl})` }}></div>
            <div className="content" onClick={e => navigate(linkUrl)}>
                <h1 className="title">{title.toUpperCase()}</h1>
                <span className="subtitle">{subtitle.toUpperCase()}</span>
            </div>
        </div>
    );
}

// export default withRouter(MenuItem);
export default MenuItem;