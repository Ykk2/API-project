import { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { useDispatch } from "react-redux"
import { updateSpot } from "../../store/spots"
import Geocode from 'react-geocode'

const EditSpotForm = ({ spot, setShowModal }) => {

    const history = useHistory()
    const dispatch = useDispatch()

    const [address, setAddress] = useState(spot.address)
    const [city, setCity] = useState(spot.city)
    const [state, setState] = useState(spot.state)
    const [country, setCountry] = useState(spot.country)
    const [lat, setLat] = useState(spot.lat)
    const [lng, setLng] = useState(spot.lng)
    const [name, setName] = useState(spot.name)
    const [description, setDescription] = useState(spot.description)
    const [price, setPrice] = useState(spot.price)

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

    //save click for updating spot
    const handleSpotSaveClick = async (e) => {
        e.preventDefault()
        if (passed === true) {

            const payload = { address, city, state, country, lat, lng, name, description, price }

            getGeo().then(dispatch(updateSpot(spot.id, payload)))
            history.push(`/spots/${spot.id}`)
            setPassed(false)
        }
    }

    //cancel click for cancelling updating spot
    const handleSpotCancelClick = (e) => {
        e.preventDefault()
        setShowModal(false)
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
        <div>
            <div>Edit your listing</div>
            <div>
                <form className="edit-spot-form">
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
                    <input
                        type="text"
                        placeholder="name"
                        required
                        value={name}
                        onChange={updateName}
                    />
                    <input
                        type="text"
                        placeholder="description"
                        required
                        value={description}
                        onChange={updateDescription}
                    />
                    <input
                        type="integer"
                        placeholder="price"
                        min="0"
                        required
                        value={price}
                        onChange={updatePrice}
                    />
                </form>
                <div className="edit-spot-button-container">
                    <button type="button" onClick={handleSpotCancelClick}>Cancel</button>
                    <button type="button" onClick={handleSpotSaveClick}>Save</button>
                </div>
            </div>
        </div>
    )
}





export default EditSpotForm
