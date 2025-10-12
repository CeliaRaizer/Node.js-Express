//Este middleware captura e trata todos os erros da aplicação
const errorHandler = (err, req, res, next) => {
    if(ProcessingInstruction.env.NODE_ENV === 'development') {
        res.status(500).json({
            erro: 'Erro interno do servidor',
            mensagem: err.message,
            stack: err.stack,
            timestamp: new Date().toISOString(),
            url: req.originalUrl,
            mmethod: req.method
        });
    }else{
        res.status(500).json({
            erro: 'Erro interno do servidor',
            timestamp: new Date().toISOString()
        });
    }
};

module.exports = errorHandler;