import { httpReq } from "./httpReq";

class HttpUtil {
  // 管理员账户登陆模块
  login = (params) => httpReq("post", "/admins/login", params);
  register = (params) => httpReq("post", "/admins/register", params);

  // 用户模块
  getUsers = (params) =>
    httpReq("get", `/users/all-users/${params.current}/${params.pageSize}`);
  getUser = (params) => httpReq("get", `/users/user/${params._id}`);
  updatePwd = (params) => httpReq("put", `/users/user`, params);
  deleteUser = (params) => httpReq("delete", `/users/user/${params._id}`);

  // 广告投放模块
  getAds = () => httpReq("get", `/ads/all-ads`);
  addAd = (params) => httpReq("post", "/ads/ad", params);
  updateAd = (params) => httpReq("put", `/ads/ad`, params);
  deleteAd = (params) => httpReq("delete", `/ads/ad/${params._id}`);

  // 商品类别模块
  getCategories = (params) =>
    httpReq(
      "get",
      `/categories/all-categories/${params.current}/${params.pageSize}`
    );
  addCategory = (params) => httpReq("post", `/categories/category`, params);
  deleteCategory = (params) =>
    httpReq("delete", `/categories/category/${params._id}/${params.curTotal}`);

  //商品信息模块
  getCommodities = (params) =>
    httpReq(
      "get",
      `/commodities/all-commodities/?count=${params.count}&pageSize=${params.pageSize}&category_id=${params.category_id}&commodityName=${params.commodityName}&inventoryStatus=${params.inventoryStatus}&popularity=${params.popularity}`
    );
  addCommodities = (params) =>
    httpReq("post", `/commodities/commodity`, params);
  updateCommodity = (params) =>
    httpReq("put", `/commodities/commodity`, params);
  deleteCommodities = (params) =>
    httpReq(
      "delete",
      `commodities/commodity/${params._id}/${params.curTotal}/${params.category_id}`
    );
}

export default new HttpUtil();
