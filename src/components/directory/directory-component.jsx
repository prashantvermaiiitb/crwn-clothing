import MenuItem from "../menu-item/menu-item.component";
import './directory.styles.scss'

const categories = [
    {
        title: 'hats',
        imageUrl: 'https://i.ibb.co/cvpntL1/hats.png',
        id: 1,
        route: 'shop/hats'
    },
    {
        title: 'jackets',
        imageUrl: 'https://i.ibb.co/px2tCc3/jackets.png',
        id: 2,
        route: 'shop/jackets'
    },
    {
        title: 'sneakers',
        imageUrl: 'https://i.ibb.co/0jqHpnp/sneakers.png',
        id: 3,
        route: 'shop/sneakers'
    },
    {
        title: 'womens',
        imageUrl: 'https://i.ibb.co/GCCdy8t/womens.png',
        size: 'large',
        id: 4,
        route: 'shop/womens'
    },
    {
        title: 'mens',
        imageUrl: 'https://i.ibb.co/R70vBrQ/men.png',
        size: 'large',
        id: 5,
        route: 'shop/mens'
    }
]
const Directory = () => {
    return (
        <div className="directory-menu">
            {categories.map(section => <MenuItem key={section.id} {...section} subtitle="SHOP NOW" />)}
        </div>
    );
}

export default Directory;