import { useContext } from "react";
import Layout from "../../Components/Layout";
import { ShoppingCartContext } from "../../Context";
import { Link } from "react-router-dom";

function SignIn() {
    const context = useContext(ShoppingCartContext)

    //Acount
    const account = localStorage.getItem("account");
    const parsedAccount = JSON.parse(account);
    //Has an account?
    const noAccountInLocalStorage = parsedAccount ? Object.keys(parsedAccount).length === 0 : true;
    const noAccountInLocalState = context.account ? Object.keys(context.account).length === 0 : true;
    const hasUserAnAccount = !noAccountInLocalStorage || !noAccountInLocalState;

    return(
        <Layout>
            <h1 className="font-medium text-xl text-center mb-6 w-80">Welcome</h1>
            <div className="flex flex-col w-80">
                <p>
                    <span className="font-light text-sm">Email:</span>
                    <span>{parsedAccount?.email}</span>
                </p>
                <p>
                    <span className="font-light text-sm">Password:</span>
                    <span>{parsedAccount?.password}</span>
                </p>
                <Link
                    to="/">
                        <button
                            className="bg-black disabled:bg-black/40 text-white w-full rounded-lg py-3 mt-5 mb-2"
                            disabled={!hasUserAnAccount}>
                                Log in
                        </button>
                </Link>
                <div className="text-center">
                    <a className="font-light text-xs underline underline-offset-4" href="/">Forgot my password</a>
                </div>
                <button
                    className="border border-black disabled:text-black/40 disabled:border-black/40 rounded-lg mt-6 py-3"
                    disabled={hasUserAnAccount}>
                        Sign up
                </button>
            </div>
        </Layout>
    );
}

export default SignIn