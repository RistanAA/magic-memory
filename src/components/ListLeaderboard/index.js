import './style.css'

const ListLeaderboard = () => {
    return (
        <div className='container'>
            <h3>Leaderboard</h3>
            <div className='list-item-container'>
                <div className='list-item'>
                    <div className='user-detail'>
                        <p>1</p>
                        <p>User name</p>
                    </div>
                    <div className='score'>
                        <p>180 pts</p>
                    </div>
                </div>
                <div className='list-item'>
                    <div className='user-detail'>
                        <p>2</p>
                        <p>User name</p>
                    </div>
                    <div className='score'>
                        <p>180 pts</p>
                    </div>
                </div>
                <div className='list-item active'>
                    <div className='user-detail'>
                        <p>3</p>
                        <p>Your User name</p>
                    </div>
                    <div className='score'>
                        <p>180 pts</p>
                    </div>
                </div>
                <div className='list-item'>
                    <div className='user-detail'>
                        <p>4</p>
                        <p>User name</p>
                    </div>
                    <div className='score'>
                        <p>180 pts</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListLeaderboard