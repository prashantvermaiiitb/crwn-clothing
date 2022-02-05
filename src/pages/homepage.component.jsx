import Directory from '../components/directory/directory-component';
import './homepage.style.scss';
const HomePage = () => {
    return (
        <div className="homepage">
            <h1>Welcome to my Homepage</h1>
            <Directory/>
        </div>
    );
}

export default HomePage;