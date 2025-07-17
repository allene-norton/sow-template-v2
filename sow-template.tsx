"use client"

import { useState, useEffect } from "react"
import type { AutomationItem, SetupItem, ProjectData } from "./sow-template-types"
import { PreviewInterface } from "./components/sow/preview-interface"
import { EditInterface } from "./components/sow/edit-interface"
import { remark } from "remark"
import html from "remark-html"

const defaultData: ProjectData = {
  title: "Copilot Automation Implementation Proposal",
  subtitle: "Complete Workflow Automation & Workspace Setup",
  company: "CompanyName",
  overview:
    "This proposal outlines the complete setup and automation of your Copilot workspace, including client onboarding, document management, billing, and contract workflows. The implementation includes 1 core automation and 1 workspace configuration to streamline your business processes.\n\n**Key Features:**\n*   Automated client creation\n*   Streamlined document signing\n*   Integrated billing workflows",
  totalCost: 0, // Will be calculated
  depositPercentage: 50,
  depositAmount: 0, // Will be calculated
  totalHours: 0, // Will be calculated
  prepRate: 100,
  automationRate: 125,
  prepDiscount: 0,
  automationDiscount: 0,
  prepHours: 0, // Will be calculated from setups
  automationHours: 0, // Will be calculated from automations
  prepDiscountNote: "",
  automationDiscountNote: "",
  softwareRequirements: [
    {
      id: "1",
      name: "Copilot",
      planType: "Professional",
      estimatedCost: 189,
      purchased: false,
    },
  ],
  credentialRequirements: [
    {
      id: "1",
      name: "Copilot Admin Access",
      description:
        "Full administrative access to configure automations, forms, and client management.",
      hasAccess: false,
    },
  ],
  setups: [
    {
      id: "1",
      title: "Client Tags and Types",
      hours: 0.5,
      description: "Setup client categorization system.",
      workflow:
        "1. Review existing client types\n2. Create tag categories in Copilot\n3. Configure tag hierarchy\n4. Test tag assignment",
      requirements: "Full list of required tags and tag types.",
    },
  ],
  automations: [
    {
      id: "1",
      title: "NDA Signed → Create Client",
      buildHours: 0.5,
      testingHours: 0.5,
      cleanupHours: 0.25,
      description: "Automatically create client when NDA is signed.",
      workflow:
        "1. NDA Signed in SignNow\n2. Webhook triggers automation\n3. Extract client data from NDA\n4. Find Custom Field Option in Copilot\n5. Create Client in Copilot with appropriate tags",
      requirements: "Which field in the NDA designates the tag type for client creation?",
      suggestions: "Designate a field in the NDA that maps to existing client tags.",
    },
  ],
  excludedItems: [
    {
      id: "1",
      title: "Client Created → Send Welcome Message (tag-based)",
      notes:
        "This would require additional tag-based logic and complexity.\n\n*   Consider for V2\n*   Requires custom email templates",
    },
  ],
  futureEnhancements: [
    {
      id: "1",
      title: "Task templates creation",
      notes:
        "Create reusable task templates for common project types to streamline project setup.\n\n**Benefits:**\n*   Faster project initiation\n*   Reduced manual errors",
    },
  ],
}

