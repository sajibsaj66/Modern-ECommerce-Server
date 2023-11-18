import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../../database/models/User";
import multer from "multer"
import randomString from "randomstring"
import path from "path"
import fs from "fs"

// verify email address
const verifyEmailController = async (req: Request, res: Response) => {

    const _user = await User.findOne({ authToken: req.params.token })
    if (!_user) return res.json({ status: false, message: 'invalid token!' })

    _user.authToken = 'verified';
    _user.accountStatus = 'active'
    await _user.save()

    res.json({
        status: true,
        message: 'You have successfully done your job.',
    })
};


// update password
const passwordChangingController = async (req: Request, res: Response) => {
    const _user = await User.findOne({ email: req.email });

    // matching password
    const isMathPass = bcrypt.compareSync(req.body.oldPass, _user.password)
    if (!isMathPass) return res.status(400).json({ message: 'invalid password' });

    // If password match, then make hash the new password.
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(req.body.newPass, salt);

    const updatePassword = await User.findOneAndUpdate({ email: _user.email }, { $set: { password: hash } })
    if (!updatePassword) return res.status(400).json({ message: 'Password update failed.' });

    res.json({
        status: true,
        message: "Password updated successfully."
    })
}




// profile storage
export const profileStorage = multer.diskStorage({
    destination: (req: any, file: any, cb: any) => {
        cb(null, './public/profile-pic/')
    },
    filename: (req: any, file: any, cb: any) => {
        let p1 = randomString.generate(5);
        let p2 = randomString.generate(5);
        let ext = (path.extname(file.originalname)).toLowerCase();

        let fullName = `${p1}_${p2}${ext}`;
        cb(null, fullName);
    }
});

// profile upload callback function
export const profilePicUpload = async (req: any, res: Response) => {
    // if file field empty
    if (!req.file) {
        return res.status(400).json({ message: 'input field is empty.' })
    };

    // find user from database
    const _user = await User.findOne({ email: req.email });

    // update profile picture to database
    const _profileUpload = await User.findOneAndUpdate(
        { email: _user.email },
        { $set: { image: req.file.filename } },
        { new: true }
    );

    if (_user?.image != 'empty-avatar.jpg') {
        fs.unlinkSync(`./public/profile-pic/${_user?.image}`)
    };

    // success
    return res.status(200).json({
        status: true,
        message: 'The profile photo has been uploaded.',
        owner: _profileUpload
    });
};


export {
    verifyEmailController,
    passwordChangingController
};