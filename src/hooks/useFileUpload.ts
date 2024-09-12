import axios, { AxiosError } from 'axios';

export const useFileUpload = () => {
  const uploadToServer = async (files: File[], fileType: string) => {
    const fileData = {
      files: files.map((file) => ({
        name: file.name,
        type: fileType,
      })),
    };

    try {
      // URL 받기
      const res = await axios.post('https://entj.site/api/common/presigned-url', fileData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const presignedUrls: string[] = res.data;
      console.log('Pre-signed URLs:', presignedUrls);

      // URL로 파일 업로드
      const uploadPromises = files.map((file, index) =>
        axios.put(presignedUrls[index], file, {
          headers: {
            'Content-Type': file.type,
          },
        }),
      );
      const uploadResults = await Promise.all(uploadPromises);

      const successfulUploads = uploadResults
        .filter((uploadRes) => uploadRes.status === 200)
        .map((_, index) => presignedUrls[index]);

      // 성공한 URL 반환
      return successfulUploads;
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        console.error('서버 응답 상태:', axiosError.response.status);
        console.error('서버 응답 데이터:', axiosError.response.data);
      } else {
        console.error('요청 오류:', axiosError.message);
      }
    }
  };

  return { uploadToServer };
};
