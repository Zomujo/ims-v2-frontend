"use client";
import { drugs } from "@/lib/constant";
import React, { useState } from "react";

const DrugListPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredDrugs = drugs.filter(
    (drug) =>
      drug.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      drug.code.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="mx-auto w-full overflow-y-auto p-6">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900">
          Facility Level Drugs & Codes
        </h1>
        <p className="mt-2 text-gray-600">
          Browse the full list of drugs and their Item codes. Use the search bar
          to quickly find what you need.
        </p>
        <h3 className="mt-4 text-lg font-semibold text-gray-900">
          Simply dial{" "}
          <span className="text-xl font-bold tracking-wide text-blue-600">
            *920*251#
          </span>{" "}
          on your phone to access our services instantly!
        </h3>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by drug name or code..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded-md border p-3 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-lg border border-gray-200 shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-blue-600">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-white uppercase">
                Drug Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-white uppercase">
                ITEM Code
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {filteredDrugs.map((drug, index) => (
              <tr
                key={index}
                className="transition-colors duration-150 hover:bg-blue-50"
              >
                <td className="px-6 py-4 text-sm text-gray-900">{drug.name}</td>
                <td className="px-6 py-4 font-mono text-sm text-blue-700">
                  {drug.code}
                </td>
              </tr>
            ))}
            {filteredDrugs.length === 0 && (
              <tr>
                <td
                  colSpan={2}
                  className="py-6 text-center text-gray-500 italic"
                >
                  No drugs found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DrugListPage;
