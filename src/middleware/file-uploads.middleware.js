import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/');
    },
    filename: (req, file, cb) => {
        // cb(null, new Date().toISOString() +'-'+ file.originalname);
        const name =Date.now() + '-' + file.originalname;
        cb(null, name);
    },
});


export const upload = multer({
    storage: storage, 
});