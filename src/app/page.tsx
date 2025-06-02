"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { 
  GitHubLogoIcon, 
  DownloadIcon
} from "@radix-ui/react-icons"
import { 
  Menu,
  X
} from "lucide-react"
import Image from "next/image"
import { useState } from "react"

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navigationItems = [
    { label: "Demo", href: "#demo" },
    { label: "Install", href: "#install" },
    { label: "Models", href: "/models", external: true },
    { label: "Learn More", href: "/learn-more", external: true }
  ]

  const scrollToSection = (href: string, external?: boolean) => {
    if (external) {
      window.location.href = href
    } else {
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
    setIsMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
        {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur-sm dark:bg-slate-950/95">
        <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                  <Image 
                    src="/ollama-diffuser-flower.svg" 
                alt="OllamaDiffuser" 
                    width={32} 
                    height={32}
                    className="h-8 w-8"
                  />
              <h1 className="text-xl font-semibold">OllamaDiffuser</h1>
              </div>

              {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
                {navigationItems.map((item) => (
                  <button
                    key={item.href}
                    onClick={() => scrollToSection(item.href, item.external)}
                    className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 transition-colors"
                  >
                    {item.label}
                  </button>
                ))}
              </nav>

              <div className="flex items-center space-x-4">
                <Button variant="outline" size="sm" asChild className="hidden sm:flex">
                  <a href="https://github.com/ollamadiffuser/ollamadiffuser" target="_blank" rel="noopener noreferrer">
                    <GitHubLogoIcon className="h-4 w-4 mr-2" />
                    GitHub
                  </a>
                </Button>

                {/* Mobile Menu Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="md:hidden"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </Button>
              </div>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
            <div className="md:hidden mt-4 py-4 border-t">
                <nav className="flex flex-col space-y-3">
                  {navigationItems.map((item) => (
                    <button
                      key={item.href}
                      onClick={() => scrollToSection(item.href)}
                    className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 transition-colors text-left"
                    >
                      {item.label}
                    </button>
                  ))}
                <Button variant="outline" size="sm" asChild className="w-full mt-4">
                      <a href="https://github.com/ollamadiffuser/ollamadiffuser" target="_blank" rel="noopener noreferrer">
                        <GitHubLogoIcon className="h-4 w-4 mr-2" />
                        GitHub
                      </a>
                    </Button>
                </nav>
              </div>
            )}
          </div>
        </header>

        {/* Hero Section */}
      <section className="py-24">
        <div className="container mx-auto px-6 text-center">
            <div className="max-w-4xl mx-auto">
            <h2 className="text-6xl font-bold mb-6 text-slate-900 dark:text-slate-100">
              Get up and running with<br />AI image generation.
              </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 mb-12">
              Run <strong>FLUX.1</strong>, <strong>Stable Diffusion 3.5</strong>, <strong>Stable Diffusion 1.5</strong>, and other models, locally.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-4" asChild>
                  <a href="https://pypi.org/project/ollamadiffuser/" target="_blank" rel="noopener noreferrer">
                  <DownloadIcon className="h-5 w-5 mr-2" />
                  Download
                  </a>
                </Button>
              </div>
            <p className="text-sm text-slate-500 dark:text-slate-500 mt-6">
              Available for macOS, Linux, and Windows
            </p>
            </div>
          </div>
        </section>

      {/* Demo Video */}
      <section id="demo" className="py-16 bg-slate-50 dark:bg-slate-900">
        <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-semibold mb-8">See it in action</h3>
            <Card className="overflow-hidden shadow-lg">
                <CardContent className="p-0">
                  <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                  <video
                    className="absolute top-0 left-0 w-full h-full object-cover"
                    controls
                    preload="metadata"
                    playsInline
                  >
                    <source src="/demo.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

      {/* Quick Install */}
      <section id="install" className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-semibold mb-8">Quick Start</h3>
            <Card className="bg-slate-900 dark:bg-slate-800 text-white">
              <CardContent className="p-8">
                <div className="space-y-6 text-left">
                  <div>
                    <div className="text-sm text-slate-400 mb-2"># Install from PyPI</div>
                    <div className="flex items-center space-x-4">
                      <Badge variant="secondary" className="text-xs">1</Badge>
                      <code className="text-green-400">pip install ollamadiffuser</code>
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-slate-400 mb-2"># Pull and run a model (4-command setup)</div>
                    <div className="flex items-center space-x-4 mb-2">
                      <Badge variant="secondary" className="text-xs">2</Badge>
                      <code className="text-blue-400">ollamadiffuser pull flux.1-schnell</code>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Badge variant="secondary" className="text-xs">3</Badge>
                      <code className="text-purple-400">ollamadiffuser run flux.1-schnell</code>
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-slate-400 mb-2"># Generate via API</div>
                    <div className="flex items-center space-x-4">
                      <Badge variant="secondary" className="text-xs">4</Badge>
                      <div className="text-orange-400 text-sm">
                        <div className="font-mono">curl -X POST http://localhost:8000/api/generate \</div>
                        <div className="font-mono ml-4">-H &quot;Content-Type: application/json&quot; \</div>
                        <div className="font-mono ml-4">-d &apos;{`{`}&quot;prompt&quot;: &quot;A beautiful sunset&quot;{`}`}&apos; \</div>
                        <div className="font-mono ml-4">--output image.png</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

        {/* Footer */}
      <footer className="border-t py-12 bg-slate-50 dark:bg-slate-900">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
                  <Image 
                    src="/ollama-diffuser-flower.svg" 
                alt="OllamaDiffuser" 
                    width={24} 
                    height={24}
                  />
                <span className="font-semibold">OllamaDiffuser</span>
              </div>
              <div className="flex items-center space-x-6 text-sm text-slate-600 dark:text-slate-400">
              <a href="https://github.com/ollamadiffuser/ollamadiffuser" className="hover:text-slate-900 dark:hover:text-slate-100">GitHub</a>
              <a href="https://github.com/ollamadiffuser/ollamadiffuser/blob/main/README.md" className="hover:text-slate-900 dark:hover:text-slate-100">Docs</a>
              <a href="https://github.com/ollamadiffuser/ollamadiffuser/blob/main/LICENSE" className="hover:text-slate-900 dark:hover:text-slate-100">MIT License</a>
                <span>© 2025 OllamaDiffuser</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
  )
}
