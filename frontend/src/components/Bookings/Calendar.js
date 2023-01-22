
// import Calendar from "react-calendar"
// import './calendar.css'
import React from 'react'
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import moment from "moment";
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
import { HORIZONTAL_ORIENTATION, START_DATE, END_DATE } from 'react-dates/constants'

const CalendarComponent = () => {

    const dispatch = useDispatch()

    const [startDate, setStartDate] = useState(moment(new Date()))
    const [endDate, setEndDate] = useState(moment(new Date()))
    const [focusedInput, setFocusedInput] = useState(null)

    const [bookedDates, setBookedDates] = useState([])
    const [validatedDates, setValidatedDates] = useState([])

    const [blockedDates, setBlockedDates] = useState(["2023-01-24"])

    const handleDateChanges = ({startDate, endDate}) => {
        setStartDate(startDate)
        setEndDate(endDate)
    }

    const blockDates = (day) => {
        const blockingDates = new Set(bookedDates, validatedDates).flat()
        return blockingDates.some(date => moment(date).isSame(day, 'day'))
    }

    useEffect(() => {
        blockedDates.push(bookedDates, validatedDates)
    }, [dispatch, bookedDates, validatedDates])
    // let blockedDates = new Set([arr1, arr2, arr3].flat());
    // const isBlocked = (day) => blockedDates.has(moment(day).format('YYYY-MM-DD'));

    // add custom clear. input is right after div classname DateInput
    //create a function to calculate when user selects a day 1 day from a check in date that then disable it
    // create a function to disable days where the difference between one enddate to the next start date is less than the minimum days

    const existingBookings = (bookings) => {
        bookings.forEach(booking => {
            const {startDate, endDate} = booking
            let date = startDate
            while (date <= endDate) {
                bookedDates.push(date + 1)
                date.setDate(date.getDate() + 1)
            }
        })
    }

    const validateBookings = (bookings) => {
        const sortedBookings = bookings.sort(sorter)
        for (let i = 0; i < sortedBookings.length; i++) {
            currentBooking = sortedBookings[i]
            precedingBooking = sortedBookings[i+1]
            if (currentBooking.endDate - precedingBooking.endDate < 2) {
                validatedDates.push(currentBooking.endDate + 1)
            }
        }
    }

    const sorter = (date1, date2) {
        if (date1.startDate < date2.startDate) {
            return -1
        }
        if (date1.startDate > date2.startdate) {
            return 1
        }
        return 0
    }

    return (
        <>
            {/* <Calendar
                showDoubleView={true}/> */}
            <DateRangePicker
                startDate={startDate} // momentPropTypes.momentObj or null,
                startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                endDate={endDate} // momentPropTypes.momentObj or null,
                endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                onDatesChange={handleDateChanges} // PropTypes.func.isRequired,
                focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                 // PropTypes.func.isRequired,
                onFocusChange={focusedInput => setFocusedInput(focusedInput)}
                showClearDates={true}
                minimumNights={1}
                maxDate={2}
                isDayBlocked={blockDates}
            />
        </>
    )
}


export default CalendarComponent
