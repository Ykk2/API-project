import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { getSpot } from "../../store/spots"
import { getReviews } from "../../store/review"
import SpotTitle from "./SpotTitle"
import SpotReviews from "./reviews"
import SpotImages from "./SpotImages"
import SpotDetails from "./SpotDetails.js"

const SpotPage = () => {

    const dispatch = useDispatch()

    const { spotId } = useParams()

    const spot = useSelector(state => state.spots.spot)
    const reviews = useSelector(state => Object.values(state.reviews))
    console.log(spot)
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        dispatch(getSpot(spotId))
        dispatch(getReviews(spotId))
    }, [dispatch, spotId])

    return (
        <div className="spot-page">
            <SpotTitle spot={spot}/>
            <SpotImages spotImages={spot.SpotImages}/>
            <SpotDetails spot={spot}/>
            <SpotReviews reviews={reviews}/>
        </div>
    )
}

export default SpotPage
