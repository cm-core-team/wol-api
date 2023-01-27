async function homeController(req, res, next) {
    try {
        res.status(200).send("Welcome to the wol-api.");
    }
    catch (err) {
        console.error(err);
        next(err);
    }
}
export { homeController };
