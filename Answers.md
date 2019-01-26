## Self-Study/Essay Questions

Demonstrate your understanding of this week's concepts by answering the following free-form questions. Edit this document to include your answers after each question. Make sure to leave a blank line above and below your answer so it is clear and easy to read by your project manager.

1. What is the purpose of using _sessions_?

Seesions is another way to store information about a users log in status. This way for each page that might require a log in the browser will already have stored that the user has logged in and doesn't have to constantly log in to view diffrent protected parts of a webpage.

2. What does bcrypt do to help us store passwords in a secure manner.
Brcrypt works by first salting the password by adding random data then it uses hashing to  perform a one way transformation on a password turning it into a string.

3. What does bcrypt do to slow down attackers?

It slows them down by forcing them to know the hash, algorithm and how many rounds were used.

4. What are the three parts of the JSON Web Token?

The 3 parts of a token are the header, payload and the signature. The header contains the algorithm and token type, the payload is any data we store in the token it isnt secure so passwords shouldnt be stored. Finally the signature is the secret that helps decode the token.