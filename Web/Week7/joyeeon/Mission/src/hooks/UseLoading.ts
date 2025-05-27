import { useState } from "react";

type UseLoadingReturnType<T> = {
    isLoading: boolean;
    error: Error | null;
    execute: (...args: any[]) => Promise<T | undefined>;
};

const useLoading = <T>(
    action: (...args: any[]) => Promise<T>
): UseLoadingReturnType<T> => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);


    const execute = async (...args: any[]): Promise<T | undefined> => {
        setIsLoading(true);
        setError(null); // 실행 전 에러 초기화

        try {
            const result = await action(...args);
            return result;
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err);
            } else {
                setError(new Error("알 수 없는 에러가 발생했습니다."));
            }
            return undefined;
        } finally {
            setIsLoading(false);
        }
    };

    return { isLoading, error, execute };
};

export default useLoading;