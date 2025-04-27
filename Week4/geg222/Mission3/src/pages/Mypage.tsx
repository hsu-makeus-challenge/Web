import React, { useEffect, useState } from 'react'
import { getMyInfo } from '../apis/auth';

const Mypage = () => {
    const [ data, setData ] = useState([]);

    useEffect (() => {
        const getData = async () => {
            const response = await getMyInfo();
            console.log(response);

            setData(response.data);
        };

        getData();
    }, []);
  return <div>{data.name}</div>;

}

export default Mypage;
