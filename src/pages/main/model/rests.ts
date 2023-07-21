export const UploaderRests = {
    IMAGE: (formData: FormData) => ({
        method: 'post',
        url: '/upload/image',
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' },
        withToken: true,
    }),
};
