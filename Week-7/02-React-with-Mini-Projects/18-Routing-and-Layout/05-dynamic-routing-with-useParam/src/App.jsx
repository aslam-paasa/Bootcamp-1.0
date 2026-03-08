/**
 * ============================================================
 * TOPIC: Dynamic Routing & useParams
 * ============================================================
 *
 * Pehle problem samjho.
 *
 * ============================================================
 * PROBLEM — Har user ke liye alag route banana padta
 * ============================================================
 * Maan lo ek app hai jisme 1000 users hain.
 * Bina dynamic routing ke:
 *
 *   <Route path="/users/1"    element={<User1 />} />
 *   <Route path="/users/2"    element={<User2 />} />
 *   <Route path="/users/3"    element={<User3 />} />
 *   ... 1000 routes ...
 *
 * ❌ Impossible hai. 1000 alag components banana padega.
 * ❌ Nayi user aaye to nayi route manually add karni padegi.
 *
 * ============================================================
 * SOLUTION — Dynamic Routes with :param
 * ============================================================
 * Ek hi route banao — URL mein variable part ke liye :param use karo:
 *
 *   <Route path="/users/:id" element={<UserProfile />} />
 *
 * :id ek placeholder hai. Jo bhi value aayegi URL mein,
 * wo useParams() se mil jaayegi component ke andar.
 *
 *   /users/1    → { id: "1" }
 *   /users/42   → { id: "42" }
 *   /users/john → { id: "john" }
 *
 * ✅ Ek route, infinite users.
 *
 * ============================================================
 * useParams() kaise kaam karta hai
 * ============================================================
 * Step 1 — Route mein :paramName define karo:
 *   <Route path="/users/:id" element={<UserProfile />} />
 *
 * Step 2 — Component mein useParams() se value lo:
 *   function UserProfile() {
 *     const { id } = useParams();
 *     // id = jo bhi URL mein tha
 *   }
 *
 * Step 3 — us value se API call karo ya content dikhao:
 *   fetch(`/api/users/${id}`)
 *
 * ============================================================
 * Multiple params bhi ho sakte hain
 * ============================================================
 *   <Route path="/products/:category/:productId" element={<Product />} />
 *
 *   URL: /products/electronics/iphone-13
 *   useParams() → { category: "electronics", productId: "iphone-13" }
 *
 * Dono values alag alag milti hain — seedha API mein use karo.
 * ============================================================
 */

import React, { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useParams,
  useNavigate,
  Outlet,
} from "react-router-dom";
import "./App.css";


/**
 * ============================================================
 * FAKE DATA — Real app mein ye API se aata
 * ============================================================
 * Hum jsonplaceholder.typicode.com use karenge real API calls ke liye.
 * Ye free mock API hai — real fetch() calls honge.
 *
 * Neeche local data bhi hai blog aur product demos ke liye.
 * ============================================================
 */

const BLOG_POSTS = [
  { id: "how-to-learn-react", title: "How to Learn React", author: "Rahul", date: "Jan 10", readTime: "5 min", tags: ["React", "Beginners"] },
  { id: "usestate-vs-useref", title: "useState vs useRef", author: "Priya", date: "Jan 18", readTime: "4 min", tags: ["React", "Hooks"] },
  { id: "react-router-guide", title: "React Router Complete Guide", author: "Arjun", date: "Feb 2", readTime: "8 min", tags: ["Routing", "React"] },
  { id: "lazy-loading-in-react", title: "Lazy Loading in React", author: "Sneha", date: "Feb 14", readTime: "6 min", tags: ["Performance"] },
];

