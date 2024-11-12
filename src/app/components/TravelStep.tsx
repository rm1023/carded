import React, { useState } from 'react'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FormData } from '../../types'

type TravelStepProps = {
  formData: FormData;
  updateFormData: (section: keyof FormData, data: any) => void;
};

export default function TravelStep({ formData, updateFormData }: TravelStepProps) {
  const [focusedField, setFocusedField] = useState<keyof FormData['travelInfo'] | null>(null)

  const formatNumberWithCommas = (value: number): string => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  const parseFormattedNumber = (value: string): number => {
    return parseInt(value.replace(/,/g, ''), 10) || 0
  }

  const handleInputChange = (field: keyof FormData['travelInfo'], value: string) => {
    if (field === 'homeAirport') {
      updateFormData('travelInfo', { ...formData.travelInfo, [field]: value })
    } else {
      const numericValue = value.replace(/[^0-9]/g, '')
      const formattedValue = formatNumberWithCommas(parseInt(numericValue, 10) || 0)
      updateFormData('travelInfo', { ...formData.travelInfo, [field]: parseFormattedNumber(formattedValue) })
    }
  }

  const getDisplayValue = (field: keyof FormData['travelInfo']) => {
    if (field === 'homeAirport') {
      return formData.travelInfo[field]
    }
    if (focusedField === field) {
      return formData.travelInfo[field] > 0 ? formatNumberWithCommas(formData.travelInfo[field] as number) : ''
    }
    return formData.travelInfo[field] > 0 ? formatNumberWithCommas(formData.travelInfo[field] as number) : '0'
  }

  return (
    <div className="space-y-6 p-4">
      <div className="p-4 bg-yellow-50 rounded-lg">
        <h3 className="font-semibold text-yellow-800 mb-2">Optimize Your Travel</h3>
        <p className="text-sm text-yellow-600">Your travel habits help us recommend cards with the best travel perks and rewards for your lifestyle.</p>
      </div>
      <div className="space-y-4">
        <div>
          <Label htmlFor="round-trips">How many round-trip flights do you take per year?</Label>
          <Input
            type="text"
            inputMode="numeric"
            id="round-trips"
            value={getDisplayValue('roundTrips')}
            onChange={(e) => handleInputChange('roundTrips', e.target.value)}
            onFocus={() => setFocusedField('roundTrips')}
            onBlur={() => setFocusedField(null)}
            className="mt-2"
          />
        </div>
        <div>
          <Label htmlFor="home-airport">Do you have a home airport?</Label>
          <Select value={formData.travelInfo.homeAirport} onValueChange={(value) => handleInputChange('homeAirport', value)}>
            <SelectTrigger id="home-airport" className="mt-2">
              <SelectValue placeholder="Select your home airport" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="abq">Albuquerque (ABQ)</SelectItem>
              <SelectItem value="atl">Atlanta (ATL)</SelectItem>
              <SelectItem value="aus">Austin (AUS)</SelectItem>
              <SelectItem value="bwi">Baltimore/Washington (BWI)</SelectItem>
              <SelectItem value="bos">Boston (BOS)</SelectItem>
              <SelectItem value="buf">Buffalo (BUF)</SelectItem>
              <SelectItem value="clt">Charlotte (CLT)</SelectItem>
              <SelectItem value="ord">Chicago O'Hare (ORD)</SelectItem>
              <SelectItem value="mdw">Chicago Midway (MDW)</SelectItem>
              <SelectItem value="cvg">Cincinnati/Northern Kentucky (CVG)</SelectItem>
              <SelectItem value="cle">Cleveland (CLE)</SelectItem>
              <SelectItem value="cmh">Columbus (CMH)</SelectItem>
              <SelectItem value="dfw">Dallas/Fort Worth (DFW)</SelectItem>
              <SelectItem value="den">Denver (DEN)</SelectItem>
              <SelectItem value="dtw">Detroit (DTW)</SelectItem>
              <SelectItem value="fll">Fort Lauderdale (FLL)</SelectItem>
              <SelectItem value="rsw">Fort Myers (RSW)</SelectItem>
              <SelectItem value="hou">Houston George Bush (IAH)</SelectItem>
              <SelectItem value="ind">Indianapolis (IND)</SelectItem>
              <SelectItem value="jax">Jacksonville (JAX)</SelectItem>
              <SelectItem value="jfk">New York (JFK)</SelectItem>
              <SelectItem value="las">Las Vegas (LAS)</SelectItem>
              <SelectItem value="lax">Los Angeles (LAX)</SelectItem>
              <SelectItem value="mem">Memphis (MEM)</SelectItem>
              <SelectItem value="mci">Kansas City (MCI)</SelectItem>
              <SelectItem value="mia">Miami (MIA)</SelectItem>
              <SelectItem value="mke">Milwaukee (MKE)</SelectItem>
              <SelectItem value="msp">Minneapolis–Saint Paul (MSP)</SelectItem>
              <SelectItem value="bna">Nashville (BNA)</SelectItem>
              <SelectItem value="ewr">Newark (EWR)</SelectItem>
              <SelectItem value="msy">New Orleans (MSY)</SelectItem>
              <SelectItem value="oak">Oakland (OAK)</SelectItem>
              <SelectItem value="okc">Oklahoma City (OKC)</SelectItem>
              <SelectItem value="oma">Omaha (OMA)</SelectItem>
              <SelectItem value="ont">Ontario (ONT)</SelectItem>
              <SelectItem value="phl">Philadelphia (PHL)</SelectItem>
              <SelectItem value="phx">Phoenix (PHX)</SelectItem>
              <SelectItem value="pit">Pittsburgh (PIT)</SelectItem>
              <SelectItem value="pdx">Portland (PDX)</SelectItem>
              <SelectItem value="ric">Richmond (RIC)</SelectItem>
              <SelectItem value="san">San Diego (SAN)</SelectItem>
              <SelectItem value="sfo">San Francisco (SFO)</SelectItem>
              <SelectItem value="sjc">San Jose (SJC)</SelectItem>
              <SelectItem value="sea">Seattle-Tacoma (SEA)</SelectItem>
              <SelectItem value="slc">Salt Lake City (SLC)</SelectItem>
              <SelectItem value="sat">San Antonio (SAT)</SelectItem>
              <SelectItem value="tp">Tampa (TP)</SelectItem>
              <SelectItem value="tus">Tucson (TUS)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="days-abroad">How many days per year do you spend outside of the US?</Label>
          <Input
            type="text"
            inputMode="numeric"
            id="days-abroad"
            value={getDisplayValue('daysAbroad')}
            onChange={(e) => handleInputChange('daysAbroad', e.target.value)}
            onFocus={() => setFocusedField('daysAbroad')}
            onBlur={() => setFocusedField(null)}
            className="mt-2"
          />
        </div>
      </div>
    </div>
  )
}