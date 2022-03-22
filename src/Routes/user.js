import user from '../Controller/UserController';


exports.getRouter = (app) => {

    app.route("/user/create_user").post(user.create_user);

    return app;
}