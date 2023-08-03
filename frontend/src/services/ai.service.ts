import { ApiService } from './api.service';
import { AI_API_URL } from '../config';
import { handleError } from './error-handler';
import { Project, ProjectWithTasks, UpdateProject } from '../model/ai/projects/project';
import { CreateDataset, CreateOwnDataset, Dataset, DatasetMetadata } from '../model/ai/datasets/dataset';
import { CreateTask, Task, TaskVersion, UpdateTask } from '../model/ai/tasks/task';
import { LogEntry } from '../model/ai/tasks/log-entry';
import { IGraph } from '../core/ai/builder/serializable';

export class AiService {
  public static async ping() {
    const [_, response] = await handleError(
      ApiService.get({
        resource: '/ping',
        host: AI_API_URL
      }),
      'Status (AI) konnte nicht geladen werden'
    );

    return response!.data;
  }

  public static async pingClearml() {
    const [_, response] = await handleError(
      ApiService.get({
        resource: '/ping/clearml',
        host: AI_API_URL
      }),
      'Status (ClearMl) konnte nicht geladen werden'
    );

    return response!.data;
  }

  public static async wsLogin(body: any) {
    const [_, response] = await handleError(
      ApiService.post<any>({
        resource: '/auth',
        data: body,
        host: AI_API_URL
      }),
      'WS login fehlgeschlagen'
    );
    return response!.data;
  }

  public static async getDatasets() {
    const [_, response] = await handleError(
      ApiService.get<Dataset[]>({
        resource: '/datasets',
        host: AI_API_URL
      }),
      'Datensätze konnten nicht geladen werden'
    );
    return response!.data;
  }

  public static async getDataset(datasetId: string) {
    const [_, response] = await handleError(
      ApiService.get<Dataset>({
        resource: `/datasets/${datasetId}`,
        host: AI_API_URL
      }),
      'Datensatz konnten nicht geladen werden'
    );
    return response!.data;
  }

  public static async deleteDataset(datasetId: string) {
    const [_, response] = await handleError(
      ApiService.delete<Dataset>({
        resource: `/datasets/${datasetId}`,
        host: AI_API_URL
      }),
      'Datensatz konnten nicht gelöscht werden'
    );
    return response!.data;
  }

  public static async getDatasetImages(dataset_id: string) {
    const [_, response] = await handleError(
      ApiService.get<string[]>({
        resource: `/datasets/${dataset_id}/images`,
        host: AI_API_URL
      }),
      'Bilder konnten nicht gealden werden'
    );
    return response!.data;
  }

  public static async getSpecificDataset(datasetId: string) {
    const [_, response] = await handleError(
      ApiService.get<Dataset>({
        resource: `/datasets/${datasetId}`,
        host: AI_API_URL
      }),
      'Datensatz konnte nicht gealden werden'
    );
    return response!.data;
  }

  public static async createProject(name: string, description?: string) {
    const [_, response] = await handleError(
      ApiService.post({
        resource: '/projects',
        host: AI_API_URL,
        data: {
          name,
          description
        }
      }),
      'Projekt konnte nicht erstellt werden'
    );

    return response!.data;
  }

  public static async updateProject(data: UpdateProject) {
    const [_, response] = await handleError(
      ApiService.put<Project>({
        resource: `/projects`,
        host: AI_API_URL,
        data
      }),
      'Projekt konnte nicht aktualisiert werden'
    );

    return response!.data;
  }

  public static async deleteProject(projectId: string) {
    const [_, response] = await handleError(
      ApiService.delete({
        resource: `/projects/${projectId}`,
        host: AI_API_URL
      }),
      'Projekt konnte nicht gelöscht werden'
    );

    return response!.data;
  }

  public static async getProjects() {
    const [_, response] = await handleError(
      ApiService.get<Project[]>({
        resource: '/projects',
        host: AI_API_URL
      }),
      'Projekte konnten nicht geladen werden'
    );
    return response!.data;
  }

  public static async getProject(projectId: string) {
    const [_, response] = await handleError(
      ApiService.get<ProjectWithTasks>({
        resource: `/projects/${projectId}`,
        host: AI_API_URL
      })
    );
    return response?.data;
  }

  // public static async createTask(data: {
  //   task_name: string;
  //   project_id: string;
  //   model_name: string;
  //   dataset_id: string;
  // }) {
  //   const [_, response] = await handleError(
  //     ApiService.post<Task>({
  //       resource: `/tasks`,
  //       data: data,
  //       host: AI_API_URL
  //     })
  //   );
  //   return response!.data;
  // }

