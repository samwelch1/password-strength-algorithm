import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {getEntropy} from "../entropyInfo/entropyInfo";
import Button from "react-bootstrap/Button";
import {NavLink} from "react-router-dom";
let bigInt = require("big-integer")

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

export default function RandomPwdComparison(props) {
  const classes = useStyles();
  function getRandomInt(max){
    return Math.floor(Math.random() * max);
  }
  function getRandomPwd() {
    let randomPwd = '';
    for (let i = 0; i < 20; i++){
      let randomNumber = getRandomInt(100);
      if (randomNumber < 28){
        randomPwd += String.fromCharCode(65 + getRandomInt(26));
      } else if (randomNumber < 56){
        randomPwd += String.fromCharCode(97 + getRandomInt(26));
      } else if (randomNumber < 84){
        randomPwd += String.fromCharCode(48 + getRandomInt(10));
      } else if (randomNumber < 88){
        randomPwd += String.fromCharCode(33 + getRandomInt(15));
      } else if (randomNumber < 92){
        randomPwd += String.fromCharCode(58 + getRandomInt(7));
      } else if (randomNumber < 96){
        randomPwd += String.fromCharCode(91 + getRandomInt(6));
      } else {
        randomPwd += String.fromCharCode(123 + getRandomInt(5));
      }
    }
    return randomPwd
  }
  function getCombinationsMessage(enteredPassword){
    let combinations = bigInt.one;
    for (let i = 0; i < enteredPassword.length; i++){
      let curVal = enteredPassword[i].charCodeAt(0);
      if ((curVal >= 65 && curVal <= 90)) {
        combinations = combinations.times(52);
      } else if (curVal >= 48 && curVal <= 57){
        combinations = combinations.times(10);
      } else if ((curVal >= 33 && curVal <= 47) || (curVal >= 58 && curVal <= 64) ||
        (curVal >= 91 && curVal <= 96) || (curVal >= 123 && curVal <= 126)) {
        combinations = combinations.times(10);
      }
      if (i % 5 === 0 && i !== 0){
        combinations = combinations.times(93);
      }
    }
    let converted = combinations.divide(10e8);
    let timeUnit = "";
    if (converted < 60){
      converted = Math.round(parseInt(combinations.toString()) / 100000000 / 60 * 1000) / 1000;
      timeUnit = "seconds";
    } else {
      converted = Math.round(parseInt(combinations.toString()) / 100000000 / 3600 * 10) / 10;
      if (converted < 60){
        timeUnit = "minutes";
      } else {
        converted = converted.divide(60);
        if (converted < 24){
          timeUnit = "hours";
        } else {
          converted = converted.divide(24);
          if (converted < 365){
            timeUnit = "days";
          } else {
            converted = converted.divide(365);
            timeUnit = "years";
          }
        }
      }
    }

    return "The amount of unique combinations is " + combinations + ". It would take a computer about " + converted +
      " " + timeUnit + " to guess another password of this variety using a brute force algorithm."
  }
  //this is the user-entered password
  let enteredPassword = 0;
  if (props.location.aboutProps.password.enteredPassword === undefined) {
    enteredPassword = "NO PASSWORD ENTERED";
  } else {
    enteredPassword = props.location.aboutProps.password.enteredPassword;
  }
  let randomPwd = getRandomPwd();
  let randomEntropy = getEntropy(randomPwd);
  let compareMessage = getCombinationsMessage(enteredPassword);
  return (
    <div className={classes.background}>
      <h1>Random Password:</h1>
      <div className={classes.h}>
        <h3>Random Password: {randomPwd} <br/> Random Password Entropy: {randomEntropy}</h3>
        <p>
          If you've made it this far, you've ideally chosen a password with an entropy of at least 60, if not 100.
          Your entropy will be similar to that of the random password. However, the advantage of random passwords
          across different websites comes if one of your passwords is compromised. <br/> <br/>
          People who use similar passwords across different sites will commonly modify or remove any characters that
          are not lowercase. As an example, a vulnerable user may have the password #Password123 on one site
          and @Password1234 on another. Let's look at how much more beneficial it would be for that user to switch to
          a completely random password: <br/> <br/>
        </p>
      </div>
      <h1>Random Password Variation:</h1>
      <h3>Your Password: {enteredPassword}</h3>
      <div className={classes.h}>
        <p>
          A computer can guess more than 10<sup>8</sup> different passwords per second. There are 93 characters that
          could make up a character in a password. A password of length 20 has 93<sup>20</sup> = 2.34
          <span> &#8226; </span> 10<sup>39</sup> unique combinations, which would take 7.47
          <span> &#8226; </span> 10<sup>31</sup> years to crack via a brute force algorithm. <br/><br/>
        </p>
      </div>
      <h1>Similar Password Variation: </h1>
      <div className={classes.h}>
        <p>
          If we instead varied the same password, a computer that knew the original password could randomly generate a
          sample of similar passwords based on the original, and the amount of time would be significantly lowered.
          Let's assume that special characters would only be changed to other special characters, and letters to
          any other type of letter. Every 10 characters, we will add 93 different combinations in case the user
          decides to add in or remove different character(s).
          {compareMessage}
        </p>
      </div>
      <NavLink to={{
        pathname: "/passwordSubmit",
      }}>
        <Button className={classes.button}>
          Submit a Different Password
        </Button>
      </NavLink>
    </div>
  )
}