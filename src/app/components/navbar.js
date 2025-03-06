import Link from "next/link";

export default function Navbar(props) {
  return (
    <nav className="font-knewave my-2">
      <ul className="flex flex-col justify-center">
        <li className="flex flex-row justify-center">
          <Link href="/" className="px-2">
            Travel-CK
          </Link>
        </li>

        {!props.isAuthorized ? (
          <li className="flex flex-row justify-center">
            <Link href="/access" className="px-2">
              Access
            </Link>
          </li>
        ) : (
          <li className="flex flex-row justify-center">
            <Link href="/budget" className="px-2">
              Budget
            </Link>
          </li>
        )}
      </ul>
      <div className="flex justify-center my-6">
        <div className="w-1/5 border-t-2 border-white"></div>
      </div>
    </nav>
  );
}
