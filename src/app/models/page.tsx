"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { 
  GitHubLogoIcon, 
  MagnifyingGlassIcon,
  ArrowLeftIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  CopyIcon
} from "@radix-ui/react-icons"
import { 
  Terminal, 
  Monitor, 
  Cpu, 
  AlertCircle,
  Settings,
  CheckIcon
} from "lucide-react"
import Image from "next/image"
import { useState, useMemo, useEffect } from "react"
import Link from "next/link"

interface ModelData {
  repo_id: string
  model_type: string
  variant: string
  pull_name: string
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

interface GroupedModel {
  baseName: string
  baseModel: ModelData
  variants: { name: string; model: ModelData }[]
  isGguf: boolean
}

export default function ModelsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [models, setModels] = useState<Record<string, ModelData>>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set())
  const [copiedCommands, setCopiedCommands] = useState<Set<string>>(new Set())

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

  // Function to get base model name for GGUF grouping
  const getBaseModelName = (modelName: string): string => {
    // Common quantization suffixes to remove
    const quantSuffixes = [
      '-q2k', '-q2-k', '-q3ks', '-q3-k-s', '-q4-0', '-q4-1', '-q4ks', '-q4-k-s',
      '-q5-0', '-q5-1', '-q5ks', '-q5-k-s', '-q6k', '-q6-k', '-q8', '-q8-0', '-f16'
    ]
    
    let baseName = modelName
    for (const suffix of quantSuffixes) {
      if (baseName.endsWith(suffix)) {
        baseName = baseName.slice(0, -suffix.length)
        break
      }
    }
    
    return baseName
  }

  // Group models by base name for GGUF models
  const groupedModels = useMemo(() => {
    const modelEntries = Object.entries(models)
    const groups: Record<string, GroupedModel> = {}
    
    modelEntries.forEach(([modelName, model]) => {
      const baseName = getBaseModelName(modelName)
      const isGguf = model.variant.includes('gguf')
      const hasVariants = baseName !== modelName
      
      if (isGguf || hasVariants) {
        // Initialize group if it doesn't exist
        if (!groups[baseName]) {
          groups[baseName] = {
            baseName,
            baseModel: model,
            variants: [],
            isGguf
          }
        }
        
        // If this is a variant (not the base model), add it to variants
        if (baseName !== modelName) {
          groups[baseName].variants.push({ name: modelName, model })
          // Update isGguf flag if any variant is GGUF
          if (isGguf) {
            groups[baseName].isGguf = true
          }
        }
        // If this is the base model but we already have variants, use this as the base model
        else if (groups[baseName].variants.length > 0) {
          groups[baseName].baseModel = model
        }
      } else {
        // Non-quantized model - always gets its own group
        groups[modelName] = {
          baseName: modelName,
          baseModel: model,
          variants: [],
          isGguf: false
        }
      }
    })
    
    // Sort variants within each group by VRAM requirements
    Object.values(groups).forEach(group => {
      group.variants.sort((a, b) => a.model.hardware_requirements.min_vram_gb - b.model.hardware_requirements.min_vram_gb)
    })
    
    return groups
  }, [models])

  // Generate filters based on loaded models
  const filters = useMemo(() => {
    const groupEntries = Object.values(groupedModels)
    
    return [
      { id: "all", label: "All Models", count: Object.keys(groupedModels).length },
      { 
        id: "low-vram", 
        label: "Low VRAM", 
        count: groupEntries.filter(group => 
          group.baseModel.hardware_requirements.min_vram_gb <= 4 ||
          group.variants.some(v => v.model.hardware_requirements.min_vram_gb <= 4)
        ).length 
      },
      { 
        id: "mid-vram", 
        label: "Mid VRAM", 
        count: groupEntries.filter(group =>
          (group.baseModel.hardware_requirements.min_vram_gb > 4 && group.baseModel.hardware_requirements.min_vram_gb <= 8) ||
          group.variants.some(v => v.model.hardware_requirements.min_vram_gb > 4 && v.model.hardware_requirements.min_vram_gb <= 8)
        ).length 
      },
      { 
        id: "high-vram", 
        label: "High VRAM", 
        count: groupEntries.filter(group =>
          group.baseModel.hardware_requirements.min_vram_gb > 8 ||
          group.variants.some(v => v.model.hardware_requirements.min_vram_gb > 8)
        ).length 
      },
      { 
        id: "cpu-compatible", 
        label: "CPU Compatible", 
        count: groupEntries.filter(group =>
          group.baseModel.hardware_requirements.supported_devices.includes("CPU") ||
          group.variants.some(v => v.model.hardware_requirements.supported_devices.includes("CPU"))
        ).length 
      },
      { 
        id: "gguf", 
        label: "GGUF Models", 
        count: groupEntries.filter(group => group.isGguf).length 
      },
      { 
        id: "flux", 
        label: "FLUX Models", 
        count: groupEntries.filter(group => group.baseModel.model_type === "flux").length 
      },
      { 
        id: "sd", 
        label: "Stable Diffusion", 
        count: groupEntries.filter(group => 
          group.baseModel.model_type.startsWith("sd") || group.baseModel.model_type.includes("controlnet")
        ).length 
      },
      { 
        id: "video", 
        label: "Video Generation", 
        count: groupEntries.filter(group => group.baseModel.model_type === "video").length 
      },
      { 
        id: "hidream", 
        label: "HiDream", 
        count: groupEntries.filter(group => group.baseModel.model_type === "hidream").length 
      }
    ]
  }, [groupedModels])

  // Filter and search grouped models
  const filteredGroups = useMemo(() => {
    let filtered = Object.values(groupedModels)

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(group => 
        group.baseName.toLowerCase().includes(query) ||
        group.baseModel.repo_id.toLowerCase().includes(query) ||
        group.baseModel.hardware_requirements.performance_notes.toLowerCase().includes(query) ||
        group.baseModel.model_type.toLowerCase().includes(query) ||
        group.baseModel.variant.toLowerCase().includes(query) ||
        group.variants.some(variant =>
          variant.name.toLowerCase().includes(query) ||
          variant.model.hardware_requirements.performance_notes.toLowerCase().includes(query)
        )
      )
    }

    // Apply category filter
    if (selectedFilter !== "all") {
      filtered = filtered.filter(group => {
        const checkModel = (model: ModelData) => {
          switch (selectedFilter) {
            case "low-vram":
              return model.hardware_requirements.min_vram_gb <= 4
            case "mid-vram":
              return model.hardware_requirements.min_vram_gb > 4 && model.hardware_requirements.min_vram_gb <= 8
            case "high-vram":
              return model.hardware_requirements.min_vram_gb > 8
            case "cpu-compatible":
              return model.hardware_requirements.supported_devices.includes("CPU")
            case "gguf":
              return model.variant.includes("gguf")
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
        }
        
        return checkModel(group.baseModel) || group.variants.some(v => checkModel(v.model))
      })
    }

    // Sort by VRAM requirements (ascending)
    return filtered.sort((a, b) => {
      const aMinVram = Math.min(
        a.baseModel.hardware_requirements.min_vram_gb,
        ...a.variants.map(v => v.model.hardware_requirements.min_vram_gb)
      )
      const bMinVram = Math.min(
        b.baseModel.hardware_requirements.min_vram_gb,
        ...b.variants.map(v => v.model.hardware_requirements.min_vram_gb)
      )
      return aMinVram - bMinVram
    })
  }, [groupedModels, searchQuery, selectedFilter])

  const toggleGroup = (baseName: string) => {
    const newExpanded = new Set(expandedGroups)
    if (newExpanded.has(baseName)) {
      newExpanded.delete(baseName)
    } else {
      newExpanded.add(baseName)
    }
    setExpandedGroups(newExpanded)
  }

  const copyToClipboard = async (text: string, commandId: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedCommands(prev => new Set(prev).add(commandId))
      setTimeout(() => {
        setCopiedCommands(prev => {
          const newSet = new Set(prev)
          newSet.delete(commandId)
          return newSet
        })
      }, 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

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
    if (variant === "gguf-q4ks" || variant.includes("q4ks")) {
      return <Badge className="bg-green-600 text-white">Recommended</Badge>
    }
    if (modelName.includes("schnell")) {
      return <Badge className="bg-blue-600 text-white">Fast</Badge>
    }
    if (modelName === "stable-diffusion-1.5") {
      return <Badge className="bg-orange-600 text-white">Popular</Badge>
    }
    return null
  }

  const getQuantizationBadge = (modelName: string) => {
    if (modelName.includes('-q2')) return <Badge variant="outline" className="text-xs">Q2</Badge>
    if (modelName.includes('-q3')) return <Badge variant="outline" className="text-xs">Q3</Badge>
    if (modelName.includes('-q4')) return <Badge variant="outline" className="text-xs">Q4</Badge>
    if (modelName.includes('-q5')) return <Badge variant="outline" className="text-xs">Q5</Badge>
    if (modelName.includes('-q6')) return <Badge variant="outline" className="text-xs">Q6</Badge>
    if (modelName.includes('-q8')) return <Badge variant="outline" className="text-xs">Q8</Badge>
    if (modelName.includes('-f16')) return <Badge variant="outline" className="text-xs">F16</Badge>
    return null
  }

  const ModelCard = ({ model, modelName, isVariant = false }: { model: ModelData; modelName: string; isVariant?: boolean }) => {
    const qualityLevel = getQualityLevel(model.hardware_requirements.min_vram_gb)
    const recommendedBadge = getRecommendedBadge(modelName, model.variant)
    const quantBadge = getQuantizationBadge(modelName)
    const pullCommand = `ollamadiffuser pull ${model.pull_name || modelName}`
    const isCopied = copiedCommands.has(model.pull_name || modelName)
    
    return (
      <div className={`${isVariant ? 'ml-4 border-l-2 border-slate-200 dark:border-slate-700 pl-4' : ''}`}>
        <CardHeader className={isVariant ? 'pb-3' : undefined}>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2 flex-wrap">
                <CardTitle className={`${isVariant ? 'text-lg' : 'text-xl'}`}>
                  {isVariant ? modelName.split('-').pop()?.toUpperCase() : modelName}
                </CardTitle>
                {quantBadge}
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
        <CardContent className={isVariant ? 'pt-0' : undefined}>
          {/* Pull Command Section */}
          <div className="mb-6 p-4 bg-slate-100 dark:bg-slate-800 rounded-lg">
            <h4 className="font-semibold mb-3 flex items-center">
              <Terminal className="h-4 w-4 mr-2" />
              Pull Command
            </h4>
            <div className="flex items-center space-x-2">
              <code className="flex-1 bg-slate-900 text-green-400 p-3 rounded font-mono text-sm">
                {pullCommand}
              </code>
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(pullCommand, model.pull_name || modelName)}
                className="shrink-0"
              >
                {isCopied ? (
                  <CheckIcon className="h-4 w-4" />
                ) : (
                  <CopyIcon className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

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

          {!isVariant && (
            <>
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
            </>
          )}
        </CardContent>
      </div>
    )
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
              Showing {filteredGroups.length} model{filteredGroups.length !== 1 ? 's' : ''}
            </div>
            
            <div className="grid gap-6">
              {filteredGroups.map((group) => {
                const isExpanded = expandedGroups.has(group.baseName)
                const hasVariants = group.variants.length > 0
                
                return (
                  <Card key={group.baseName} className="hover:shadow-lg transition-shadow">
                    {hasVariants ? (
                      <>
                        <CardHeader className="cursor-pointer" onClick={() => toggleGroup(group.baseName)}>
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-2">
                                <CardTitle className="text-xl">{group.baseName}</CardTitle>
                                <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                                  {group.variants.length} variants
                                </Badge>
                                {getRecommendedBadge(group.baseName, group.baseModel.variant)}
                              </div>
                              <CardDescription className="text-base">
                                {group.baseModel.hardware_requirements.performance_notes}
                              </CardDescription>
                            </div>
                            <div className="flex items-center space-x-3">
                              <div className="text-right text-sm text-slate-500">
                                <div className="font-mono">
                                  {Math.min(...group.variants.map(v => v.model.hardware_requirements.disk_space_gb))}GB - {Math.max(...group.variants.map(v => v.model.hardware_requirements.disk_space_gb))}GB
                                </div>
                                <div>Size Range</div>
                              </div>
                              <Button variant="ghost" size="sm">
                                {isExpanded ? (
                                  <ChevronUpIcon className="h-4 w-4" />
                                ) : (
                                  <ChevronDownIcon className="h-4 w-4" />
                                )}
                              </Button>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          {!isExpanded && (
                            <div className="mb-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                              <div className="grid md:grid-cols-3 gap-4 text-sm">
                                <div>
                                  <span className="font-medium">VRAM Range:</span>
                                  <div className="text-slate-600 dark:text-slate-400">
                                    {Math.min(...group.variants.map(v => v.model.hardware_requirements.min_vram_gb))}GB - {Math.max(...group.variants.map(v => v.model.hardware_requirements.min_vram_gb))}GB
                                  </div>
                                </div>
                                <div>
                                  <span className="font-medium">Available:</span>
                                  <div className="flex flex-wrap gap-1 mt-1">
                                    {group.variants.slice(0, 4).map((variant) => (
                                      <span key={variant.name} className="text-xs bg-slate-200 dark:bg-slate-700 px-2 py-1 rounded">
                                        {getQuantizationBadge(variant.name)?.props.children || variant.name.split('-').pop()?.toUpperCase()}
                                      </span>
                                    ))}
                                    {group.variants.length > 4 && (
                                      <span className="text-xs text-slate-500">+{group.variants.length - 4} more</span>
                                    )}
                                  </div>
                                </div>
                                <div>
                                  <span className="font-medium">License:</span>
                                  <div className="text-slate-600 dark:text-slate-400">
                                    {group.baseModel.license_info.type}
                                  </div>
                                </div>
                              </div>
                              <div className="mt-3 text-xs text-slate-500">
                                Click to expand and see all {group.variants.length} quantization variants
                              </div>
                            </div>
                          )}
                          {isExpanded && (
                            <>
                              <div className="space-y-4">
                                {group.variants.map((variant) => (
                                  <ModelCard key={variant.name} model={variant.model} modelName={variant.name} isVariant />
                                ))}
                              </div>
                              {/* License Info */}
                              <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                                <div className="flex items-start space-x-2">
                                  <AlertCircle className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                                  <div className="text-sm">
                                    <div className="font-medium">{group.baseModel.license_info.type}</div>
                                    <div className="text-slate-600 dark:text-slate-400">
                                      {group.baseModel.license_info.commercial_use ? "Commercial use allowed" : "Non-commercial use only"}
                                      {group.baseModel.license_info.requires_agreement && " • License agreement required"}
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
                            </>
                          )}
                        </CardContent>
                      </>
                    ) : (
                      /* Non-grouped model - show normally */
                      <ModelCard model={group.baseModel} modelName={group.baseName} />
                    )}
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