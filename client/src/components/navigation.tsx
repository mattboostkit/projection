import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, ChevronDown } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import logoPath from "@assets/Logo.png";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const portalLinks = [
    { href: "/portal/tour-operators", label: "Tour Operators" },
    { href: "/portal/commercial", label: "Commercial Partners" },
    { href: "/portal/donors", label: "Private Donors" },
  ];

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/">
              <img src={logoPath} alt="Projection - Shining the Light" className="h-10 w-auto cursor-pointer" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link href="/projects">
                <span className="text-foreground hover:text-primary transition-colors font-medium cursor-pointer">
                  Discover Projects
                </span>
              </Link>
              <Link href="/dashboard">
                <span className="text-foreground hover:text-primary transition-colors font-medium cursor-pointer">
                  Impact Dashboard
                </span>
              </Link>
              
              {/* Portals Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center text-foreground hover:text-primary transition-colors font-medium">
                  Portals <ChevronDown className="ml-1 h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {portalLinks.map((link) => (
                    <DropdownMenuItem key={link.href} asChild>
                      <Link href={link.href}>
                        <span className="cursor-pointer">{link.label}</span>
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Link href="/about">
                <span className="text-foreground hover:text-primary transition-colors font-medium cursor-pointer">
                  About
                </span>
              </Link>
              <Link href="/contact">
                <span className="text-foreground hover:text-primary transition-colors font-medium cursor-pointer">
                  Contact
                </span>
              </Link>
            </div>
          </div>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" className="text-foreground hover:text-primary transition-colors font-medium">
              Sign In
            </Button>
            <Button className="bg-primary text-white hover:bg-primary-600 transition-colors font-medium">
              Get Started
            </Button>
          </div>

          {/* Mobile menu */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col space-y-4 mt-8">
                  <Link href="/projects">
                    <span 
                      className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary cursor-pointer"
                      onClick={() => setIsOpen(false)}
                    >
                      Discover Projects
                    </span>
                  </Link>
                  <Link href="/dashboard">
                    <span 
                      className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary cursor-pointer"
                      onClick={() => setIsOpen(false)}
                    >
                      Impact Dashboard
                    </span>
                  </Link>
                  
                  {/* Portal Links */}
                  <div className="px-3 py-2">
                    <div className="text-sm font-semibold text-muted-foreground mb-2">Portals</div>
                    {portalLinks.map((link) => (
                      <Link key={link.href} href={link.href}>
                        <span 
                          className="block py-1 text-sm text-foreground hover:text-primary cursor-pointer"
                          onClick={() => setIsOpen(false)}
                        >
                          {link.label}
                        </span>
                      </Link>
                    ))}
                  </div>
                  
                  <Link href="/about">
                    <span 
                      className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary cursor-pointer"
                      onClick={() => setIsOpen(false)}
                    >
                      About
                    </span>
                  </Link>
                  
                  <Link href="/contact">
                    <span 
                      className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary cursor-pointer"
                      onClick={() => setIsOpen(false)}
                    >
                      Contact
                    </span>
                  </Link>
                  
                  <div className="border-t pt-4 space-y-2">
                    <Button variant="ghost" className="w-full justify-start">
                      Sign In
                    </Button>
                    <Button className="w-full bg-primary hover:bg-primary-600">
                      Get Started
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
