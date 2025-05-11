import { useQuery } from "@tanstack/react-query";
import {PaginationDto} from "../../types/common.ts";
import {getLpList} from "../../apis/lp.ts";
import {QUERY_KEY} from "../../constants/key.ts";
import {ResponseLpListDto} from "../../types/lp.ts";
// import {ResponseLpListDto} from "../../types/lp.ts";

// const initialLpListData: ResponseLpListDto = {
//   status: true,
//   statusCode: 200,
//   message: "",
//   data: {
//     data: []
//   },
//   nextCursor: 0,
//   hasNext: false,
// };

function useGetLpList({ cursor, search, order, limit }: PaginationDto) {
  return useQuery({
    queryKey: [QUERY_KEY.lps, { cursor, search, order, limit }],
    queryFn: () => getLpList({
      cursor,
      search,
      limit,
      order,
    }),
    // 데이터가 신선하다고 간주되는 시간
    // 이 시간 동안은 캐시된 데이터를 그대ㅗㄹ 사용. 컴포넌트가 마운트 되거나 창에 포커스 들어오는 경우도 재요청 안함
    staleTime: 1000 * 60 * 5, // 5분
    // 사용되지 않는(비활설 상태) 쿼리 데이터가 캐시에 남아잇는 시간
    // staleTime이 지나고 데이터가 신선하지 않더라도 일정 시간 동안 메모리에 보관
    // 그 이후에 해당 쿼리가 전혀 사용되지 않으면 gcTime이 지난 후에 제거 (garage collection)
    // ex) 10분 동안 사영되지 않으면 해당 캐시 데이터가 삭제되며 다 시 요청 시 새 데이터를 받아옴
    gcTime: 1000 * 60 * 10, // 10분
    // enabled: true,
    // refetchInterval: 1000 * 60,
    // retry: 쿼리 요청이 실패했을 때 자동으로 재시도할 횟수를 지정
    // 기본값은 3회 정도, 네트워크 오류 등 임시적인 문제를 보완

    // initialData: 쿼리 실행 전 미리 제공할 초기 데이터를 설정
    // 컴포넌트가 렌더링 될 때 빈 데이터 구조를 미리 제공해서, 로딩 전에도 안전하게 UI를 구성할 수 있게 함
    // initialData: initialLpListData

    // 파라미터가 변경될 때 이전 데이터를 유지하여 UI 깜빡임 최소화
    // ex) 페이지네이션 시 페이지 전환 사이에 이전 데이터를 보여줘서 사용자 경험 향상
    // keepPreviousData: true,

    select: (data: ResponseLpListDto) => data.data.data,
  });
}

export default useGetLpList;