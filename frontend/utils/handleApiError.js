import { toast } from "sonner";

export default function handleApiError(error) {

  if (error.code === "ECONNABORTED") {
    toast.error("Request timed out.");
    return;
  }

  if (!error.response) {
    toast.error("Network Error");
    return;
  }

  const message = error.response.data?.message || "";

  switch (message) {

    case "No CSV uploaded.":
      toast.error("Please upload a CSV.");
      break;

    case "Only CSV files are allowed":
      toast.error("Only CSV files are supported.");
      break;

    case "CSV is empty":
      toast.error("Uploaded CSV is empty.");
      break;

    case "Gemini Error":
      toast.error("Gemini AI processing failed.");
      break;

    case "Invalid AI Response":
      toast.error("AI returned an invalid response.");
      break;

    default:
      toast.error(message || "Something went wrong.");
  }
}