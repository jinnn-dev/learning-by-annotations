import { SLIDE_API_URL } from '../config';
import { TaskImage } from '../model/taskImage';
import { ApiService } from './api.service';
import { handleError } from './error-handler';

export class TaskImageService {
  public static async uploadTaskImage(formData: FormData): Promise<TaskImage> {
    const [_, response] = await handleError(
      ApiService.post<TaskImage>({
        resource: '/taskImages',
        host: SLIDE_API_URL,
        data: formData
      }),
      'Task Image could not be uploaded'
    );
    return response!.data;
  }

  public static async uploadMultipleTaskImages(
    formData: FormData,
    onUploadProgress: (event: any) => void
  ): Promise<TaskImage[]> {
    const [_, response] = await handleError(
      ApiService.post<TaskImage[]>({
        resource: '/taskImages',
        host: SLIDE_API_URL,
        data: formData,
        config: { onUploadProgress }
      }),
      'Task-Images upload failed'
    );
    return response!.data;
  }
}
