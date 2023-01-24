import CalendarComponent from "./Calendar"





const BookingForm = ({bookings, spot}) => {


    return (
        <div className="booking-form-container">
            <div>
                <span>${spot.price} <span>night</span> </span>
                <span>{`★ ${spot.avgStarRating ? Number(spot.avgStarRating).toFixed(1) : "New" }`} · <span>{`${spot.numReviews} reviews`} </span></span>

            </div>
            <div>
                <CalendarComponent bookings={bookings} spot={spot}/>
            </div>
            <button>Reserve</button>
        </div>
    )
}

export default BookingForm
