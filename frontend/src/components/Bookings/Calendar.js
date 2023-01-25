import React from 'react'
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import moment from "moment";
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { DateRangePicker } from 'react-dates';
import { Fragment } from 'react';
import "./calendar.css"


const CalendarComponent = ({ bookings, spot }) => {

    const dispatch = useDispatch()

    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState()
    const [focusedInput, setFocusedInput] = useState(null)
    const [bookedDates, setBookedDates] = useState([])
    const [blockedDates, setBlockedDates] = useState([])
    const [days, setDays] = useState()

    useEffect(() => {
        existingBookings(bookings)
    }, [dispatch, bookings])

    useEffect(() => {
        blockedDates.push(bookedDates)
    }, [dispatch, bookedDates])

    const handleDateChanges = ({ startDate, endDate }) => {
        setStartDate(startDate)
        setEndDate(endDate)
    }

    const blockDates = (day) => {
        const blockedDates = new Set([...bookedDates])
        return blockedDates.has(moment(day).format('YYYY-MM-DD'))
    }

    // add custom clear. input is right after div classname DateInput

    const existingBookings = (bookings) => {

        bookings.forEach(booking => {
            const { startDate, endDate } = booking
            let date = new Date(startDate)
            let dateEnd = new Date(endDate)
            while (date < dateEnd) {
                bookedDates.push(moment(new Date(date + 1)).format('YYYY-MM-DD'))
                date.setDate(date.getDate() + 1)
            }
        })
    }

    const checkGapDays = (day) => {
        if (day > moment()) {
            const blockedDates = new Set([...bookedDates])
            return blockedDates.has(moment(day).add(1, 'days').format('YYYY-MM-DD'))
        }
    }

    const validatedDates = (day) => {

        if (!startDate) {
            return moment(startDate).diff(day, 'days') > 0
        }
        if (startDate) {

            const blockedDates = [...bookedDates]
            let earliestBlockedDate = blockedDates[0]

            for (let i = 0; i < blockedDates.length; i++) {
                if (moment(blockedDates[i]) > moment(startDate)) {
                    earliestBlockedDate = blockedDates[i]
                    break
                }
            }
            if (moment(startDate).diff(earliestBlockedDate, 'days') > 0) {
                return moment(startDate).diff(day, 'days') > 0
            }
            return moment(startDate).diff(day, 'days') > 0 || moment(day).format('YYYY-MM-DD') > earliestBlockedDate
        }
    }


    const test = (e) => {
        return (
            <Fragment>

                <div className="calendar-info-top">
                    <span>Select Dates</span>
                    <span> Add your travel dates for exact pricing</span>
                </div>
                <div className="calendar-info-bottom">
                    <button>Clear dates</button>
                    <button>Close</button>
                </div>

            </Fragment>
        )
    }



    return (
        <div className="calendar-container">
            <DateRangePicker
                startDate={startDate} // momentPropTypes.momentObj or null,
                startDateId="startDateId" // PropTypes.string.isRequired,
                endDate={endDate} // momentPropTypes.momentObj or null,
                endDateId="endDateId" // PropTypes.string.isRequired,
                onDatesChange={handleDateChanges} // PropTypes.func.isRequired,
                focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                onFocusChange={focusedInput => setFocusedInput(focusedInput)}
                showClearDates={true}
                reopenPickerOnClearDates={startDate}
                minimumNights={1}
                minDate={moment(new Date())}
                isDayBlocked={blockDates}
                startDatePlaceholderText="Check-in"
                endDatePlaceholderText="Check-out"
                hideKeyboardShortcutsPanel={true}
                isDayHighlighted={checkGapDays}
                isOutsideRange={validatedDates}
                calendarInfoPosition={"bottom"}
                renderCalendarInfo={test}

            />

            <div>${spot.price} x { } nights <span>${spot.price * 3}</span></div>
            <div>Cleaning fee <span>$100</span></div>
            <div>Service Fee <span>${((spot.price * 3) * 0.14).toFixed(0)}</span></div>
            <div> Total before taxes <span>${+(spot.price * 3) + +((spot.price * 3) * 0.14).toFixed(0) + 100}</span></div>
        </div>
    )
}


export default CalendarComponent
