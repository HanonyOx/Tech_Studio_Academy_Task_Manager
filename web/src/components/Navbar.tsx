import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(() =>
    Boolean(localStorage.getItem("token")),
  );

  const navigate = useNavigate();

  useEffect(() => {
    const updateAuthStatus = () => {
      setIsLoggedIn(Boolean(localStorage.getItem("token")));
    };

    window.addEventListener("authChanged", updateAuthStatus);

    return () => {
      window.removeEventListener("authChanged", updateAuthStatus);
    };
  }, []);

  const handleLogout = () => {
    // Close the confirmation modal
    setShowLogoutModal(false);

    // Close the mobile menu
    setIsMenuOpen(false);

    // Clear authentication data
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Update the navbar's authentication state
    window.dispatchEvent(new Event("authChanged"));

    // Redirect to login
    navigate("/login", { replace: true });
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="sticky top-0 z-50 border-b border-gray-300 bg-white">
      {" "}
      <div className="container mx-auto my-3 flex w-11/12 justify-between lg:my-4 lg:px-10">
        {/* Logo */}
        <Link
          to={isLoggedIn ? "/tasks" : "/"}
          onClick={closeMenu}
          className="flex items-center justify-center gap-1"
        >
          {" "}
          <img src="/logo.svg" alt="TaskDuty logo" className="h-10 w-10" />{" "}
          <h1 className="text-2xl font-bold text-purple-950">TaskDuty</h1>{" "}
        </Link>

        {/* Desktop navigation */}
        <div className="flex items-center justify-center gap-3 lg:gap-7">
          {isLoggedIn ? (
            <>
              <Link
                to="/new-task"
                className="hidden font-semibold transition hover:text-purple-700 lg:flex"
              >
                New Task
              </Link>

              <Link
                to="/tasks"
                className="hidden font-semibold transition hover:text-purple-700 lg:flex"
              >
                All Tasks
              </Link>

              <button
                onClick={() => setShowLogoutModal(true)}
                className="hidden font-semibold text-red-600 transition hover:text-red-700 lg:block"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="hidden font-semibold transition hover:text-purple-700 lg:flex"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="hidden rounded-lg bg-purple-600 px-4 py-2 font-semibold text-white transition hover:bg-purple-700 lg:flex"
              >
                Create Account
              </Link>
            </>
          )}

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen((previous) => !previous)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            className="lg:hidden"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>
      {/* Mobile navigation */}
      {isMenuOpen && (
        <div className="border-t border-gray-200 px-6 py-4 lg:hidden">
          <div className="flex flex-col gap-4">
            {isLoggedIn ? (
              <>
                <Link
                  to="/new-task"
                  onClick={closeMenu}
                  className="font-semibold text-gray-700 transition-colors hover:text-purple-700"
                >
                  New Task
                </Link>

                <Link
                  to="/tasks"
                  onClick={closeMenu}
                  className="font-semibold text-gray-700 transition-colors hover:text-purple-700"
                >
                  All Tasks
                </Link>

                <button
                  onClick={() => setShowLogoutModal(true)}
                  className="text-left font-semibold text-red-600 transition-colors hover:text-red-700"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="font-semibold text-gray-700 transition-colors hover:text-purple-700"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  onClick={closeMenu}
                  className="font-semibold text-purple-600 transition-colors hover:text-purple-700"
                >
                  Create Account
                </Link>
              </>
            )}
          </div>
        </div>
      )}
      {showLogoutModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
          onClick={() => setShowLogoutModal(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="logout-modal-title"
            aria-describedby="logout-modal-description"
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2
              id="logout-modal-title"
              className="text-xl font-bold text-gray-900"
            >
              Confirm Logout
            </h2>

            <p
              id="logout-modal-description"
              className="mt-3 text-sm leading-6 text-gray-600"
            >
              Are you sure you want to log out of TaskDuty?
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowLogoutModal(false)}
                className="rounded-lg border border-gray-300 px-4 py-2.5 font-medium text-gray-700 transition hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleLogout}
                className="rounded-lg bg-red-500 px-4 py-2.5 font-medium text-white transition hover:bg-red-600"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
