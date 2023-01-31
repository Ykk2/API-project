


const SpotTitle = ({spot}) => {

    return (
        <div className="spotTitle">
                <h2>{spot?.name}</h2>
                <span>{`★ ${spot.avgStarRating ? Number(spot.avgStarRating).toFixed(1) : "New" }`} · {spot.numReviews} {`${spot.numReviews === 1 ? "review" : "reviews"}`} · {spot?.city}, {spot?.state}, {spot?.country}</span>
        </div>
    )
}

export default SpotTitle
