import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../api/axios.js";
import { showcaseProducts } from "../data/showcase.js";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState();
  const [message, setMessage] = useState("");

  useEffect(() => {
    let active = true;
    const fallback = showcaseProducts.find((item) => item._id === id);

    api
      .get(`/products/${id}`)
      .then((response) => {
        if (active) setProduct(response.data);
      })
      .catch(() => {
        if (active) setProduct(fallback);
      });

    return () => {
      active = false;
    };
  }, [id]);

  if (!product) {
    return (
      <div className="card text-center">
        <h1 className="text-2xl font-bold">Product not found</h1>
        <Link className="mt-4 inline-block text-cyan-700" to="/products">Back to products</Link>
      </div>
    );
  }

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existing = cart.find((item) => item.product === product._id);

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({
        product: product._id,
        name: product.name,
        image: product.image,
        price: product.discountPrice || product.price,
        quantity: 1,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    setMessage("Added to cart");
  };

  return (
    <section className="product-detail">
      <div className="product-detail-image">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="product-detail-copy">
        <p className="section-kicker">{product.brand} / {product.category}</p>
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <div className="price-row">
          <strong>Rs. {product.discountPrice || product.price}</strong>
          {product.discountPrice && <span>MRP Rs. {product.price}</span>}
        </div>
        {product.highlights && (
          <div className="detail-points">
            {product.highlights.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        )}
        {message && <p className="success-message">{message}</p>}
        <button className="btn" onClick={addToCart}>Add to cart</button>
      </div>
    </section>
  );
}
