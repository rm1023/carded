'use client'
//Test
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChevronLeft, ChevronRight, CreditCard, Gift, DollarSign, Plane, Hotel, Shield, Info, CreditCard as CardIcon } from 'lucide-react'

import CurrentCardsStep from './components/CurrentCardsStep'
import RewardsStep from './components/RewardsStep'
import SpendingStep from './components/SpendingStep'
import TravelStep from './components/TravelStep'
import LoyaltyStep from './components/LoyaltyStep'
import BenefitsStep from './components/BenefitsStep'
import OtherStep from './components/OtherStep'

type FormData = {
  currentCards: string[];
  rewardsPreferences: {
    redeemPreference: string;
    earningEffort: number;
    spendingEffort: number;
  };
  spendingHabits: Record<string, { amount: number; isMonthly: boolean }>;
  travelInfo: {
    roundTrips: number;
    homeAirport: string;
    daysAbroad: number;
  };
  loyaltyPrograms: {
    airlines: string[];
    hotels: string[];
  };
  desiredBenefits: string[];
  additionalInfo: {
    creditScore: string;
    interestedInBusinessCards: boolean;
  };
};

export default function CreditCardForm() {
  const [step, setStep] = useState(1)
  const totalSteps = 7
  const [formData, setFormData] = useState<FormData>({
    currentCards: [],
    rewardsPreferences: {
      redeemPreference: 'cash-back',
      earningEffort: 50,
      spendingEffort: 50
    },
    spendingHabits: {},
    travelInfo: {
      roundTrips: 0,
      homeAirport: '',
      daysAbroad: 0
    },
    loyaltyPrograms: {
      airlines: [],
      hotels: []
    },
    desiredBenefits: [],
    additionalInfo: {
      creditScore: '',
      interestedInBusinessCards: false
    }
  })

  const nextStep = () => setStep(prev => Math.min(prev + 1, totalSteps))
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1))

  const updateFormData = (section: keyof FormData, data: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: Array.isArray(prev[section])
        ? data
        : { ...prev[section], ...data }
    }))
  }

  const getStepDescription = (step: number) => {
    switch (step) {
      case 1: return "Current Cards"
      case 2: return "Rewards Preferences"
      case 3: return "Spending Habits"
      case 4: return "Travel Information"
      case 5: return "Loyalty Programs"
      case 6: return "Desired Benefits"
      case 7: return "Additional Information"
      default: return ""
    }
  }

  const getStepIcon = (step: number) => {
    switch (step) {
      case 1: return <CreditCard className="h-6 w-6" />
      case 2: return <Gift className="h-6 w-6" />
      case 3: return <DollarSign className="h-6 w-6" />
      case 4: return <Plane className="h-6 w-6" />
      case 5: return <Hotel className="h-6 w-6" />
      case 6: return <Shield className="h-6 w-6" />
      case 7: return <Info className="h-6 w-6" />
      default: return null
    }
  }

  const renderStepContent = (step: number) => {
    switch (step) {
      case 1: return <CurrentCardsStep formData={formData} updateFormData={updateFormData} />
      case 2: return <RewardsStep formData={formData} updateFormData={updateFormData} />
      case 3: return <SpendingStep formData={formData} updateFormData={updateFormData} />
      case 4: return <TravelStep formData={formData} updateFormData={updateFormData} />
      case 5: return <LoyaltyStep formData={formData} updateFormData={updateFormData} />
      case 6: return <BenefitsStep formData={formData} updateFormData={updateFormData} />
      case 7: return <OtherStep formData={formData} updateFormData={updateFormData} />
      default: return null
    }
  }

  return (
    <div className="container mx-auto p-4">
      <header className="text-center mb-8">
        <div className="inline-flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500 rounded-full p-2 mb-4">
          <CardIcon className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 mb-2">
          Carded
        </h1>
        <p className="text-xl text-gray-600">
          Discover Your Optimal Credit Card Portfolio
        </p>
      </header>
      
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
        <div className="bg-blue-600 h-2.5 rounded-full" style={{width: `${(step / totalSteps) * 100}%`}}></div>
      </div>

      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader className="flex flex-row items-center space-x-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-t-lg">
          {getStepIcon(step)}
          <CardTitle>{getStepDescription(step)}</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px] pr-4">
            {renderStepContent(step)}
          </ScrollArea>
        </CardContent>
        <CardFooter className="flex justify-between">
          {step > 1 && (
            <Button onClick={prevStep} variant="outline">
              <ChevronLeft className="mr-2 h-4 w-4" /> Previous
            </Button>
          )}
          <Button onClick={nextStep} className={step === 1 ? "ml-auto" : ""}>
            {step === totalSteps ? 'Submit' : 'Next'} <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}