/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { atom } from 'jotai';
import { atomFamily, loadable } from 'jotai/utils';
import { v4 } from 'uuid';
import { api } from 'shared/model';
import { UploaderRests } from './rests';

const imageLoadableAtom = atomFamily((image: File) => {
    return loadable(
        atom(async () => {
            const formData = new FormData();
            formData.append('image', image);

            const { data } = await api(UploaderRests.IMAGE(formData));

            return data;
        })
    );
});

export type ImageLoadableAtom = ReturnType<typeof imageLoadableAtom>;

export const imageEntitiesAtom = atom(
    [] as Array<{ id: string; image: File }>,
    (_get, set, ids: Array<{ id: string; image: File }>) => {
        set(imageEntitiesAtom, ids);
    }
);

export const imageLoadablesAtom = atom({} as Record<string, ImageLoadableAtom>, (_get, set, entities) => {
    set(imageLoadablesAtom, entities);
});

export const loadingImagesCountAtom = atom(get => {
    const ids = get(imageEntitiesAtom).map(({ id }) => id);
    const imageLoadables = get(imageLoadablesAtom);

    return ids.reduce<number>((sum, id) => sum + (get(imageLoadables[id]).state === 'loading' ? 1 : 0), 0);
});

// export const imageAtom = atom([] as ImageLoadableAtom[], (_get, set, images: ImageLoadableAtom[]) => {
//     set(imagesAtom, images);
// });

export const addImageAtom = atom(null, (get, set, image: File) => {
    const id = v4();

    set(imageEntitiesAtom, get(imageEntitiesAtom).concat({ id, image }));
    set(imageLoadablesAtom, { ...get(imageLoadablesAtom), [id]: imageLoadableAtom(image) });
});

export const removeImageAtom = atom(null, (get, set, id: string) => {
    set(
        imageEntitiesAtom,
        get(imageEntitiesAtom).filter(entity => entity.id !== id)
    );
    set(imageLoadablesAtom, { ...get(imageLoadablesAtom), [id]: undefined });
});
