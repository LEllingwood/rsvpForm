
// // schema w/ property of name; all mongoose is derived from schema 
// let kittySchema = new mongoose.Schema({
//     name: String
// });
// // NOTE: methods must be added to the schema before compiling it with mongoose.model()
// kittySchema.methods.speak = function() {
//     let greeting = this.name ? `Meow name is ${this.name} :)` : `I don't have a name :(`;
//     console.log(greeting);
// }
// // compile schema into model; each document will be kitten w/ props and behaviors declared in schema 
// let Kitten = mongoose.model("Kitten", kittySchema);

// let silence = new Kitten({name: "Silence the Chatty Catty"});
// console.log(silence.name); // "Silence the Chatty Catty"

// // functions added to methods get compiled into model proto and shown on each doc instance
// let fluffy = new Kitten({name: "Fluffy"});
// fluffy.speak(); // "Meow name is fluffy"

// fluffy.save((err, fluffy) => {
//     if(err) return console.error(err);
//     fluffy.speak();
// });
// // if this wasnt here, it wouldnt be included in the .find methods because it isnt getting saved 
// silence.save((err, silence) => {
//     if(err) return console.error(err);
//     // if you put this inside the callback, you gauarnetee that it will be run once the silence is saved 
//     Kitten.find((err, kittens) => {
//         console.log("Find all kittens")
//         if(err) return console.error(err);
//         console.log(kittens);
//     });
//     silence.speak();
// });

// Kitten.find({name: /^Fluff/}, (err, results) => {
//     console.log("find kittens with fluff")
//     if(err) return console.error(err);
//     console.log(results);
// })
