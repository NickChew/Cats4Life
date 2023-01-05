import { Link } from 'react-router-dom';

const Home = (props) => {
    return (
        <>
            {props.charArr.map((charDetails, index) => {                
                return (
                    <div>
                        <Link key={index} to={`/character/${charDetails.id}`}>{charDetails.name}</Link>
                        <br></br>
                    </div>
                )
                
            })}
        </>    
        )
}

export default Home;