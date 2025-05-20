import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-gray-800 dark:bg-gray-900 py-6 text-center text-green-300 dark:text-gray-400 w-full">
            <p>
                &copy; {new Date().getFullYear()} spinningLP. All rights reserved.
            </p>
            <div className="flex justify-center space-x-4 mt-4">
                <Link to="/">Privacy Policy</Link>
                <Link to="/">Terms of Service</Link>
                <Link to="/">Contact</Link>
            </div>
            
        </footer>
    );
};

export default Footer;