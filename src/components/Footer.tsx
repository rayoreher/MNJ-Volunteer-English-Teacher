import Link from "next/link";

const Footer = () => {
    return (
		<footer className="bg-lime-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">About Us</h3>
              <p>The Volunteer Teaching Project in Mae Najang, Mae Hong Son, Thailand, supports elementary children (ages 6-12) through engaging English and sports activities. Volunteers help create a curriculum that inspires learning and empowers future generations.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Contact</h3>
              <p>MNJ Volunteer Teaching Project</p>
              <p>WhatsApp: +66 64 548 9342</p>
              <p>Email: Noppadonfreedom@gmail.com</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link href="/volunteer" className="hover:text-lime-300">Volunteer</Link></li>
                <li><Link href="/about" className="hover:text-lime-300">About</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 text-center">
            <p>&copy; {new Date().getFullYear()} MNJ Volunteer Teaching Project. All rights reserved.</p>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;