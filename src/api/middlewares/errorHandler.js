export const errorHandler = (err, _ , res) => {
    if( err instanceof Error ) {
        return res.status(500).json({message: 'Internal server error'});
    }else{
        return res.status(err.statusCode).json({message: err.message});
    }
};