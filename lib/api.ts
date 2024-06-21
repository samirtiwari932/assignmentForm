enum APIMethod {
  GET = "GET",
  POST = "POST",
  // Other HTTP methods can be added here
}

export interface InfluencerCampaignForm {
  default_fields: string[];
  socials: string[];
  custom_fields: {
    name: string;
    question: string;
    type: string;
    is_required: boolean;
  }[];
}

// Mock function to simulate API request
async function apiRequest<T>(method: APIMethod, url: string): Promise<T> {
  // Simulate a random delay up to 1 second
  await new Promise(resolve => setTimeout(resolve, Math.random() * 1000));

  // Randomly generate an error approximately 1 in 20 times
  if (Math.floor(Math.random() * 20) === 0) {
    throw new Error("Internal Server Error");
  }

  // Generate mock data
  const mockData: InfluencerCampaignForm = {
    default_fields: ["name", "email", "phone"],
    socials: ["instagram", "tiktok", "twitter"],
    custom_fields: [
      {
        name: "custom_field_1",
        question: "What is your favorite color and why?",
        type: "longtext",
        is_required: true,
      },
      {
        name: "custom_field_2",
        question: "What is the name of your favorite movie?",
        type: "shortext",
        is_required: false,
      },
      {
        name: "custom_field_3",
        question: "Do you have any dietary restrictions?",
        type: "boolean",
        is_required: true,
      },
    ],
  };

  return mockData as T;
}

/** Gets the data for the preview page of a campaign. Does not require authorization. */
export async function getCampaignForm(campaignId: string): Promise<InfluencerCampaignForm> {
  return apiRequest<InfluencerCampaignForm>(APIMethod.GET, `/influencer/campaign/${campaignId}/form`);
}
