export interface AutomationItem {
  id: string
  title: string
  buildHours: number
  testingHours: number
  cleanupHours: number
  description: string
  workflow?: string
  requirements?: string
  suggestions?: string
}

export interface SetupItem {
  id: string
  title: string
  hours: number
  description: string
  workflow?: string
  requirements?: string
}

export interface ExcludedItem {
  id: string
  title: string
  notes?: string
}

export interface FutureEnhancement {
  id: string
  title: string
  notes?: string
}

export interface SoftwareRequirement {
  id: string
  name: string
  planType: string
  estimatedCost: number
  purchased: boolean
}

export interface CredentialRequirement {
  id: string
  name: string
  description: string
  hasAccess: boolean
}

export interface ProjectData {
  title: string
  subtitle: string
  overview: string
  totalCost: number
  depositPercentage: number
  depositAmount: number
  totalHours: number
  prepRate: number
  automationRate: number
  prepDiscount: number
  automationDiscount: number
  prepDiscountNote: string
  automationDiscountNote: string
  prepHours: number
  automationHours: number
  softwareRequirements: SoftwareRequirement[]
  credentialRequirements: CredentialRequirement[]
  setups: SetupItem[]
  automations: AutomationItem[]
  excludedItems: ExcludedItem[]
  futureEnhancements: FutureEnhancement[]
}
