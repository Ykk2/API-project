

const SpotReviews = ({reviews, spot}) => {


    const dateConverter = (date) => {
        const newDate = new Date(date)
        return newDate.toLocaleString('default', {month: 'short', year: 'numeric'})
    }

    return (
        <div className="reviews-container">
            <div className="reviews-container-top">
            {
                reviews.length > 0 ?
                <span>{`★ ${spot.avgStarRating ? Number(spot.avgStarRating).toFixed(1) : "New" }`} · {spot.numReviews} {`${spot.numReviews === 1 ? "review" : "reviews"}`}</span>
                :
                <span>No reviews yet</span>
            }
            </div>
            {reviews.map(review =>
                <div className="review-card">
                    <div>{review.User.firstName}</div>
                    <div>{dateConverter(review.createdAt)}</div>
                    <div>{review.review}</div>
                </div>
            )}
        </div>
    )
}

export default SpotReviews
