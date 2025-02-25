"use client";
import React from "react";

interface SharePollButtonProps {
  // Poll data to be shared
  pollTitle: string;
  pollId: string;
  pollUrl: string;
  customMessage?: string;
}

const SharePollButton: React.FC<SharePollButtonProps> = ({
  pollTitle,
  pollId,
  pollUrl,
  customMessage = "เข้ามาร่วมโหวตในโพลล์นี้!",
}) => {
  // Share via Web Intent (does not require API key)
  const handleShareViaIntent = () => {
    const shareText = `${customMessage} "${pollTitle}" ${pollUrl}`;
    const encodedText = encodeURIComponent(shareText);
    const intentUrl = `https://twitter.com/intent/tweet?text=${encodedText}`;

    // Open in new window
    window.open(intentUrl, "_blank", "width=550,height=420");
  };

  return (
    <div className="share-poll-container">
      <button onClick={handleShareViaIntent} className="share-x-button">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="x-icon"
        >
          <path d="M13.8 10.5L20.7 2h-3.1l-5.9 7.2L7.3 2H1l6.5 9.5L1 21h3.1l6.2-7.5L15 21h6.3l-7.5-10.5zm-2.4 3l-.7-1L3.7 3.7h3l5.5 7.8.7 1 7.3 10.5h-3l-5.8-8.5z" />
        </svg>
      </button>
    </div>
  );
};

export default SharePollButton;
