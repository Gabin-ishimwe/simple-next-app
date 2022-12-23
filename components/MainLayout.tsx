import Link from "next/link";

const MainLayout = ({children}) => {
    return (
        <>
        <nav>
        <Link href='/'>Home</Link>
        <Link href='/events'>Events</Link>
        <Link href='/about-us'>About Us</Link>
      </nav>
      {children}
        </>
    )
}

export default MainLayout;