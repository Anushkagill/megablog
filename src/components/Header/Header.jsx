import React from "react";
import { Container, LogoutBtn } from "../index";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const isLoggedIn = Boolean(authStatus);

  const navItems = [
    { name: "Home", slug: "/", active: true },
    { name: "Login", slug: "/login", active: !isLoggedIn },
    { name: "Signup", slug: "/signup", active: !isLoggedIn },
    { name: "All Posts", slug: "/all-posts", active: isLoggedIn },
    { name: "Add Post", slug: "/add-post", active: isLoggedIn },
  ];

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur bg-white/70 border-b">
      <Container>
        <nav className="flex items-center justify-between py-3">
          
          {/* BRAND / HEADING (NO LOGIC ADDED) */}
          <Link to="/" className="flex flex-col leading-tight">
            <h1 className="text-2xl font-bold text-indigo-600">
              DevBlog
            </h1>
            <span className="text-xs text-gray-500">
              Write. Share. Inspire.
            </span>
          </Link>

          {/* NAVIGATION */}
          <ul className="flex items-center gap-2">
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name}>
                    <button
                      onClick={() => navigate(item.slug)}
                      className="
                        px-4 py-2 rounded-full text-sm font-medium
                        text-gray-700
                        hover:bg-indigo-600 hover:text-white
                        transition-all duration-300
                      "
                    >
                      {item.name}
                    </button>
                  </li>
                )
            )}

            {isLoggedIn && <LogoutBtn />}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;


