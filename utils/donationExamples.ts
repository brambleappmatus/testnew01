export interface DonationExample {
  title: string;
  impact: string;
}

const smallDonations: DonationExample[] = [
  {
    title: "Bedding needs now",
    impact: "Provides warm blankets for shelter pets"
  },
  {
    title: "Food supplies needed",
    impact: "Helps feed shelter pets for a day"
  },
  {
    title: "Basic care items",
    impact: "Provides essential care supplies"
  },
  {
    title: "Shelter supplies",
    impact: "Helps maintain clean shelter spaces"
  },
  {
    title: "Pet treats needed",
    impact: "Brings joy to shelter pets"
  }
];

const mediumDonations: DonationExample[] = [
  {
    title: "Medical supplies",
    impact: "Helps provide basic medical care"
  },
  {
    title: "Enrichment toys",
    impact: "Keeps shelter pets happy and active"
  },
  {
    title: "Training supplies",
    impact: "Helps prepare pets for adoption"
  },
  {
    title: "Grooming needs",
    impact: "Keeps shelter pets clean and healthy"
  },
  {
    title: "Shelter equipment",
    impact: "Helps maintain shelter facilities"
  }
];

const largeDonations: DonationExample[] = [
  {
    title: "Veterinary care",
    impact: "Provides essential medical treatment"
  },
  {
    title: "Special equipment",
    impact: "Helps pets with special needs"
  },
  {
    title: "Emergency care",
    impact: "Supports urgent medical needs"
  }
];

export const getRandomExample = (amount: number): DonationExample => {
  let examples: DonationExample[];
  
  if (amount < 5) {
    examples = smallDonations;
  } else if (amount < 10) {
    examples = mediumDonations;
  } else {
    examples = largeDonations;
  }

  return examples[Math.floor(Math.random() * examples.length)];
};