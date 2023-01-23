import React from 'react'
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import moment from "moment";
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { DateRangePicker } from 'react-dates';

const CalendarComponent = ({bookings}) => {

    const dispatch = useDispatch()

    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState()
    const [focusedInput, setFocusedInput] = useState(null)
    const [bookedDates, setBookedDates] = useState([])
    const [blockedDates, setBlockedDates] = useState([])


    useEffect(() => {
        existingBookings(bookings)
    }, [dispatch, bookings])

    useEffect(() => {
        blockedDates.push(bookedDates)
    }, [dispatch, bookedDates])

    const handleDateChanges = ({startDate, endDate}) => {
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
            const {startDate, endDate} = booking
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

        if(!startDate) {
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
            return moment(startDate).diff(day, 'days') > 0 || moment(day).format('YYYY-MM-DD') > earliestBlockedDate
        }
    }

    return (
        <>
            <DateRangePicker
                startDate={startDate} // momentPropTypes.momentObj or null,
                startDateId="startDateId" // PropTypes.string.isRequired,
                endDate={endDate} // momentPropTypes.momentObj or null,
                endDateId="endDateId" // PropTypes.string.isRequired,
                onDatesChange={handleDateChanges} // PropTypes.func.isRequired,
                focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                onFocusChange={focusedInput => setFocusedInput(focusedInput)}
                showClearDates={true}
                minimumNights={1}
                minDate={moment(new Date())}
                isDayBlocked={blockDates}
                startDatePlaceholderText="start date"
                endDatePlaceholderText="end date"
                hideKeyboardShortcutsPanel={true}
                isDayHighlighted={checkGapDays}
                isOutsideRange={validatedDates}
            />
        </>
    )
}


export default CalendarComponent
