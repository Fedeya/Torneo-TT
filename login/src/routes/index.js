const path = require("path");
const { Router } = require("express");

const router = Router();

router.get("/", (rep, res) => {

    res.render(path.join(__dirname, "../views/index"), {
        home: "active"
    });

})


module.exports = router;