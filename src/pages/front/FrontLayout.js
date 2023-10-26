import { Outlet } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
import ShopingCart from "../../components/ShoppingCart"

function FrontLayout() {
    const [cartData, setCartData] = useState({})
    const [isShopingCartActive, setIsShopingCartActive] = useState(false)

    const getCart = async () => {
        try {
            const res = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/cart`)
            setCartData(res.data.data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getCart()
    }, [])

    return (
        <div className="flex flex-col" >
            <ShopingCart
                cartData={cartData}
                isShopingCartActive={isShopingCartActive}
                setIsShopingCartActive={setIsShopingCartActive}
                getCart={getCart} />
            <Navbar cartData={cartData} setIsShopingCartActive={setIsShopingCartActive} />
            <div className="">
                <Outlet context={{ getCart }}></Outlet>
            </div>
            <Footer />
        </div>
    )
}
export default FrontLayout