  public static async createTask(data: CreateTask) {
    const [_, response] = await handleError(
      ApiService.post<Task>({
        resource: `/tasks`,
        data: data,
        host: AI_API_URL
      })
    );
    return response!.data;
  }

  public static async getTasksToProject(projectId: string) {
    const [_, response] = await handleError(
      ApiService.get<Task[]>({
        resource: `/projects/${projectId}/tasks`,
        host: AI_API_URL
      })
    );
    return response!.data;
  }

  public static async getTask(taskId: string) {
    const [_, response] = await handleError(
      ApiService.get<Task>({
        resource: `/tasks/${taskId}`,
        host: AI_API_URL
      })
    );
    return response!.data;
  }

  public static async updateTask(data: UpdateTask) {
    const [_, response] = await handleError(
      ApiService.put<Task>({
        resource: `/tasks`,
        host: AI_API_URL,
        data
      })
    );

    return response!.data;
  }

  public static async deleteTask(taskId: string) {
    const [_, response] = await handleError(
      ApiService.delete({
        resource: `/tasks/${taskId}`,
        host: AI_API_URL
      })
    );

    return response!.data;
  }

  public static async updateTaskVersion(taskId: string, taskVersionId: string, graph: IGraph) {
    const [_, response] = await handleError(
      ApiService.put<Task>({
        resource: `/tasks/${taskId}/version`,
        host: AI_API_URL,
        data: {
          id: taskVersionId,
          graph: graph
        }
      })
    );
    return response!.data;
  }

  public static async parseTaskVersion(taskId: string, versionId: string) {
    const [_, response] = await handleError(
      ApiService.get<string>({
        resource: `/tasks/${taskId}/version/${versionId}/parse`,
        host: AI_API_URL
      })
    );
    return response!.data;
  }

  public static async downloadTaskVersion(taskId: string, versionId: string, language: 'python' | 'jupyter') {
    const [_, response] = await handleError(
      ApiService.get<string>({
        resource: `/tasks/${taskId}/version/${versionId}/download`,
        data: {
          language
        },
        host: AI_API_URL
      })
    );
    return response!.data;
  }

  public static async startTaskVersionTraining(taskId: string, versionId: string) {
    const [_, response] = await handleError(
      ApiService.post<string>({
        resource: `/tasks/${taskId}/version/${versionId}/train`,
        host: AI_API_URL
      })
    );
    return response!.data;
  }

  public static async getLatestMetrics(taskId: string, versionId: string) {
    const [_, response] = await handleError(
      ApiService.get<string>({
        resource: `/tasks/${taskId}/version/${versionId}/metrics/latest`,
        host: AI_API_URL
      })
    );
    return response!.data;
  }

  public static async resetVersion(taskId: string, versionId: string) {
    const [_, response] = await handleError(
      ApiService.post<TaskVersion>({
        resource: `/tasks/reset`,
        host: AI_API_URL,
        data: {
          task_id: taskId,
          version_id: versionId
        }
      })
    );
    return response!.data;
  }

  public static async lockElement(taskId: string, elementId: string, userId: string) {
    const [_, response] = await handleError(
      ApiService.put<Task>({
        resource: `/tasks/lock`,
        host: AI_API_URL,
        data: {
          task_id: taskId,
          element_id: elementId,
          user_id: userId
        }
      })
    );
    return response!.data;
  }

  public static async unlockElement(taskId: string, elementId: string, userId: string) {
    const [_, response] = await handleError(
      ApiService.put<Task>({
        resource: `/tasks/unlock`,
        host: AI_API_URL,
        data: {
          task_id: taskId,
          element_id: elementId,
          user_id: userId
        }
      })
    );
    return response!.data;
  }

  public static async unlockElements(taskId: string, elementIds: string[]) {
    const [_, response] = await handleError(
      ApiService.delete<Task>({
        resource: `/tasks/unlock`,
        host: AI_API_URL,
        data: {
          task_id: taskId,
          element_ids: elementIds
        }
      })
    );
    return response!.data;
  }

  public static async getTaskLog(taskId: string) {
    const [_, response] = await handleError(
      ApiService.get<LogEntry[]>({
        resource: `/tasks/${taskId}/log`,
        host: AI_API_URL
      })
    );
    return response!.data;
  }

  public static async getTaskMetrics(taskId: string) {
    const [_, response] = await handleError(
      ApiService.get<any>({
        resource: `/tasks/${taskId}/metrics`,
        host: AI_API_URL
      })
    );
    return response!.data;
  }

