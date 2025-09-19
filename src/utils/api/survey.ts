interface Competencia {
  titulo: string;
  valor: number;
  promedio: number;
  minimo: number;
  maximo: number;
  descripcion: string;
  color: string;
}

interface ApiData {
  "chartData": Competencia[];
  "useAverage": boolean;
}

export async function getBarChartData(participantId: string, api_url_force: string = ''): Promise<{
  data: ApiData;
  error: boolean;
  errorMessage?: string;
}> {
  try {
    let apiEndpoint = import.meta.env.API_ENDPOINT;
    if (api_url_force) {
      apiEndpoint = api_url_force;
    }
    const surveyId = import.meta.env.BAR_CHART_SURVEY_ID;
    const apiToken = import.meta.env.API_TOKEN;

    if (!apiEndpoint || !surveyId || !apiToken) {
      return {
        data: {
          chartData: [],
          useAverage: false
        },
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
        data: {
          chartData: [],
          useAverage: false
        },
        error: true,
        errorMessage: `Error del servidor: ${response.status} - ${response.statusText}`
      };
    }

    const result = await response.json();

    return {
      data: {
        chartData: result.data["chart_data"] ?? [],
        useAverage: result.data["use_average"] ?? false
      },
      error: false
    };
  } catch (err) {
    console.error("Error al obtener datos:", err);
    return {
      data: {
        chartData: [],
        useAverage: false
      },
      error: true,
      errorMessage: "Error de conexión. Por favor, verifica tu conexión a internet e intenta nuevamente."
    };
  }
}