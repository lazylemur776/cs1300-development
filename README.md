# Development

### Link to Deployed Website
If you used the stencil code, this is `https://lazylemur776.github.io/cs1300-development`

### Goal and Value of the Application
The goal of the application is to display items that are available at a bakery and allow a user to browse the items and assemble a cart based on which items they would like to purchase. The value of this to a user is that there is a central, easily filterable/sortable interface that exposes all of the bakery's items for them to buy.

### Usability Principles Considered
I tried to present the hierarchy of information on the site by using different headings, and I also considered the layout of the site and how that makes it more or less usable. By placing all of the filtering options at the top of the site, and then placing the items at the bottom in a grid, it allows the user to consider what items they would like to see and then see them presented together for easy access.

### Organization of Components + How Data is Passed Down Through Components
Each bakery item is its own component (a `BakeryItem`). There is a separate Component for the cart (a `Cart`). `BakeryItem`s are initialized based on `src/assets/bakery-data.json`, which includes all of the metadata for the bakery. The `Cart` is given a list of `BakeryItem`s and the total price of these items. I also created other components for parts of the UI like `Checkbox` and `ResetFilters`, but these are fairly self-explanatory, as the `Checkbox` is used for toggling state (like a filter) and `ResetFilters` is a button that resets all of the filters to their default state.

### How the User Triggers State Changes
A user clicks on a button to add an item to the cart (or remove an item from the cart), which updates the cart state (a list of bakery items) and the total state (the cart total). When clicking the filtering checkboxes or the sorting checkbox, that updates the boolean state variables that correspond to the filters and sorting that's applied to the bakery items.
