import { useContext } from "react";
import { Link } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { ShoppingCartContext } from "../../Context";
import OrderCard from "../OrderCard";
import { totalPrice } from "../../Utils";
import "./styles.css";

const CheckoutSideMenu = () => {
    const context = useContext(ShoppingCartContext);
    
    const handleDelete = (id) => {
        const filteredProducts = context.cartProducts.filter(product => product.id != id);
        context.setCartProducts(filteredProducts);
    }

    const handleCheckout = () => {
        const orderToAdd = {
            date: '01.02.23',
            products: context.cartProducts,
            totalProducts: context.cartProducts.length,
            totalPrice: totalPrice(context.cartProducts.map(product => (product.price))) 
        }

        context.setOrder([...context.order, orderToAdd]);
        context.setCartProducts([]);
        context.setSearchByTitle(null);
    }

    return(
        <aside className={`${context.isCheckoutSideMenuOpen ? "flex" : "hidden"} checkout-side-menu flex flex-col fixed right-0 border border-black rounded-lg bg-white`}>
            <div className="flex justify-between items-center p-6">
                <h2 className="font-medium text-xl p-6">My Order</h2>
                <div className="flex justify-between items-center p-6">
                    <XMarkIcon 
                        className="h-6 w-6 text-black cursor-pointer" 
                        onClick={()=>{ context.closeCheckoutSideMenu()}}    
                    />
                </div>
            </div>
            <div className="px-6 overflow-y-scroll flex-1">
                {
                    context.cartProducts.map( product => (
                        <OrderCard
                            key={product.id}
                            id={product.id} 
                            title={product.title}
                            imageUrl={product.image}
                            price={product.price}
                            handleDelete={handleDelete}
                        />
                    ))
                }
            </div>
            <div className="px-6">
                <p className="flex justify-between items-center">
                    <span className="font-light">Total: </span>
                    <span className="font-medium text-xl">$ { totalPrice(context.cartProducts.map(product => (product.price))) }</span>
                </p>
                <Link to="/my-orders/last">
                    <button className="bg-black py-3 text-white w-full rounded" onClick={() => handleCheckout()}>Checkout</button>
                </Link>
            </div>
        </aside>
    )

}

export default CheckoutSideMenu;