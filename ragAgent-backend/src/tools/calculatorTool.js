 function calculatorTool(input){
    try{
        const result = eval(input);
        return result;
    }catch(error){
        console.log(error);
    }   
};

export default calculatorTool;