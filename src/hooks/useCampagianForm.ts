// hooks/useFetchCampaignForm.ts
import {useQuery} from "@tanstack/react-query";
import {getCampaignForm} from "../../lib/api";

export const useFetchCampaignForm = (campaignId: string) => {
  return useQuery({
    queryKey: ["campaign", campaignId],
    queryFn: () => getCampaignForm(campaignId),
  });
};