export default function SOWTemplate() {
  const [data, setData] = useState<ProjectData>(defaultData)
  const [isEditing, setIsEditing] = useState(false)

  // Helper function to convert Markdown to HTML
  const markdownToHtml = (markdown: string) => {
    return remark().use(html).processSync(markdown).toString()
  }

  // Calculated values (derived from data state, used in useEffect)
  const currentTotalAutomationHours = data.automations.reduce(
    (sum, auto) => sum + auto.buildHours + auto.testingHours + auto.cleanupHours,
    0,
  )
  const currentTotalSetupHours = data.setups.reduce((sum, setup) => sum + setup.hours, 0)

  const discountedPrepRate = data.prepRate * (1 - data.prepDiscount / 100)
  const discountedAutomationRate = data.automationRate * (1 - data.automationDiscount / 100)

  // Use useEffect to update totalCost, depositAmount, totalHours, prepHours, automationHours
  useEffect(() => {
    // Calculate prepHours and automationHours based on individual items
    const newPrepHours = currentTotalSetupHours
    const newAutomationHours = currentTotalAutomationHours

    const newTotalCost = Number.parseFloat(
      (newPrepHours * discountedPrepRate + newAutomationHours * discountedAutomationRate).toFixed(2),
    )
    const newTotalHours = Number.parseFloat((newPrepHours + newAutomationHours).toFixed(2))
    const newDepositAmount = Number.parseFloat((newTotalCost * (data.depositPercentage / 100)).toFixed(2))

    setData((prev) => ({
      ...prev,
      prepHours: newPrepHours, // Update prepHours based on sum of setups
      automationHours: newAutomationHours, // Update automationHours based on sum of automations
      totalCost: newTotalCost,
      totalHours: newTotalHours,
      depositAmount: newDepositAmount,
    }))
  }, [
    currentTotalSetupHours, // Dependency for prepHours
    currentTotalAutomationHours, // Dependency for automationHours
    data.prepRate,
    data.automationRate,
    data.prepDiscount,
    data.automationDiscount,
    data.depositPercentage,
    discountedPrepRate, // Add these as dependencies since they are used in calculation
    discountedAutomationRate, // Add these as dependencies since they are used in calculation
  ])

  const totalSoftwareCost = data.softwareRequirements.reduce((sum, software) => sum + software.estimatedCost, 0)

  // Helper functions for managing nested state
  const addAutomation = () => {
    const newAutomation: AutomationItem = {
      id: Date.now().toString(),
      title: "New Automation",
      buildHours: 1,
      testingHours: 1,
      cleanupHours: 0.5,
      description: "Description of the automation.",
      workflow: "1. Step one\n2. Step two\n3. Step three",
      requirements: "Requirements needed.",
      suggestions: "Suggestions for improvement.",
    }
    setData((prev) => ({
      ...prev,
      automations: [...prev.automations, newAutomation],
    }))
  }

  const removeAutomation = (id: string) => {
    setData((prev) => ({
      ...prev,
      automations: prev.automations.filter((auto) => auto.id !== id),
    }))
  }

  const updateAutomation = (id: string, field: keyof AutomationItem, value: any) => {
    setData((prev) => ({
      ...prev,
      automations: prev.automations.map((auto) => (auto.id === id ? { ...auto, [field]: value } : auto)),
    }))
  }

  const addSetup = () => {
    const newSetup: SetupItem = {
      id: Date.now().toString(),
      title: "New Setup",
      hours: 1,
      description: "Setup description.",
      workflow: "1. Step one\n2. Step two\n3. Step three",
      requirements: "Requirements needed.",
    }
    setData((prev) => ({
      ...prev,
      setups: [...prev.setups, newSetup],
    }))
  }

  const removeSetup = (id: string) => {
    setData((prev) => ({
      ...prev,
      setups: prev.setups.filter((setup) => setup.id !== id),
    }))
  }

  const updateSetup = (id: string, field: keyof SetupItem, value: any) => {
    setData((prev) => ({
      ...prev,
      setups: prev.setups.map((setup) => (setup.id === id ? { ...setup, [field]: value } : setup)),
    }))
  }

  const generateHTML = () => {
    const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.title}</title>
    <style>
        @page { size: A4; margin: 0.5in; }
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; background: white; }
        .header { text-align: center; margin-bottom: 30px; border-bottom: 3px solid #065d3b; padding-bottom: 20px; }
        .header h1 { color: #065d3b; font-size: 28px; margin: 0; font-weight: 600; }
        .header p { color: #666; font-size: 16px; margin: 5px 0 0 0; }
        .summary-box { background: #f8f9fa; border-left: 4px solid #065d3b; padding: 20px; margin: 20px 0; border-radius: 4px; }
        .summary-box h2 { color: #065d3b; margin-top: 0; font-size: 22px; }
        .cost-highlight { background: #f0fdf4; border: 1px solid #065d3b; padding: 15px; border-radius: 6px; margin: 15px 0; text-align: center; }
        .cost-highlight .total { font-size: 24px; font-weight: bold; color: #065d3b; }
        .cost-highlight .deposit { font-size: 18px; color: #666; margin-top: 5px; }
        .section { margin-bottom: 30px; page-break-inside: avoid; }
        .section h2 { color: #065d3b; font-size: 20px; margin-bottom: 15px; border-bottom: 2px solid #e0e0e0; padding-bottom: 8px; }
        .section h3 { color: #444; font-size: 16px; margin-bottom: 10px; font-weight: 600; }
        .automation-item { background: #fafafa; border: 1px solid #e0e0e0; border-radius: 6px; padding: 15px; margin: 15px 0; }
        .automation-item h4 { color: #065d3b; margin: 0 0 10px 0; font-size: 16px; }
        .time-breakdown { display: flex; justify-content: space-between; background: #f0f0f0; padding: 8px 12px; border-radius: 4px; margin: 8px 0; font-size: 14px; }
        .workflow-steps { background: #e8f4f8; border: 1px solid #b3d9e6; padding: 10px; border-radius: 4px; margin: 10px 0; }
        .workflow-steps ol { margin: 5px 0; padding-left: 20px; }
        .workflow-steps li { margin: 3px 0; font-size: 14px; }
        .need-to-have { background: #fff3cd; border: 1px solid #ffeaa7; padding: 10px; border-radius: 4px; margin: 10px 0; }
        .suggestions { background: #d1ecf1; border: 1px solid #bee5eb; padding: 10px; border-radius: 4px; margin: 10px 0; }
        .rate-table { width: 100%; border-collapse: collapse; margin: 15px 0; }
        .rate-table th, .rate-table td { border: 1px solid #ddd; padding: 12px; text-align: left; }
        .rate-table th { background: #065d3b; color: white; font-weight: 600; }
        .rate-table tr:nth-child(even) { background: #f8f9fa; }
        .discount-note { font-style: italic; color: #666; font-size: 12px; }
        .requirements-table { width: 100%; border-collapse: collapse; margin: 10px 0; }
        .requirements-table th, .requirements-table td { border: 1px solid #ddd; padding: 8px; text-align: left; font-size: 14px; }
        .requirements-table th { background: #f0f0f0; font-weight: 600; }
        .excluded-items { background: #f8f9fa; border: 1px solid #e0e0e0; padding: 15px; border-radius: 6px; margin: 15px 0; }
        .footer { border-top: 2px solid #e0e0e0; padding-top: 20px; margin-top: 40px; text-align: center; color: #666; font-size: 14px; }
        .status-badge { display: inline-block; padding: 3px 8px; border-radius: 12px; font-size: 12px; font-weight: bold; margin-left: 8px; }
        .status-purchased { background-color: #d4edda; color: #155724; }
        .status-not-purchased { background-color: #f8d7da; color: #721c24; }
        .status-has-access { background-color: #d4edda; color: #155724; }
        .status-needs-access { background-color: #fff3cd; color: #856404; }
        /* Basic Markdown styling for generated HTML */
        .markdown-content p { margin-bottom: 1em; }
        .markdown-content ul, .markdown-content ol { margin-left: 20px; margin-bottom: 1em; }
        .markdown-content li { margin-bottom: 0.5em; }
        .markdown-content strong { font-weight: bold; }
        .markdown-content em { font-style: italic; }
        .markdown-content h1, .markdown-content h2, .markdown-content h3, .markdown-content h4, .markdown-content h5, .markdown-content h6 { margin-top: 1em; margin-bottom: 0.5em; font-weight: bold; }
        @media print { body { print-color-adjust: exact; } .page-break { page-break-before: always; } }
    </style>
</head>
<body>
    <div class="header">
        <h1>${data.title}</h1>
        <p>${data.subtitle}</p>
        <p>Company: ${data.company}</p>
    </div>
    
    <div class="summary-box">
        <h2>Project Overview</h2>
        <div class="markdown-content">${markdownToHtml(data.overview)}</div>
    </div>
    
    <div class="section">
        <h2>Requirements</h2>
        
        <h3>Software Requirements</h3>
        <table class="requirements-table">
            <tr>
                <th>Software</th>
                <th>Plan Type</th>
                <th>Estimated Monthly Cost</th>
                <th>Status</th>
            </tr>
            ${data.softwareRequirements
              .map(
                (software) => `
            <tr>
                <td>${software.name}</td>
                <td>${software.planType}</td>
                <td>$${software.estimatedCost.toFixed(2)}</td>
                <td><span class="status-badge ${
                  software.purchased ? "status-purchased" : "status-not-purchased"
                }">${software.purchased ? "Purchased" : "Not Purchased"}</span></td>
            </tr>
            `,
              )
              .join("")}
            <tr style="background: #f0f0f0; font-weight: bold;">
                <td colspan="3">Total Monthly Software Cost</td>
                <td>$${totalSoftwareCost.toFixed(2)}</td>
            </tr>
        </table>
        
        <h3>Credential Requirements</h3>
        ${data.credentialRequirements
          .map(
            (credential) => `
        <div class="automation-item">
            <h4>${credential.name} <span class="status-badge ${
              credential.hasAccess ? "status-has-access" : "status-needs-access"
            }">${credential.hasAccess ? "Has Access" : "Needs Access"}</span></h4>
            <div class="markdown-content">${markdownToHtml(credential.description)}</div>
        </div>
        `,
          )
          .join("")}
    </div>
    
    <div class="section">
        <h2>Workspace Setup</h2>
        ${data.setups
          .map(
            (setup) => `
        <div class="automation-item">
            <h4>Setup: ${setup.title}</h4>
            <div class="time-breakdown"><span>Time:</span><span>${setup.hours} hours</span></div>
            <div class="markdown-content">${markdownToHtml(setup.description)}</div>
            ${
              setup.workflow
                ? `<div class="workflow-steps"><strong>Workflow:</strong><div class="markdown-content">${markdownToHtml(setup.workflow)}</div></div>`
                : ""
            }
            ${setup.requirements ? `<div class="need-to-have"><strong>Required:</strong> <div class="markdown-content">${markdownToHtml(setup.requirements)}</div></div>` : ""}
        </div>`,
          )
          .join("")}
    </div>
    
    <div class="section">
        <h2>Core Automations</h2>
        ${data.automations
          .map(
            (auto, index) => `
        <div class="automation-item">
            <h4>Automation #${index + 1}: ${auto.title}</h4>
            <div class="time-breakdown">
                <span>Build: ${auto.buildHours} hrs | Testing: ${auto.testingHours} hrs | Cleanup: ${auto.cleanupHours} hrs</span>
                <span>Total: ${auto.buildHours + auto.testingHours + auto.cleanupHours} hrs</span>
            </div>
            <div class="markdown-content">${markdownToHtml(auto.description)}</div>
            ${
              auto.workflow
                ? `<div class="workflow-steps"><strong>Workflow:</strong><div class="markdown-content">${markdownToHtml(auto.workflow)}</div></div>`
                : ""
            }
            ${auto.requirements ? `<div class="need-to-have"><strong>Required:</strong> <div class="markdown-content">${markdownToHtml(auto.requirements)}</div></div>` : ""}
            ${auto.suggestions ? `<div class="suggestions"><strong>Suggestion:</strong> <div class="markdown-content">${markdownToHtml(auto.suggestions)}</div></div>` : ""}
        </div>`,
          )
          .join("")}
    </div>
    
    <div class="section">
        <h2>Future Enhancements</h2>
        <div class="excluded-items">
            <h4>Additional Features (Not Included in MVP)</h4>
            ${data.excludedItems
              .map(
                (item) => `
            <div style="margin-bottom: 15px; padding: 10px; border-left: 3px solid #ccc;">
                <h5 style="margin: 0 0 5px 0; font-weight: 600;">${item.title}</h5>
                ${item.notes ? `<p style="margin: 5px 0; font-size: 14px; color: #666;"><div class="markdown-content"><strong>Notes:</strong> ${markdownToHtml(item.notes)}</div></p>` : ""}
            </div>
        `,
              )
              .join("")}
        </div>
        <div class="excluded-items">
            <h4>Workspace Enhancements (Not Included in MVP)</h4>
            ${data.futureEnhancements
              .map(
                (item) => `
            <div style="margin-bottom: 15px; padding: 10px; border-left: 3px solid #ccc;">
                <h5 style="margin: 0 0 5px 0; font-weight: 600;">${item.title}</h5>
                ${item.notes ? `<p style="margin: 5px 0; font-size: 14px; color: #666;"><div class="markdown-content"><strong>Notes:</strong> ${markdownToHtml(item.notes)}</div></p>` : ""}
            </div>
        `,
              )
              .join("")}
        </div>
    </div>
    
    <div class="section">
        <h2>Pricing Structure</h2>
        <table class="rate-table">
            <tr>
                <th>Service Type</th>
                <th>Full Rate</th>
                <th>Discount</th>
                <th>Final Rate</th>
                <th>Hours</th>
                <th>Cost</th>
            </tr>
            <tr>
                <td>
                    Preparation & Workspace Setup
                    ${data.prepDiscountNote ? `<br><span class="discount-note">${data.prepDiscountNote}</span>` : ""}
                </td>
                <td>$${data.prepRate.toFixed(2)}/hr</td>
                <td>${data.prepDiscount > 0 ? `${data.prepDiscount}%` : "None"}</td>
                <td>$${discountedPrepRate.toFixed(2)}/hr</td>
                <td>${data.prepHours.toFixed(2)}</td>
                <td>$${(data.prepHours * discountedPrepRate).toFixed(2)}</td>
            </tr>
            <tr>
                <td>
                    Automation Configuration
                    ${data.automationDiscountNote ? `<br><span class="discount-note">${data.automationDiscountNote}</span>` : ""}
                </td>
                <td>$${data.automationRate.toFixed(2)}/hr</td>
                <td>${data.automationDiscount > 0 ? `${data.automationDiscount}%` : "None"}</td>
                <td>$${discountedAutomationRate.toFixed(2)}/hr</td>
                <td>${data.automationHours.toFixed(2)}</td>
                <td>$${(data.automationHours * discountedAutomationRate).toFixed(2)}</td>
            </tr>
            <tr style="background: #f0fdf4; font-weight: bold;">
                <td colspan="5">Total Project Cost</td>
                <td>$${data.totalCost.toFixed(2)}</td>
            </tr>
        </table>
        
        <div class="cost-highlight">
            <div class="total">Total Investment: $${data.totalCost.toFixed(2)}</div>
            <div class="deposit">${data.depositPercentage}% Deposit: $${data.depositAmount.toFixed(2)}</div>
            <div style="margin-top: 10px; font-size: 14px; color: #666;">
                Estimated completion: ${data.totalHours.toFixed(2)} hours
            </div>
        </div>
    </div>
    
    <div class="footer">
        <p>This document, created on ${currentDate} is an estimate and not legally binding. </p>
        <p>This proposal represents the minimum viable product (MVP) implementation. Additional complexity or requirements may increase final project cost based on actual hours required.</p>
        <p>View our full terms and conditions <a style=\"text-decoration: underline;\" href=\"https://nortonapplications.com/terms\">here</a>.</p>
    </div>
</body>
</html>`

    const blob = new Blob([htmlContent], { type: "text/html" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${data.title.replace(/\s+/g, "-").toLowerCase()}.html`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  if (!isEditing) {
    return (
      <PreviewInterface
        data={data}
        totalSoftwareCost={totalSoftwareCost}
        discountedPrepRate={discountedPrepRate}
        discountedAutomationRate={discountedAutomationRate}
        setIsEditing={setIsEditing}
        generateHTML={generateHTML}
      />
    )
  }

  return (
    <EditInterface
      data={data}
      setData={setData}
      totalSoftwareCost={totalSoftwareCost}
      totalSetupHours={currentTotalSetupHours}
      totalAutomationHours={currentTotalAutomationHours}
      discountedPrepRate={discountedPrepRate}
      discountedAutomationRate={discountedAutomationRate}
      addAutomation={addAutomation}
      removeAutomation={removeAutomation}
      updateAutomation={updateAutomation}
      addSetup={addSetup}
      removeSetup={removeSetup}
      updateSetup={updateSetup}
      setIsEditing={setIsEditing}
      generateHTML={generateHTML}
    />
  )
}
