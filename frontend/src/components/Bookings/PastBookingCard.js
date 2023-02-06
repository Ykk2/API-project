import moment from "moment";
import { Modal } from '../../context/Modal'
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import EditReview from '../EditReview';
import NewReview from "../CreateReviewModal";

const PastBookingsCard = ({ booking, spots, reviews }) => {

    const dispatch = useDispatch()

    const [showModal, setShowModal] = useState(false)
    const [editReview, setEditReview] = useState(false)

    const spot = spots[booking.spotId]
    const review = reviews.find(review => review.spotId == booking.spotId)

    const handleNewReviewClick = (e) => {
        e.preventDefault()
        setShowModal(true)
        setEditReview(false)
    }

    const handleEditReviewClick = (e) => {
        e.preventDefault()
        setShowModal(true)
        setEditReview(true)
    }

    useEffect(() => {
        if (review) setEditReview(true)
    }, [dispatch, review])

    return (
        <div className="upcoming-booking-card">

            <div className="upcoming-booking-card-left">
                <div>
                    <div>
                        {spot?.name}
                    </div>
                    <div>
                        Entire home hosted by {spot?.Owner?.firstName}
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
                        <div>{spot?.address} </div>
                        <div>{spot?.city} {spot?.state} </div>
                        <div>{spot?.country}</div>
                    </div>

                        {
                            review ?
                            <button  className="review-handler-buttons" onClick={handleEditReviewClick}>Edit Review</button>
                            :
                            <button  className="review-handler-buttons" onClick={handleNewReviewClick}>Leave Review</button>
                        }

                </div>
            </div>
            <div className="upcoming-booking-card-right">
                <img src={spots[booking.spotId]?.previewImage}></img>
            </div>

            {editReview ?
            showModal &&
            <Modal onClose={() => setShowModal(false)}>
                <EditReview currentReview={review} spot={spot} setShowModal={setShowModal}/>
            </Modal>
            :
            showModal &&
            <Modal onClose={() => setShowModal(false)}>
                <NewReview spot={spot} setShowModal={setShowModal}/>
            </Modal>
            }
        </div>
    )
}

export default PastBookingsCard
