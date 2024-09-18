In this app we can send form data in our email directly using nodemailer. Inside this project we create an api where we control our email auth and credential with email structure.

## Getting Started
At your terminal
First - npm install

Then run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```


## .env.local File setup
Here we should mention user name and password.
```bash
EMAIL_USER=[your_email]@gmail.com
# must be gmail account. if not we should change smtp host and port
EMAIL_PASS=[16 digit app password]
# email should be 2 step enabled and after that we can get a feature called app passwords where gmail allows us to create a 16 digit app password and here we should add that.
```
# Otherwise we can't send email.




