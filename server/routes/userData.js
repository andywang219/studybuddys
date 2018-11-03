const userDataController = require('./../controller/userData.ctrl')

module.exports = (router) => {
    router
    .route('/getUsername') // function url used by frontend
    .get(userDataController.getUsername) // function type [GET PUSH DELETE] and reference

    router
    .route('/getUseremail')
    .get(userDataController.getUseremail)

    router
    .route('/addCourses')
    .post(userDataController.addCourses)

    router
    .route('/getUserCourses')
    .get(userDataController.getUserCourses)

    router
    .route('/deleteUserCourses')
    .post(userDataController.deleteUserCourses)

}
