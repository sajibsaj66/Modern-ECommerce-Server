import express from "express";
import multer from "multer"
import { passwordChangingController, profilePicUpload, profileStorage, verifyEmailController } from "../controllers/user.controller";
import auth from "../../middlewares/auth";
const router = express.Router();

declare global {
    namespace Express {
        interface Request {
            email?: string;
            role?: string;
        }
    }
}


router.get('/', (req, res) => {
    res.json({
        message: 'Hello from user routes - v2👋'
    })
})

// verify email address
router.get('/verify-email/:token', verifyEmailController)


// update password
router.post('/change-password', auth, passwordChangingController)


// profile pic upload
const uploadProfile = multer({ storage: profileStorage })
router.put('/profile-pic-upload', auth, uploadProfile.single('profile_photo'), profilePicUpload)


export default router;