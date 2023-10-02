const notFoundMiddleWare = (req, res) => {
    res.status(404).send("Route does not exist/resource not found.")
}

module.exports = notFoundMiddleWare;