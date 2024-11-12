import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { X } from 'lucide-react'
import { FormData } from '../../types'

type MultiSelectProps = {
  options: string[];
  placeholder: string;
  label: string;
  selectedItems: string[];
  onSelect: (item: string) => void;
  onRemove: (item: string) => void;
};

export default function MultiSelect({ 
  options, 
  placeholder, 
  label, 
  selectedItems, 
  onSelect, 
  onRemove 
}: MultiSelectProps) {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredOptions = options.filter(option => 
    option.toLowerCase().includes(searchTerm.toLowerCase()) && !selectedItems.includes(option)
  )

  const handleSelect = (item: string) => {
    onSelect(item)
    setSearchTerm('')
  }

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="relative">
        <Input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
            {filteredOptions.map((option) => (
              <div
                key={option}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSelect(option)}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="flex flex-wrap gap-2 mt-2">
        {selectedItems.map((item) => (
          <span key={item} className="inline-flex items-center px-2 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
            {item}
            <button onClick={() => onRemove(item)} className="ml-1 focus:outline-none">
              <X className="h-4 w-4" />
            </button>
          </span>
        ))}
      </div>
    </div>
  )
}