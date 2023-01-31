




const SpotDetails = ({spot}) => {

    return (
        <div className="spotDetails">
            <div className="spotDetails-top">
                Entire home hosted by {spot?.Owner?.firstName}
            </div>
            <div className="spotDetails-bottom">
                <div>
                    <span>air</span><span>cover</span>
                </div>
                <div>
                    Every booking includes free protection from Host cancellations, listing inaccuracies, and other issues like trouble checking in.
                </div>
                <div>
                    {spot.description}
                </div>
            </div>
        </div>
    )
}


export default SpotDetails
