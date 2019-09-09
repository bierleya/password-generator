const low = "abcdefghijklmnopqrstuvwxyz";
const up = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const num = "0123456789";
const spec = "!#$%&'()*+,-./:;<=>?@[]\^_`{}|~";

function getString() {
    let lowercase = document.getElementById("lowercase").checked;
    let uppercase = document.getElementById("uppercase").checked;
    let numbers = document.getElementById("numbers").checked;
    let specChar = document.getElementById("specChar").checked;
    
    var props = [lowercase, uppercase, numbers, specChar];  
    let passSymbols = "";  // all selected characters are added to a string, and these characters will be randomly selected to create the password
    let checkProps = [];  // this will be used to ensure the password contains the required elements

    
    if (props[0]) {
        passSymbols += low;
        checkProps.push(low);
    }
    if (props[1]) {
        passSymbols += up;
        checkProps.push(up);
    }
    if (props[2]) {
        passSymbols += num;
        checkProps.push(num);
    }
    if (props[3]) {
        passSymbols += spec;
        checkProps.push(spec);
    }
    
    // if no filters are selected, add all characters to the string 
    if (passSymbols.length == 0) {
        passSymbols += low;
        passSymbols += up;
        passSymbols += num;
        passSymbols += spec;
    }

    createPassword(passSymbols, checkProps);
}

function createPassword(passSymbols, checkProps) {
    let userInput = Number(document.getElementById("userInput").value);
    
    if (isNaN(userInput)) {
        alert("Please enter a number.");
    }
    
    if (userInput < checkProps.length) {
        alert("Number of properties required exceeds password length. Please try again.");
    }
    else {
        let newPassword = "";
        let length = passSymbols.length;
        // randomly selects a character from passSymbols until entire password is generated
        for (i=0; i<userInput; i++) {
            newPassword += passSymbols[Math.floor(Math.random()*length)];
        }
        
        // this becomes true when all selected properties are included in the password
        let valid = "false";
    
        // iterates through each element in checkProps to make sure at least one character in each element is in the password
        if (checkProps.length > 0) {
            for (var element in checkProps) {
                for (var char in newPassword) {
                    if (checkProps[element].includes(newPassword[char])) {
                        valid = "true";
                        break;
                    }
                    else {
                        valid = "fail";
                    }
                }
                // recursive call to regenerate password if not all selected elements are included
                if (valid == "fail") {
                    return createPassword(passSymbols, checkProps);
                }

            }
        }

        document.getElementById("password").innerHTML = "Your password is: " + newPassword; 
    }
}




