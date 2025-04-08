const BASE_URL = 'http://localhost:3000';

export const submitCodeJob = async (
  name: string,
  exercice_uuid: string,
  file: File
): Promise<any> => {
  console.log(name, exercice_uuid,file)
  const formData = new FormData();
  formData.append('name', name);
  formData.append('exercice_uuid', exercice_uuid);
  formData.append('file', file);

  const response = await fetch(`${BASE_URL}/jobs`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(`Erreur lors de la soumission : ${response.status} ${JSON.stringify(error)}`);
    }

    return await response.json();
};



export const getJobStatus = async (uuid: string): Promise<any> => {
  const response = await fetch(`${BASE_URL}/jobs/${uuid}`, {
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error('Erreur lors de la récupération du statut du job');
  }

  return response.json();
};

export const getExercises = async (): Promise<any[]> => {
  const response = await fetch(`${BASE_URL}/exercices`, {
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error('Erreur lors de la récupération des exercices');
  }

  return response.json();
};
