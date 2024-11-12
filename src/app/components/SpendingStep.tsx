import React, { useEffect, useState } from 'react'
import { FormData } from '../../types'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

type SpendingStepProps = {
  formData: FormData;
  updateFormData: (section: keyof FormData, data: any) => void;
};

function ToggleButton({ isMonthly, onChange }: { isMonthly: boolean; onChange: () => void }) {
  return (
    <div className="flex items-center space-x-2 bg-gray-100 p-1 rounded-md">
      <button
        className={`px-3 py-1 rounded-md transition-colors ${
          isMonthly ? 'bg-white shadow-sm' : 'text-gray-500'
        }`}
        onClick={() => onChange()}
      >
        Monthly
      </button>
      <button
        className={`px-3 py-1 rounded-md transition-colors ${
          !isMonthly ? 'bg-white shadow-sm' : 'text-gray-500'
        }`}
        onClick={() => onChange()}
      >
        Annual
      </button>
    </div>
  )
}

export default function SpendingStep({ formData, updateFormData }: SpendingStepProps) {
  const categories = [
    "Groceries", "Gas", "Dining", "Entertainment", "Airfare", "Hotels",
    "Other Transportation", "Other Spending"
  ]

  const [focusedField, setFocusedField] = useState<string | null>(null)

  useEffect(() => {
    if (Object.keys(formData.spendingHabits).length === 0) {
      const initialSpendingHabits = categories.reduce((acc, category) => ({
        ...acc,
        [category]: { amount: 0, isMonthly: true }
      }), {})
      updateFormData('spendingHabits', initialSpendingHabits)
    }
  }, [])

  const formatNumberWithCommas = (value: number): string => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  const parseFormattedNumber = (value: string): number => {
    return parseInt(value.replace(/,/g, ''), 10) || 0
  }

  const handleAmountChange = (category: string, value: string) => {
    const numericValue = value.replace(/[^0-9]/g, '')
    const amount = parseFormattedNumber(numericValue)
    
    updateFormData('spendingHabits', {
      ...formData.spendingHabits,
      [category]: { ...formData.spendingHabits[category], amount }
    })
  }

  const handleToggle = (category: string) => {
    updateFormData('spendingHabits', {
      ...formData.spendingHabits,
      [category]: { ...formData.spendingHabits[category], isMonthly: !formData.spendingHabits[category].isMonthly }
    })
  }

  const handleFocus = (category: string) => {
    setFocusedField(category)
  }

  const handleBlur = () => {
    setFocusedField(null)
  }

  const getDisplayValue = (category: string) => {
    const amount = formData.spendingHabits[category]?.amount || 0
    if (focusedField === category) {
      return amount > 0 ? formatNumberWithCommas(amount) : ''
    }
    return amount > 0 ? formatNumberWithCommas(amount) : '0'
  }

  const calculateTotalSpend = () => {
    let annualTotal = 0;
    let monthlyTotal = 0;
    Object.values(formData.spendingHabits).forEach(({ amount, isMonthly }) => {
      if (isMonthly) {
        monthlyTotal += amount;
        annualTotal += amount * 12;
      } else {
        annualTotal += amount;
        monthlyTotal += amount / 12;
      }
    });
    return { annual: annualTotal, monthly: monthlyTotal };
  }

  return (
    <div className="space-y-6 p-4">
      <div className="p-4 bg-green-50 rounded-lg mb-6">
        <h3 className="font-semibold text-green-800 mb-2">Tailor Your Rewards</h3>
        <p className="text-sm text-green-600">Your spending habits help us identify cards with the best reward rates for your most frequent purchases.</p>
      </div>
      <Label>What is your current credit card spend? Estimated values are fine:</Label>
      {categories.map((category) => (
        <div key={category} className="flex items-center space-x-4 mb-4">
          <Label className="w-1/3">{category}</Label>
          <div className="relative w-1/3">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
            <Input
              type="text"
              inputMode="numeric"
              value={getDisplayValue(category)}
              onChange={(e) => handleAmountChange(category, e.target.value)}
              onFocus={() => handleFocus(category)}
              onBlur={handleBlur}
              className="pl-7"
            />
          </div>
          <div className="w-1/3">
            <ToggleButton
              isMonthly={formData.spendingHabits[category]?.isMonthly}
              onChange={() => handleToggle(category)}
            />
          </div>
        </div>
      ))}
      <div className="pt-6 border-t mt-6">
        <div className="flex justify-between items-start">
          <div className="w-1/2">
            <Label className="text-lg font-semibold">Total Monthly Spend:</Label>
            <div className="text-2xl font-bold">${formatNumberWithCommas(calculateTotalSpend().monthly)}</div>
          </div>
          <div className="w-1/2 text-right">
            <Label className="text-lg font-semibold">Total Annual Spend:</Label>
            <div className="text-2xl font-bold">${formatNumberWithCommas(calculateTotalSpend().annual)}</div>
          </div>
        </div>
      </div>
    </div>
  )
}