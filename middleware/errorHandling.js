const errorHandling=(err, req, res, next) => {
    const code= errorStatuscode || 500
    res.status(code).json({message:err.message, success:false,stack:err.stack})
}

 module.exports=errorHandling