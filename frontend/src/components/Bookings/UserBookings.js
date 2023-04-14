import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getUserBookings } from "../../store/booking"
import { getSpots } from "../../store/spots"
import UpcomingBookings from "./UpcomingBookings"
import PastBookings from "./PastBookings"
import './trips.css'


const UserBookings = () => {

    const dispatch = useDispatch()

    const bookings = useSelector(state => Object.values(state.bookings.userBookings))
    const user = useSelector(state => state.session.user)
    const spots = useSelector(state => state.spots.spots)

    useEffect(() => {
        dispatch(getUserBookings(user.id))
        dispatch(getSpots())
    }, [dispatch])

    return (

        <div className="trips-container">
            <div>Trips</div>
            <div>
                <div>Upcoming reservations</div>
                <UpcomingBookings bookings={bookings} spots={spots}/>
            </div>
            <div>
                <div>Where you've been</div>
                <PastBookings bookings={bookings} spots={spots}/>
            </div>
        </div>
    )
}

export default UserBookings
