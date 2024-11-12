import React from 'react'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FormData } from '../../types'

type TravelStepProps = {
  formData: FormData;
  updateFormData: (section: keyof FormData, data: any) => void;
};

export default function TravelStep({ formData, updateFormData }: TravelStepProps) {
  const handleInputChange = (field: string, value: string | number) => {
    updateFormData('travelInfo', { [field]: value })
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
            type="number"
            id="round-trips"
            value={formData.travelInfo.roundTrips}
            onChange={(e) => handleInputChange('roundTrips', parseInt(e.target.value) || 0)}
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
            type="number"
            id="days-abroad"
            value={formData.travelInfo.daysAbroad}
            onChange={(e) => handleInputChange('daysAbroad', parseInt(e.target.value) || 0)}
            className="mt-2"
          />
        </div>
      </div>
    </div>
  )
}