export type RequestType = {
  id: string;
  requestMethod: string;
  url: string;
  headers: [boolean, string, string][];
  queryParameters: [boolean, string, string][];
  formData: [boolean, string, string][];
  createdAt: Date;
};
