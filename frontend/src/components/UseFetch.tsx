import axios from "axios";
import { useState, useEffect } from "react";
import { HeroResponse } from "../routes/heroes";

export const useFetchList = (url: string) => {
	const [response, setResponse] = useState<[] | null>();
	const [isError, setIsError] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
    const [shouldRefetch, refetch] = useState({})

	useEffect(() => {
		setIsLoading(true);
		axios
			.get(`/${url}`)
			.then((res) => {
				setIsLoading(false);
				setIsError(false);
				setResponse(res.data);
			})
			.catch(() => {
				setIsLoading(false);
				setIsError(true);
				setResponse(null);
			});
		return () => {};
	}, [url, shouldRefetch]);

	return [response, isLoading, isError, refetch] as const;
}

export const useFetchObject = (url: string) => {
	const [response, setResponse] = useState<HeroResponse | null>();
	const [isError, setIsError] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
    const [shouldRefetch, refetch] = useState({})

	useEffect(() => {
		setIsLoading(true);
		axios
			.get(`/${url}`)
			.then((res) => {
				setIsLoading(false);
				setIsError(false);
				setResponse(res.data);
			})
			.catch(() => {
				setIsLoading(false);
				setIsError(true);
				setResponse(null);
			});
		return () => {};
	}, [url, shouldRefetch]);

	return [response, isLoading, isError, refetch] as const;
}