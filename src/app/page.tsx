import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FeedbackForm } from "@/components/FeedbackForm"
import { 
  GitHubLogoIcon, 
  DownloadIcon,
  LightningBoltIcon
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
  GitFork,
  MessageSquare,
  Bug,
  Lightbulb,
  Heart
} from "lucide-react"
import Image from "next/image"

export default function Home() {
  const features = [
    {
      icon: <Terminal className="h-6 w-6" />,
      title: "Ollama-Style CLI Interface",
      description: "Familiar Ollama-like command-line interface for easy local SD model management and diffuser workflows"
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Local Web UI",
      description: "Beautiful local web interface with real-time status and image preview for your diffuser models"
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "LoRA Support",
      description: "Load and manage LoRAs for style modifications and faster local Stable Diffusion generation"
    },
    {
      icon: <Settings className="h-6 w-6" />,
      title: "Local Model Management",
      description: "Easy download, load, and switch between different local AI diffuser models"
    },
    {
      icon: <Palette className="h-6 w-6" />,
      title: "Multiple Diffuser Models",
      description: "Support for FLUX.1, Stable Diffusion 3.5, and more local SD variants"
    },
    {
      icon: <Code className="h-6 w-6" />,
      title: "Local REST API",
      description: "Complete local API for integration with other applications and diffuser workflows"
    }
  ]

  const quickStart = [
    "pip install ollamadiffuser",
    "ollamadiffuser pull flux.1-schnell",
    "ollamadiffuser run flux.1-schnell",
    "curl -X POST http://localhost:8000/api/generate \\\n  -H \"Content-Type: application/json\" \\\n  -d '{\"prompt\": \"A beautiful sunset\"}' \\\n  --output image.png"
  ]

  const supportedModels = [
    { name: "FLUX.1-dev", license: "Non-commercial", features: ["High Quality", "50 steps"] },
    { name: "FLUX.1-schnell", license: "Apache 2.0", features: ["Commercial Use", "4 steps", "12x faster"] },
    { name: "Stable Diffusion 3.5", license: "CreativeML", features: ["Medium Quality", "28 steps"] },
    { name: "Stable Diffusion 1.5", license: "CreativeML", features: ["Fast", "Lightweight"] }
  ]

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "OllamaDiffuser",
    "description": "Local AI image generation tool inspired by Ollama. Easy deployment of Stable Diffusion, FLUX.1, and other diffusion models with CLI interface, web UI, and LoRA support.",
    "url": "https://www.ollamadiffuser.com",
    "downloadUrl": "https://pypi.org/project/ollamadiffuser/",
    "softwareVersion": "latest",
    "operatingSystem": ["Windows", "macOS", "Linux"],
    "programmingLanguage": "Python",
    "applicationCategory": "AI Tools",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "author": {
      "@type": "Organization",
      "name": "OllamaDiffuser Team"
    },
    "keywords": "ollamadiffuser, ollama diffuser, local stable diffusion, local sd, diffuser, AI image generation, FLUX.1, stable diffusion cli",
    "featureList": [
      "CLI Interface",
      "Web UI",
      "LoRA Support", 
      "Model Management",
      "Multiple Models",
      "REST API"
    ],
    "screenshot": "https://www.ollamadiffuser.com/ollama-diffuser-logo.svg"
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
        {/* Header */}
        <header className="border-b bg-white/80 backdrop-blur-sm dark:bg-slate-950/80">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
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
              </div>
              <div className="flex items-center space-x-4">
                <Badge variant="secondary" className="flex items-center space-x-1">
                  <Star className="h-3 w-3" />
                  <span>0</span>
                </Badge>
                <Badge variant="secondary" className="flex items-center space-x-1">
                  <GitFork className="h-3 w-3" />
                  <span>0</span>
                </Badge>
                <Button variant="outline" size="sm" asChild>
                  <a href="https://github.com/ollamadiffuser/ollamadiffuser" target="_blank" rel="noopener noreferrer">
                    <GitHubLogoIcon className="h-4 w-4 mr-2" />
                    GitHub
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-4xl mx-auto">
              <Badge className="mb-4" variant="secondary">
                <LightningBoltIcon className="h-3 w-3 mr-1" />
                MIT License
              </Badge>
              <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-slate-600 dark:from-slate-100 dark:to-slate-400 bg-clip-text text-transparent">
                Local AI Image Generation with OllamaDiffuser
              </h2>
              <p className="text-xl text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                <strong>OllamaDiffuser</strong> simplifies local deployment of <strong>Stable Diffusion</strong>, <strong>FLUX.1</strong>, and other AI image generation models. 
                An intuitive <strong>local SD</strong> tool inspired by <strong>Ollama&apos;s</strong> simplicity - perfect for <strong>local diffuser</strong> workflows with CLI, web UI, and LoRA support.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700" asChild>
                  <a href="https://pypi.org/project/ollamadiffuser/" target="_blank" rel="noopener noreferrer">
                    <DownloadIcon className="h-4 w-4 mr-2" />
                    Install from PyPI
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="https://github.com/ollamadiffuser/ollamadiffuser/blob/main/README.md" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Documentation
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Video Demo Section */}
        <section className="py-16 bg-white/50 dark:bg-slate-900/50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <header className="mb-12">
                <h3 className="text-3xl font-bold mb-4">OllamaDiffuser Demo: Local Stable Diffusion in Action</h3>
                <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                  Watch how easy it is to set up and use <strong>OllamaDiffuser</strong> for <strong>local AI image generation</strong>. 
                  See the <strong>Ollama-style CLI</strong> commands and <strong>local SD</strong> workflow in this comprehensive demo.
                </p>
              </header>
              
              <Card className="border-0 shadow-lg overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                    <iframe
                      className="absolute top-0 left-0 w-full h-full"
                      src="https://www.youtube-nocookie.com/embed/iA3gpL3rn1I?modestbranding=1&rel=0&iv_load_policy=3&cc_load_policy=0&playsinline=1"
                      title="OllamaDiffuser Demo"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  </div>
                </CardContent>
              </Card>
              
              <div className="mt-8 flex justify-center">
                <Button asChild>
                  <a href="https://github.com/ollamadiffuser/ollamadiffuser#-installation" target="_blank" rel="noopener noreferrer">
                    <DownloadIcon className="h-4 w-4 mr-2" />
                    Try It Yourself
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-16 bg-white/50 dark:bg-slate-900/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold mb-4">Key Features</h3>
              <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                Everything you need to run AI image generation models locally with ease
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
                        {feature.icon}
                      </div>
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Start */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold mb-4">Quick Start</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Get up and running in minutes with pip install
                </p>
              </div>

              {/* PyPI Installation Highlight */}
              <Card className="mb-8 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/50 dark:to-blue-950/50 border-0">
                <CardContent className="py-6">
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-2 mb-4">
                      <div className="h-8 w-8 rounded-lg bg-green-500 flex items-center justify-center">
                        <DownloadIcon className="h-5 w-5 text-white" />
                      </div>
                      <h4 className="text-xl font-semibold">Available on PyPI</h4>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 mb-4">
                      Install OllamaDiffuser directly from the Python Package Index
                    </p>
                    <div className="bg-slate-900 dark:bg-slate-800 text-slate-100 p-4 rounded-lg font-mono text-lg">
                      pip install ollamadiffuser
                    </div>
                    <div className="mt-4 flex flex-col sm:flex-row gap-4 justify-center">
                      <Button variant="outline" asChild>
                        <a href="https://pypi.org/project/ollamadiffuser/" target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          View on PyPI
                        </a>
                      </Button>
                      <Button asChild>
                        <a href="https://github.com/ollamadiffuser/ollamadiffuser#-installation" target="_blank" rel="noopener noreferrer">
                          <GitHubLogoIcon className="h-4 w-4 mr-2" />
                          Installation Guide
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-900 dark:bg-slate-800 text-slate-100">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Terminal className="h-5 w-5" />
                    <span>Terminal</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {quickStart.map((command, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <Badge variant="secondary" className="mt-1 text-xs">
                        {index + 1}
                      </Badge>
                      <code className="flex-1 text-sm font-mono bg-slate-800 dark:bg-slate-700 p-3 rounded-md whitespace-pre-wrap">
                        {command}
                      </code>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Supported Models */}
        <section className="py-16 bg-white/50 dark:bg-slate-900/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold mb-4">Supported Models</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Choose from a variety of state-of-the-art image generation models
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {supportedModels.map((model, index) => (
                <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">{model.name}</CardTitle>
                    <Badge variant={model.license === "Apache 2.0" ? "default" : "secondary"} className="w-fit">
                      {model.license}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {model.features.map((feature, featureIndex) => (
                        <Badge key={featureIndex} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Latest Updates & Key Info */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold mb-4">Why Choose OllamaDiffuser?</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Built with simplicity and power in mind, inspired by Ollama&apos;s elegant approach
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Zap className="h-5 w-5 text-yellow-500" />
                      <span>FLUX.1-schnell</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 dark:text-slate-400 mb-3">
                      12x faster generation with Apache 2.0 license - perfect for commercial use
                    </p>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Generation time:</span>
                        <Badge variant="outline">4 steps</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>License:</span>
                        <Badge variant="default">Commercial OK</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Settings className="h-5 w-5 text-blue-500" />
                      <span>Easy Management</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 dark:text-slate-400 mb-3">
                      Ollama-inspired commands make model management intuitive
                    </p>
                    <div className="space-y-1 text-sm font-mono bg-slate-100 dark:bg-slate-800 p-2 rounded">
                      <div>ollamadiffuser pull model</div>
                      <div>ollamadiffuser run model</div>
                      <div>ollamadiffuser ps</div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Globe className="h-5 w-5 text-green-500" />
                      <span>Web Interface</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 dark:text-slate-400 mb-3">
                      Beautiful web UI with real-time status and image preview
                    </p>
                    <div className="space-y-1 text-sm">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Live model status</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>Parameter controls</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <span>Instant preview</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-12 text-center">
                <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50 border-0">
                  <CardContent className="py-8">
                    <h4 className="text-xl font-semibold mb-4">Ready to get started?</h4>
                    <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-2xl mx-auto">
                      Join the community and start generating amazing images locally with the power and simplicity of OllamaDiffuser
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button asChild>
                        <a href="https://github.com/ollamadiffuser/ollamadiffuser/blob/main/README.md#-installation" target="_blank" rel="noopener noreferrer">
                          <DownloadIcon className="h-4 w-4 mr-2" />
                          Install Now
                        </a>
                      </Button>
                      <Button variant="outline" asChild>
                        <a href="https://github.com/ollamadiffuser/ollamadiffuser/blob/main/README.md#-lora-usage-guide" target="_blank" rel="noopener noreferrer">
                          <Palette className="h-4 w-4 mr-2" />
                          LoRA Guide
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Feedback Section */}
        <section className="py-16 bg-white/50 dark:bg-slate-900/50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold mb-4">We Value Your Feedback</h3>
                <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                  Help us improve OllamaDiffuser by sharing your thoughts, reporting issues, or suggesting new features
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                {/* Quick Feedback Options */}
                <div className="space-y-6">
                  <h4 className="text-xl font-semibold mb-4">Quick Actions</h4>
                  
                  <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Bug className="h-5 w-5 text-red-500" />
                        <span>Report a Bug</span>
                      </CardTitle>
                      <CardDescription>
                        Found an issue? Let us know on GitHub Issues
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button className="w-full" variant="outline" asChild>
                        <a href="https://github.com/ollamadiffuser/ollamadiffuser/issues/new?template=bug_report.md" target="_blank" rel="noopener noreferrer">
                          <Bug className="h-4 w-4 mr-2" />
                          Report Bug on GitHub
                          <ExternalLink className="h-3 w-3 ml-1" />
                        </a>
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Lightbulb className="h-5 w-5 text-yellow-500" />
                        <span>Feature Request</span>
                      </CardTitle>
                      <CardDescription>
                        Have an idea for a new feature? Share it with us
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button className="w-full" variant="outline" asChild>
                        <a href="https://github.com/ollamadiffuser/ollamadiffuser/issues/new?template=feature_request.md" target="_blank" rel="noopener noreferrer">
                          <Lightbulb className="h-4 w-4 mr-2" />
                          Request Feature on GitHub
                          <ExternalLink className="h-3 w-3 ml-1" />
                        </a>
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <MessageSquare className="h-5 w-5 text-blue-500" />
                        <span>General Discussion</span>
                      </CardTitle>
                      <CardDescription>
                        Join the community discussion on GitHub
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button className="w-full" variant="outline" asChild>
                        <a href="https://github.com/ollamadiffuser/ollamadiffuser/discussions" target="_blank" rel="noopener noreferrer">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Join Discussions
                          <ExternalLink className="h-3 w-3 ml-1" />
                        </a>
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Star className="h-5 w-5 text-purple-500" />
                        <span>Show Your Support</span>
                      </CardTitle>
                      <CardDescription>
                        Star the repository if you find it useful
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button className="w-full" variant="outline" asChild>
                        <a href="https://github.com/ollamadiffuser/ollamadiffuser" target="_blank" rel="noopener noreferrer">
                          <Star className="h-4 w-4 mr-2" />
                          Star on GitHub
                          <ExternalLink className="h-3 w-3 ml-1" />
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                {/* Contact Form */}
                <div>
                  <h4 className="text-xl font-semibold mb-4">Send Direct Feedback</h4>
                  <FeedbackForm />
                </div>
              </div>

              {/* Community Stats */}
              <div className="mt-12 text-center">
                <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/50 dark:to-blue-950/50 border-0">
                  <CardContent className="py-6">
                    <div className="flex items-center justify-center space-x-2 mb-4">
                      <Heart className="h-5 w-5 text-red-500" />
                      <span className="font-semibold">Community Driven</span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                      OllamaDiffuser is an open-source project that thrives on community feedback. 
                      Every suggestion, bug report, and contribution helps make it better for everyone.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4 mt-6 text-sm">
                      <Badge variant="secondary" className="flex items-center space-x-1">
                        <GitHubLogoIcon className="h-3 w-3" />
                        <span>Open Source</span>
                      </Badge>
                      <Badge variant="secondary" className="flex items-center space-x-1">
                        <Heart className="h-3 w-3" />
                        <span>Community Driven</span>
                      </Badge>
                      <Badge variant="secondary" className="flex items-center space-x-1">
                        <Zap className="h-3 w-3" />
                        <span>Actively Maintained</span>
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
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
                <a href="https://github.com/ollamadiffuser/ollamadiffuser" className="hover:text-slate-900 dark:hover:text-slate-100 transition-colors">
                  GitHub
                </a>
                <a href="https://github.com/ollamadiffuser/ollamadiffuser/blob/main/README.md" className="hover:text-slate-900 dark:hover:text-slate-100 transition-colors">
                  Documentation
                </a>
                <a href="https://github.com/ollamadiffuser/ollamadiffuser/releases" className="hover:text-slate-900 dark:hover:text-slate-100 transition-colors">
                  Releases
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
    </>
  )
}
