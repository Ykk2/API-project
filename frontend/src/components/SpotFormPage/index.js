import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { newSpot } from '../../store/spots';

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

    const updateAddress = (e) => setAddress(e.target.value)
    const updateCity = (e) => setCity(e.target.value)
    const updateState = (e) => setState(e.target.value)
    const updateCountry = (e) => setCountry(e.target.value)
    const updateLat = (e) => setLat(e.target.value)
    const updateLng = (e) => setLng(e.target.value)
    const updateName = (e) => setName(e.target.value)
    const updateDescription = (e) => setDescription(e.target.value)
    const updatePrice = (e) => setPrice(e.target.value)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const payload = {address, city, state, country, lat, lng, name, description, price}


        let spot = await dispatch(newSpot(payload))

        if (spot) {
            history.push(`/spots/${spot.id}`)
        }
    }

    const handleCancelClick = (e) => {
        e.preventDefault()
        history.push('/')
    }

    return (
        <section className="new-spot-form-container">
            <form className="create-spot-form" onSubmit={handleSubmit}>
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
                <button type="submit">Submit</button>
                <button type="button" onClick={handleCancelClick}>Cancel</button>
            </form>
        </section>
    )

}

export default CreateSpotForm
