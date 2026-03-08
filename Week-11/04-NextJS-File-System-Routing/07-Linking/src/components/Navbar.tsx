import Link from "next/link"

const Navbar = () => {
  return (
    <nav>
        <ul>
            <div>
                <h1>Logo</h1>
            </div>
        </ul>

        <div>
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/portfolio">Portfolio</Link>
        </div>
      
    </nav>
  )
}

export default Navbar