const express = require("express")
const app = express();

const port = 3000;
const publicPath = "views/";

let mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/test")

let database = mongoose.connection

database.on("error", console.error.bind(console, "Connection Error"));
database.once("open", () => {
    console.log("Hello")
});

// assign to a variable the model instance

app.use(express.static(publicPath));
app.use(express.urlencoded())

app.set("views", "./views" )
app.set("view engine", "pug")

// create an iteration of the mongoose.
let rsvpSchema = new mongoose.Schema({
    name: {type: String, required: true}, 
    email: {type: String, required: true},
    attending: {type: Boolean, required: true},
    numberOfGuests: {type: Number, required: true}
})

// create the Model
let ReservationModel = mongoose.model('ReservationModel', rsvpSchema);

    // get for the client to get the initial rsvp page
    app.get("/", function(request, response){
        response.render("index", {title: "RSVP page", message: "this is the rsvp page"});
    });
        
    // post for the client to post the user's rsvp response(rsvpSubmitted)
    app.post("/rsvpSubmitted", function (request, response, next) {
       let alias = request.body.name
       let contactEmail = request.body.email
        let yesOrNo = request.body.attending
        let numberOfGuestsComing = request.body.numberOfGuests
        var newRSVP = new ReservationModel({
            name: alias,
            email: contactEmail,
            attending: yesOrNo,
            numberOfGuests: numberOfGuestsComing
        });
        newRSVP.save(function(err, newRSVP){
            if(err){
                response.status(500)
                response.send()
                console.log(err)
                // maybe create an error page.
                return
            }
                response.render("rsvpSubmitted");
                // always use response.render when you want to send back a the final html generated from the template
        });
    })
     // get for the client to get the guest list 
     app.get("/guestList", function(request, response){
        ReservationModel.find(function(err, reservations){
            if (err){
                response.status(500)
                response.send()
                return
                // returning here to get the function to stop.  could also do an if/else statement where the first three following lines constitute the "else".  using return also prevents you from having to tab over--too much nesting
            }
            response.render("guestList", {
                attending: reservations.filter(reservation => reservation.attending === true),
                notAttending: reservations.filter(reservation => reservation.attending === false)
            });
        })

    });

    app.listen(port);