const PRODUCTS = {
  electronics: [
    { id: "iphone-13", name: "iPhone 13", price: "₹59,900", rating: 4.8, reviews: 2341 },
    { id: "samsung-s23", name: "Samsung S23", price: "₹74,999", rating: 4.7, reviews: 1892 },
    { id: "pixel-7", name: "Google Pixel 7", price: "₹45,000", rating: 4.5, reviews: 987 },
  ],
  laptops: [
    { id: "macbook-air", name: "MacBook Air M2", price: "₹1,14,900", rating: 4.9, reviews: 3210 },
    { id: "dell-xps-15", name: "Dell XPS 15", price: "₹1,29,990", rating: 4.6, reviews: 1543 },
    { id: "hp-spectre", name: "HP Spectre x360", price: "₹89,999", rating: 4.4, reviews: 876 },
  ],
  audio: [
    { id: "airpods-pro", name: "AirPods Pro", price: "₹24,900", rating: 4.8, reviews: 5621 },
    { id: "sony-wh1000", name: "Sony WH-1000XM5", price: "₹29,990", rating: 4.9, reviews: 4302 },
    { id: "bose-qc45", name: "Bose QC45", price: "₹26,000", rating: 4.7, reviews: 2187 },
  ],
};


/**
 * ============================================================
 * APP — Route Structure
 * ============================================================
 *
 * Routes:
 *
 *  "/"                                    → Home (demo chooser)
 *
 *  Demo 1 — Single param:
 *  "/users/:id"                           → UserProfile
 *    e.g. /users/1, /users/5
 *
 *  Demo 2 — Slug param (blog):
 *  "/blog"                                → BlogList
 *  "/blog/:postId"                        → BlogPost
 *    e.g. /blog/how-to-learn-react
 *
 *  Demo 3 — Multiple params (e-commerce):
 *  "/products"                            → ProductHome
 *  "/products/:category"                  → CategoryPage
 *  "/products/:category/:productId"       → ProductDetail
 *    e.g. /products/electronics/iphone-13
 * ============================================================
 */
function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          {/* Layout wraps everything */}
          <Route path="/" element={<AppLayout />}>

            <Route index element={<Home />} />

            {/* Demo 1 — /users/:id */}
            <Route path="/users/:id" element={<UserProfile />} />

            {/* Demo 2 — /blog aur /blog/:postId */}
            <Route path="/blog" element={<BlogList />} />
            <Route path="/blog/:postId" element={<BlogPost />} />

            {/* Demo 3 — /products, /products/:category, /products/:category/:productId */}
            <Route path="/products" element={<ProductHome />} />
            <Route path="/products/:category" element={<CategoryPage />} />
            <Route path="/products/:category/:productId" element={<ProductDetail />} />

          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}


/**
 * ============================================================
 * APP LAYOUT
 * ============================================================
 */
function AppLayout() {
  const navigate = useNavigate();

  return (
    <div className="layout-wrapper">
      <header className="layout-header">
        <div className="layout-brand" onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
          🔗 useParams Demo
        </div>
        <nav className="layout-nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/users/1" className="nav-link">Users</Link>
          <Link to="/blog" className="nav-link">Blog</Link>
          <Link to="/products" className="nav-link">Products</Link>
        </nav>
      </header>

      <main className="layout-content">
        <div className="page-container">
          <Outlet />
        </div>
      </main>

      <footer className="layout-footer">
        <p>useParams — Dynamic Routing Demo</p>
      </footer>
    </div>
  );
}


/**
 * ============================================================
 * HOME — Demo Chooser
 * ============================================================
 */
