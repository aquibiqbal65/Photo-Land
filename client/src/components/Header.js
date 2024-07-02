import React, { useContext, useState } from "react";
import Logo from "../img/logo.png";
import { SlBag } from "react-icons/sl";
import { FiMenu } from "react-icons/fi";

import { Link } from "react-router-dom";

import SearchForm from "../components/SearchForm";
import CategoryNavMobile from "../components/CategoryNavMobile";
import Cart from "../components/Cart";
import { CartContext } from "../context/CartContext";



const Header = () => {
  const {isOpen, setIsOpen } = useContext(CartContext)
  return (
    <header>
      <div className="container mx-auto">
        <div>
          <div>
            <FiMenu />
          </div>
          <div>
            <CategoryNavMobile />
          </div>
          <Link to={"/"}>
            <img src={Logo} alt="" />
          </Link>
          <div className="w-full hidden xl:flex xl:max-w-[734px]">
            <SearchForm />
          </div>
          <div>
            <div>Need help? 123 456 789</div>
            <div onClick={() => setIsOpen(!isOpen)} className="relative cursor-pointer">
              <SlBag className="text-2xl" />
              <div>2</div>
            </div>
            <div className={`
            ${isOpen ? 'right-0' : '-right-full'}bg-[#005fbe] shadow-xl fixed top-0 bottom-0 w-full md:max-w-[500px] transition-all duration-300 `}>
              <Cart />
            </div>
          </div>
        </div>
        <div className="lg:hidden">
          <SearchForm />
        </div>
      </div>
    </header>
  );
};

export default Header;
