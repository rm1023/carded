import React from 'react'
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { FormData } from '../../types'

type BenefitsStepProps = {
  formData: FormData;
  updateFormData: (section: keyof FormData, data: any) => void;
};

export default function BenefitsStep({ formData, updateFormData }: BenefitsStepProps) {
  const benefits = [
    { 
      category: "Travel", 
      items: [
        "TSA Precheck / Global Entry",
        "CLEAR Credit",
        "Airline Credit",
        "Hotel Credit",
        "Priority Boarding",
        "Free Checked Bag",
        "Lounge Access",
        "Complimentary In-Flight Wi-Fi",
        "Travel Insurance",
        "Trip Delay Reimbursement",
        "Rental Car Insurance",
        "Lost Luggage Reimbursement"
      ] 
    },
    { 
      category: "Dining & Entertainment", 
      items: [
        "Dining Credits",
        "Exclusive Restaurant Access",
        "Discounts at Select Restaurants",
        "Streaming Service Credits",
        "Access to Concert and Event Presales",
        "Dining Rewards (e.g., extra points on dining)"
      ] 
    },
    { 
      category: "Shopping & Retail", 
      items: [
        "Extended Warranty Protection",
        "Purchase Protection",
        "Return Protection",
        "Discounts at Partner Retailers",
        "ShopRunner Membership",
        "Cell Phone Protection"
      ] 
    },
    { 
      category: "Rewards & Cash Back", 
      items: [
        "Cash Back on Purchases",
        "Bonus Points on Select Categories",
        "Rotating Cash Back Categories",
        "Rewards Multipliers for Certain Spending",
        "Redemption for Gift Cards",
        "Statement Credits for Purchases"
      ] 
    },
    { 
      category: "Insurance & Protection", 
      items: [
        "Purchase Protection",
        "Return Protection",
        "Cell Phone Protection",
        "Auto Rental Collision Damage Waiver",
        "Trip Cancellation/Interruption Insurance",
        "Lost or Stolen Item Replacement",
        "Travel Accident Insurance"
      ] 
    },
    { 
      category: "Financial & Account Benefits", 
      items: [
        "No Foreign Transaction Fees",
        "Low Introductory APR",
        "Balance Transfer Offers",
        "Zero Liability Protection",
        "Credit Score Monitoring",
        "Fraud Alerts and Protections",
        "Interest-Free Financing Options"
      ] 
    },
    { 
      category: "Luxury & Lifestyle", 
      items: [
        "Concierge Service",
        "Access to Exclusive Experiences",
        "Personal Assistant Service",
        "Private Event Invitations",
        "Access to Members-Only Clubs"
      ] 
    }
  ]  

  const handleBenefitToggle = (benefit: string) => {
    const updatedBenefits = formData.desiredBenefits.includes(benefit)
      ? formData.desiredBenefits.filter(b => b !== benefit)
      : [...formData.desiredBenefits, benefit]
    updateFormData('desiredBenefits', updatedBenefits)
  }

  return (
    <div className="space-y-6 p-4">
      <div className="p-4 bg-orange-50 rounded-lg">
        <h3 className="font-semibold text-orange-800 mb-2">Prioritize Your Perks</h3>
        <p className="text-sm text-orange-600">Selecting your most valued benefits helps us recommend cards that offer the features you'll use most.</p>
      </div>
      <Label>Select up to 5 benefits that are particularly important to you:</Label>
      {benefits.map((benefit) => (
        <div key={benefit.category} className="mt-4">
          <h3 className="font-semibold mb-2">{benefit.category}</h3>
          {benefit.items.map((item) => (
            <div key={item} className="flex items-center space-x-2 mb-2">
              <Checkbox
                id={item}
                checked={formData.desiredBenefits.includes(item)}
                onCheckedChange={() => handleBenefitToggle(item)}
              />
              <Label htmlFor={item}>{item}</Label>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}