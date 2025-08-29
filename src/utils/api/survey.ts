interface Competencia {
  titulo: string;
  valor: number;
  promedio: number;
  minimo: number;
  maximo: number;
  descripcion: string;
  color: string;
}

export async function getBarChartData(participantId: string): Promise<{
  data: Competencia[];
  error: boolean;
  errorMessage?: string;
}> {
  try {
    const apiEndpoint = import.meta.env.API_ENDPOINT;
    const surveyId = import.meta.env.BAR_CHART_SURVEY_ID;
    const apiToken = import.meta.env.API_TOKEN;

    if (!apiEndpoint || !surveyId || !apiToken) {
      return {
        data: [],
        error: true,
        errorMessage: "Configuración de API incompleta. Faltan variables de entorno."
      };
    }

    const response = await fetch(
      `${apiEndpoint}/api/bar-chart/?survey_id=${surveyId}&participant_id=${participantId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Token ${apiToken}`,
        },
      }
    );

    if (!response.ok) {
      return {
        data: [],
        error: true,
        errorMessage: `Error del servidor: ${response.status} - ${response.statusText}`
      };
    }

    const result = await response.json();

    return {
      data: result.data ?? [],
      error: false
    };
  } catch (err) {
    console.error("Error al obtener datos:", err);
    return {
      data: [],
      error: true,
      errorMessage: "Error de conexión. Por favor, verifica tu conexión a internet e intenta nuevamente."
    };
  }
}