import { useCallback, useEffect, useState } from "react";
import { Incidence } from "../types/types";
import { getIncidences } from "../services/incidenceService";

export function useTeacherIncidences() {
  const [incidences, setIncidences] = useState<Incidence[]>([]);
  const [loading, setLoading] = useState(false);

  const refreshIncidences = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getIncidences();
      setIncidences(data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshIncidences();
  }, [refreshIncidences]);

  return { incidences, loading, refreshIncidences };
}
