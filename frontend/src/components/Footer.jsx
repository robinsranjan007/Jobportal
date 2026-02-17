function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-200 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">YourCompany</h3>
            <p className="text-gray-400">
              We build modern web solutions that help your business grow.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-indigo-500 transition-colors">Home</a></li>
              <li><a href="#" className="hover:text-indigo-500 transition-colors">About</a></li>
              <li><a href="#" className="hover:text-indigo-500 transition-colors">Services</a></li>
              <li><a href="#" className="hover:text-indigo-500 transition-colors">Contact</a></li>
            </ul>
          </div>
          
          {/* Resources */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-indigo-500 transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-indigo-500 transition-colors">FAQs</a></li>
              <li><a href="#" className="hover:text-indigo-500 transition-colors">Support</a></li>
            </ul>
          </div>
          
          {/* Social Media */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-indigo-500 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 5 3.657 9.128 8.438 9.878v-6.988h-2.54v-2.89h2.54v-2.2c0-2.507 1.493-3.89 3.777-3.89 1.094 0 2.238.196 2.238.196v2.46h-1.26c-1.242 0-1.63.772-1.63 1.562v1.872h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 17 22 12z"/>
                </svg>
              </a>
              <a href="#" className="hover:text-indigo-500 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c-5.438 0-9.837 4.399-9.837 9.837 0 4.352 3.077 8.007 7.207 9.181v-6.494h-2.177V12h2.177V9.797c0-2.153 1.274-3.33 3.22-3.33.934 0 1.905.167 1.905.167v2.098h-1.077c-1.062 0-1.392.66-1.392 1.336V12h2.372l-.379 2.187h-1.993v6.494c4.13-1.174 7.207-4.829 7.207-9.181 0-5.438-4.399-9.837-9.837-9.837z"/>
                </svg>
              </a>
              {/* Add more social icons as needed */}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 border-t border-gray-800 pt-6 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} YourCompany. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
