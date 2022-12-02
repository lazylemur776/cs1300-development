# Development

### Link to Deployed Website
If you used the stencil code, this is `https://lazylemur776.github.io/development`

### Goal and Value of the Application
The goal of the application is to display items that are available at a bakery and allow a user to browse the items and assemble a cart based on which items they would like to purchase. The value of this to a user is that there is a central, easily filterable/sortable interface that exposes all of the bakery's items for them to buy.

### Usability Principles Considered
I tried to present the hierarchy of information on the site by using different headings, and I also considered the layout of the site and how that makes it more or less usable. By placing all of the filtering options at the top of the site, and then placing the items at the bottom in a grid, it allows the user to consider what items they would like to see and then see them presented together for easy access.

### Organization of Components + How Data is Passed Down Through Components
Each bakery item is its own component (a `BakeryItem`). There is a separate Component for the cart (a `Cart`). `BakeryItem`s are initialized based on `src/assets/bakery-data.json`, which includes all of the metadata for the bakery. The `Cart` is given a list of `BakeryItem`s and the total price of these items. I also created other components for parts of the UI like `Checkbox` and `ResetFilters`, but these are fairly self-explanatory, as the `Checkbox` is used for toggling state (like a filter) and `ResetFilters` is a button that resets all of the filters to their default state.

### How the User Triggers State Changes
When the user click to add/remove to/from cart, that updates the cart state and the total state. When the user clicks the filtering/sorting checkboxes, that updates the boolean states that are used to filter and sort before rendering the art pieces.
