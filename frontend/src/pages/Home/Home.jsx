import css from './Home.module.scss';
import { useEffect, useState } from "react";
import httpRequest from "../../lib/http-request";
import ProductCard from "../../components/ProductCard/ProductCard";

const Home = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const data = await httpRequest.get('products');

    setProducts(data?.data || []);
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  if (products.length === 0) return null;

  return (
    <section>
      <div className="header">
        <div className="container">
          <h1>Products</h1>
        </div>
      </div>
      <div className={css.products}>
        <div className="container">
          <div className={css.products__grid}>
            {products.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
        </div>
      </div>
    </section>
  )
};

export default Home;
