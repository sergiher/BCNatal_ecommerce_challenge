# eCommerce

## Technical challenge

Welcome! This technical challenge involves extending a small eCommerce app. You will see that the project is already set up with some basic functionality, but there are still some features to implement. The current setup lets users browse categories, view products, and add items to a cart (persisted via local storage).

### Things to do

- Upload this code to a new GitHub repository, [create a new Supabase project](https://database.new) (it's free) and link it to your codebase. In the `supabase` folder, you will find everything you need to set up the database and the authentication.
- To verify the setup, run the development server with `npm run dev` and ensure the core features work as expected. You should be able to see the products in the categories, add them to the cart, and see the cart. Users should be able to register and log in.

- Implement the following features:
  - **Out of stock**: Clearly indicate when an item is out of stock—don’t hide it. Inform users at every step what's available and what's not.
  - **Search**: Add a search bar to the site that allows users to search for products.
  - **Checkout**: When a user clicks the checkout button, decrease the stock of the products in the cart and clear the cart. Use [Sonner](https://sonner.emilkowal.ski/) (already set up) to display a success/error message. Don't worry about implementing a payment gateway.
  - **Orders**: When a user checks out, store a new order in the database with the list of products, their quantities, current prices, and the user ID. Make sure users are logged in before they can check out. Don't implement a user-side visualization of past orders.
  - **Minor styling improvements**: You will see that a few visual details are not polished to the level we would like. Feel free to change the styles as you see fit. (We are aware that some images have very low quality, but don't worry about that: another member of the team will take care of that later.)

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app). It uses [Tailwind](https://tailwindcss.com) and [shadcn/ui](https://ui.shadcn.com/) for styling, and [Supabase](https://supabase.com) for the database and authentication.

We will ask you to share your repository with us once you finish the challenge, so we can review your code and see how you approached the problem. Make sure to commit your changes regularly and write clear commit messages.

### How to run the project

First, clone the repository and navigate into the project directory. Then, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Good luck!

We’re excited to see how you approach this challenge! Feel free to reach out if you have any questions or need clarification on any of the requirements.

Made with ❤️ at BCNatal Research.
