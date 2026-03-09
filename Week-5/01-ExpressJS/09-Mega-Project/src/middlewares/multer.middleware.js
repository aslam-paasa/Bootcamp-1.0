import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "/public/images");
    },

    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + "-" + uniqueSuffix);
    },
});

export const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5, // 5MB
    },
    
    fileFilter: function (req, file, cb) {
        if (file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype === "image/jpg") {
            cb(null, true);
        } else {
            cb(new Error("Invalid file type"));
        }
    },
});
