
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
                res.send({message:'You have access the data has admin'});
            }else{
                res.status(401);
                res.send({error:'Unauthorized'});
            }
        });

        router.get('/guest',(req,res) => {
            if (req.user.role === "Guest"){
                res.status(200);
                res.send({message:'You have access the data has guest'});
            }else{
                res.status(401);
                res.send({error:'Unauthorized'});
            }
        });

        return router;
    }
}

module.exports = HomeRoute;