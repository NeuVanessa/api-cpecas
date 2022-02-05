import { Router } from "express";
import multer from "multer";


import { UsersController } from "../controllers/UsersController";


const routes = Router();


const usersController = new UsersController();





//armazendando as imagens do avatar
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads/");
    },
    filename: function (req, file, cb) {
        //cb(null, new Date().toISOString + file.originalname);
        cb(null, Date.now() + file.originalname);
        //cb(null,new Date().toDateString()+file.originalname)
    },
});
const upload = multer({ storage: storage });


routes.post("/users", upload.single('avatar'), usersController.create);
routes.get("/users", usersController.findAll);
routes.get("/users/:id", usersController.findById);
routes.put("/users/:id", usersController.update);
routes.delete("/users/:id", usersController.delete);
routes.post("/login", usersController.login);
routes.post("/tokenIsValid", usersController.tokenIsValid);



export { routes };
