import { useState, useEffect } from "react";
import bd from "./assets/bakery-data.json";
import BakeryItem from "./components/BakeryItem";
import Cart from "./components/Cart";
import ResetFilters from "./components/ResetFilters";
import Checkbox from "./components/Checkbox";
import "./App.css";

/* makes the image URLs work */
bd.forEach((item) => {
  item.image = process.env.PUBLIC_URL + "/" + item.image;
});

function App() {
  /* state variables for the cart */
  const [cart, updateCart] = useState([]);
  const [cartMap, updateCartMap] = useState(new Map());
  const [total, setTotal] = useState(0);

  /* shop filtering: sweetness */
  const [low, setLow] = useState(true);
  const [medium, setMedium] = useState(true);
  const [high, setHigh] = useState(true);

  /* shop filtering: price category */
  const [under, setUnder] = useState(true);
  const [between, setBetween] = useState(true);
  const [over, setOver] = useState(true);

  /* shop sorting: price, ascending */
  const [cheapest, setCheapest] = useState(false);

  /* state for the bakery items */
  const [bakeryData, setBakeryData] = useState(bd);

  useEffect(() => {
    bakeryData.forEach(item => updateMap(item.name, 0));
  }, []);

  /*
    Functions for manipulating the cart.
  */
  function updateMap(key, value) {
    updateCartMap(map => new Map(map.set(key, value)));
  }

  function addToCart(item) {
    let filteredCart = cart.filter(cartItem => cartItem.name !== item.name);
    updateCart([...filteredCart, item]);
    updateMap(item.name, cartMap.get(item.name) + 1);

    setTotal(parseFloat((total + item.price).toFixed(2)));
  }

  function removeFromCart(item) {
    setTotal(parseFloat((total - item.item.price).toFixed(2)));
    updateMap(item.item.name, cartMap.get(item.item.name) - 1);
    if (cartMap.get(item.item.name) === 0) {
      updateCart(cart.filter(arr => arr.name !== item.item.name));
    }
  }

  /* 
    Functions for filtering the shop based on sweetness.
  */
  function toggleLow() {
    setLow(!low);
  }

  function toggleMedium() {
    setMedium(!medium);
  }

  function toggleHigh() {
    setHigh(!high);
  }

  function filterSweetness(item) {
    return (low && item.sweetness === "low") || (medium && item.sweetness === "medium") || (high && item.sweetness === "high");
  }

  /*
    Functions for filtering the shop based on price category.
  */
  function toggleUnder() {
    setUnder(!under);
  }

  function toggleBetween() {
    setBetween(!between);
  }

  function toggleOver() {
    setOver(!over);
  }

  function filterPrice(item) {
    let price = parseFloat(item.price);
    return (price < 3 && under) || (price >= 3 && price <= 5 && between) || (price > 5 && over);
  }

  /*
    Function for sorting the shop based on price, ascending.
  */
  function toggleCheapest() {
    setCheapest(!cheapest);
    if (!cheapest) {
      setBakeryData(bakeryData.sort((a, b) => parseFloat(a.price) - parseFloat(b.price)));
    } else {
      /* randomize the order of the items */
      setBakeryData(bakeryData.sort(() => Math.random() - 0.5));
    }
  }

  /*
    Function for resetting the shop filters/sorting.
  */
  function resetFilters() {
    setLow(true);
    setMedium(true);
    setHigh(true);
    setUnder(true);
    setBetween(true);
    setOver(true);
    if (cheapest) {
      toggleCheapest();
    }

    /* get all checkboxes and set them to true, with the last one being false */
    let checkboxes = document.querySelectorAll("input[type=checkbox]");
    for (let i = 0; i < checkboxes.length - 1; i++) {
      checkboxes[i].checked = true;
    }
    checkboxes[checkboxes.length - 1].checked = false;
  }

  return (
    <div className="container">
      <h1>Bakery</h1>
      <div>
        <div>
          <div><h3>Filter by Sweetness:</h3></div>
          <div className="checkbox-row">
            <Checkbox name="Low" state={low} toggleState={toggleLow} />
            <Checkbox name="Medium" state={medium} toggleState={toggleMedium} />
            <Checkbox name="High" state={high} toggleState={toggleHigh} />
          </div>
        </div>
        <hr></hr>
        <div>
          <div><h3>Filter By Price</h3></div>
          <div className="checkbox-row">
            <Checkbox name="< $3" state={under} toggleState={toggleUnder} />
            <Checkbox name="$3–$5" state={between} toggleState={toggleBetween} />
            <Checkbox name="$5+" state={over} toggleState={toggleOver} />
          </div>
        </div>
        <hr></hr>
        <div>
          <div><h3>Sort By:</h3></div>
          <Checkbox name="Price ↑" state={cheapest} toggleState={toggleCheapest} />
        </div>
      </div>
      <hr></hr>
      <ResetFilters reset={resetFilters}></ResetFilters>
      <hr></hr>
      <div>
        <Cart cart={cart} cartMap={cartMap} click={removeFromCart} total={total} />
      </div>
      <hr></hr>
      <div>
        <div className="items">
          {bakeryData.map((item, index) => {
            return filterSweetness(item) && filterPrice(item) ? (
              <BakeryItem key={index} name={item.name} desc={item.description}
                price={item.price} image={item.image} total={total} click={addToCart} />
            ) : null;
          })}
        </div>
      </div>
    </div>
  );
}

export default App;