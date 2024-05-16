import { createContext, useState } from "react";
import PropTypes from "prop-types";
import { useEffect } from "react";

export const ShoppingCartContext =  createContext();

export const initializeLocalStorage = () => {
  const accountInLocalStorage = localStorage.getItem("account");
  const signOutInLocalStorage = localStorage.get("sign-out");
  let parsedAccount;
  let parsedSignOut;

  if (!accountInLocalStorage) {
    localStorage.setItem("account", JSON.stringify({}));
    parsedAccount = {}
  } else {
    parsedAccount = JSON.parse(accountInLocalStorage);
  }

  if (!signOutInLocalStorage) {
    localStorage.setItem("sign-out", JSON.stringify(false))
    parsedSignOut = false;
  } else {
    parsedSignOut = JSON.parse(signOutInLocalStorage);
  }
}

const ShoppingCartProvider = ({children}) => {

    //My account
    const [account, setAccount] = useState({});

    //Sign out
    const [count, setCount] = useState(false);

    // Shopping cart - Increment quantity
    const [signOut, setSignOut] = useState(0);

    // Product Detail - Open / Close
    const [isProductDetailOpen, setIsProductDetailOpen]  = useState(false);
    const openProductDetail = () => setIsProductDetailOpen(true);
    const closeProductDetail = () => setIsProductDetailOpen(false);

    // Product Detail - Show Product
    const [productToShow, setProductToShow] = useState({});

    // Shopping Cart - Add new products to cart
    const [cartProducts, setCartProducts] = useState([]);

    // Checkout side menu - Open / Close
    const [isCheckoutSideMenuOpen, setIsCheckoutSideMenuOpen]  = useState(false);
    const openCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(true);
    const closeCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(false);

    //Shopping Cart - Order
    const [order, setOrder] = useState([]);

    //Get products
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    
    //Search by title
    const [searchByTitle, setSearchByTitle] = useState(null);

    //search by category
    const [searchByCategory, setSearchByCategory] = useState(null);

    useEffect(()=> {
        fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(data => setItems(data))
      },[]);

      const filteredItemsByTitle = (items, searchByTitle) => {
        return items?.filter(item => item.title.toLowerCase().includes(searchByTitle.toLowerCase()));
      };

      const filteredItemsByCategory = (items, searchByCategory) => {
        return items?.filter(item => item.category.toLowerCase().includes(searchByCategory.toLowerCase()));
      };

      const filterBy = (searchType, items, searchByTitle, searchByCategory) => {
        if (searchType === "BY_TITLE") {
           return filteredItemsByTitle(items, searchByTitle);
        }

        if (searchType === "BY_CATEGORY") {
            return filteredItemsByCategory(items, searchByCategory);
        }

        
        if (searchType === "BY_TITLE_AND_CATEGORY") {
            return filteredItemsByCategory(items, searchByCategory).filter(item => item.title.toLowerCase().includes(searchByTitle.toLowerCase()));
        }

        if (!searchType) {
            return items;
        }

      }

      useEffect(()=> {
        if (searchByTitle && searchByCategory) setFilteredItems(filterBy("BY_TITLE_AND_CATEGORY", items, searchByTitle, searchByCategory))
        if (searchByTitle && !searchByCategory) setFilteredItems(filterBy("BY_TITLE", items, searchByTitle, searchByCategory))
        if (searchByCategory && !searchByTitle) setFilteredItems(filterBy("BY_CATEGORY", items, searchByTitle,searchByCategory))
        if (!searchByCategory && !searchByTitle) setFilteredItems(filterBy(null, items, searchByTitle,searchByCategory))
      },[items, searchByTitle, searchByCategory]);

    return(
        <ShoppingCartContext.Provider value={{
            count,
            setCount,
            openProductDetail,
            closeProductDetail,
            isProductDetailOpen,
            productToShow,
            setProductToShow,
            cartProducts,
            setCartProducts,
            isCheckoutSideMenuOpen,
            openCheckoutSideMenu,
            closeCheckoutSideMenu,
            order,
            setOrder,
            items,
            setItems,
            searchByTitle,
            setSearchByTitle,
            filteredItems,
            searchByCategory,
            setSearchByCategory,
            account,
            setAccount,
            signOut,
            setSignOut
        }}>
            
            {children}
        </ShoppingCartContext.Provider>
    );
}

ShoppingCartProvider.propTypes = {
    children: PropTypes.object
}

export { ShoppingCartProvider };

