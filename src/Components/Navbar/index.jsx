import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { ShoppingCartContext } from "../../Context";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";

const Navbar = () => {
    const context =  useContext(ShoppingCartContext);
    const activeStyle = 'underline underline-offset-4';

    //Sign Out
    const signOut = localStorage.getItem("sign-out");
    const parsedSignOut = JSON.parse(signOut);
    const isUserSignOut = context.signOut || parsedSignOut;

    const handleSignOut = () => {
        const stringifiedSignOut = JSON.stringify(true);
        localStorage.setItem("sign-out", stringifiedSignOut);
        context.setSignOut(true);
    }

    const renderView = () => {
        if (isUserSignOut) {
            <li>
                <NavLink
                    to="/sign-in"
                    className={({ isActive }) => isActive ? activeStyle : undefined}
                    onClick={() => handleSignOut()}
                >
                    Sign out
                </NavLink>
            </li>
        } else {
            return (
            <>
                <li className="text-black/60">
                    teff@platzi.com
                </li>
                <li>
                    <NavLink to='/my-orders' className={({ isActive }) => isActive ? activeStyle : undefined}>
                        My Orders
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/my-account' className={({ isActive }) => isActive ? activeStyle : undefined}>
                        My Account
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to='/sign-in' 
                        className={({ isActive }) => isActive ? activeStyle : undefined}
                        onClick={() => handleSignOut()}
                    >
                        Sign out
                    </NavLink>
                </li>
            </>
            )
        }
    }

    return (
        <nav className="flex justify-between items-center fixed top-0 z-10 w-full py-5 px-8 text-sm font-light">
            <ul className="flex items-center gap-3">
                <li className="font-semibold text-lg">
                    <NavLink to='/'>
                        Shopi
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to='/' 
                        onClick={()=> context.setSearchByCategory()}
                        className={({ isActive }) => isActive ? activeStyle : undefined}>
                        All
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to='/clothes' 
                        onClick={()=> context.setSearchByCategory("clothes")}
                        className={({ isActive }) => isActive ? activeStyle : undefined}>
                        Clothes
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        onClick={()=> context.setSearchByCategory("electronics")} 
                        to='/electronics' 
                        className={({ isActive }) => isActive ? activeStyle : undefined}
                    >
                        Electronics
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        onClick={()=> context.setSearchByCategory("furnitures")} 
                        to='/furnitures' 
                        className={({ isActive }) => isActive ? activeStyle : undefined}
                    >
                        Furnitures
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        onClick={()=> context.setSearchByCategory("toys")} 
                        to='/toys' className={({ isActive }) => isActive ? activeStyle : undefined}
                    >
                        Toys
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        onClick={()=> context.setSearchByCategory("others")} 
                        to='/others' 
                        className={({ isActive }) => isActive ? activeStyle : undefined}
                    >
                        Others
                    </NavLink>
                </li>
            </ul>
            <ul className="flex items-center gap-3">
                {renderView()   }
                <li className="flex items-center">
                    <ShoppingCartIcon className="h-4 w-4 text-black" /> 
                    <div>{context.cartProducts.length}</div>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar