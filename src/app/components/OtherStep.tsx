import React from 'react'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { FormData } from '../../types'

type OtherStepProps = {
  formData: FormData;
  updateFormData: (section: keyof FormData, data: any) => void;
};

export default function OtherStep({ formData, updateFormData }: OtherStepProps) {
  const handleCreditScoreChange = (value: string) => {
    updateFormData('additionalInfo', { creditScore: value })
  }

  const handleBusinessCardInterestChange = (value: string) => {
    updateFormData('additionalInfo', { interestedInBusinessCards: value === 'yes' })
  }

  return (
    <div className="space-y-6 p-4">
      <div className="p-4 bg-gray-100 rounded-lg">
        <h3 className="font-semibold text-gray-800 mb-2">Fine-Tune Your Recommendations</h3>
        <p className="text-sm text-gray-600">These final details help us provide the most accurate and personalized card recommendations for you.</p>
      </div>
      <div className="space-y-6">
        <div>
          <Label htmlFor="credit-score">What is your approximate credit score?</Label>
          <Input
            type="number"
            id="credit-score"
            value={formData.additionalInfo.creditScore}
            onChange={(e) => handleCreditScoreChange(e.target.value)}
            placeholder="Enter your credit score"
            className="mt-2"
          />
        </div>
        <div>
          <Label>Are you interested in business credit cards?</Label>
          <RadioGroup
            value={formData.additionalInfo.interestedInBusinessCards ? 'yes' : 'no'}
            onValueChange={handleBusinessCardInterestChange}
            className="mt-2 space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="yes-business" />
              <Label htmlFor="yes-business">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="no-business" />
              <Label htmlFor="no-business">No</Label>
            </div>
          </RadioGroup>
          <p className="text-sm text-gray-500 mt-4">
            Note: you likely qualify for a business card if you're self-employed, a freelancer, or you profit from selling goods or services.
          </p>
        </div>
      </div>
    </div>
  )
}