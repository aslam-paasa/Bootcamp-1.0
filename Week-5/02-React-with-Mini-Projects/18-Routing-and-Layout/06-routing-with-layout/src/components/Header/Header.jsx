import { Link, NavLink } from 'react-router-dom'

/**
 * Header Component:
 * - Displays a sticky navigation bar at the top.
 * - Includes a logo, login, and "get started" buttons.
 * - Provides navigation links for Home, About, Contact, and Github.
 */
export default function Header() {
    return (
        <header className="shadow sticky z-50 top-0">
            
            {/* Navigation bar container: */}
            <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">

                    {/* 1. Logo */}
                    <Link to="/" className="flex items-center">
                        <img src="https://alexharkness.com/wp-content/uploads/2020/06/logo-2.png" className="mr-3 h-12" alt="Logo" />
                    </Link>


                    {/* 2. Right-side buttons: Login and Get Started */}
                    <div className="flex items-center lg:order-2">   
                        
                        {/* 2.a. Login Button */}   
                        <Link to="#" className="text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none">Log in</Link>
                        
                        {/* 2.b. Get Started Button */}
                        <Link to="#" className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none">Get started</Link>
                    
                    </div>


                    {/* 3. Navigation links:
                        Q. isActive property ka kaise kaam karta hai `NavLink` ke saath?
                        => NavLink ek special component hai jo React Router se aata hai. 
                           Ye automatically check karta hai ki current URL link ke destination
                           se match karta hai ya nahi.
                        => isActive ek property hai jo bataati hai ki user currently us page
                           par hai ya nahi jiske liye NavLink bana hai.
                        => Agar isActive true hai, toh hum link ko alag style de sakte hain, 
                           jisse wo link active page ke liye highlight ho jata hai.
                        => But iss isActive ko access kaise krnge? Iss isActive ko use krne
                           k liye humein isse as a props pass krna hoga, aur apne style pe
                           apply krna hoga.
                        => Max time hm classes direct likh dete hai but iss baar humne classes
                           likhi hai callback fn k andr taaki uss fn k andr humne apne isActive
                           ko as a param le sake aur apne CSS pe conditional statement lga ske.
                           
                        Example: Agar user "Home" page pe hai (i.e. URL '/'), toh "Home" link
                        ka isActive true hoga, aur link ko 'text-orange-700' class milegi(jisse
                        link orange ho jaega aur active dikhai dega).

                        Agar user "Home" page pe nhi hai, toh 'isActive' false hoga, aur link ko
                        'text-gray-700' class milegi(jo normal, inactive link ka color hai.)

                        Iss approach se humein easily pta chl jaata hai ki user kis page pe
                        hai, aur active link ko visually highlight krne se user navigation me
                        madad milti hai.
                    */}
                    <div className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
                        <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                            
                            {/* 3.a. Home Link */}
                            <li>
                                <NavLink to="/" className={({ isActive }) => `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`}>Home</NavLink>
                            </li>

                            {/* 3.b. About Link */}
                            <li>
                                <NavLink to="/about" className={({ isActive }) => `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`}>About</NavLink>
                            </li>

                            {/* 3.c. Contact Link */}
                            <li>
                                <NavLink to="/contact" className={({ isActive }) => `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`}>Contact</NavLink>
                            </li>

                            {/* 3.d. Github Link */}
                            <li>
                                <NavLink to="/github" className={({ isActive }) => `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`}>Github</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}