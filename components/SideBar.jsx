import Link from "next/link";

function SideBar({ children }) {
  return (
    <>
      <div className="drawer drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {children}
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-base-200 text-base-content min-h-full w-60 p-4">
            {/* Sidebar content here */}
            <li>
              <Link href="/user/login">Login</Link>
            </li>
            <li>
              <Link href="/user/profile">Profile</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default SideBar;
