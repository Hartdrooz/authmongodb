
class HomeRoute {
    constructor(express){
        this.express = express;
    }

    init(){
        const router = this.express.Router();
        
        router.get('/admin',(req,res) => {
            // Retrieve the role (this can be encapsulated in a middleware)
            if (req.user.role === "Admin"){
                res.status(200);
                res.send('You have access the data has admin');
            }else{
                res.status(401);
                res.send('Unauthorized');
            }
        });

        router.get('/guest',(req,res) => {
            if (req.user.role === "Guest"){
                res.status(200);
                res.send('You have access the data has gues');
            }else{
                res.status(401);
                res.send('Unauthorized');
            }
        });

        return router;
    }
}

module.exports = HomeRoute;