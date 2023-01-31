import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getUserSpots } from "../../store/spots"
import ListingCard from "./ListingCard";
import './listings.css'


const Listings = () => {

    const dispatch = useDispatch()
    const spots = useSelector(state => Object.values(state.spots.userSpots))

    useEffect(() => {
        dispatch(getUserSpots())
    }, [])

    return (
        <div className="listings-container">
            <div>{spots.length} listings</div>
            <div className="listings-header">
                <span id="listings-col-1">Listing</span>
                <span id="listings-col-2">Status</span>
                <span id="listings-col-3">Price</span>
                <span id="listings-col-4">Location</span>
                <span id="listings-col-5">Manage</span>
                <span id="listings-col-6">Last Modified</span>
            </div>
            {spots.map(listing =>
                <ListingCard listing={listing}/>
            )}
        </div>
    )
}

export default Listings
