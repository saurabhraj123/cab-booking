import { NavLink } from "react-router-dom";

export default function Navbar() {
    return (
        <nav className="flex flex-col py-2 items-center justify-between bg-main drop-shadow-md sm:flex-row sm:px-20">
            <NavLink to="/">
                <div className="flex justify-center items-center">
                    <img src="/images/taxi.png" className="w-14 h-[40%]" alt="" />

                    <h1 className="hidden text-xl mx-4 tracking-wider md:block">
                        CAB CENTRAL
                    </h1>
                </div>
            </NavLink>

            <div className="flex my-2 items-center gap-6 sm:my-0">
                <NavLink to='/track' className="mx-2">
                    Track Booking
                </NavLink>
                
                <NavLink to='/admin' className="">
                    Admin Dashboard
                </NavLink>
            </div>
        </nav>
    );
}