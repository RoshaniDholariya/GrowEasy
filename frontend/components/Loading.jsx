"use client";

export default function Loading({ loadingStep }) {
  return (
    <div className="bg-white rounded-xl shadow p-6 mt-6">

      <div className="flex items-center gap-4">

        <div className="animate-spin rounded-full h-8 w-8 border-4 border-blue-600 border-t-transparent"></div>

        <div>

          <h2 className="font-semibold text-lg">
            Processing CSV
          </h2>

          <p className="text-gray-500">
            {loadingStep}
          </p>

        </div>

      </div>

    </div>
  );
}