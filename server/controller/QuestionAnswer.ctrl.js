const firebase = require('firebase');

module.exports = {
    //Pre: user is logged in.
    // this will take in the current course and question

    //Post: question is stored in the backend under the course
    createQuestion: (req, res, next) =>{
        var user = firebase.auth().currentUser;
        var courseName = req.body.courseName;
        var question = req.body.userQuestion;
        //ref below will make a space to store the question
        var ref = firebase.database().ref("CoursesQuestions/" + courseName);
        //once the question is made, it should also make space for where the replies will be stored
        var refreply = firebase.database().ref("QuestionReply/" + courseName +"/"+ user.uid);

        refreply.push({
           "question":question,
            "reply": ""
        });
        ref.push
        ({"question" : question,
          "uid": user.uid
        });

        res.status(200).json({message: "question added"});

    },
    deleteQuestion: (req, res, next) =>{

    },
    //pre: should pass in the course name
    //post: returns all the questions for the course if any along with the uid that made the questions
    getQuestions: (req, res, next) =>{
        var courseName = req.body.courseName;
        var ref = firebase.database().ref("Courses/" + courseName);
        var questions = [];
        var user = [];
        ref.once("value", function(snapshot){
            var list = snapshot.val()
            for(var key in list){
                var Q = list[key].question;
                var u = list[key].uid;
                questions.push(Q);
                user.push(u);
            }
            res.status(200).json
                ({"questions": questions,
                    "users": user
                });
            });

    },
    //pre: User is logged in
    //takes in the current course,text for reply,question, posterID
    //post: posts a reply to a question that will be stored in the backend.
    sumbitAnswer: (req, res, next) =>{
        var courseName = req.body.courseName;
        var replyText = req.body.replyText;
        var questionText = req.body.questionText;
        var useridQuestion = req.body.useridQuestion;
        var user = firebase.auth().currentUser;
        var refreply = firebase.database().ref("QuestionReply/" + courseName +"/"+ useridQuestion);

        refreply.once("value", function(snapshot){
         snapshot.forEach(function (childsnap) {
             console.log(childsnap.val().question);
            if (childsnap.val().question === questionText){
               firebase.database().ref("QuestionReply/" + courseName +"/"+ useridQuestion +"/"+ childsnap.key +"/reply/").push({
                   "reply": replyText,
                   "replierUID": user.uid
                });
            }
         });
        });

        res.status(200).json({message: "reply added"});

    },

    getReplies: (req, res, next) =>{

    }
}