import React from "react";
// useFetch hook
import useFetch from '../hooks/useFetch.js';
import ProductSlider from '../components/ProductSlider.js';

const LatestProducts = () => {
  const { data } = useFetch("/products?populate=*&ifilters[isNew]=true");
  return (
    <div className="mb-16">
      <div className="container mx-auto">
        <h2 className="h2 mb-6 text-center .xl:text-left">Latest Products</h2>
      </div>
      <ProductSlider data={data} />
    </div>
  );
};

export default LatestProducts;
