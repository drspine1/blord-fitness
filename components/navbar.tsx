'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(href + '/');
  };

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/services', label: 'Services' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/about', label: 'About' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold tracking-tight">
          Dimah<span className="text-secondary">.</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-all duration-300 relative group ${
                isActive(link.href)
                  ? 'text-secondary'
                  : 'text-foreground/70 hover:text-secondary'
              }`}
            >
              {link.label}
              {isActive(link.href) && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-secondary to-secondary/50 rounded-full"></span>
              )}
            </Link>
          ))}
        </div>

        {/* Desktop Auth & Theme */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/login" className="text-sm hover:text-secondary transition-colors">
            Login
          </Link>
          <Link href="/signup">
            <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
              Get Started
            </Button>
          </Link>
          <ThemeToggle />
        </div>

        {/* Mobile Theme & Menu Toggle */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 hover:bg-card rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu with Animation */}
      <div 
        className={`md:hidden border-t border-border bg-card overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="p-4 space-y-4">
          {navLinks.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className={`block text-sm font-medium py-2 px-3 rounded-lg transition-all ${
                isActive(link.href)
                  ? 'bg-secondary/20 text-secondary'
                  : 'text-foreground/70 hover:text-secondary'
              }`}
              style={{ 
                transitionDelay: isMenuOpen ? `${index * 50}ms` : '0ms'
              }}
            >
              {link.label}
            </Link>
          ))}
          <div className="border-t border-border pt-4 space-y-2">
            <Link 
              href="/login" 
              className="block text-sm hover:text-secondary transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </Link>
            <Link href="/signup" onClick={() => setIsMenuOpen(false)}>
              <Button className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
