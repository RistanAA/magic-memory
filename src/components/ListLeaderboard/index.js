import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getScores } from '../../redux/modules/leaderboardSlice'
import './style.css'

const ListLeaderboard = () => {
    const leaderboard = useSelector((state) => state.leaderboardSlice.scores)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getScores())
    }, [])

    console.log(leaderboard);
    return (
        <div className='container'>
            <h3>Leaderboard</h3>
            <div className='list-item-container'>
                {
                    leaderboard.map((item, index) => {
                        return (
                            <div key={item._id} className={'list-item ' + (item.username === 'user1' ? 'active' : null)}>
                                <div className='user-detail'>
                                    <p>{index + 1}</p>
                                    <p>{item.username}</p>
                                </div>
                                <div className='score'>
                                    <p>{item.score} pts</p>
                                </div>
                            </div>
                        )
                    })
                }
                {/* <div className='list-item'>
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
                </div> */}
            </div>
        </div>
    )
}

export default ListLeaderboard