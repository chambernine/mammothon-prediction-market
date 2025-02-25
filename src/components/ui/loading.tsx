import React from "react";

export default function Loading({ isLoading }: { isLoading: boolean }) {
  if (!isLoading) return null;
  return (
    <div>
      <div id="col">
        <div id="img-wrap">
          <span className="loader"></span>
        </div>
      </div>
    </div>
  );
}
