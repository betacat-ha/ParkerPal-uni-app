/**
 * 订单相关接口
 */
import type { pageParams, pageResult } from './types';
import { get, post } from '@/utils/request';
import type { OrderInfo, OrderState } from '@/store/modules/order/types';

enum OrderURL {
  allOrders = '/order/all',
  ordersByPage = '/order/page',
  orderById = '/order/@{id}',
}

// 获取所有订单
export const getAllOrders = () => get<OrderState>({ url: OrderURL.allOrders });

// 按分页获取订单列表
export const getOrdersByPage = (data: pageParams) => post<pageResult<OrderInfo>>({ url: OrderURL.ordersByPage, data });

// 根据ID获取订单详情
export const getOrderById = (id: string, catchError = false) => get<OrderInfo>({ url: OrderURL.orderById.replace('@{id}', id), custom: { catch: catchError } });
