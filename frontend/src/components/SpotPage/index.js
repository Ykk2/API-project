import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { getSpot } from "../../store/spots"
import { getReviews } from "../../store/review"
import { getSpotBookings } from "../../store/booking"
import SpotTitle from "./SpotTitle"
import SpotReviews from "./reviews"
import SpotImages from "./SpotImages"
import SpotDetails from "./SpotDetails.js"
import BookingForm from '../Bookings';
import Maps from '../Maps';


const SpotPage = () => {

    const dispatch = useDispatch()

    const { spotId } = useParams()

    const spot = useSelector(state => state.spots.spot)
    const reviews = useSelector(state => Object.values(state.reviews))
    const bookings = useSelector(state => Object.values(state.bookings.spotBookings))

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        dispatch(getSpot(spotId))
        dispatch(getReviews(spotId))
        dispatch(getSpotBookings(spotId))
    }, [dispatch, spotId])

    return (
        <div className="spot-page">
            <SpotTitle spot={spot}/>
            <SpotImages spotImages={spot.SpotImages}/>
            <div className="booking-flex">
                <SpotDetails spot={spot}/>
                <BookingForm bookings={bookings} spot={spot}/>
            </div>
            <SpotReviews reviews={reviews} spot={spot}/>
            <div className="map-divider">Where you'll be</div>
            <Maps spot={spot}/>
        </div>
    )
}

export default SpotPage
