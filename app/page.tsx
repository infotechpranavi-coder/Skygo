'use client'

import HeroExplore from "../components/HeroExplore";
import ExploreWithUs from "../components/ExploreWithUs";
import DestinationsGrid from "../components/DestinationsGrid";
import UpcomingTrips from "../components/UpcomingTrips";
import PopularPackages from "../components/PopularPackages";
import ClientFeedback from "../components/ClientFeedback";
import InquiryFormPopup from "../components/InquiryFormPopup";
import FloatingCallButton from "../components/FloatingCallButton";
import { useInquiryForm } from "../contexts/InquiryFormContext";

export default function Home() {
  const { isOpen: showInquiryForm, closeForm } = useInquiryForm();

  return (
    <div className="min-h-screen">
      <HeroExplore />
      <ExploreWithUs />
      <DestinationsGrid />
      <UpcomingTrips />
      <PopularPackages />
      <ClientFeedback />

      {/* Inquiry Form Popup */}
      {showInquiryForm && (
          <InquiryFormPopup
            isOpen={showInquiryForm}
            onClose={closeForm}
          />
      )}

      {/* Floating Call Button */}
      <FloatingCallButton />
    </div>
  );
}