function Home() {
  return (
    <div>
      <div className="page-header-section">
        <h2 className="page-title">Dynamic Routing — useParams</h2>
        <p className="page-subtitle">
          Teen demos — ek param se lekar multiple params tak.
        </p>
      </div>

      <div className="demo-chooser">

        {/* Demo 1 */}
        <div className="demo-card-home">
          <p className="demo-card-number">Demo 1</p>
          <p className="demo-card-title">Single Param — /users/:id</p>
          <p className="demo-card-desc">
            API se real user data fetch karo user ID ke basis pe.
          </p>
          <div className="demo-card-urls">
            <Link to="/users/1" className="url-chip">/users/1</Link>
            <Link to="/users/3" className="url-chip">/users/3</Link>
            <Link to="/users/7" className="url-chip">/users/7</Link>
          </div>
        </div>

        {/* Demo 2 */}
        <div className="demo-card-home">
          <p className="demo-card-number">Demo 2</p>
          <p className="demo-card-title">Slug Param — /blog/:postId</p>
          <p className="demo-card-desc">
            Blog post ka slug URL mein — postId se post dhundo.
          </p>
          <div className="demo-card-urls">
            <Link to="/blog" className="url-chip">/blog</Link>
            <Link to="/blog/how-to-learn-react" className="url-chip">/blog/how-to-learn-react</Link>
          </div>
        </div>

        {/* Demo 3 */}
        <div className="demo-card-home">
          <p className="demo-card-number">Demo 3</p>
          <p className="demo-card-title">Multiple Params — /products/:category/:productId</p>
          <p className="demo-card-desc">
            Do params ek saath — category aur product ID dono URL mein.
          </p>
          <div className="demo-card-urls">
            <Link to="/products" className="url-chip">/products</Link>
            <Link to="/products/electronics" className="url-chip">/products/electronics</Link>
            <Link to="/products/electronics/iphone-13" className="url-chip">/products/electronics/iphone-13</Link>
          </div>
        </div>

      </div>
    </div>
  );
}


/**
 * ============================================================
 * DEMO 1 — Single Param: /users/:id
 * ============================================================
 * Sabse basic use case — ek param, real API call.
 *
 * Route:  /users/:id
 * URL:    /users/1
 * Params: { id: "1" }
 *
 * useParams() se id lo → fetch(`/api/users/${id}`) karo →
 * us user ka data dikhao.
 * ============================================================
 */
function UserProfile() {
  // useParams() — URL se :id ki value lo
  // /users/1  → { id: "1" }
  // /users/42 → { id: "42" }
  const { id } = useParams();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // id change ho to naya fetch karo
    setLoading(true);
    setError(null);
    setUser(null);

    // Real API call — id URL se aaya, useParams() se mila
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error(`User ${id} nahi mila`);
        return res.json();
      })
      .then((data) => { setUser(data); setLoading(false); })
      .catch((err) => { setError(err.message); setLoading(false); });
  }, [id]); // ← id dependency mein — URL badla to re-fetch hoga

  return (
    <div>
      {/* Params visualizer — clearly dikhao kya mila URL se */}
      <ParamsDisplay
        route="/users/:id"
        params={{ id }}
        description="User ID URL se aaya — isse API call karenge"
      />

      {/* Quick navigate */}
      <div className="quick-nav">
        <p className="quick-nav-label">Doosra user dekhna hai?</p>
        <div className="btn-row">
          {[1, 2, 3, 5, 7, 10].map((uid) => (
            <button
              key={uid}
              className={id === String(uid) ? "btn-active" : "btn-inactive"}
              onClick={() => navigate(`/users/${uid}`)}
            >
              User {uid}
            </button>
          ))}
        </div>
      </div>

      {/* User card */}
      {loading && <LoadingCard message={`User ${id} ka data fetch ho raha hai...`} />}
      {error && <ErrorCard message={error} />}
      {user && (
        <div className="user-profile-card">
          <div className="user-avatar">{user.name.charAt(0)}</div>
          <div className="user-info">
            <p className="user-info-name">{user.name}</p>
            <p className="user-info-meta">📧 {user.email}</p>
            <p className="user-info-meta">📞 {user.phone}</p>
            <p className="user-info-meta">🌐 {user.website}</p>
            <p className="user-info-meta">🏢 {user.company?.name}</p>
          </div>
        </div>
      )}

      <div className="note" style={{ marginTop: "16px" }}>
        URL mein id badlo — useEffect mein [id] dependency hai — naya fetch hoga.
        <br />
        Browser pe manually try karo: /users/1, /users/5, /users/999
      </div>
    </div>
  );
}


