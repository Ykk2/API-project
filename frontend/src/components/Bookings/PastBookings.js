import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getUserReviews } from "../../store/review";
import moment from "moment";

import PastBookingsCard from "./PastBookingCard";


const PastBookings = ({bookings, spots}) => {

    const dispatch = useDispatch()

    const reviews = useSelector(state => Object.values(state.reviews))
    const filteredBookings = bookings.filter(booking => moment(new Date()).diff(moment(booking.startDate), 'day') > 0)

    useEffect(() => {
        dispatch(getUserReviews())
    }, [dispatch])


    console.log(reviews)

    return (
        <div>
            {filteredBookings.map(booking =>
                <PastBookingsCard key={booking} booking={booking} spots={spots} reviews={reviews}/>
            )}
        </div>
    )
}

export default PastBookings
