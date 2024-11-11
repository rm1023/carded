import React, { useEffect } from 'react'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

type SpendingStepProps = {
  formData: {
    spendingHabits: Record<string, { amount: number; isMonthly: boolean }>;
  };
  updateFormData: (section: string, data: any) => void;
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

  useEffect(() => {
    if (Object.keys(formData.spendingHabits).length === 0) {
      const initialSpendingHabits = categories.reduce((acc, category) => ({
        ...acc,
        [category]: { amount: 0, isMonthly: true }
      }), {})
      updateFormData('spendingHabits', initialSpendingHabits)
    }
  }, [])

  const handleAmountChange = (category: string, amount: string) => {
    updateFormData('spendingHabits', {
      ...formData.spendingHabits,
      [category]: { ...formData.spendingHabits[category], amount: parseInt(amount) || 0 }
    })
  }

  const handleToggle = (category: string) => {
    updateFormData('spendingHabits', {
      ...formData.spendingHabits,
      [category]: { ...formData.spendingHabits[category], isMonthly: !formData.spendingHabits[category].isMonthly }
    })
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
              pattern="[0-9]*"
              value={formData.spendingHabits[category]?.amount.toLocaleString('en-US') || ''}
              onChange={(e) => handleAmountChange(category, e.target.value.replace(/,/g, ''))}
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
            <div className="text-2xl font-bold">${calculateTotalSpend().monthly.toLocaleString('en-US', { maximumFractionDigits: 2 })}</div>
          </div>
          <div className="w-1/2 text-right">
            <Label className="text-lg font-semibold">Total Annual Spend:</Label>
            <div className="text-2xl font-bold">${calculateTotalSpend().annual.toLocaleString('en-US', { maximumFractionDigits: 2 })}</div>
          </div>
        </div>
      </div>
    </div>
  )
}