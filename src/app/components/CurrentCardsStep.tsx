import React from 'react'
import { Label } from "@/components/ui/label"
import MultiSelect from './MultiSelect'
import { FormData } from '../../types'

type CurrentCardsStepProps = {
  formData: FormData;
  updateFormData: (section: keyof FormData, data: any) => void;
};

export default function CurrentCardsStep({ formData, updateFormData }: CurrentCardsStepProps) {
  const cardOptions = [
    "American Express® Gold Card", 
    "The Platinum Card® from American Express", 
    "Blue Cash Preferred® Card from American Express", 
    "Blue Cash Everyday® Card from American Express", 
    "American Express® Green Card", 
    "Amex EveryDay® Credit Card", 
    "Amex EveryDay® Preferred Credit Card", 
    "American Express® Business Gold Card", 
    "The Business Platinum Card® from American Express", 
    "Blue Business® Plus Credit Card from American Express", 
    "Blue Business Cash™ Card from American Express",
    
    "Bank of America® Customized Cash Rewards credit card", 
    "Bank of America® Travel Rewards credit card", 
    "Bank of America® Premium Rewards® credit card", 
    "BankAmericard® credit card", 
    "Bank of America® Unlimited Cash Rewards credit card", 
    "Bank of America® Business Advantage Customized Cash Rewards Mastercard®", 
    "Bank of America® Business Advantage Travel Rewards World Mastercard®", 
    "Bank of America® Platinum Plus® Mastercard® Business card",
    
    "Barclays View™ Mastercard®", 
    "AAdvantage® Aviator® Red World Elite Mastercard®", 
    "JetBlue Plus Card", 
    "Wyndham Rewards® Earner℠ Card", 
    "Hawaiian Airlines® World Elite Mastercard®", 
    "Frontier Airlines World Mastercard®", 
    "Carnival World Mastercard®",
    
    "Capital One Venture Rewards Credit Card", 
    "Capital One VentureOne Rewards Credit Card", 
    "Capital One Quicksilver Cash Rewards Credit Card", 
    "Capital One QuicksilverOne Cash Rewards Credit Card", 
    "Capital One Savor Cash Rewards Credit Card", 
    "Capital One SavorOne Cash Rewards Credit Card", 
    "Capital One Platinum Credit Card", 
    "Capital One Spark Cash for Business", 
    "Capital One Spark Miles for Business", 
    "Capital One Spark Classic for Business",
    
    "Chase Sapphire Preferred® Card", 
    "Chase Sapphire Reserve®", 
    "Chase Freedom Unlimited®", 
    "Chase Freedom Flex℠", 
    "Chase Slate Edge℠", 
    "Ink Business Preferred® Credit Card", 
    "Ink Business Unlimited® Credit Card", 
    "Ink Business Cash® Credit Card", 
    "United℠ Explorer Card", 
    "Southwest Rapid Rewards® Plus Credit Card", 
    "Marriott Bonvoy Boundless® Credit Card", 
    "World of Hyatt Credit Card", 
    "IHG® Rewards Club Premier Credit Card",
    
    "Citi® Double Cash Card", 
    "Citi Rewards+® Card", 
    "Citi® Diamond Preferred® Card", 
    "Citi Simplicity® Card", 
    "Citi Premier® Card", 
    "Citi® / AAdvantage® Platinum Select® World Elite™ Mastercard®", 
    "Costco Anywhere Visa® Card by Citi", 
    "CitiBusiness® / AAdvantage® Platinum Select® Mastercard®",
    
    "Discover it® Cash Back", 
    "Discover it® Chrome", 
    "Discover it® Miles", 
    "Discover it® Student Cash Back", 
    "Discover it® Student Chrome", 
    "Discover it® Secured Credit Card", 
    "Discover it® Business Card",
    
    "U.S. Bank Visa® Platinum Card", 
    "U.S. Bank Cash+® Visa Signature® Card", 
    "U.S. Bank Altitude® Go Visa Signature® Card", 
    "U.S. Bank Altitude® Reserve Visa Infinite® Card", 
    "U.S. Bank FlexPerks® Gold American Express® Card", 
    "U.S. Bank Business Cash Rewards World Elite™ Mastercard®", 
    "U.S. Bank Business Leverage® Visa Signature® Card",
    
    "Wells Fargo Active Cash® Card", 
    "Wells Fargo Reflect® Card", 
    "Wells Fargo Autograph℠ Card", 
    "Wells Fargo Business Platinum Credit Card", 
    "Wells Fargo Business Elite Signature Card"
  ]
  

  const handleSelect = (item: string) => {
    updateFormData('currentCards', [...(formData.currentCards || []), item])
  }

  const handleRemove = (item: string) => {
    updateFormData('currentCards', (formData.currentCards || []).filter(i => i !== item))
  }

  return (
    <div className="space-y-6 p-4">
      <div className="p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold text-blue-800 mb-2">Why this matters</h3>
        <p className="text-sm text-blue-600">Knowing your current cards helps us recommend new cards that complement your existing portfolio.</p>
      </div>
      <div className="space-y-4">
        <Label className="text-base font-medium">What cards do you currently have?</Label>
        <MultiSelect
          options={cardOptions}
          placeholder="Search and select your current cards"
          label="Current Cards"
          selectedItems={formData.currentCards || []}
          onSelect={handleSelect}
          onRemove={handleRemove}
        />
      </div>
    </div>
  )
}