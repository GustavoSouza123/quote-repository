import { useRouteError } from "react-router-dom";
import Title from './Title';

export default function Error() {
    const error = useRouteError();
    console.error(error);

    return (
        <div className="flex flex-col items-center justify-center w-full py-20 px-3 text-center">
            <Title content={'Oops!'} />
            <p className="my-10 text-xl">Sorry, an unexpected error has occurred.</p>
            <p>{error.statusText || error.message}</p>
        </div>
    );
}