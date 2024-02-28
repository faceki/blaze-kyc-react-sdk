
// @ts-nocheck
import axios from 'axios';
import { useClientContext } from '../component/mainContext'; // Update the path accordingly

const useApiService = (baseURL: string) => {
  const { clientId, clientSecret } = useClientContext();

  const instance = axios.create({
    baseURL,
  });

 const GetWorkFlowsRules = async (link) =>{
  return await instance.get(`/api/v3/workflows/rulesbylink`,{
    params:{
      link
    },
  }).then((res) => res.data).catch((err) => {
    return err.message;
  });
 }

  const submitKYCRequest = async (body: FormData) => {
  try {

    const response = await instance.post(
      `/api/v3/kyc_verification/requestbylink`,
      body,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );

    return response?.data;
  } catch (err) {
    const error = err as unknown as Error;
    console.log(error, error.name, error.message);
    throw err;
  }
};


  return {
    submitKYCRequest,
    GetWorkFlowsRules
  };
};

export default useApiService;
