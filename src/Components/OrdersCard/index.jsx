import PropTypes from "prop-types";
import { ChevronRightIcon } from "@heroicons/react/24/solid";

const OrdersCard = props => {

    const { totalPrice, totalProducts } = props;

    return (
        <div className="flex justify-between items-center border border-black rounded-lg p-4 w-80 mb-4">
            <div className="flex justify-between w-full">
                <p className="flex flex-col">
                    <span className="light">01.02.2023</span>
                    <span className="light">{totalProducts} articles</span>
                </p>
                <p className="flex items-center gap-2">
                    <span className="font-medium text-2xl">${totalPrice}</span>
                    <ChevronRightIcon className="h-6 w-6 text-black cursor-pointer" />
                </p>
            </div>
        </div>
    )
}

OrdersCard.propTypes = {
    totalPrice: PropTypes.number,
    totalProducts: PropTypes.number
}

export default OrdersCard;