import moment from "moment";
import { useDispatch } from "react-redux";
import { removeBooking } from "../../store/booking";


const UpcomingBookings = ({bookings, spots}) => {

    const dispatch = useDispatch()

    const filteredBookings = bookings.filter(booking => moment(new Date()).diff(moment(booking.startDate), 'day') <= 0)

    const handleBookingDeleteClick = (e) => {
        e.preventDefault()
        e.stopPropagation()
        dispatch(removeBooking(e.target.value))
    }

    return (
        <div>
            {filteredBookings.map(booking =>
                <div className="upcoming-booking-card">
                    <div className="upcoming-booking-card-left">
                        <div>
                            <div>
                                {spots[booking.spotId]?.name}
                            </div>
                            <div>
                                Entire home hosted by {spots[booking.spotId]?.Owner?.firstName}
                            </div>
                        </div>
                        <div>
                            <div>
                                <div>
                                {moment(booking.startDate).format('MMM D')} -
                                </div>
                                <div>
                                {moment(booking.endDate).format('MMM D YY')}
                                </div>
                            </div>
                            <div>
                                <div>{spots[booking.spotId]?.address} </div>
                                <div>{spots[booking.spotId]?.city} {spots[booking.spotId]?.state} </div>
                                <div>{spots[booking.spotId]?.country}</div>
                            </div>
                            <button onClick={handleBookingDeleteClick} value={booking.id}>Cancel Reservation</button>
                        </div>
                    </div>

                    <div className="upcoming-booking-card-right">
                        <img src={spots[booking.spotId]?.previewImage}></img>
                    </div>

                </div>
            )}
        </div>
    )
}

export default UpcomingBookings
