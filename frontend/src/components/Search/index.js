import { Fragment, useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { getSpots } from '../../store/spots'
import { NavLink } from 'react-router-dom'
import './searchbar.css'


const SearchBar = () => {

    const dispatch = useDispatch()

    const spots = useSelector(state => Object.values(state.spots.spots))
    const [results, setResults] = useState([])
    const [search, setSearch] = useState()
    const [close, setClose] = useState(false)

    useEffect(() => {
        if (!spots.length) {
            dispatch(getSpots())
        }
    }, [dispatch, spots.length])

    useEffect(() => {
        const clicked = () => (setClose(true))
        window.addEventListener('click', clicked)
    })

    const searchFilter = (e) => {
        const search = e.target.value
        setSearch(search)
        setClose(false)
        const filter = spots.filter(spot => {
            return spot.name.toLowerCase().includes(search.toLowerCase()) ||
                   spot.city.toLowerCase().includes(search.toLowerCase()) ||
                   spot.country.toLowerCase().includes(search.toLowerCase()) ||
                   spot.state.toLowerCase().includes(search.toLowerCase())
        })
        if (!search) {
            setResults()
        } else {
            setResults(filter.splice(0, 5))
        }
    }


    const closeSearch = (e) => {
        e.preventDefault()
        setSearch("")
        setResults()
    }

    return (
        <div className="search-bar">
            <input
                type="text"
                className="searchInput"
                onChange={searchFilter}
                value={search}
                placeholder="Search destinations"
                >
            </input>
            <div>
            </div>
            <div className="search-results">
                {!close && results && (
                    <Fragment>
                        {results.map((result, idx) =>
                        <div onClick={closeSearch}>
                            <NavLink key={idx} to={`/spots/${result.id}`}>
                                <img src={result.previewImage}/>
                                <div>{result.name}</div>
                            </NavLink>
                        </div>
                        )}
                    </ Fragment>
                )}
            </div>
        </div>
    )
}

export default SearchBar
