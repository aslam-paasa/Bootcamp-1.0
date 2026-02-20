/**
 * Understanding:
 * function functionName(parameter: parameterType1 | parameterType2): functionReturnType{}
 * */ 

/**
 * Q. Create function named printInfo that takes parameter 'info' which
 *    can be either a string or a number. The function should console
 *    log the provided info.
 * */ 

type Info = string | number

function printInfo(info: Info): void { 
    console.log(info);
 }