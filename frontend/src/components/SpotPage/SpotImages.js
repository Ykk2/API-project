

import "./temp.css"

const SpotImages = ({spotImages}) => {

    return (
        <div className="spot-images-container">
            {spotImages?.map((img, i) =>
                <div id={`spotimage-${i}`}>
                    <img src={img.url} className="spotimage"/>
                </div>
            )}
        </div>
    )
}

export default SpotImages
