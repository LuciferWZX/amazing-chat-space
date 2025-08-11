import {useQuery} from "@tanstack/react-query";
import {apis} from "@amazing-chat/shared";
const {getColleagues}=apis
const useMyColleagues = (params:{enabled:boolean}) => {
  const {isFetching,data} = useQuery({
      queryKey:['my-colleagues'],
      queryFn:getColleagues,
      enabled:params.enabled,
      refetchOnWindowFocus:false,
  })

  return  {
      colleagues:data?.data,
      isFetching
  }
}
export default useMyColleagues;