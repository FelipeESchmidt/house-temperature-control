"use client";

import { useState } from "react";
import { ref, DatabaseReference } from "firebase/database";

import { db } from "../utils/initFirebase";

interface DataBaseRefsProps {
  [k: string]: DatabaseReference;
}

export const useDatabaseRef = (database: string) => {
  const [databaseRefs, setDatabaseRefs] = useState<DataBaseRefsProps>({});

  const getDatabaseRef = () => {
    const databaseRef = ref(db, database);

    console.log({ databaseRef });

    setDatabaseRefs({ ...databaseRefs, [database]: databaseRef });

    return databaseRef;
  };

  return databaseRefs[database] || getDatabaseRef();
};
