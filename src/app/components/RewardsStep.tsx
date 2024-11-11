import React from 'react'
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"

type RewardsStepProps = {
  formData: {
    rewardsPreferences: {
      redeemPreference: string;
      earningEffort: number;
      spendingEffort: number;
    };
  };
  updateFormData: (section: string, data: any) => void;
};

export default function RewardsStep({ formData, updateFormData }: RewardsStepProps) {
  const handleRedeemPreferenceChange = (value: string) => {
    updateFormData('rewardsPreferences', { redeemPreference: value })
  }

  const handleEffortChange = (type: 'earning' | 'spending', value: number[]) => {
    updateFormData('rewardsPreferences', { [`${type}Effort`]: value[0] })
  }

  return (
    <div className="space-y-6 p-4">
      <div className="p-4 bg-purple-50 rounded-lg">
        <h3 className="font-semibold text-purple-800 mb-2">Maximize Your Rewards</h3>
        <p className="text-sm text-purple-600">Your preferences help us find cards that align with your reward goals and lifestyle.</p>
      </div>
      <div>
        <Label>How do you like to redeem your rewards?</Label>
        <RadioGroup value={formData.rewardsPreferences.redeemPreference} onValueChange={handleRedeemPreferenceChange} className="space-y-2 mt-2">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="cash-back" id="cash-back" />
            <Label htmlFor="cash-back">Cash back / statement credits</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="travel" id="travel" />
            <Label htmlFor="travel">Booking travel + experiences</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="both" id="both" />
            <Label htmlFor="both">Both</Label>
          </div>
        </RadioGroup>
      </div>
      <div>
        <Label>How much effort do you want to put into earning rewards?</Label>
        <Slider
          value={[formData.rewardsPreferences.earningEffort]}
          onValueChange={(value) => handleEffortChange('earning', value)}
          max={100}
          step={50}
          className="mt-4"
        />
        <div className="flex justify-between text-xs mt-2">
          <span>Not much</span>
          <span>Some</span>
          <span>A lot</span>
        </div>
      </div>
      <div>
        <Label>How much effort do you want to put into spending rewards?</Label>
        <Slider
          value={[formData.rewardsPreferences.spendingEffort]}
          onValueChange={(value) => handleEffortChange('spending', value)}
          max={100}
          step={50}
          className="mt-4"
        />
        <div className="flex justify-between text-xs mt-2">
          <span>Not much</span>
          <span>Some</span>
          <span>A lot</span>
        </div>
      </div>
    </div>
  )
}