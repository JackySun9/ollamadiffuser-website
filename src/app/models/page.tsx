"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { 
  GitHubLogoIcon, 
  MagnifyingGlassIcon,
  ArrowLeftIcon
} from "@radix-ui/react-icons"
import { 
  Terminal, 
  Monitor, 
  Cpu, 
  AlertCircle,
  Settings
} from "lucide-react"
import Image from "next/image"
import { useState, useMemo, useEffect } from "react"
import Link from "next/link"

interface ModelData {
  repo_id: string
  model_type: string
  variant: string
  parameters: {
    num_inference_steps: number
    guidance_scale: number
    max_sequence_length: number
    video_length?: number
  }
  hardware_requirements: {
    min_vram_gb: number
    recommended_vram_gb: number
    min_ram_gb: number
    recommended_ram_gb: number
    disk_space_gb: number
    supported_devices: string[]
    performance_notes: string
  }
  license_info: {
    type: string
    requires_agreement: boolean
    commercial_use: boolean
  }
}

export default function ModelsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [models, setModels] = useState<Record<string, ModelData>>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch models data from API
  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await fetch('/api/models')
        if (!response.ok) {
          throw new Error('Failed to fetch models')
        }
        const data = await response.json()
        setModels(data.models)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load models')
      } finally {
        setLoading(false)
      }
    }

    fetchModels()
  }, [])

  // Generate filters based on loaded models
  const filters = useMemo(() => {
    const modelEntries = Object.entries(models)
    
    return [
      { id: "all", label: "All Models", count: modelEntries.length },
      { 
        id: "low-vram", 
        label: "Low VRAM", 
        count: modelEntries.filter(([, model]) => model.hardware_requirements.min_vram_gb <= 4).length 
      },
      { 
        id: "mid-vram", 
        label: "Mid VRAM", 
        count: modelEntries.filter(([, model]) => 
          model.hardware_requirements.min_vram_gb > 4 && model.hardware_requirements.min_vram_gb <= 8
        ).length 
      },
      { 
        id: "high-vram", 
        label: "High VRAM", 
        count: modelEntries.filter(([, model]) => model.hardware_requirements.min_vram_gb > 8).length 
      },
      { 
        id: "cpu-compatible", 
        label: "CPU Compatible", 
        count: modelEntries.filter(([, model]) => 
          model.hardware_requirements.supported_devices.includes("CPU")
        ).length 
      },
      { 
        id: "flux", 
        label: "FLUX Models", 
        count: modelEntries.filter(([, model]) => model.model_type === "flux").length 
      },
      { 
        id: "sd", 
        label: "Stable Diffusion", 
        count: modelEntries.filter(([, model]) => 
          model.model_type.startsWith("sd") || model.model_type.includes("controlnet")
        ).length 
      },
      { 
        id: "video", 
        label: "Video Generation", 
        count: modelEntries.filter(([, model]) => model.model_type === "video").length 
      },
      { 
        id: "hidream", 
        label: "HiDream", 
        count: modelEntries.filter(([, model]) => model.model_type === "hidream").length 
      }
    ]
  }, [models])

  // Filter and search models
  const filteredModels = useMemo(() => {
    let filtered = Object.entries(models)

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(([modelName, model]) => 
        modelName.toLowerCase().includes(query) ||
        model.repo_id.toLowerCase().includes(query) ||
        model.hardware_requirements.performance_notes.toLowerCase().includes(query) ||
        model.model_type.toLowerCase().includes(query) ||
        model.variant.toLowerCase().includes(query)
      )
    }

    // Apply category filter
    if (selectedFilter !== "all") {
      filtered = filtered.filter(([, model]) => {
        switch (selectedFilter) {
          case "low-vram":
            return model.hardware_requirements.min_vram_gb <= 4
          case "mid-vram":
            return model.hardware_requirements.min_vram_gb > 4 && model.hardware_requirements.min_vram_gb <= 8
          case "high-vram":
            return model.hardware_requirements.min_vram_gb > 8
          case "cpu-compatible":
            return model.hardware_requirements.supported_devices.includes("CPU")
          case "flux":
            return model.model_type === "flux"
          case "sd":
            return model.model_type.startsWith("sd") || model.model_type.includes("controlnet")
          case "video":
            return model.model_type === "video"
          case "hidream":
            return model.model_type === "hidream"
          default:
            return true
        }
      })
    }

    // Sort by VRAM requirements (ascending)
    return filtered.sort(([, a], [, b]) => a.hardware_requirements.min_vram_gb - b.hardware_requirements.min_vram_gb)
  }, [models, searchQuery, selectedFilter])

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-400">Loading models...</p>
        </div>
      </div>
    )
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <p className="text-red-600 dark:text-red-400 mb-4">Error loading models: {error}</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    )
  }

  const getQualityLevel = (vram: number) => {
    if (vram <= 3) return { label: "Basic", color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300" }
    if (vram <= 6) return { label: "Good", color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300" }
    if (vram <= 10) return { label: "High", color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" }
    return { label: "Highest", color: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300" }
  }

  const getRecommendedBadge = (modelName: string, variant: string) => {
    if (variant === "gguf-q4ks") {
      return <Badge className="bg-green-600 text-white">Recommended</Badge>
    }
    if (modelName === "flux.1-schnell") {
      return <Badge className="bg-blue-600 text-white">Fast</Badge>
    }
    if (modelName === "stable-diffusion-1.5") {
      return <Badge className="bg-orange-600 text-white">Popular</Badge>
    }
    return null
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur-sm dark:bg-slate-950/95">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
              <Image 
                src="/ollama-diffuser-flower.svg" 
                alt="OllamaDiffuser" 
                width={32} 
                height={32}
                className="h-8 w-8"
              />
              <h1 className="text-xl font-semibold">OllamaDiffuser</h1>
            </Link>
            <Button variant="outline" size="sm" asChild>
              <a href="https://github.com/ollamadiffuser/ollamadiffuser" target="_blank" rel="noopener noreferrer">
                <GitHubLogoIcon className="h-4 w-4 mr-2" />
                GitHub
              </a>
            </Button>
          </div>
        </div>
      </header>

      {/* Back to Home */}
      <section className="py-6 bg-slate-50 dark:bg-slate-900">
        <div className="container mx-auto px-6">
          <Link href="/" className="inline-flex items-center text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 transition-colors">
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </div>
      </section>

      {/* Title and Search */}
      <section className="py-8">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-4">OllamaDiffuser Models</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-8">
              Browse and download models including FLUX, Stable Diffusion, video generation, and specialized models optimized for different hardware configurations.
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto mb-8">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                type="text"
                placeholder="Search for models..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-3 text-lg"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2 justify-center">
              {filters.map((filter) => (
                <Button
                  key={filter.id}
                  variant={selectedFilter === filter.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedFilter(filter.id)}
                  className="text-sm"
                >
                  {filter.label} ({filter.count})
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Models Grid */}
      <section className="pb-16">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6 text-slate-600 dark:text-slate-400">
              Showing {filteredModels.length} model{filteredModels.length !== 1 ? 's' : ''}
            </div>
            
            <div className="grid gap-6">
              {filteredModels.map(([modelName, model]) => {
                const qualityLevel = getQualityLevel(model.hardware_requirements.min_vram_gb)
                const recommendedBadge = getRecommendedBadge(modelName, model.variant)
                
                return (
                  <Card key={modelName} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <CardTitle className="text-xl">{modelName}</CardTitle>
                            {recommendedBadge}
                            <Badge className={qualityLevel.color}>
                              {qualityLevel.label} Quality
                            </Badge>
                          </div>
                          <CardDescription className="text-base">
                            {model.hardware_requirements.performance_notes}
                          </CardDescription>
                        </div>
                        <div className="text-right text-sm text-slate-500">
                          <div className="font-mono">{model.hardware_requirements.disk_space_gb}GB</div>
                          <div>Size</div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-3 gap-6">
                        {/* Hardware Requirements */}
                        <div>
                          <h4 className="font-semibold mb-3 flex items-center">
                            <Monitor className="h-4 w-4 mr-2" />
                            Hardware Requirements
                          </h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-slate-600 dark:text-slate-400">Min VRAM:</span>
                              <span className="font-mono">{model.hardware_requirements.min_vram_gb}GB</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-600 dark:text-slate-400">Recommended VRAM:</span>
                              <span className="font-mono">{model.hardware_requirements.recommended_vram_gb}GB</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-600 dark:text-slate-400">Min RAM:</span>
                              <span className="font-mono">{model.hardware_requirements.min_ram_gb}GB</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-600 dark:text-slate-400">Disk Space:</span>
                              <span className="font-mono">{model.hardware_requirements.disk_space_gb}GB</span>
                            </div>
                          </div>
                        </div>

                        {/* Supported Devices */}
                        <div>
                          <h4 className="font-semibold mb-3 flex items-center">
                            <Cpu className="h-4 w-4 mr-2" />
                            Supported Devices
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {model.hardware_requirements.supported_devices.map((device) => (
                              <Badge key={device} variant="outline" className="text-xs">
                                {device}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Model Parameters */}
                        <div>
                          <h4 className="font-semibold mb-3 flex items-center">
                            <Settings className="h-4 w-4 mr-2" />
                            Parameters
                          </h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-slate-600 dark:text-slate-400">Steps:</span>
                              <span className="font-mono">{model.parameters.num_inference_steps}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-600 dark:text-slate-400">Guidance:</span>
                              <span className="font-mono">{model.parameters.guidance_scale}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-600 dark:text-slate-400">Max Length:</span>
                              <span className="font-mono">{model.parameters.max_sequence_length}</span>
                            </div>
                            {model.model_type === "video" && 'video_length' in model.parameters && (
                              <div className="flex justify-between">
                                <span className="text-slate-600 dark:text-slate-400">Video Frames:</span>
                                <span className="font-mono">{model.parameters.video_length}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* License Info */}
                      <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                        <div className="flex items-start space-x-2">
                          <AlertCircle className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                          <div className="text-sm">
                            <div className="font-medium">{model.license_info.type}</div>
                            <div className="text-slate-600 dark:text-slate-400">
                              {model.license_info.commercial_use ? "Commercial use allowed" : "Non-commercial use only"}
                              {model.license_info.requires_agreement && " • License agreement required"}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="mt-6">
                        <Button variant="outline" className="w-full" asChild>
                          <a href="#install" onClick={() => {
                            const installSection = document.querySelector('#install')
                            if (installSection) {
                              installSection.scrollIntoView({ behavior: 'smooth' })
                            }
                          }}>
                            <Terminal className="h-4 w-4 mr-2" />
                            Installation Guide
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Installation Guide */}
      <section id="install" className="py-16 bg-slate-50 dark:bg-slate-900">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold mb-8 text-center">Installation Guide</h3>
            
            <Card>
              <CardHeader>
                <CardTitle>Quick Installation</CardTitle>
                <CardDescription>
                  Follow these steps to install and run any model with OllamaDiffuser
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-2"># Install from PyPI</h4>
                    <div className="bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                      pip install ollamadiffuser
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2"># Pull and run a model (4-command setup)</h4>
                    <div className="bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-sm space-y-1">
                      <div>ollamadiffuser pull flux.1-schnell</div>
                      <div>ollamadiffuser run flux.1-schnell</div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2"># Generate via API</h4>
                    <div className="bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-sm space-y-1">
                      <div>curl -X POST http://localhost:8000/api/generate \</div>
                      <div className="ml-4">-H &quot;Content-Type: application/json&quot; \</div>
                      <div className="ml-4">-d &apos;{`{`}&quot;prompt&quot;: &quot;A beautiful sunset&quot;{`}`}&apos; \</div>
                      <div className="ml-4">--output image.png</div>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      <strong>Note:</strong> Replace <code className="bg-blue-100 dark:bg-blue-900 px-1 rounded">flux.1-schnell</code> with any model name from the list above. 
                      The API will be available at <code className="bg-blue-100 dark:bg-blue-900 px-1 rounded">http://localhost:8000</code> after running the model.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
} 