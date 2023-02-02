import { useState, useEffect, Fragment } from "react"
import { useHistory } from "react-router-dom"
import { useDispatch } from "react-redux"
import { updateSpot } from "../../store/spots"
import Geocode from 'react-geocode'
import placeholder from '../../assets/icons/picture-default.svg'
import './EditSpotForm.css'

const EditSpotForm = ({ spot, setShowModal }) => {

    const history = useHistory()
    const dispatch = useDispatch()

    const images = spot.SpotImages

    const [address, setAddress] = useState(spot.address)
    const [city, setCity] = useState(spot.city)
    const [state, setState] = useState(spot.state)
    const [country, setCountry] = useState(spot.country)
    const [lat, setLat] = useState(spot.lat)
    const [lng, setLng] = useState(spot.lng)
    const [name, setName] = useState(spot.name)
    const [description, setDescription] = useState(spot.description)
    const [price, setPrice] = useState(spot.price)

    const [img1, setImg1] = useState(images[0].url)
    const [img2, setImg2] = useState(images[1].url)
    const [img3, setImg3] = useState(images[2].url)
    const [img4, setImg4] = useState(images[3].url)
    const [img5, setImg5] = useState(images[4].url)

    const [editImage, setEditImage] = useState(false)


    //useState for editting spots
    const [errors, setErrors] = useState([])
    const [passed, setPassed] = useState(false)

    useEffect(() => {

        let error = []

        const addressRegex = /^[a-zA-Z0-9\s\,\''\-]*$/
        const alphaRegex = /^[a-zA-Z ]*$/

        if (!addressRegex.test(address)) error.push("Please enter a valid address")
        if (!alphaRegex.test(city)) error.push("City cannot contain numbers")
        if (!alphaRegex.test(state)) error.push("State cannot contain numbers")
        if (!alphaRegex.test(country)) error.push("Country cannot contain numbers")
        if (+lat < -90 || +lat > 90) error.push("latitude must be between -90 and 90")
        if (+lng < -180 || +lng > 180) error.push("longitude must be between -180 and 180")
        if (name && name?.length > 30) error.push("Please keep name under 30 characters")
        if (description?.length < 20) error.push("Please provide more description")
        if (price < 0) error.push("You cannot have a negative dollar amount for price")

        setErrors(error)
        setPassed(false)

        if (error.length === 0) setPassed(true)

    }, [address, city, state, country, lat, lng, name, description, price])

    const updateAddress = (e) => setAddress(e.target.value)
    const updateCity = (e) => setCity(e.target.value)
    const updateState = (e) => setState(e.target.value)
    const updateCountry = (e) => setCountry(e.target.value)
    // const updateLat = (e) => setLat(e.target.value)
    // const updateLng = (e) => setLng(e.target.value)
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
        // if (passed === true) {

        //     const payload = { address, city, state, country, lat, lng, name, description, price }

        //     getGeo().then(dispatch(updateSpot(spot.id, payload)))
        //     history.push(`/spots/${spot.id}`)
        //     setPassed(false)
        // }
    }

    //cancel click for cancelling updating spot
    const handleSpotCancelClick = (e) => {
        e.preventDefault()
        setShowModal(false)
    }

    // add check validation before swapping over
    const handleEditImageClick = (e) => {
        e.preventDefault()
        setEditImage(true)
    }

    // add check validation before swapping over
    const handleEditDescriptionClick = (e) => {
        e.preventDefault()
        setEditImage(false)
    }

    Geocode.setApiKey(process.env.REACT_APP_GOOGLE_API);
    Geocode.setLanguage('en');
    Geocode.setLocationType('ROOFTOP');
    Geocode.enableDebug();

    // Get latitude & longitude from address
    const getGeo = () => {
        Geocode.fromAddress(`${city}, ${state}`).then(
            (response) => {
                const { lat, lng } = response.results[0].geometry.location;
                setLat(lat)
                setLng(lng)
            },
            (error) => {
                console.error(error);
            }
        );
    };


    return (
        <div className="edit-spot-form-container">
            <div>Edit your listing</div>
            <div><span onClick={handleEditImageClick}>Edit images</span><span onClick={handleEditDescriptionClick}>Edit description</span></div>
            <form className="edit-spot-form">
                <div className="edit-spot-images-grid">
                    <img id="spotimage-0" src={img1 ? img1 : placeholder} />
                    <img id="spotimage-3" src={img2 ? img2 : placeholder} />
                    <img id="spotimage-1" src={img3 ? img3 : placeholder} />
                    <img id="spotimage-4" src={img4 ? img4 : placeholder} />
                    <img id="spotimage-2" src={img5 ? img5 : placeholder} />
                </div>
                {/* <input
                        type="text"
                        placeholder="address"
                        required
                        value={address}
                        onChange={updateAddress}
                    />
                    <input
                        type="text"
                        placeholder="city"
                        required
                        value={city}
                        onChange={updateCity}
                    />
                    <input
                        type="text"
                        placeholder="state"
                        required
                        value={state}
                        onChange={updateState}
                    />
                    <input
                        type="text"
                        placeholder="country"
                        required
                        value={country}
                        onChange={updateCountry}
                    /> */}
                {/* <input
                        type="number"
                        placeholder="lat"
                        required
                        value={lat}
                        onChange={updateLat}
                    />
                    <input
                        type="number"
                        placeholder="lng"
                        required
                        value={lng}
                        onChange={updateLng}
                    /> */}
                {
                    editImage ?

                        <div className="edit-spot-form-bottom">
                            <input
                                type='text'
                                placeHolder="main image"
                                required
                                value={img1}
                                onChange={updateImg1}
                            />
                            <input
                                type='text'
                                placeHolder="image 2"
                                required
                                value={img2}
                                onChange={updateImg2}
                            />
                            <input
                                type='text'
                                placeHolder="image 3"
                                required
                                value={img3}
                                onChange={updateImg3}
                            />
                            <input
                                type='text'
                                placeHolder="image 4"
                                required
                                value={img4}
                                onChange={updateImg4}
                            />
                            <input
                                type='text'
                                placeHolder="image 5"
                                required
                                value={img5}
                                onChange={updateImg5}
                            />
                        </div>

                        :

                        <div className="edit-spot-form-bottom">
                            <label>Name</label>
                            <input
                                type="text"
                                placeholder="name"
                                required
                                value={name}
                                onChange={updateName}
                            />
                            <label>Description</label>
                            <input
                                type="text"
                                placeholder="description"
                                required
                                value={description}
                                onChange={updateDescription}
                            />
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

                }
            </form>
            <div className="edit-spot-button-container">
                <button type="button" onClick={handleSpotCancelClick}>Cancel</button>
                <button type="button" onClick={handleSpotSaveClick}>Save</button>
            </div>

        </div>
    )
}





export default EditSpotForm
