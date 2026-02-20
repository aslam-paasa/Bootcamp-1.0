/**
 * 4. Create a function to retrieve a car and populate
 *    its maker details:
 * */

async function getCarWithMakerDetails(carId) {
    try {
        const carWithMaker = await Car.findById(carId).populate('maker')
        console.log('Car with maker details:', carWithMaker)
    } catch (error) {
        throw error
    }
}
// Example usage
getCarWithMakerDetails('your-car-id-here')
