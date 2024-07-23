/**
 * 订单相关接口
 */
import type { pageParams, pageResult } from './types';
import { get, post } from '@/utils/request';
import type { OrderInfo, OrderState } from '@/store/modules/order/types';

enum URL {
  allList = '/order/all',
  listByPage = '/order/page',
}

export const getAllList = () => get<OrderState>({ url: URL.allList });
export const getList = (data: pageParams) => post<pageResult<OrderInfo>>({ url: URL.listByPage, data });
