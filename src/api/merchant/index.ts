/**
 * 商户相关接口
 */
import type { pageParams, pageResult } from './types';
import { get, post } from '@/utils/request';
import type { MerchantInfo, MerchantState } from '@/store/modules/merchant/types';

enum URL {
  allList = '/merchant/all',
  listByPage = '/merchant/page',
  listById = '/merchant/@{id}',
}

export const getAllList = () => get<MerchantState>({ url: URL.allList });
export const getList = (data: pageParams) => post<pageResult<MerchantInfo>>({ url: URL.listByPage, data });
export const getById = (id: string) => get<MerchantInfo>({ url: URL.listById.replace('@{id}', id) });
