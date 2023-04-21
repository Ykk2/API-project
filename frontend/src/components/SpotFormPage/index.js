import { Fragment, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as spotActions from "../../store/spots";
import Geocode from 'react-geocode'
import './SpotFormPage.css';

const CreateSpotForm = () => {

    const dispatch = useDispatch()
    const history = useHistory()

    const [address, setAddress] = useState()
    const [city, setCity] = useState()
    const [state, setState] = useState()
    const [country, setCountry] = useState()
    const [lat, setLat] = useState()
    const [lng, setLng] = useState()
    const [name, setName] = useState()
    const [description, setDescription] = useState()
    const [price, setPrice] = useState()
    const [img1, setImg1] = useState("")
    const [img2, setImg2] = useState("")
    const [img3, setImg3] = useState("")
    const [img4, setImg4] = useState("")
    const [img5, setImg5] = useState("")
    const [errors, setErrors] = useState([])
    const [passed, setPassed] = useState(false)
    const [showErrors, setShowErrors] = useState(false)

    const updateAddress = (e) => setAddress(e.target.value)
    const updateCity = (e) => setCity(e.target.value)
    const updateState = (e) => setState(e.target.value)
    const updateCountry = (e) => setCountry(e.target.value)
    const updateName = (e) => setName(e.target.value)
    const updateDescription = (e) => setDescription(e.target.value)
    const updatePrice = (e) => setPrice(e.target.value)
    const updateImg1 = (e) => setImg1(e.target.value)
    const updateImg2 = (e) => setImg2(e.target.value)
    const updateImg3 = (e) => setImg3(e.target.value)
    const updateImg4 = (e) => setImg4(e.target.value)
    const updateImg5 = (e) => setImg5(e.target.value)

    const addressRegex = /^[a-zA-Z0-9\s\,\''\-]*$/
    const alphaRegex = /^[a-zA-Z ]*$/

    useEffect(() => {

        let error = []

        if (!addressRegex.test(address)) error.push("Please enter a valid address")
        if (!alphaRegex.test(city)) error.push("City cannot contain numbers")
        if (!alphaRegex.test(state)) error.push("State cannot contain numbers")
        if (!alphaRegex.test(country)) error.push("Country cannot contain numbers")

        if (name && name?.length > 30) error.push("Please keep name under 30 characters")
        if (description?.length < 20) error.push("Please provide more description")
        if (price < 0) error.push("You cannot have a negative dollar amount for price")
        if (!img1 || !img2 || !img3 || !img4 || !img5) error.push("All fives images are required")
        if ((!img1.includes("https://") && img1) ||
            (!img2.includes("https://") && img2) ||
            (!img3.includes("https://") && img3) ||
            (!img4.includes("https://") && img4) ||
            (!img5.includes("https://") && img5)) error.push("Sorry, we are only accepting URL links at the moment")
        setErrors(error)
        setPassed(false)
        if (error.length === 0) setPassed(true)


    }, [address, city, state, country, lat, lng, name, description, price, img1, img2, img3, img4, img5])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setShowErrors(true)
        if (passed === true) {
            setShowErrors(false)
            const payload = { address, city, state, country, lat, lng, name, description, price }
            const preview = true

            let spot = await dispatch(spotActions.newSpot(payload))
            const spotId = spot.id
            dispatch(spotActions.addSpotImage({ spotId, url:img1, preview }))
            dispatch(spotActions.addSpotImage({ spotId, url:img2, preview }))
            dispatch(spotActions.addSpotImage({ spotId, url:img3, preview }))
            dispatch(spotActions.addSpotImage({ spotId, url:img4, preview }))
            dispatch(spotActions.addSpotImage({ spotId, url:img5, preview }))

            if (spot) {
                history.push(`/spots/${spot.id}`)
            }
        }
    }

    const handleCancelClick = (e) => {
        e.preventDefault()
        history.push('/')
    }
    ////////////////////////////////////////////////////////////////////////////////////////

    Geocode.setApiKey(process.env.REACT_APP_GOOGLE_API);
    Geocode.setLanguage('en');
    Geocode.setLocationType('ROOFTOP');
    Geocode.enableDebug();
    useEffect(() => {
        const makeMap = () => {
            Geocode.fromAddress(`${city}`).then(
                (response) => {
                    const { lat, lng } = response.results[0].geometry.location;
                    setLat(lat)
                    setLng(lng)
                }
            );
        };
        if (city && passed === true) makeMap()
    }, [city, passed]);


    return (
        <section className="new-spot-form-container">
            <form className="create-spot-form" onSubmit={handleSubmit}>
                <ul>
                    {
                        showErrors ?
                        <Fragment>
                            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                        </Fragment>
                        :
                        null
                    }
                </ul>
                <input
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
                />

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
                <input
                    type='text'
                    placeHolder="image 5"
                    required
                    value={img1}
                    onChange={updateImg1}
                />
                <input
                    type='text'
                    placeHolder="image 5"
                    required
                    value={img2}
                    onChange={updateImg2}
                />
                <input
                    type='text'
                    placeHolder="image 5"
                    required
                    value={img3}
                    onChange={updateImg3}
                />
                <input
                    type='text'
                    placeHolder="image 5"
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
                <button type="submit">Submit</button>
                <button type="button" onClick={handleCancelClick}>Cancel</button>
            </form>
        </section>
    )

}

export default CreateSpotForm
