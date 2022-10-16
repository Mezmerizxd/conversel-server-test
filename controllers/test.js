module.exports = {
    async perform(req, res) {
        console.log('Test Api Used');
        console.log(req.body);
        res.status(200).json({
            success: true,
            error: false,
            errorMessage: null,
            data: {
                test: 'Hello World',
            },
        });
    },
};
