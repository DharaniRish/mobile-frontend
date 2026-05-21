import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios.js";
import { showcaseProducts } from "../data/showcase.js";

const filters = [
  { key: "search", label: "Search products" },
  { key: "category", label: "Category" },
  { key: "brand", label: "Brand" },
];

export default function Products() {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState({ search: "", category: "", brand: "" });
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let active = true;
    setStatus("loading");

    api
      .get("/products", { params: filter })
      .then((response) => {
        if (!active) return;
        setProducts(response.data);
        setStatus(response.data.length ? "ready" : "showcase");
      })
      .catch(() => {
        if (!active) return;
        setProducts([]);
        setStatus("showcase");
      });

    return () => {
      active = false;
    };
  }, [filter]);

  const displayProducts = useMemo(() => {
    const source = products.length ? products : showcaseProducts;
    const search = filter.search.toLowerCase();
    const category = filter.category.toLowerCase();
    const brand = filter.brand.toLowerCase();

    return source.filter((product) => {
      return (
        (!search || product.name.toLowerCase().includes(search)) &&
        (!category || product.category.toLowerCase().includes(category)) &&
        (!brand || product.brand.toLowerCase().includes(brand))
      );
    });
  }, [filter, products]);

  return (
    <section className="space-y-8">
      <div className="shop-hero">
        <div>
          <p className="section-kicker">Products and care plans</p>
          <h1>Everything your customer needs after the repair counter.</h1>
          <p>
            Curated accessories, protection packs, service bundles, and care plans that make MobileCare Hub feel ready for real customers from day one.
          </p>
        </div>
        <div className="hero-stats">
          {["Tested stock", "Fast checkout", "Service add-ons"].map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </div>

      <div className="filter-bar">
        {filters.map((item) => (
          <input
            key={item.key}
            className="input"
            placeholder={item.label}
            value={filter[item.key]}
            onChange={(event) => setFilter({ ...filter, [item.key]: event.target.value })}
          />
        ))}
      </div>

      {status === "showcase" && (
        <p className="notice">Showing polished sample catalog items. Add products from the admin panel to replace these automatically.</p>
      )}

      <div className="product-grid">
        {displayProducts.map((product) => (
          <article className="product-card" key={product._id}>
            <img src={product.image} alt={product.name} />
            <div className="product-body">
              <p className="product-meta">{product.brand} / {product.category}</p>
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <div className="product-footer">
                <strong>Rs. {product.discountPrice || product.price}</strong>
                <Link to={`/products/${product._id}`}>View details</Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
