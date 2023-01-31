import { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { removeSpot, updateSpot } from "../../store/spots";
import { getUserSpots } from "../../store/spots"
import EditSpotModal from "../EditSpotModal";
import moment from "moment";




const ListingCard = ({ listing }) => {

    const dispatch = useDispatch()
    const [showModal, setShowModal] = useState(false);

    const handleEditClick = (e) => {
        setShowModal(true)
    }

    const handleDeleteClick = (e) => {
        e.preventDefault()
        dispatch(removeSpot(listing.id))
    }

    return (
        <Fragment >
            <div className="listings-card">
                <div id="listings-col-1" className="listings-card-left-flex">
                    <img className="listing-img" src={listing.previewImage} />
                    <span id="odd"> {listing.name}</span>
                </div>
                <span id="listings-col-2"><i class="fa-solid fa-circle-check"></i> Listed</span>
                <span id="listings-col-3">${listing.price}/night</span>
                <span id="listings-col-4">{listing.city}, {listing.state}</span>
                <span id="listings-col-5">
                    <button onClick={handleEditClick}>Edit</button>
                    <button onClick={handleDeleteClick}>Delete</button>
                </span>
                <span id="listings-col-6">{moment(listing.updatedAt).format('MMM D YYYY')}</span>
            </div>
            <EditSpotModal showModal={showModal} setShowModal={setShowModal} spot={listing}/>
        </Fragment>
    )
}

export default ListingCard
