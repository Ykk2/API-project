import { Fragment, useState } from "react"
import CalendarComponent from "./Calendar"
import "./bookingform.css"




const BookingForm = ({ bookings, spot }) => {

    const [ready, setReady] = useState(false)

    return (
        <div className="booking-form-container">
            <div>
                <span>${spot.price} <span>night</span> </span>
                <span>{`★ ${spot.avgStarRating ? Number(spot.avgStarRating).toFixed(1) : "New"}`} · <span>{`${spot.numReviews} reviews`} </span></span>

            </div>

            <CalendarComponent bookings={bookings} spot={spot} setReady={setReady} />

            <button>{ready ? "Reserve" : "Check Availability" }</button>
            {
                ready ?
                <Fragment>
                    <div>${spot.price} x { } nights <span>${spot.price * 3}</span></div>
                    <div>Cleaning fee <span>$100</span></div>
                    <div>Service Fee <span>${((spot.price * 3) * 0.14).toFixed(0)}</span></div>
                    <div> Total before taxes <span>${+(spot.price * 3) + +((spot.price * 3) * 0.14).toFixed(0) + 100}</span></div>
                </Fragment>
                :
                null
            }
        </div>
    )
}

export default BookingForm
