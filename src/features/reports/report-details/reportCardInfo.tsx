"use client";
import { BaseCard } from "@/features/dashboard/dashboardGeneral";
import { CardData } from "@/features/shared/types/action.types";
import React, { JSX } from "react";

type CardInfoProps = {
  cardData: CardData[];
};
export const CardInfo = ({ cardData }: CardInfoProps): JSX.Element => {
  return (
    <div className="mx-6 mt-4 flex items-center gap-6">
      {cardData.map((card, index) => (
        <div className="w-[450px]" key={index}>
          <BaseCard
            showChart={true}
            title={card.title}
            totalData={{
              total: Number(card.value),
              type: card.type === "money" ? "money" : "number",
            }}
            change={{
              type: "INCREMENT",
              value: card.percentage || 0,
            }}
            className="pb-0"
            isLoading={false}
          />
        </div>
      ))}
    </div>
  );
};
