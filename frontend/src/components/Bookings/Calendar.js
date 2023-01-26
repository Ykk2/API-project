import React from 'react'
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import moment from "moment";
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { DateRangePicker } from 'react-dates';
import { Fragment } from 'react';
import "./calendar.css"


const CalendarComponent = ({ bookings, setReady, startDate, endDate, setStartDate, setEndDate }) => {

    const dispatch = useDispatch()


    const [focusedInput, setFocusedInput] = useState(null)
    const [bookedDates, setBookedDates] = useState([])
    const [blockedDates, setBlockedDates] = useState([])


    useEffect(() => {
        existingBookings(bookings)
    }, [dispatch, bookings])

    useEffect(() => {
        blockedDates.push(bookedDates)
    }, [dispatch, bookedDates])

    useEffect(() => {
        if (startDate && endDate) setReady(true)
        if (!startDate || !endDate) setReady(false)
    }, [startDate, endDate])

    useEffect(() => {
        const endInput = document.getElementById('endDateId')
        if (!startDate) {
            endInput.disabled = true

        }

    }, [startDate])



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
            return bookings.find(booking => moment(booking.startDate).diff(day, 'days') == 1)
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

    const handleClearDatesClick = (e) => {
        e.preventDefault()
        setStartDate()
        setEndDate()
        document.getElementById('startDateId').focus()
    }

    const handleCloseClick = (e) => {
        e.preventDefault()
        setFocusedInput(null)
    }


    const addInfo = (e) => {
        return (
            <Fragment>

                <div className="calendar-info-top">
                    <span>Select Dates</span>
                    <span> Add your travel dates for exact pricing</span>
                </div>
                <div className="calendar-info-bottom">
                    <button onClick={handleClearDatesClick}>Clear dates</button>
                    <button onClick={handleCloseClick}>Close</button>
                </div>

            </Fragment>
        )
    }



    return (

        <DateRangePicker
            startDate={startDate} // momentPropTypes.momentObj or null,
            startDateId="startDateId" // PropTypes.string.isRequired,
            endDate={endDate} // momentPropTypes.momentObj or null,
            endDateId="endDateId" // PropTypes.string.isRequired,
            onDatesChange={handleDateChanges} // PropTypes.func.isRequired,
            focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
            onFocusChange={focusedInput => setFocusedInput(focusedInput)}
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
            renderCalendarInfo={addInfo}
        />

    )
}


export default CalendarComponent
