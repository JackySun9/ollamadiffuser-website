"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FeedbackForm } from "@/components/FeedbackForm"
import { 
  GitHubLogoIcon,
  ArrowLeftIcon
} from "@radix-ui/react-icons"
import { 
  Terminal, 
  Zap, 
  Palette, 
  Settings, 
  Globe, 
  Code, 
  ExternalLink,
  Star,
  MessageSquare,
  Bug,
  Lightbulb,
  Menu,
  X
} from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import Link from "next/link"

export default function LearnMore() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navigationItems = [
    { label: "Home", href: "/", external: false },
    { label: "Features", href: "#features" },
    { label: "Architecture", href: "#architecture" },
    { label: "Gallery", href: "#gallery" },
    { label: "Compare", href: "#compare" },
    { label: "Feedback", href: "#feedback" },
    { label: "Docs", href: "https://deepwiki.com/ollamadiffuser/ollamadiffuser", external: true }
  ]

  const scrollToSection = (href: string, external?: boolean) => {
    if (external) {
      window.open(href, '_blank', 'noopener noreferrer')
    } else if (href.startsWith('/')) {
      window.location.href = href
    } else {
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
    setIsMenuOpen(false)
  }

  const detailedFeatures = [
    {
      icon: <Terminal className="h-6 w-6" />,
      title: "Ollama-Style CLI Interface",
      description: "Familiar Ollama-like command-line interface for easy local SD model management and diffuser workflows",
      details: ["ollamadiffuser pull [model]", "ollamadiffuser run [model]", "ollamadiffuser ps", "ollamadiffuser show [model]"]
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Local Web UI",
      description: "Beautiful local web interface with real-time status and image preview for your diffuser models",
      details: ["Real-time generation preview", "Parameter controls", "Model status monitoring", "History management"]
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Dynamic LoRA Support",
      description: "Load and manage LoRAs for style modifications and faster local Stable Diffusion generation",
      details: ["Runtime LoRA loading", "Multiple LoRA composition", "Style fine-tuning", "Memory efficient"]
    },
    {
      icon: <Settings className="h-6 w-6" />,
      title: "Advanced Model Management",
      description: "Easy download, load, and switch between different local AI diffuser models with lazy loading",
      details: ["HuggingFace integration", "Automatic model discovery", "Version management", "Storage optimization"]
    },
    {
      icon: <Palette className="h-6 w-6" />,
      title: "Multiple Diffuser Models",
      description: "Support for FLUX.1, Stable Diffusion 3.5, ControlNet and more local SD variants",
      details: ["FLUX.1-schnell (4 steps)", "FLUX.1-dev (50 steps)", "SD 3.5 Medium", "SD 1.5/XL", "ControlNet variants"]
    },
    {
      icon: <Code className="h-6 w-6" />,
      title: "Comprehensive APIs",
      description: "Complete local REST API and Python API for integration with other applications",
      details: ["REST endpoints", "Python SDK", "Async support", "Type annotations"]
    }
  ]

  const architectureFeatures = [
    {
      title: "Lazy Loading Architecture",
      description: "ControlNet preprocessors and model components initialize only when needed, ensuring fast startup times",
      benefit: "Faster boot, lower memory"
    },
    {
      title: "Unified Backend",
      description: "All interfaces share the same core ModelManager and inference engine for consistency",
      benefit: "Consistent behavior across interfaces"
    },
    {
      title: "Device Agnostic",
      description: "Automatic detection and optimization for CUDA, MPS (Apple Silicon), and CPU backends",
      benefit: "Works on any hardware"
    },
    {
      title: "Memory Optimization",
      description: "Attention slicing, gradient checkpointing, and torch compilation where beneficial",
      benefit: "Efficient resource usage"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur-sm dark:bg-slate-950/95 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link href="/" className="flex items-center space-x-3">
                <div className="h-8 w-8 rounded-lg flex items-center justify-center">
                  <Image 
                    src="/ollama-diffuser-flower.svg" 
                    alt="Ollama Diffuser Logo" 
                    width={32} 
                    height={32}
                    className="h-8 w-8"
                  />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  OllamaDiffuser
                </h1>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              {navigationItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href, item.external)}
                  className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 transition-colors text-sm font-medium"
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
                  <ExternalLink className="h-3 w-3 ml-1" />
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
            <div className="md:hidden mt-4 py-4 border-t border-slate-200 dark:border-slate-800">
              <nav className="flex flex-col space-y-3">
                {navigationItems.map((item) => (
                  <button
                    key={item.href}
                    onClick={() => scrollToSection(item.href, item.external)}
                    className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 transition-colors text-sm font-medium text-left"
                  >
                    {item.label}
                  </button>
                ))}
                <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
                  <Button variant="outline" size="sm" asChild className="w-full">
                    <a href="https://github.com/ollamadiffuser/ollamadiffuser" target="_blank" rel="noopener noreferrer">
                      <GitHubLogoIcon className="h-4 w-4 mr-2" />
                      GitHub
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                  </Button>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Back to Home */}
      <section className="py-8 bg-white/50 dark:bg-slate-900/50">
        <div className="container mx-auto px-4">
          <Link href="/" className="inline-flex items-center text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 transition-colors">
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </div>
      </section>

      {/* Detailed Features */}
      <section id="features" className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Comprehensive Features</h2>
              <p className="text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
                Deep dive into OllamaDiffuser's powerful capabilities for local AI image generation
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {detailedFeatures.map((feature, index) => (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
                        {feature.icon}
                      </div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base mb-4">
                      {feature.description}
                    </CardDescription>
                    <div className="space-y-2">
                      {feature.details.map((detail, detailIndex) => (
                        <div key={detailIndex} className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                          <span className="text-sm text-slate-600 dark:text-slate-400">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Architecture */}
      <section id="architecture" className="py-16 bg-white/50 dark:bg-slate-900/50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">System Architecture</h2>
              <p className="text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
                Built with modern architectural principles for performance, scalability, and ease of use. 
                Learn more about the technical implementation in our <a href="https://deepwiki.com/ollamadiffuser/ollamadiffuser" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">comprehensive documentation</a>.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {architectureFeatures.map((feature, index) => (
                <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                    <Badge variant="outline" className="w-fit text-xs">
                      {feature.benefit}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 dark:text-slate-400">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50 border-0">
                <CardContent className="py-8">
                  <h3 className="text-xl font-semibold mb-4">Four Unified Interfaces</h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-2xl mx-auto">
                    All interfaces share the same core ModelManager and inference engine, ensuring consistent behavior across CLI commands, web requests, and direct Python usage.
                  </p>
                  <div className="grid md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <Terminal className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                      <div className="font-medium">CLI</div>
                      <div className="text-sm text-slate-500">Terminal</div>
                    </div>
                    <div className="text-center">
                      <Globe className="h-8 w-8 mx-auto mb-2 text-green-600" />
                      <div className="font-medium">Web UI</div>
                      <div className="text-sm text-slate-500">:8001</div>
                    </div>
                    <div className="text-center">
                      <Code className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                      <div className="font-medium">REST API</div>
                      <div className="text-sm text-slate-500">:8000</div>
                    </div>
                    <div className="text-center">
                      <Settings className="h-8 w-8 mx-auto mb-2 text-orange-600" />
                      <div className="font-medium">Python API</div>
                      <div className="text-sm text-slate-500">In-process</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Image Gallery</h2>
              <p className="text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
                Real results generated using OllamaDiffuser with various models. 
                See the quality and diversity you can achieve locally.
              </p>
            </div>

            <div className="text-center mb-12">
              <Card className="bg-slate-50 dark:bg-slate-800 border-0">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">Sample Prompt Used</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    &quot;A captivating portrait of two beautiful young women with diverse ethnicities, one with a charming smile and flowing, black hair, wearing a yellow sundress and the other with a playful grin and curly brown hair, wearing a bright, floral print dress...&quot;
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {[
                {
                  src: "/gallery/flux.1-dev.png",
                  alt: "Women in yellow and floral dresses",
                  model: "FLUX.1-dev",
                  steps: "16 steps",
                  time: "~30s"
                },
                {
                  src: "/gallery/flux.1-schnell.png",
                  alt: "Two women in yellow dresses",
                  model: "FLUX.1-schnell",
                  steps: "4 steps",
                  time: "~3s"
                },
                {
                  src: "/gallery/sd3.5m.png", 
                  alt: "Women in floral dresses outdoors",
                  model: "Stable Diffusion 3.5",
                  steps: "28 steps",
                  time: "~15s"
                },
                {
                  src: "/gallery/sd3.5m-lora-8steps.png",
                  alt: "Women in yellow dresses outdoor setting",
                  model: "SD 3.5 + LoRA",
                  steps: "8 steps",
                  time: "~8s"
                },
                {
                  src: "/gallery/sdxl_01.png",
                  alt: "Young women in colorful summer dresses",
                  model: "Stable Diffusion XL", 
                  steps: "50 steps",
                  time: "~25s"
                },
                {
                  src: "/gallery/sd1.5_01.png",
                  alt: "Women with beautiful curly hair",
                  model: "Stable Diffusion 1.5",
                  steps: "50 steps",
                  time: "~20s"
                }
              ].map((image, index) => (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow overflow-hidden group">
                  <div className="relative overflow-hidden">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={400}
                      height={400}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-blue-600/90 text-white backdrop-blur-sm">
                        {image.model}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-600 dark:text-slate-300">Generation Steps</span>
                        <Badge variant="outline" className="text-xs">
                          {image.steps}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600 dark:text-slate-300">Time (RTX 4090)</span>
                        <span className="text-xs font-mono">{image.time}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section id="compare" className="py-16 bg-white/50 dark:bg-slate-900/50">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">How OllamaDiffuser Compares</h2>
              <p className="text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
                See how OllamaDiffuser stacks up against other popular AI image generation tools. 
                We focus on simplicity and integration while maintaining power and flexibility.
              </p>
            </div>

            {/* Comparison Table */}
            <Card className="border-0 shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50 dark:bg-slate-800">
                    <tr>
                      <th className="px-6 py-4 text-left font-semibold text-slate-700 dark:text-slate-300">Feature</th>
                      <th className="px-6 py-4 text-left font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50">
                        <div className="flex items-center space-x-2">
                          <span>OllamaDiffuser</span>
                          <Badge variant="default" className="text-xs">Recommended</Badge>
                        </div>
                      </th>
                      <th className="px-6 py-4 text-left font-semibold text-slate-700 dark:text-slate-300">Automatic1111</th>
                      <th className="px-6 py-4 text-left font-semibold text-slate-700 dark:text-slate-300">reForge / Forge</th>
                      <th className="px-6 py-4 text-left font-semibold text-slate-700 dark:text-slate-300">SD.Next</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                    {[
                      {
                        feature: "Installation",
                        ollamadiffuser: "Very Easy (pip install)",
                        automatic1111: "Moderate (complex setup)",
                        reforge: "Easy (streamlined)",
                        sdnext: "Easy (built-in installer)"
                      },
                      {
                        feature: "Interface",
                        ollamadiffuser: "Unified: CLI, Web UI, REST API, Python API",
                        automatic1111: "Browser-based Web UI only",
                        reforge: "Streamlined Web UI",
                        sdnext: "Multiple Web UI options"
                      },
                      {
                        feature: "Performance",
                        ollamadiffuser: "High (lazy loading, memory optimization)",
                        automatic1111: "Medium (VRAM-intensive)",
                        reforge: "Very High (speed focused)",
                        sdnext: "Very High (compilation)"
                      },
                      {
                        feature: "Ease of Use",
                        ollamadiffuser: "High (Ollama-like simplicity)",
                        automatic1111: "Medium (steep learning curve)",
                        reforge: "Medium (streamlined complexity)",
                        sdnext: "Medium (powerful but overwhelming)"
                      },
                      {
                        feature: "Model Management",
                        ollamadiffuser: "Streamlined with direct HF integration",
                        automatic1111: "Extensive but complex",
                        reforge: "Comprehensive, inherits A1111",
                        sdnext: "Multi-model support"
                      }
                    ].map((row, index) => (
                      <tr key={index} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                        <td className="px-6 py-4 font-medium text-slate-700 dark:text-slate-300">{row.feature}</td>
                        <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400 bg-blue-50/50 dark:bg-blue-950/20">
                          <div className="flex items-start space-x-2">
                            <Zap className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                            <span>{row.ollamadiffuser}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{row.automatic1111}</td>
                        <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{row.reforge}</td>
                        <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{row.sdnext}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Feedback */}
      <section id="feedback" className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">We Value Your Feedback</h2>
              <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                Help us improve OllamaDiffuser by sharing your thoughts, reporting issues, or suggesting new features
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Quick Actions */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
                
                {[
                  {
                    icon: <Bug className="h-5 w-5 text-red-500" />,
                    title: "Report a Bug",
                    description: "Found an issue? Let us know on GitHub Issues",
                    href: "https://github.com/ollamadiffuser/ollamadiffuser/issues/new?template=bug_report.md",
                    buttonText: "Report Bug"
                  },
                  {
                    icon: <Lightbulb className="h-5 w-5 text-yellow-500" />,
                    title: "Feature Request",
                    description: "Have an idea for a new feature? Share it with us",
                    href: "https://github.com/ollamadiffuser/ollamadiffuser/issues/new?template=feature_request.md",
                    buttonText: "Request Feature"
                  },
                  {
                    icon: <MessageSquare className="h-5 w-5 text-blue-500" />,
                    title: "General Discussion",
                    description: "Join the community discussion on GitHub",
                    href: "https://github.com/ollamadiffuser/ollamadiffuser/discussions",
                    buttonText: "Join Discussions"
                  },
                  {
                    icon: <Star className="h-5 w-5 text-purple-500" />,
                    title: "Show Your Support",
                    description: "Star the repository if you find it useful",
                    href: "https://github.com/ollamadiffuser/ollamadiffuser",
                    buttonText: "Star on GitHub"
                  }
                ].map((action, index) => (
                  <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        {action.icon}
                        <span>{action.title}</span>
                      </CardTitle>
                      <CardDescription>
                        {action.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button className="w-full" variant="outline" asChild>
                        <a href={action.href} target="_blank" rel="noopener noreferrer">
                          {action.icon}
                          <span className="ml-2">{action.buttonText}</span>
                          <ExternalLink className="h-3 w-3 ml-1" />
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Contact Form */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Send Direct Feedback</h3>
                <FeedbackForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white/80 backdrop-blur-sm dark:bg-slate-950/80 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-3">
              <div className="h-6 w-6 rounded bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <Image 
                  src="/ollama-diffuser-flower.svg" 
                  alt="Ollama Diffuser Logo" 
                  width={24} 
                  height={24}
                  className="h-6 w-6"
                />
              </div>
              <span className="font-semibold">OllamaDiffuser</span>
            </div>
            <div className="flex items-center space-x-6 text-sm text-slate-600 dark:text-slate-400">
              <Link href="/" className="hover:text-slate-900 dark:hover:text-slate-100 transition-colors">
                Home
              </Link>
              <a href="https://github.com/ollamadiffuser/ollamadiffuser" className="hover:text-slate-900 dark:hover:text-slate-100 transition-colors">
                GitHub
              </a>
              <a href="https://deepwiki.com/ollamadiffuser/ollamadiffuser" className="hover:text-slate-900 dark:hover:text-slate-100 transition-colors">
                Documentation
              </a>
              <a href="https://github.com/ollamadiffuser/ollamadiffuser/blob/main/LICENSE" className="hover:text-slate-900 dark:hover:text-slate-100 transition-colors">
                MIT License
              </a>
              <span>© 2025 OllamaDiffuser</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
} 