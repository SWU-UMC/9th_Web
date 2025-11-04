import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-5 mt-12">
      <div className="container mx-auto text-center text-gray-600">
        <p>
          &copy; {new Date().getFullYear()} SpinningDolimapan. All rights reserved.
        </p>
        <div className="flex justify-center space-x-4 mt-2">
          <Link to={"#"}>Privacy Policy</Link>
          <Link to={"#"}>Terms of Service</Link>
          <Link to={"#"}>Contact</Link>
        </div>
      </div>

    </footer>
  );
}

export default Footer;
