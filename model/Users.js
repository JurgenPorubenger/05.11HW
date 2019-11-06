const mongoose = require('mongoose');
const  Schema = mongoose.Schema;
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const bcrypt = require('bcrypt');





const LogSchema = new Schema({
        firstName: String,
        lastName: String,
        email: String,
        password: String,
        dob: String,
        phone: String,
        hash: String,
        salt: String,
});

LogSchema.methods.setPassword = async function(password) {
        let saltRound = 10;
        try {
                let a = await bcrypt.genSalt(saltRound);
                return await bcrypt.hash(password, a);

        } catch (e) {
                return e;
        }
};


LogSchema.methods.comparePassword = async function(password, cb) {
        await bcrypt.compare(password, this.password, function(err, isMatch) {
                if (err) {
                        return cb(err, false);
                }
                return cb(null, isMatch);
        });
};

// LogSchema.methods.reversePassword = function () {
//         return this.password.split("").reverse().join("");
// };



// LogSchema.methods.setPassword = function(password) {
//         this.salt = crypto.randomBytes(16).toString('hex');
//         this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
// };

// LogSchema.methods.validatePassword = function(password) {
//         const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
//         return this.hash === hash;
// };
//
// LogSchema.methods.generateJWT = function() {
//         const today = new Date();
//         const expirationDate = new Date(today);
//         expirationDate.setDate(today.getDate() + 60);
//
//         return jwt.sign({
//                 email: this.email,
//                 id: this._id,
//                 exp: parseInt(expirationDate.getTime() / 1000, 10),
//         }, 'secret');
// };
//
// LogSchema.methods.toAuthJSON = function() {
//         return {
//                 _id: this._id,
//                 email: this.email,
//                 token: this.generateJWT(),
//         };
// };



const Model = mongoose.model('LogSchema', LogSchema);
module.exports = Model;