export type FormData = {
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