import { useContext } from "react";
import "./styles.css";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { ShoppingCartContext } from "../../Context";

const ProductDetail = () => {
    const context = useContext(ShoppingCartContext);

    return(
        <aside className={`${context.isProductDetailOpen ? "flex" : "hidden"} product-detail flex flex-col fixed right-0 border border-black rounded-lg bg-white`}>
            <div className="flex justify-between items-center">
                <h2 className="font-medium text-xl p-6">Detail</h2>
                <div className="flex justify-between items-center p-6">
                    {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg> */}
                    <XMarkIcon 
                        className="h-6 w-6 text-black cursor-pointer" 
                        onClick={()=>{ context.closeProductDetail()}}    
                    />
                </div>
            </div>
            <div className="overflow-y-scroll">
                <figure className="px-6">
                        <img 
                            className="w-full h-full rounded-lg" 
                            src={context.productToShow.image} 
                            alt={context.productToShow.title}
                        />
                </figure>
                <p className="flex flex-col p-6">
                    <span className="font-medium text-2xl mb-2">${context.productToShow.price}</span>
                    <span className="font-medium text-md">{context.productToShow.title}</span>
                    <span className="font-light text-sm">{context.productToShow.description}</span>
                </p>
            </div>
        </aside>
    )

}

export default ProductDetail;
