"use client";

import { places } from "@/components/Places/constants";
import { useSearchParams } from "next/navigation";

export default function Place() {
  const searchParams = useSearchParams();

  const dbKey = searchParams?.get("dbKey");

  const place = places.find((place) => place.dbKey === dbKey);

  return (
    <div>
      <h1>{place?.dbKey}</h1>
    </div>
  );
}