/**
 * ============================================================
 * DEMO 2 — Slug Param: /blog/:postId
 * ============================================================
 * Blog websites mein post ka title hi URL ban jaata hai —
 * ise "slug" kehte hain. Numbers ki jagah readable string.
 *
 * Route:  /blog/:postId
 * URL:    /blog/how-to-learn-react
 * Params: { postId: "how-to-learn-react" }
 *
 * postId se local data mein post dhundo → render karo.
 * ============================================================
 */
function BlogList() {
  return (
    <div>
      <div className="page-header-section">
        <h2 className="page-title">📝 Blog Posts</h2>
        <p className="page-subtitle">
          Kisi post pe click karo — /blog/:postId route pe jaoge.
        </p>
      </div>
      <div className="blog-list">
        {BLOG_POSTS.map((post) => (
          <Link key={post.id} to={`/blog/${post.id}`} className="blog-list-item">
            <p className="blog-item-title">{post.title}</p>
            <p className="blog-item-meta">{post.author} · {post.date} · {post.readTime} read</p>
            <div className="blog-item-tags">
              {post.tags.map((tag) => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function BlogPost() {
  // URL: /blog/how-to-learn-react
  // useParams() → { postId: "how-to-learn-react" }
  const { postId } = useParams();
  const navigate = useNavigate();

  // postId se post dhundo
  const post = BLOG_POSTS.find((p) => p.id === postId);

  return (
    <div>
      <ParamsDisplay
        route="/blog/:postId"
        params={{ postId }}
        description="Post ka slug URL se aaya — isse post data dhundha"
      />

      {post ? (
        <div className="blog-post-card">
          <div className="blog-post-tags">
            {post.tags.map((tag) => <span key={tag} className="tag">{tag}</span>)}
          </div>
          <h2 className="blog-post-title">{post.title}</h2>
          <p className="blog-post-meta">{post.author} · {post.date} · {post.readTime} read</p>

          <div className="blog-post-body">
            <p>
              Ye ek demo post hai. Real app mein postId se database ya CMS se
              full content fetch hota. Slug readable aur SEO-friendly hota hai —
              /blog/123 ke bajaaye /blog/how-to-learn-react.
            </p>
          </div>
        </div>
      ) : (
        <ErrorCard message={`"${postId}" — ye post exist nahi karta.`} />
      )}

      <div className="btn-row" style={{ marginTop: "16px" }}>
        <button className="btn-gray" onClick={() => navigate("/blog")}>
          ← Saari Posts
        </button>
      </div>
    </div>
  );
}


/**
 * ============================================================
 * DEMO 3 — Multiple Params: /products/:category/:productId
 * ============================================================
 * Do params ek saath — category aur productId.
 * E-commerce sites exactly yahi karte hain.
 *
 * Route:  /products/:category/:productId
 * URL:    /products/electronics/iphone-13
 * Params: { category: "electronics", productId: "iphone-13" }
 *
 * category se products list filter karo.
 * productId se specific product dhundo.
 * ============================================================
 */
function ProductHome() {
  return (
    <div>
      <div className="page-header-section">
        <h2 className="page-title">🛍 Products</h2>
        <p className="page-subtitle">Category choose karo — /products/:category</p>
      </div>
      <div className="category-grid">
        {Object.keys(PRODUCTS).map((cat) => (
          <Link key={cat} to={`/products/${cat}`} className="category-card">
            <p className="category-icon">
              {cat === "electronics" ? "📱" : cat === "laptops" ? "💻" : "🎧"}
            </p>
            <p className="category-name">{cat.charAt(0).toUpperCase() + cat.slice(1)}</p>
            <p className="category-count">{PRODUCTS[cat].length} products</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

function CategoryPage() {
  // URL: /products/electronics
  // useParams() → { category: "electronics" }
  const { category } = useParams();
  const navigate = useNavigate();

  const products = PRODUCTS[category];

  if (!products) {
    return <ErrorCard message={`"${category}" category exist nahi karti.`} />;
  }

  return (
    <div>
      <ParamsDisplay
        route="/products/:category"
        params={{ category }}
        description="Category URL se aaya — is category ke products dikhao"
      />

      <div className="page-header-section" style={{ marginTop: "16px" }}>
        <h2 className="page-title">
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </h2>
        <p className="page-subtitle">{products.length} products milein</p>
      </div>

      <div className="product-list">
        {products.map((p) => (
          <div
            key={p.id}
            className="product-item"
            onClick={() => navigate(`/products/${category}/${p.id}`)}
          >
            <div>
              <p className="product-item-name">{p.name}</p>
              <p className="product-item-meta">⭐ {p.rating} · {p.reviews} reviews</p>
            </div>
            <div className="product-item-right">
              <p className="product-item-price">{p.price}</p>
              <p className="product-item-link">View →</p>
            </div>
          </div>
        ))}
      </div>

      <button className="btn-gray" onClick={() => navigate("/products")} style={{ marginTop: "16px" }}>
        ← Saari Categories
      </button>
    </div>
  );
}

function ProductDetail() {
  // URL: /products/electronics/iphone-13
  // useParams() → { category: "electronics", productId: "iphone-13" }
  // Do params ek saath — dono URL se aaye, dono useParams se mile
  const { category, productId } = useParams();
  const navigate = useNavigate();

  const products = PRODUCTS[category] || [];
  const product = products.find((p) => p.id === productId);

  return (
    <div>
      <ParamsDisplay
        route="/products/:category/:productId"
        params={{ category, productId }}
        description="Do params ek saath — category aur productId dono URL se"
      />

      {product ? (
        <div className="product-detail-card">
          <p className="product-detail-name">{product.name}</p>
          <p className="product-detail-price">{product.price}</p>
          <p className="product-detail-rating">⭐ {product.rating} · {product.reviews} reviews</p>
          <div className="btn-row" style={{ marginTop: "20px" }}>
            <button className="btn-primary">🛒 Cart Mein Daalo</button>
            <button className="btn-success">⚡ Buy Now</button>
          </div>
        </div>
      ) : (
        <ErrorCard message={`"${productId}" product "${category}" mein nahi mila.`} />
      )}

      <div className="btn-row" style={{ marginTop: "16px" }}>
        <button className="btn-gray" onClick={() => navigate(`/products/${category}`)}>
          ← {category} pe Wapas
        </button>
      </div>
    </div>
  );
}


/**
 * ============================================================
 * SHARED HELPERS
 * ============================================================
 */

// URL Params ko visually dikhata hai — kaunsa param kaunsi value hai
function ParamsDisplay({ route, params, description }) {
  return (
    <div className="params-display">
      <div className="params-route">
        <span className="params-label">Route:</span>
        <code className="params-code">{route}</code>
      </div>
      <div className="params-values">
        <span className="params-label">useParams():</span>
        <div className="params-chips">
          {Object.entries(params).map(([key, val]) => (
            <span key={key} className="param-chip">
              <span className="param-key">:{key}</span>
              <span className="param-arrow"> → </span>
              <span className="param-val">"{val}"</span>
            </span>
          ))}
        </div>
      </div>
      <p className="params-desc">{description}</p>
    </div>
  );
}

function LoadingCard({ message }) {
  return (
    <div className="suspense-fallback">
      <div className="spinner" />
      <p className="suspense-msg">{message}</p>
    </div>
  );
}

function ErrorCard({ message }) {
  return (
    <div className="error-fallback" style={{ marginTop: "12px" }}>
      <p className="error-fallback-icon">⚠️</p>
      <p className="error-fallback-title">Kuch nahi mila</p>
      <p className="error-fallback-msg">{message}</p>
    </div>
  );
}


export default App;