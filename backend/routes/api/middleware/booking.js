const { Booking, Spot } = require('../../../db/models');



const getUserBookings = async (req, res) => {
    console.log(Booking)
    try {
        const userId = req.user.id;
        const bookings = await Booking.findAllCurrentBookingsByUserId(userId);
        return res.status(200).json({ "Bookings": bookings });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};


const updateBooking = async (req, res) => {
    const { bookingId } = req.params;
    const { startDate, endDate } = req.body;
    const userId = req.user.id;

    try {
        const booking = await Booking.findByPk(bookingId);
        if (!booking) {
            return res.status(404).json({ message: "Booking couldn't be found" });
        }
        if (userId !== booking.userId) {
            throw new Error("You don't own this booking");
        }
        if (endDate <= startDate) {
            throw new Error("End date cannot be on or before start date");
        }
        if (new Date(booking.endDate) < new Date()) {
            throw new Error("Past bookings can't be modified");
        }
        const conflictingBooking = await Booking.findOne({
            where: {
                spotId: booking.spotId,
                [Op.or]: [
                    { startDate: { [Op.lte]: endDate } },
                    { endDate: { [Op.gte]: startDate } }
                ],
                id: { [Op.ne]: booking.id }
            }
        });
        if (conflictingBooking) {
            throw new Error("Sorry, this spot is already booked for the specified dates");
        }
        booking.startDate = startDate;
        booking.endDate = endDate;
        await booking.save();
        return res.status(200).json(booking);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

const deleteBooking = async (req, res) => {
    const { bookingId } = req.params;
    const userId = req.user.id;

    try {
        const booking = await Booking.findByPk(bookingId);

        if (!booking) {
            return res.status(404).json({ message: "Booking couldn't be found" });
        }
        const spotId = booking.spotId;
        const bookedUserId = booking.userId;
        const spot = await Spot.findByPk(spotId);
        const ownerId = spot.ownerId;
        const startDate = booking.startDate;

        if (userId !== bookedUserId || userId !== ownerId) {
            return res.status(403).json({ message: "Only the owner of the spot or the booking can delete bookings" });
        }

        if (new Date(startDate) < new Date()) {
            return res.status(403).json({ message: "Bookings that have been started can't be deleted" });
        }

        await booking.destroy();

        return res.status(200).json({ message: "Successfully deleted" });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

module.exports = {
    updateBooking,
    deleteBooking,
    getUserBookings
}
