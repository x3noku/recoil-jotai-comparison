import { atom, selector, selectorFamily, waitForAllSettled } from 'recoil';
import { api } from 'shared/model';
import { UploaderRests } from './rests';
import { type IUploadImageResponsePayload } from './types';

export const imagesState = atom<File[]>({
    key: 'createPostInput/imagesState',
    default: [],
});

export const loadedImagesState = selector({
    key: 'createPostInput/loadedImagesState',
    get: ({ get }) => {
        const images = get(imagesState);

        return get(waitForAllSettled(images.map((_, index) => uploadImageQuery(index))))
            .filter(item => item.state === 'hasValue')
            .map(item => item.contents as IUploadImageResponsePayload);
    },
});

export const uploadImageQuery = selectorFamily({
    key: 'createPostInput/uploadImageQuery',
    get:
        (index: number) =>
        async ({ get }) => {
            const images = get(imagesState);
            const image = images[index];

            const formData = new FormData();
            formData.append('image', image);

            const { data } = await api(UploaderRests.IMAGE(formData));
            return data as IUploadImageResponsePayload;
        },
});
