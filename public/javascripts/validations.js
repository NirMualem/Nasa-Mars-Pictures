//a module for all string validation functions
const validatorModule = (function() {
    "use strict";
    const isNotEmpty = function (str)  {
        return  {
            isValid: (str.value.length !== 0),
            message: 'please enter a non empty value'
        };
    };
    const isNotSelected = function (value)  {
        return  {
            isValid: (value.options.selectedIndex !== 0),
            message: 'please select value'
        };
    };
    const isNotDateOrSol = function (str) {
        return {
            isValid:checkDateOrSol(str),
            message: 'please enter a sol number or valid date'
        };
    };
    const isExistDateOrSol = function (input) {
        return checkDateRange(input);
    };

    //check if the date is in the range
    const checkDateRange = function(input)
    {
        let regEx = /^\d{4}-\d{2}-\d{2}$/;
        if(input[0].value.match(regEx))
        {
            let date = new Date(input[0].value);
            if(date > input[2]['list'][input[1].toString()]['landing_date'] && date <  input[2]['list'][input[1].toString()]['max_date'])
                return {
                    isValid:true,
                    message: ''
                } ;
            if(date < input[2]['list'][input[1].toString()]['landing_date'])
            return {
                isValid:false,
                message: 'date is not in mission range. mission start date at: ' + input[2]['list'][input[1].toString()]['landing_date']
            } ;
            else
                return {
                    isValid:false,
                    message: 'date is not in mission range. mission max date at: ' + input[2]['list'][input[1].toString()]['max_date']
                } ;
        }
        else
        {
            if(input[0].value < input[2]['list'][input[1].toString()]['max_sol'])
                return {
                    isValid:true,
                    message: ''
                } ;
            return {
                isValid:false,
                message: 'sol is not in mission range. max sol is: ' + input[2]['list'][input[1].toString()]['max_sol']
            } ;
        }
    };

    //check if the value is sol or date or not both of them.
    const checkDateOrSol = function(str)
    {
        let regEx = /^\d{4}-\d{2}-\d{2}$/;
        if(str.value.match(regEx))
        {
            let d = new Date(str.value);
            let dNum = d.getTime();
            if(!dNum && dNum !== 0)
                return false; // NaN value, Invalid date
            return d.toISOString().slice(0,10) === str.value;
        }
        else if(!isNaN(str.value) && str.value > 0)
        {
            return true;
        }
        return false;
    };

    //check the status from the server.
    function status(response) {
        if (response.status >= 200 && response.status < 300) {
            return Promise.resolve(response);
        } else {
            return Promise.reject(new Error(response.statusText));
        }
    }

    return {
        isNotEmpty: isNotEmpty,
        isNotSelected: isNotSelected,
        status:status,
        isNotDateOrSol:isNotDateOrSol,
        isExistDateOrSol:isExistDateOrSol
    };
}) ();