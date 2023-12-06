"use client";

import { IPlaceProps } from "@/components/Place";
import { useSearchParams } from "next/navigation";
import { PlaceInfo } from "@/components/PlaceInfo";
import { places } from "@/components/Places/constants";

export default function Place() {
  const searchParams = useSearchParams();

  const dbKey = searchParams?.get("dbKey");

  const place = places.find((place) => place.dbKey === dbKey);

  return (
    <div>
      <PlaceInfo key={place?.dbKey} {...(place as IPlaceProps)} />
    </div>
  );
}
