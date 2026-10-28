import { useMemo, useState } from "react";
import type { FormEvent } from "react";

import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import "../../../css/products.css";

type Category = "Dish" | "Salad" | "Drink" | "Dessert" | "Other";
type SortOrder = "new" | "price" | "views";

type Product = {
  id: string;
  name: string;
  image: string;
  price: number;
  views: number;
  category: Category;
};

const products: Product[] = [
  {
    id: "1",
    name: "Cutlet",
    image: "/img/cutlet.webp",
    price: 12,
    views: 20,
    category: "Dish",
  },
  {
    id: "2",
    name: "Kebab",
    image: "/img/kebab-fresh.webp",
    price: 12,
    views: 35,
    category: "Dish",
  },
  {
    id: "3",
    name: "Kebab",
    image: "/img/kebab.webp",
    price: 12,
    views: 28,
    category: "Dish",
  },
  {
    id: "4",
    name: "Lavash",
    image: "/img/lavash.webp",
    price: 12,
    views: 42,
    category: "Dish",
  },
  {
    id: "5",
    name: "Lavash",
    image: "/img/lavash.webp",
    price: 12,
    views: 18,
    category: "Dish",
  },
  {
    id: "6",
    name: "Cutlet",
    image: "/img/cutlet.webp",
    price: 12,
    views: 30,
    category: "Dish",
  },
  {
    id: "7",
    name: "Kebab",
    image: "/img/kebab.webp",
    price: 12,
    views: 24,
    category: "Dish",
  },
  {
    id: "8",
    name: "Kebab",
    image: "/img/kebab-fresh.webp",
    price: 12,
    views: 15,
    category: "Dish",
  },
];

const categories: Category[] = [
  "Dish",
  "Salad",
  "Drink",
  "Dessert",
  "Other",
];

const sortOptions: { value: SortOrder; label: string }[] = [
  { value: "new", label: "NEW" },
  { value: "price", label: "PRICE" },
  { value: "views", label: "VIEWS" },
];

const PAGE_SIZE = 8;

export default function Products() {
  const [category, setCategory] = useState<Category>("Dish");
  const [sortOrder, setSortOrder] = useState<SortOrder>("new");
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);

  // Namuna uchun savatdagi mahsulotlar soni.
  const [cartCounts, setCartCounts] = useState<Record<string, number>>({});
  const [cartNotice, setCartNotice] = useState("");

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    const result = products.filter(
      (product) =>
        product.category === category &&
        product.name.toLowerCase().includes(query)
    );

    if (sortOrder === "price") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sortOrder === "views") {
      result.sort((a, b) => b.views - a.views);
    }

    return result;
  }, [category, sortOrder, searchQuery]);

  const pageCount = Math.max(
    1,
    Math.ceil(filteredProducts.length / PAGE_SIZE)
  );

  const visibleProducts = filteredProducts.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSearchQuery(searchInput);
    setPage(1);
  };

  const handleCategory = (nextCategory: Category) => {
    setCategory(nextCategory);
    setPage(1);
  };

  const handleSort = (nextSort: SortOrder) => {
    setSortOrder(nextSort);
    setPage(1);
  };

  const handleAddToCart = (product: Product) => {
    setCartCounts((previous) => ({
      ...previous,
      [product.id]: (previous[product.id] || 0) + 1,
    }));

    setCartNotice(`${product.name} savatga qo‘shildi`);
  };

  return (
    <main className="products catalog-page">
      <div className="catalog-container">
        {/* Sarlavha va qidiruv */}
        <header className="catalog-header">
          <h1 className="catalog-heading">Burak Restaurant</h1>

          <form className="catalog-search" onSubmit={handleSearch}>
            <input
              type="search"
              placeholder="Type here"
              aria-label="Mahsulot qidirish"
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
            />

            <button type="submit">
              <span>SEARCH</span>
              <SearchIcon />
            </button>
          </form>
        </header>

        {/* Saralash tugmalari */}
        <div className="catalog-filters">
          {sortOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              className={`catalog-filter ${
                sortOrder === option.value ? "is-active" : ""
              }`}
              aria-pressed={sortOrder === option.value}
              onClick={() => handleSort(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>

        <div className="catalog-content">
          {/* Chapdagi kategoriyalar */}
          <nav
            className="catalog-categories"
            aria-label="Mahsulot kategoriyalari"
          >
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                className={`catalog-category ${
                  category === item ? "is-active" : ""
                }`}
                aria-pressed={category === item}
                onClick={() => handleCategory(item)}
              >
                {item}
              </button>
            ))}
          </nav>

          {/* Mahsulotlar */}
          <section
            className="catalog-grid"
            aria-label="Mahsulotlar ro‘yxati"
          >
            {visibleProducts.length > 0 ? (
              visibleProducts.map((product) => (
                <article key={product.id} className="catalog-card">
                  <div className="catalog-image-box">
                    <a
                      href={`/products/${product.id}`}
                      className="catalog-image-link"
                      aria-label={`${product.name} haqida batafsil`}
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="catalog-image"
                      />
                    </a>

                    <span className="catalog-sale">Normal size</span>

                    <div className="catalog-card-actions">
                      <button
                        type="button"
                        className="catalog-cart-button"
                        aria-label={`${product.name}ni savatga qo‘shish`}
                        onClick={() => handleAddToCart(product)}
                      >
                        <ShoppingCartOutlinedIcon />

                        {cartCounts[product.id] > 0 && (
                          <span className="catalog-cart-count">
                            {cartCounts[product.id]}
                          </span>
                        )}
                      </button>

                      <span
                        className="catalog-views"
                        aria-label={`${product.views} marta ko‘rilgan`}
                      >
                        <VisibilityOutlinedIcon />
                        <span>{product.views}</span>
                      </span>
                    </div>
                  </div>

                  <h2 className="catalog-product-name">
                    <a href={`/products/${product.id}`}>
                      {product.name}
                    </a>
                  </h2>

                  <div className="catalog-product-price">
                    <MonetizationOnIcon />
                    <span>{product.price}</span>
                  </div>
                </article>
              ))
            ) : (
              <div className="catalog-empty">
                Bu kategoriyada mos mahsulot topilmadi.
              </div>
            )}
          </section>
        </div>

        {/* Sahifalash */}
        {filteredProducts.length > 0 && (
          <nav className="catalog-pagination" aria-label="Sahifalar">
            <button
              type="button"
              aria-label="Oldingi sahifa"
              disabled={page === 1}
              onClick={() => setPage((previous) => previous - 1)}
            >
              <ArrowBackIcon />
            </button>

            {Array.from({ length: pageCount }, (_, index) => {
              const pageNumber = index + 1;

              return (
                <button
                  key={pageNumber}
                  type="button"
                  className={page === pageNumber ? "is-active" : ""}
                  aria-current={page === pageNumber ? "page" : undefined}
                  onClick={() => setPage(pageNumber)}
                >
                  {pageNumber}
                </button>
              );
            })}

            <button
              type="button"
              aria-label="Keyingi sahifa"
              disabled={page === pageCount}
              onClick={() => setPage((previous) => previous + 1)}
            >
              <ArrowForwardIcon />
            </button>
          </nav>
        )}

        <p className="catalog-status" role="status">
          {cartNotice}
        </p>
      </div>
    </main>
  );
}