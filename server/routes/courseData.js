const courseDataController = require('./../controller/courseData.ctrl')

module.exports = (router) => {
    router
    .route('/getCourses') // function url used by frontend
    .post(courseDataController.getCourses) // function type [GET PUSH DELETE] and reference
}
