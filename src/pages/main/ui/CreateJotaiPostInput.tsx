import { useAtom, useSetAtom } from 'jotai';
import { type ChangeEvent, useCallback, useRef } from 'react';
import {
    addImageAtom,
    type ImageLoadableAtom,
    imageEntitiesAtom,
    imageLoadablesAtom,
    loadingImagesCountAtom,
    removeImageAtom,
} from '../model/jotaiState';

export const JotaiPhoto: React.FC<{ id: string; image: File; loadableAtom: ImageLoadableAtom }> = ({
    id,
    image,
    loadableAtom,
}) => {
    const [loadable] = useAtom(loadableAtom);
    const removeImage = useSetAtom(removeImageAtom);

    return (
        <div className={'relative flex justify-center items-center w-24 h-24'}>
            <img src={URL.createObjectURL(image)} className={'w-full h-full rounded-20 object-cover'} />
            {loadable.state === 'hasData' && (
                <span
                    className={'absolute w-6 h-6 cursor-pointer -top-2 -right-2 z-10'}
                    onClick={() => {
                        removeImage(id);
                    }}
                >
                    X
                </span>
            )}
            {loadable.state === 'loading' && (
                <>
                    <div className={'absolute w-full h-full rounded-20 bg-black/40'} />
                    <span className={'absolute w-12 h-12 text-20 animate-spin m-auto'}>*</span>
                </>
            )}
            {loadable.state === 'hasError' && (
                <>
                    <span
                        className={'absolute w-6 h-6 cursor-pointer -top-2 -right-2'}
                        onClick={() => {
                            removeImage(id);
                        }}
                    >
                        X
                    </span>
                    <div
                        className={
                            'absolute w-full h-full flex justify-center items-center rounded-20 cursor-pointer overflow-hidden'
                        }
                        // onClick={refresh}
                    >
                        <div className={'absolute w-full h-full bg-black/40'} />
                        <div className={'absolute flex flex-col items-center m-auto'}>
                            <span className={'w-10 h-10'}>!!!</span>
                            <span className={'text-red font-500'}>Error</span>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export const CreateJotaiPostInput: React.FC = () => {
    const photoInputRef = useRef<HTMLInputElement | null>(null);

    const [entities] = useAtom(imageEntitiesAtom);
    const [loadables] = useAtom(imageLoadablesAtom);
    const [loadingImageCount] = useAtom(loadingImagesCountAtom);
    const addImage = useSetAtom(addImageAtom);
    // const [images, setImages] = useRecoilState(imagesState);
    // const loadedImages = useRecoilValueLoadable(loadedImagesState);

    const handleFileInput = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        if (event.currentTarget.files == null) return;

        // const newImages: File[] = [];
        for (let i = 0; i < event.currentTarget.files.length; i++) {
            // newImages.push(event.currentTarget.files[i]);
            addImage(event.currentTarget.files[i]);
        }
        // setImages(prev => [...prev, ...newImages]);

        event.currentTarget.value = '';
    }, []);

    return (
        <>
            <div className={'p-5 z-10'}>
                <div className={'flex flex-row gap-x-5'}>
                    {entities.length > 0 &&
                        entities.map(entitiy => (
                            <JotaiPhoto key={entitiy.id} {...entitiy} loadableAtom={loadables[entitiy.id]} />
                        ))}
                </div>
                <div className={'flex flex-col text-text-menu text-16 pt-5'}>
                    <input ref={photoInputRef} type={'file'} onChange={handleFileInput} multiple={true} />
                    {loadingImageCount}
                    {/* {loadedImages.state === 'hasValue' && loadedImages.contents.length > 0 && <span>Able to load</span>} */}
                </div>
            </div>
        </>
    );
};
