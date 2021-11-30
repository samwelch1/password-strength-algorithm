import React from "react";
import Button from "react-bootstrap/Button";
import {NavLink} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
  background:{
    backgroundColor: '#659DBD',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 'calc(10px + 2vmin)',
    fontFamily: 'Glacial Indifference',
    fontWeight: 'bolder',
    color: 'white',
  },
  h: {
    top: 0,
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    justifyContent: 'center',
    fontFamily: 'Glacial Indifference',
    color: 'black',
    fontWeight: 'lighter',
    inlineSize: '50%',
    overflowWrap: 'breakWord'
  },
  button: {
    borderRadius: '8px',
    fontSize: 'calc(8px + 2vmin)',
    justifyContent: 'center',
    backgroundColor: 'white',
    color: 'black',
    type: 'submit',
  }
});

export function getEntropy(enteredPassword) {
  let poolSize=0;
  let digitPresent=false, lowerCasePresent=false, upperCasePresent=false, specialPresent=false
  for (let i = 0; i < enteredPassword.length; i++){
    let curVal = enteredPassword[i].charCodeAt(0);
    if (curVal >= 48 && curVal <= 57){
      digitPresent=true;
    } else if (curVal >= 97 && curVal <= 122){
      lowerCasePresent=true;
    } else if (curVal >= 65 && curVal <= 90) {
      upperCasePresent = true;
    } else if ((curVal >= 33 && curVal <= 47) || (curVal >= 58 && curVal <= 64) ||
      (curVal >= 91 && curVal <= 96) || (curVal >= 123 && curVal <= 126)) {
      specialPresent=true;
    }
  }

  if (digitPresent) {
    poolSize += 10
  } if (lowerCasePresent) {
    poolSize += 26
  } if (upperCasePresent) {
    poolSize += 26
  } if (specialPresent) {
    poolSize += 32
  }

  return Math.round(enteredPassword.length * Math.log2(poolSize) * 10000) / 10000
}

export default function EntropyInfo(props) {
  const classes = useStyles();

  function getEntropyRating(totalEntropy){
    if (totalEntropy > 100){
      return "This password is very strong, and therefore worthy of using on a crucial account. Great job!"
    } else if (totalEntropy > 60){
      return "This is a strong password, and therefore worthy of using on an important account. Nice job!"
    } else if (totalEntropy > 25){
      return "This is a fine password. It will do well for non-vital accounts."
    } else if (totalEntropy > 20){
      return "This is a week password. You should consider changing it!"
    } else{
      return "This is an extremely weak password. Change it immediately!";
    }
  }

  function checkCommonPasswords(enteredPassword){
    let commonPasswords = ['12345', '123456', '123456789', 'test1', 'password', '12345678', 'zinch', 'g_czechout',
      'asdf', 'qwerty', '1234567890', '1234567', 'Aa123456.', 'iloveyou', '1234', 'abc123', '111111', '123123',
      'dubsmash', 'test', 'princess', 'qwertyuiop', 'sunshine', 'BvtTest123', '11111', 'ashley', '00000', '000000',
      'password1', 'monkey', 'livetest', '55555', 'soccer', 'charlie', 'asdfghjkl', '654321', 'family', 'michael',
      '123321', 'football', 'baseball', 'q1w2e3r4t5y6', 'nicole', 'jessica', 'purple', 'shadow', 'hannah', 'chocolate',
      'michelle', 'daniel', 'maggie', 'qwerty123', 'hello', '112233', 'jordan', 'tigger', '666666', '987654321',
      'superman', '12345678910', 'summer', '1q2w3e4r5t', 'fitness', 'bailey', 'zxcvbnm', 'fuckyou', '121212', 'buster',
      'butterfly', 'dragon', 'jennifer', 'amanda', 'justin', 'cookie', 'basketball', 'shopping', 'pepper', 'joshua',
      'hunter', 'ginger', 'matthew', 'abcd1234', 'taylor', 'samantha', 'whatever', 'andrew', '1qaz2wsx3edc', 'thomas',
      'jasmine', 'animoto', 'madison', '0987654321', '54321', 'flower', 'Password', 'maria', 'babygirl', 'lovely',
      'sophie', 'Chegg123'
    ]

    for (let i = 0; i < commonPasswords.length; i++){
      if (commonPasswords[i] === enteredPassword){
        return "You have a password on this list, and should immediately " +
          "change your password regardless of your entropy score."
      }
    }
    return "Your password does not match any passwords on this list - that's a good start, but doesn't imply " +
      "security on its own."
  }

  let enteredPassword = 0, totalEntropy = 0;
  if (props.location.aboutProps.password.password === undefined) {
    enteredPassword = "NO PASSWORD ENTERED";
  } else {
    enteredPassword = props.location.aboutProps.password.password;
    totalEntropy = getEntropy(enteredPassword);
  }
  let entropyMessage = getEntropyRating(totalEntropy);
  let listMessage = checkCommonPasswords(enteredPassword);
  return (
    <div className={classes.background}>
      <h1>Password Entropy Results:</h1>
      <div className={classes.h}>
        <h2>Entered Password: {enteredPassword}</h2>
        <h2>Password Entropy: {totalEntropy}</h2>
        <h4>{entropyMessage}</h4>
      </div>
      <h1>Password Info:</h1>
      <div className={classes.h}>
        <h2>Entropy:</h2>
        <p>
          The first quantity in calculating a password's entropy is the pool of characters of which a password consists.
          Digits have a pool of 10, lowercase and uppercase are 26 each, and special symbols have a pool of 32.
          As an example, this means a password with only digits and lowercase numbers have a pool of 36. <br/> <br/>
          The second quantity for computing a password's entropy is the password length. So, if we call the pool size P
          and the length L, we just need to use the formula E = L <span> &#8226; </span> log <sub>2</sub> (L).
        </p>
        <h2>Password Lists:</h2>
        <p>
          Now, there is more to calculating a password than just its entropy. This is because of password dictionaries,
          or lists of passwords available online. If you use a password in a dictionary of common password, regardless
          of its entropy, you will be subject to an attack.
          Using this <a href="https://techcult.com/most-common-passwords/">list</a> of the 100 most common passwords
          of 2021, we've checked to see if your password has any similarities. {listMessage}
        </p>
        <h2>Moving On: </h2>
        <p>
          We've now established how secure our password is as a stand-alone. Let's move on to compare our password to
          a randomly generated password:
        </p>
      </div>
        <NavLink to={{
          pathname: "/randomPassword",
          aboutProps: {
            password: {enteredPassword}
          }
        }}>
          <Button className={classes.button}>
            Random Password Comparison
          </Button>
        </NavLink>
    </div>
  )
}