import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="font-knewave my-2">
      <ul className="flex flex-col justify-center">
        <li className="flex flex-row justify-center">
          <Link href="/" className="px-2">
            Travel-CK
          </Link>
        </li>
        <li className="flex flex-row justify-center">
          <Link href="/access" className="px-2">
            Access
          </Link>
        </li>
      </ul>
      <div className="flex justify-center my-6">
        <div className="w-1/5 border-t-2 border-white"></div>
      </div>
    </nav>
  );
}