  public static async getSessionInformation() {
    const [_, response] = await handleError(
      ApiService.get({
        resource: '/sessioninfo',
        host: AI_API_URL
      })
    );

    return response?.data;
  }

  public static async setMetadata(user_id: string, metadata: any) {
    const [_, response] = await handleError(
      ApiService.put({
        resource: '/user/metadata',
        host: 'http://localhost:3001',
        data: {
          user_id: user_id,
          metadata: metadata
        }
      })
    );

    return response!.data;
  }

  public static async getBuilderState() {
    const [_, response] = await handleError(
      ApiService.get<any>({
        resource: '/builder/state',
        host: AI_API_URL
      })
    );
    return response!.data;
  }

  public static async updateBuilderState(fieldId: string, value?: string) {
    const [_, response] = await handleError(
      ApiService.put<any>({
        resource: '/builder/state',
        host: AI_API_URL,
        data: {
          field_id: fieldId,
          value: value
        }
      })
    );
    return response!.data;
  }

  public static async lock(fieldId: string, lockedBy: string) {
    const [_, response] = await handleError(
      ApiService.put<any>({
        resource: '/builder/state/lock',
        host: AI_API_URL,
        data: {
          field_id: fieldId,
          locked_by: lockedBy
        }
      })
    );
    return response!.data;
  }

  public static async unlock(fieldId: string) {
    const [_, response] = await handleError(
      ApiService.put<any>({
        resource: '/builder/state/unlock',
        host: AI_API_URL,
        data: {
          field_id: fieldId
        }
      })
    );
    return response!.data;
  }

  public static async unlockToUser(userId: string) {
    const [_, response] = await handleError(
      ApiService.put<any>({
        resource: '/builder/state/unlock/user',
        host: AI_API_URL,
        data: {
          user_id: userId
        }
      })
    );
    return response!.data;
  }

  public static async createBuilderTask(data: { name: string; project_id: string }) {
    const [_, response] = await handleError(
      ApiService.post({
        resource: '/tasks/builder',
        host: AI_API_URL,
        data
      })
    );
    return response!.data;
  }

  public static async getBuilderTask(id: string) {
    const [_, response] = await handleError(
      ApiService.get<any>({
        resource: `/tasks/builder/${id}`,
        host: AI_API_URL
      })
    );

    return response!.data;
  }

  public static async updateBuilderGraph(graph: IGraph) {
    const [_, response] = await handleError(
      ApiService.put<any>({
        resource: `/builder/graph`,
        host: AI_API_URL,
        data: graph
      })
    );

    return response!.data;
  }

  public static async createDataset(createDataset: CreateDataset, onUploadProgress?: (event: any) => void) {
    const formData = new FormData();
    formData.append('data', JSON.stringify({ name: createDataset.name, description: createDataset.description }));
    formData.append('file', createDataset.file!);
    formData.append('dataset_type', createDataset.type);

    const [_, response] = await handleError(
      ApiService.post<Dataset>({
        resource: '/datasets',
        data: formData,
        config: { onUploadProgress },
        host: AI_API_URL
      }),
      'Dataset could not be created'
    );
    return response!.data;
  }

  public static async createOwnDataset(createOwnDataset: CreateOwnDataset) {
    const [_, response] = await handleError(
      ApiService.post<Dataset>({
        resource: '/datasets/own',
        data: createOwnDataset,
        host: AI_API_URL
      }),
      'Dataset could not be created'
    );
    return response!.data;
  }

  public static async checkServingStatus(taskId: string, versionId: string) {
    const [_, response] = await handleError(
      ApiService.get<any>({
        resource: '/serve/' + taskId + '/' + versionId,
        host: AI_API_URL
      }),
      'Serving status could not be loaded'
    );
    return response!.data;
  }

  public static async checkIfPredictionIsAvailable(taskId: string, versionId: string) {
    const [_, response] = await handleError(
      ApiService.get<any>({
        resource: '/serve/' + taskId + '/' + versionId,
        host: AI_API_URL
      }),
      'Loading prediction model failed'
    );
    return response!.data;
  }
  public static async makePrediction(
    taskId: string,
    versionId: string,
    file: Blob,
    onUploadProgress?: (event: any) => void
  ) {
    const formData = new FormData();
    formData.append('image', file);
    const [_, response] = await handleError(
      ApiService.post<{ propabilities: number[]; max_index: number; dataset: DatasetMetadata }>({
        resource: '/serve/' + taskId + '/' + versionId,
        data: formData,
        config: { onUploadProgress },
        host: AI_API_URL
      }),
      'Prediction failed'
    );
    return response!.data;
  }
}
