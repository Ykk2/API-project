import { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { newBooking } from "../../store/booking"
import { Modal } from '../../context/Modal'
import LoginForm from "../LoginFormModal/LoginForm"
import moment from "moment";
import CalendarComponent from "./Calendar"
import "./bookingform.css"



const BookingForm = ({ bookings, spot }) => {

    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(state => state.session.user)

    const [ready, setReady] = useState(false)
    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState()
    const [nights, setNights] = useState(null)

    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        if (ready) {
            const days = endDate.diff(startDate, 'days')
            setNights(days)
        }
    }, [ready])


    const handleOpenClick = (e) => {
        e.preventDefault()
        if (!user) {
            return setShowModal(true)
        }
        document.getElementById('startDateId').focus()
    }

    const handleButtonClick = (e) => {
        e.preventDefault()
        dispatch(newBooking({
            startDate: moment(startDate).format("MM-DD-YYYY"),
            endDate: moment(endDate).format("MM-DD-YYYY"), spotId: spot.id
        })).then(
            history.push(`/${user.username}/bookings`)
        )
    }

    return (
        <div className="booking-form-container">
            <div>
                <span>${spot.price} <span>night</span> </span>
                {
                    spot.numReviews > 0 ?
                        <span>{`★ ${spot.avgStarRating ? Number(spot.avgStarRating).toFixed(1) : "New"}`} · {spot.numReviews} {`${spot.numReviews === 1 ? "review" : "reviews"}`}</span>
                        :
                        <span>New</span>
                }
            </div>

            <CalendarComponent bookings={bookings} spot={spot} setReady={setReady} startDate={startDate} endDate={endDate} setStartDate={setStartDate} setEndDate={setEndDate} />
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
            {
                showModal &&
                <Modal onClose={() => setShowModal(false)}>
                    <LoginForm setShowModal={setShowModal} />
                </Modal>
            }
        </div>
    )
}

export default BookingForm
