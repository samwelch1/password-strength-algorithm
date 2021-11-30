# Password Strength Algorithm

## Download and Run

- Open up a terminal in the project directory and run the command `npm install`. This can be done either in the command line of an IDE or the standard terminal. 
- In the same directory, run the command `npm run dev`.

## Code Navigation
There are three main tabs in this tool. They are as follows:
- Password Submit
    - User can submit a password of their choosing, and the submit button directs them to the Entropy Info tab.
- Entropy Info
    - After the user submits their password, they are given an entropy score to go with a description of entropy, how it was calculated, and its significance.
    - Since entropy doesn't take into account common passwords, their entry is also checked against the 100 most common passwords of 2021, and alerted to immediately change their
      password if this is the case. They are then directed to the Random Password Comparison tab.
- Random Password Comparison
    - The goal of this tab is to compare the difference between a user choosing effectively random passwords from website to website as opposed to variations of the same
      password.
    - First, the user is shown the difficulty of an attacker guessing a randomly generated password using a brute force algorithm.
    - Then, we make some assumptions based on how users typically vary passwords of the same structure across different sites to predict how long it would take an attacker to
      guess the password on a given site given their knowledge of a password on a different site.
    - The hope is that, in comparing the difference in how long it takes an attacker to crack their password, users would be encouraged to have more variety in the login
      credentials they use across different websites.
    - The user can also go back and enter more passwords if they so choose.
