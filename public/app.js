(function(){
  
  let screen = document.querySelector('.screen');
  let buttons = document.querySelectorAll('.btn');
  let clear = document.querySelector('.btn-clear');
  let equal = document.querySelector('.btn-equal');
  let operators = document.querySelectorAll('.btn-operator');

  var num1 = null;
  var num2 = null; 
  var operatorSelected = null; 
  var error = false;
  
  //when user click on numbers
  buttons.forEach(function(button){
    button.addEventListener('click', function(e){

      //if matehmatical error exist disable button
      if(error){

        screen.value = "Please clear calculator";
      }
      //enable button if no error
      else{


        let value = e.target.dataset.num;

        //check if operator is selected 
        if (operatorSelected === null){
  
          //check if num1 and num2 is null
          if (num1 === null && num2 === null){
  
            //if both num1 and num2 are null, means this is the
            //first user input thus assign value to num1
            screen.value = value;
            num1 = screen.value;  
          }
          //if num1 is not null and no operator is selected 
          //means user is assigning additional numbers to num1 
          else if(num1 !== null && num2 === null){
    
            screen.value = num1 + value;  
            num1 = screen.value;
          }
        }
       
        //if operator is selected
        else if(operatorSelected !== null){
        
          //if num1 is null and "-" is the first input of user
          //this means user want to insert a negative value 
          if (num1 === null && operatorSelected === "-"){
    
            //produces and assign a negative value to num1 
            screen.value = operatorSelected + value;
            num1 = screen.value;
          }
          //if num1 is null and any operator aside "-" is the first input of user
          //this means user want to run a unary equation 
          //it will be (operator) num1:
            // + 1
            // - 1
            // * 1 --> syntax error
            // / 1 -->syntax error 
          else if (num1 === null && operatorSelected === "+"){
  
            //display selected number
            screen.value = value;
            num1 = screen.value;
          }
          else if (num1 === null && operatorSelected === "*"){
  
            //display selected number
            screen.value = value;
            num1 = screen.value;
          }
          else if (num1 === null && operatorSelected === "/"){
  
            //display selected number
            screen.value = value;
            num1 = screen.value;
          }
  
          //if num1 is not null but num2 is null
          //means user wants to insert 2nd value 
          //this will be a binary equation 
          else if (num1 !== null && num2 === null){
            
            value = '';
            value = e.target.dataset.num;
            //display number selected
            screen.value = value;
            num2 = screen.value;
          }
          //adding numbers onto the 2nd value 
          else if (num2 !== null){
  
            //display number selected (more than 1 digit)
            screen.value = num2 + value; 
            num2 = screen.value
          }

        }
      }
    })
  });

  //when user click on operators 
  operators.forEach(function(button){
    button.addEventListener('click', function(e){

      //disable buttons if there is mathematical error
      if(error){

        screen.value = "Please clear calculator";
      }
      //if no error 
      else{

        let operator = e.target.dataset.num;
        //display selected operator 
        screen.value = operator;
  
        //if num2 is null, means user wants to run binary equation 
        //so it will be num1 (operatorSelected) num2
        if(num2 === null){
  
          //assign operator to operatorSelected, which will be used to do the 
          //actual calculation 
          operatorSelected = screen.value;
        }
        //this block code will run if user click on any operators after inserting more than 1 value
        //calculation will be done here instead of when user click on equal button 
        //behavior example: 1 + 2 - 3 * 4 / 1
        //if num2 is not null 
        if (num2 !== null){

          //check num1 and num2 valid or not
          //if value then proceed 
          // . as a value is not valid and results in syntax error 
          if(num1 !== "." && num2 !== "."){
  
            //check if operator is selected
            //if not selected then there is a mathematical error 
            if(operatorSelected === null){
  
              screen.value = 'Syntax error';
              error = true;
            }
            //if no mathematical erros 
            else{
  
              //assign num1 and num2 to big decimal 
              //this will produce values with precise decimal places
              bigDec1 = Big(num1);
              bigDec2 = Big(num2);
  
              if(operatorSelected === "+"){
      
                bigDecAns = bigDec1.plus(bigDec2);
              }
              else if(operatorSelected === "-"){
        
                bigDecAns = bigDec1.minus(bigDec2);
              }
              else if(operatorSelected === "*"){
        
                bigDecAns = bigDec1.times(bigDec2);
              }
              else if(operatorSelected === "/"){
        
                //any number divide by 0 will result in syntax error 
                if (num2 === "0"){
        
                  screen.value = 'Syntax error';
                  error = true;
                }
                else{
        
                  bigDecAns = bigDec1.div(bigDec2);
                }
                
              }
            }
          }
          //if numbers inserted are not valid, it will result in syntax error 
          else{
  
            screen.value = 'Syntax error';
            error = true;
          }
          //if there is no mathemtical error and numbers are inserted 
          if (screen.value !== "Syntax error" && screen.value !== 'Please Enter a Value'){

            //display resulting answer on screen
            screen.value = bigDecAns.toString();
            //any consecutive calcuations will be treated as binary equations 
            //assign answer to num1
            num1 = bigDecAns.toString();
            //set num2 to null
            num2 = null; 
            value = '';
            operatorSelected = operator;
            error = false;
            
          }
        }

      }
  
    })
  });
  
  //when user click on equal button 
  equal.addEventListener('click', function(e){

    //disable buttons if there is mathematical error
    if(error){

      screen.value = "Please clear calculator";
    }
    //if no error 
    else{

      var bigDec1 = null;
      var bigDec2 = null;
      var bigDecAns = null;
  
      //check if num2 is null
      //if num2 is null, this means user click on equal button right after
      //only inserting the first value 
      if(num2 === null){
  
        //check num1 value is valid or not
        if(num1 === null){
  
          screen.value = 'Please Enter a Value';
        }
        else if (num1 === "."){
  
          screen.value = 'Syntax error';
          error = true;
        }
        //if num1 is valid, check for operator
        else{
  
          //check if operator selected
          if(operatorSelected === null){
  
            //just assign value to bigDec1 which will be 
            //used later when a 2nd value is inserted 
            bigDec1 = Big(num1);
            bigDecAns = bigDec1;
  
          }
          //if no problems and operator is selected 
          //this means user wants to run unary equations 
          else{
  
            bigDec1 = Big(num1);
  
            if(operatorSelected === "+"){
    
              bigDecAns = bigDec1.plus(0);
            }
            else if(operatorSelected === "-"){
      
              bigDecAns = bigDec1.minus(0);
            }
            //running unary equation with mulitplication 
            //or division will result in syntax error 
            else if(operatorSelected === "*"){
      
              screen.value = 'Syntax error';
              error = true;
            }
            else if(operatorSelected === "/"){
      
              screen.value = 'Syntax error';
              error = true;
            }
          }
        }
      }
      //if num2 is not null
      //this means user wants to run unary equation by
      //clicking on equal button 
      else if(num2 !== null){
  
        //check num1 and num2 valid or not
        if(num1 !== "." && num2 !== "."){
  
          //check if operator is selected
          if(operatorSelected === null){
  
            //if no operator is selected it will result in syntax error 
            screen.value = 'Syntax error';
            error = true;
          }
          //if operator is selected 
          else{
  
            //assign both values to big decimal 
            bigDec1 = Big(num1);
            bigDec2 = Big(num2);
  
            if(operatorSelected === "+"){
    
              bigDecAns = bigDec1.plus(bigDec2);
            }
            else if(operatorSelected === "-"){
      
              bigDecAns = bigDec1.minus(bigDec2);
            }
            else if(operatorSelected === "*"){
      
              bigDecAns = bigDec1.times(bigDec2);
            }
            else if(operatorSelected === "/"){
      
              //any number divided by 0 will result in syntax error 
              if (num2 === "0"){
      
                screen.value = 'Syntax error';
                error = true;
                
              }
              else{
      
                bigDecAns = bigDec1.div(bigDec2);
              }
              
            }
          }
        }
        //if num1 and num2 are not valid 
        //results in syntax error 
        else{
  
          screen.value = 'Syntax error';
          error = true;
        }
      }
      //if num1 and num2 is null
      //prompt to enter a value 
      else if(num1 === null && num2 === null){
  
        screen.value = 'Please Enter a Value';
      }
  
      //run calculation if no errror
      if (screen.value !== "Syntax error" && screen.value !== 'Please Enter a Value'){
  

        //display resulting answer
        screen.value = bigDecAns.toString();
        //any consecutive calcuations will be treated as binary equations 
        //assign answer to num1
        num1 = bigDecAns.toString();
        //reset num2 
        num2 = null; 
        value = '';

      }

    }
    
  })
  
  //when click on clear button, reset everything to default value
  //clear button also sed to get rid of syntax error 
  clear.addEventListener('click', function(e){
    screen.value = '';
    num1 = null;
    num2 = null;
    operatorSelected = null;
    value = ''; 
    error = false; 
  })
 
})();
