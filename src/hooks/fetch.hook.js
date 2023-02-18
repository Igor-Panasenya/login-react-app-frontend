import axios from 'axios';
import {useEffect, useState} from "react";
import { getUsername } from "../helper/helper";

axios.defaults.baseURL = 'http://localhost:8000';

export default function useFetch(query) {
    const [getData, setGetData] = useState({ isLoading: false, apiData: undefined, status: null, serverError: null });

    useEffect(() => {

        const fetchData = async () => {
            try {

                setGetData(prev => ({ ...prev, isLoadnig: true}));

                const { username } = !query ?  await getUsername() : '';

                const {data, status } = !query ? await axios.get(`/api/user/${username}`) : await axios.get(`/api/${query}`);

                if (status === 201) {
                    setGetData(prev => ({ ...prev, isLoadnig: false}));
                    setGetData(prev => ({ ...prev, apiData: data, status: status}));
                }

                setGetData(prev => ({ ...prev, isLoadnig: false}));

            } catch (error) {
                setGetData(prev => ({ ...prev, isLoadnig: false, serverError: error}))
            }
        };
        fetchData();

    }, [query]);

    return [getData, setGetData];
}