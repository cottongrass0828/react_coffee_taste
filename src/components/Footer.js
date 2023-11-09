import { FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";
function Footer() {
    return (
        <footer className="w-full border-t border-gray-100 bg-coffee-100 pt-8 sm:pt-12">
            <div className="container mx-auto px-4 sm:flex sm:justify-between">
                <div className="sm:grow sm:flex sm:flex-wrap sm:-mx-4 md:py-4">
                    <div className="px-4 sm:w-1/2 md:w-1/4 xl:w-1/6">
                        <ul className="list-none">
                            <li className="mb-2">
                                <Link to='/' className="border-b border-solid border-transparent hover:border-coffee-800 hover:text-coffee-800">首頁</Link>
                            </li>
                            <li className="mb-2">
                                <Link to='/products' className="border-b border-solid border-transparent hover:border-coffee-800 hover:text-coffee-800">所有商品</Link>
                            </li>
                            <li className="mb-2">
                                <Link to='/articles' className="border-b border-solid border-transparent hover:border-coffee-800 hover:text-coffee-800">咖啡駐所</Link>
                            </li>
                            <li className="mb-2">
                                <Link to='/about' className="border-b border-solid border-transparent hover:border-coffee-800 hover:text-coffee-800">咖啡味故事</Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="shrink px-4 mt-8 ">
                    <div className="inline-block w-[45px] mr-3.5">
                        <img className="object-cover rounded-lg" src="react_coffee_taste/logo200.png" alt="logo" />
                    </div>
                    <div className="inline-block mb-[52px]">
                        <div className="font-bold text-xl tracking-[0.85em]">咖啡味</div>
                        <div className="text-sm">COFFEE TASTE</div>
                    </div>
                </div>
            </div>
            <div className="container mx-auto md:py-4 mt-8 md:mt-0">
                <ul className="list-none px-4">
                    <li className="mb-2">
                        <a href="#" className="text-coffee-300 hover:text-coffee-800">前往後臺</a>
                    </li>
                </ul>
            </div>
            <div className="text-center bg-slate-400 py-1">Copyright © 2023
                <a className="mx-1 border-b border-solid border-transparent hover:border-coffee-800 hover:text-coffee-800" href="https://github.com/cottongrass0828" target="_blank">
                    cottongrass0828<FaGithub className="inline-block h-5 w-5 ml-1 mb-1" />
                </a> 本網站僅供個人作品集製作，並無商業用途！</div>
        </footer>)
}
export default Footer