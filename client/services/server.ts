import httpClient from "@/lib/http"

export const getUserServer = async (userId: string) => {
  try {
    return await httpClient.get(`user-server/${userId}`).json();
  } catch (error) {
    console.error(error);
    return error;
  }
}
