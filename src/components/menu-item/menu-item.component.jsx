import { useCallback } from 'react';
import { MenuItemContainer, BackgroundImage, Content } from './menu-item.styles';
// import './menu-item.styles.scss'
import { useNavigate } from "react-router-dom"

const MenuItem = ({ title, subtitle, imageUrl, size, route }) => {
    const navigate = useNavigate();
    const onNavigateHandler = useCallback(e => navigate(route), []);
    return (
        // <div className={`menu-item${size ? ' ' + size : ''}`}>
        <MenuItemContainer size={size || ''}>
            <BackgroundImage imageUrl={imageUrl}></BackgroundImage>
            <Content onClick={onNavigateHandler}>
                <h1 className="title">{title.toUpperCase()}</h1>
                <span className="subtitle">{subtitle.toUpperCase()}</span>
            </Content>
        </MenuItemContainer>
    );
}

// export default withRouter(MenuItem);
export default MenuItem;