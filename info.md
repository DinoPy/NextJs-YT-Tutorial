REDIRECTs --- are done via the next.config.js using the redirect keyword that takes keyword redirects: async () => {that returns a list of object with source, destination and permanent (boolean)}

AUTHENTICATION --- with NextAuth

- Once we add the next-auth package, we can use the provider keyword to add the providers we want to use for authentication. We can also add the callbacks keyword to add custom callbacks for the authentication process. <-- from Copilot.

- A catch all file is required in api/auth (folter) [...nextauth].js, within we import next auth and the providers we want to use (the function will be exported as default). We use the client id and client secret that are obtained from the provider in this case github -> settings -> developer options.

- So far the customer can only signin via api/auth/signin or signout

- The next step is to import functions signIn and signOut that we pass as a callback to onClick (that we give to a tag). The sign in method can take an argument like 'google' or 'github' if this is the only method implemented. The Link component also needs a href that leads to '/api/auth/signin' or out. Also make sure to prevent default not to reload the page on click.

- To access session status we can use useSession hook from next-auth/react, this require out component in \_app to be wrapped in <SessionProvider session ={pageProps.session}>, we will then be able to use useSession hook by destructuring it {data:session,status}. We can use the session that is received and status to conditionally render certain parts of the page such as sign in and out buttons.

- SECURE ROUTES CLIENT SIDE -- instead of useSession we use getSession (both are fine for this purpose). We will create a loading state for the user data that is defaulted to true, we then use useEffect and within create an async function that will return the session which we can use to either call signIn or redirect to /api/auth/signin else (if user is loged in) we set loading to false. The dependency array for this effect will be empty as we only need to check the user session once when accesing the page.

- SERVER-SIDE AUTHENTICATION -- we call getServerSideProps and within declare session using getSession function, this function takes as arg the context. Based on the result of the session (if session or not) we can return a certain data.

- wE CAN PASS session from the server side as props and the provider will receive it from pageProps.session and pass it on to the other documents, this way there will be no need for a network call for verification on client end that causes flickering.

- SECURING PAGES SERVER SIDE - we will chech if session and if not we return a redirect object with destination to sign in page and permanent false

- SECURING APIS - we call get session which takes the destructured req, if session exist we do something else we reject with status 401. We can destructure the session and based the information we have access to (locally or via db call) we can establish user's authorization level and repond with relevant information.

- MONGODB can be used as an adapter for the nextauth however the tutorial is outdated in this regards.

- CALLBACKS FOR [...NEXTAUTH] - there are 4 possible callbacks, to get the userid received from outh we need to set the jwt callback which receives the user and token parameters, we can assign the token.user = user so we can have the full info (we return token) then within session user we take the session.user and set it to token.user then we return session
