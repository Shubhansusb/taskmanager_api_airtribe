class validator{
 
    static validate(info){
     if(
    info.hasOwnProperty('title')&&
    info.hasOwnProperty('description')&&
    info.hasOwnProperty('completed')){
        return {
            'result' : true,
            'Comment': 'new task added'
        }
    }else{
        return{
            'result' : false,
            'Comment':'please enter the correct details'
        }
    }

    }


}  

module.exports=validator;