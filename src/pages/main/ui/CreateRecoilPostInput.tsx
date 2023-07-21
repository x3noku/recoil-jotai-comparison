import { type ChangeEvent, useCallback, useRef } from 'react';
import { useRecoilRefresher_UNSTABLE, useRecoilState, useRecoilValueLoadable } from 'recoil';
import { imagesState, loadedImagesState, uploadImageQuery } from '../model/recoilState';

export const RecoilPhoto: React.FC<{ image: File }> = ({ image }) => {
    const [images, setImages] = useRecoilState(imagesState);
    const index = images.findIndex(item => item === image);

    if (index === -1) return <></>;

    const loadedImage = useRecoilValueLoadable(uploadImageQuery(index));
    const refresh = useRecoilRefresher_UNSTABLE(uploadImageQuery(index));

    return (
        <div className={'relative flex justify-center items-center w-24 h-24'}>
            <img src={URL.createObjectURL(image)} className={'w-full h-full rounded-20 object-cover'} />
            {loadedImage.state === 'hasValue' && (
                <span
                    className={'absolute w-6 h-6 cursor-pointer -top-2 -right-2 z-10'}
                    onClick={() => {
                        setImages(prev => prev.filter(item => item !== image));
                    }}
                >
                    X
                </span>
            )}
            {loadedImage.state === 'loading' && (
                <>
                    <div className={'absolute w-full h-full rounded-20 bg-black/40'} />
                    <span className={'absolute w-12 h-12 text-20 animate-spin m-auto'}>*</span>
                </>
            )}
            {loadedImage.state === 'hasError' && (
                <>
                    <span
                        className={'absolute w-6 h-6 cursor-pointer -top-2 -right-2'}
                        onClick={() => {
                            setImages(prev => prev.filter(item => item !== image));
                        }}
                    >
                        X
                    </span>
                    <div
                        className={
                            'absolute w-full h-full flex justify-center items-center rounded-20 cursor-pointer overflow-hidden'
                        }
                        onClick={refresh}
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

export const CreateRecoilPostInput: React.FC = () => {
    const photoInputRef = useRef<HTMLInputElement | null>(null);

    const [images, setImages] = useRecoilState(imagesState);
    const loadedImages = useRecoilValueLoadable(loadedImagesState);

    const handleFileInput = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        if (event.currentTarget.files == null) return;

        const newImages: File[] = [];
        for (let i = 0; i < event.currentTarget.files.length; i++) {
            newImages.push(event.currentTarget.files[i]);
        }
        setImages(prev => [...prev, ...newImages]);

        event.currentTarget.value = '';
    }, []);

    return (
        <>
            <div className={'p-5 z-10'}>
                <div className={'flex flex-row gap-x-5'}>
                    {images.length > 0 && images.map((image, index) => <RecoilPhoto key={index} image={image} />)}
                </div>
                <div className={'flex flex-col text-text-menu text-16 pt-5'}>
                    <input ref={photoInputRef} type={'file'} onChange={handleFileInput} multiple={true} />
                    {loadedImages.state === 'hasValue' && loadedImages.contents.length > 0 && <span>Able to load</span>}
                </div>
            </div>
        </>
    );
};
