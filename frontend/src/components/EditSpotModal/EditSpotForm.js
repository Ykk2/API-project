import { useState, useEffect, Fragment } from "react"
import { useHistory } from "react-router-dom"
import { useDispatch } from "react-redux"
import { updateSpot, editSpotImage, getUserSpots } from "../../store/spots"
import placeholder from '../../assets/icons/picture-default.svg'
import './EditSpotForm.css'

const EditSpotForm = ({ spot, setShowModal }) => {

    const history = useHistory()
    const dispatch = useDispatch()

    const images = spot.SpotImages

    const [name, setName] = useState(spot.name)
    const [description, setDescription] = useState(spot.description)
    const [price, setPrice] = useState(spot.price)

    const [img1, setImg1] = useState(images[0].url)
    const [img2, setImg2] = useState(images[1].url)
    const [img3, setImg3] = useState(images[2].url)
    const [img4, setImg4] = useState(images[3].url)
    const [img5, setImg5] = useState(images[4].url)


    //useState for editting spots
    const [errors, setErrors] = useState([])
    const [showErrors, setShowErrors] = useState(false)
    const [passed, setPassed] = useState(false)

    useEffect(() => {
        let error = []
        if (!name) error.push("Please provide a name")
        if (!price) error.push("Please provide a price")
        if (name && name?.length > 80) error.push("Please keep name under 30 characters")
        if (description?.length < 20) error.push("Please provide more description")
        if (price < 0) error.push("You cannot have a negative amount for price")
        if (!img1 || !img2 || !img3 || !img4 || !img5) error.push("All fives images are required")
        if ((!img1.includes("https://") && img1) ||
            (!img2.includes("https://") && img2) ||
            (!img3.includes("https://") && img3) ||
            (!img4.includes("https://") && img4) ||
            (!img5.includes("https://") && img5)) error.push("Sorry, we are only accepting URL links at the moment")

        setErrors(error)
        if (error.length === 0) {
            setShowErrors(false)
            setPassed(true)
        }
        else  setPassed(false)

    }, [name, description, price, img1, img2, img3, img4, img5])

    const updateName = (e) => setName(e.target.value)
    const updateDescription = (e) => setDescription(e.target.value)
    const updatePrice = (e) => setPrice(e.target.value)
    const updateImg1 = (e) => setImg1(e.target.value)
    const updateImg2 = (e) => setImg2(e.target.value)
    const updateImg3 = (e) => setImg3(e.target.value)
    const updateImg4 = (e) => setImg4(e.target.value)
    const updateImg5 = (e) => setImg5(e.target.value)

    //save click for updating spot
    const handleSpotSaveClick = async (e) => {
        e.preventDefault()
        setShowErrors(true)
        if (passed === true) {
            const payload = { address:spot.address, city:spot.city, state:spot.state, country:spot.country, lat:spot.lat, lng:spot.lng, name, description, price }

            const image1 = {imageId : images[0].id, url: img1, spotId: spot.id}
            const image2 = {imageId : images[1].id, url: img2, spotId: spot.id}
            const image3 = {imageId : images[2].id, url: img3, spotId: spot.id}
            const image4 = {imageId : images[3].id, url: img4, spotId: spot.id}
            const image5 = {imageId : images[4].id, url: img5, spotId: spot.id}

            dispatch(updateSpot(spot.id, payload))
            dispatch(editSpotImage(image1))
            dispatch(editSpotImage(image2))
            dispatch(editSpotImage(image3))
            dispatch(editSpotImage(image4))
            dispatch(editSpotImage(image5))
            setPassed(false)
            setShowModal(false)
            dispatch(getUserSpots())
        }
    }

    //cancel click for cancelling updating spot
    const handleSpotCancelClick = (e) => {
        e.preventDefault()
        setShowModal(false)
    }

    return (
        <div className="edit-spot-form-container">
            <div>Edit your listing</div>
            <div className="edit-spot-images-grid">
                <img id="spotimage-0" src={img1 ? img1 : placeholder} />
                <img id="spotimage-3" src={img2 ? img2 : placeholder} />
                <img id="spotimage-1" src={img3 ? img3 : placeholder} />
                <img id="spotimage-4" src={img4 ? img4 : placeholder} />
                <img id="spotimage-2" src={img5 ? img5 : placeholder} />
            </div>
            <form className="edit-spot-form">
                <div className="edit-spot-form-input-container">
                    <label>Name</label>
                    <input
                        type="text"
                        placeholder="name"
                        required
                        value={name}
                        onChange={updateName}
                    />
                </div>
                <div className="edit-spot-form-input-container">
                    <label>Description</label>
                    <input
                        type="text"
                        placeholder="description"
                        required
                        value={description}
                        onChange={updateDescription}
                    />
                </div>
                <div className="edit-spot-form-input-container">
                    <label>Price</label>
                    <input
                        type="integer"
                        placeholder="price"
                        min="0"
                        required
                        value={price}
                        onChange={updatePrice}
                    />
                </div>
                <div className="edit-spot-form-image-inputs">
                    <div className="edit-spot-form-img-input-container">
                        <label>Main image</label>
                        <input
                            type='text'
                            placeHolder="main image"
                            required
                            value={img1}
                            onChange={updateImg1}
                        />
                    </div>

                    <div className="edit-spot-form-img-input-container">
                        <label>Image 2</label>
                        <input
                            type='text'
                            placeHolder="image 2"
                            required
                            value={img2}
                            onChange={updateImg2}
                        />
                    </div>
                    <div className="edit-spot-form-img-input-container">
                        <label>Image 3</label>
                        <input
                            type='text'
                            placeHolder="image 3"
                            required
                            value={img3}
                            onChange={updateImg3}
                        />
                    </div>
                    <div className="edit-spot-form-img-input-container">
                        <label>Image 4</label>
                        <input
                            type='text'
                            placeHolder="image 4"
                            required
                            value={img4}
                            onChange={updateImg4}
                        />
                    </div>
                    <div className="edit-spot-form-img-input-container">
                        <label>Image 5</label>
                        <input
                            type='text'
                            placeHolder="image 5"
                            required
                            value={img5}
                            onChange={updateImg5}
                        />
                    </div>
                </div>
            </form>
            <div className="edit-spot-form-errors">
                {
                    errors.length > 0 ?
                    errors.map(e =>
                        <div>{e}</div>)
                        :
                    null
                }
            </div>
            <div className="edit-spot-button-container">
                <button type="button" onClick={handleSpotCancelClick}>Cancel</button>
                <button type="button" onClick={handleSpotSaveClick}>Save</button>
            </div>

        </div>
    )
}





export default EditSpotForm
