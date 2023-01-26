import { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { useDispatch } from "react-redux"
import { newBooking } from "../../store/booking"
import CalendarComponent from "./Calendar"
import "./bookingform.css"




const BookingForm = ({ bookings, spot }) => {

    const dispatch = useDispatch()
    const history = useHistory()

    const [ready, setReady] = useState(false)
    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState()
    const [nights, setNights] = useState(null)

    useEffect(() => {
        if (ready) {
            const days = endDate.diff(startDate, 'days')
            setNights(days)
        }
    }, [ready])


    const handleOpenClick = (e) => {
        e.preventDefault()
        document.getElementById('startDateId').focus()

    }

    const handleButtonClick = (e) => {
        e.preventDefault()
        dispatch(newBooking({startDate, endDate, spotId: spot.id}))
        history.push('/')
    }

    return (
        <div className="booking-form-container">
            <div>
                <span>${spot.price} <span>night</span> </span>
                {
                spot.numReviews > 0 ?
                <span>{`★ ${spot.avgStarRating ? Number(spot.avgStarRating).toFixed(1) : "New" }`} · {spot.numReviews} {`${spot.numReviews === 1 ? "review" : "reviews"}`}</span>
                :
                <span>New</span>
            }
            </div>

            <CalendarComponent bookings={bookings} spot={spot} setReady={setReady} startDate={startDate} endDate={endDate} setStartDate={setStartDate} setEndDate={setEndDate}/>
            {
                ready ?
                <button onClick={handleButtonClick}>Reserve</button>
                :
                <button onClick={handleOpenClick}>Check Availability</button>
            }
            {
                ready ?
                <div className="booking-calculations">
                    <div>${spot.price} x {nights} nights <span>${spot.price * nights}</span></div>
                    <div>Cleaning fee <span>$100</span></div>
                    <div>Service Fee <span>${((spot.price * nights) * 0.14).toFixed(0)}</span></div>
                    <div>Total before taxes<span>${+(spot.price * nights) + +((spot.price * nights) * 0.14).toFixed(0) + 100}</span></div>
                </div>
                :
                null
            }
        </div>
    )
}

export default BookingForm
