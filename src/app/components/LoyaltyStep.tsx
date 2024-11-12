import React from 'react'
import MultiSelect from './MultiSelect'
import { FormData } from '../../types'

type LoyaltyStepProps = {
  formData: FormData;
  updateFormData: (section: keyof FormData, data: any) => void;
};

export default function LoyaltyStep({ formData, updateFormData }: LoyaltyStepProps) {
  const airlineOptions = [
    "Delta Air Lines",
    "United Airlines",
    "American Airlines",
    "Southwest Airlines",
    "Alaska Airlines",
    "JetBlue Airways",
    "Spirit Airlines",
    "Frontier Airlines",
  ]

  const hotelOptions = [
    "Marriott Bonvoy",
    "Hilton Honors",
    "World of Hyatt",
    "IHG One Rewards",
    "Wyndham Rewards",
    "Choice Privileges",
    "Accor Live Limitless",
    "Best Western Rewards",
  ]

  const handleSelect = (type: 'airlines' | 'hotels', item: string) => {
    updateFormData('loyaltyPrograms', {
      ...formData.loyaltyPrograms,
      [type]: [...(formData.loyaltyPrograms[type] || []), item]
    })
  }

  const handleRemove = (type: 'airlines' | 'hotels', item: string) => {
    updateFormData('loyaltyPrograms', {
      ...formData.loyaltyPrograms,
      [type]: (formData.loyaltyPrograms[type] || []).filter(i => i !== item)
    })
  }

  return (
    <div className="space-y-6 p-4">
      <div className="p-4 bg-indigo-50 rounded-lg">
        <h3 className="font-semibold text-indigo-800 mb-2">Leverage Your Loyalty</h3>
        <p className="text-sm text-indigo-600">Your preferred airlines and hotels help us suggest cards that can boost your existing loyalty benefits.</p>
      </div>
      <div className="space-y-6">
      <MultiSelect
        options={airlineOptions}
        placeholder="Search and select airlines"
        label="Are there any airlines that you plan to use heavily or want to maintain status on?"
        selectedItems={formData.loyaltyPrograms.airlines || []}
        onSelect={(item) => handleSelect('airlines', item)}
        onRemove={(item) => handleRemove('airlines', item)}
      />
      <MultiSelect
        options={hotelOptions}
        placeholder="Search and select hotel chains"
        label="Are there any hotel chains that you plan to use heavily or want to maintain status on?"
        selectedItems={formData.loyaltyPrograms.hotels || []}
        onSelect={(item) => handleSelect('hotels', item)}
        onRemove={(item) => handleRemove('hotels', item)}
      />
      </div>
    </div>
  )
}