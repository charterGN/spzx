# spzx 前端界面

#### 介绍

毕业设计

#### 软件架构

* 后台管理系统后端采用的是单体架构【就是把所有的功能写在同一个项目中】，如下所示：

![image-20230713135826379](https://charter-note-image.oss-cn-shenzhen.aliyuncs.com/note-image/spzx-gitee/20231114/01.png)

* 前台用户系统的后端采用的是微服务系统架构【一个模块就是一个独立服务】，如下图所示：

![image-20230713140317467](https://charter-note-image.oss-cn-shenzhen.aliyuncs.com/note-image/spzx-gitee/20231114/02.png)

* 后端：Spring Boot、Spring Cloud Alibaba、Redis、EasyExcel、Minio、短信平台、支付宝支付等
* 前端：Vue3、ES6、Node.js、NPM、Element Plus、ECharts等

| 软件名称     | 版本说明 |
| ------------ | -------- |
| jdk          | jdk17    |
| spring boot  | 3.0.5    |
| spring cloud | 2022.0.2 |
| redis        | 7.0.10   |
| mysql        | 8.0.30   |
| idea         | 2022.2.2 |
| ------------ | -------- |
| Vue          | Vue3     |
| ES6          | ES6      |
| Node.js      | 16.x     |
| npm          | 8.19.4   |


#### 体验地址

**后台管理系统功能**：平台管理员用来维护系统相关的基础数据。包含用户登录、权限管理、商品管理、商品分类管理、商品规格管理、订单管理等

线上体验地址：http://spzx-admin.atguigu.cn/

**前台用户系统功能**： 包含首页数据显示，分类显示、查询商品数据、用户注册登录、购物车模块、订单模块等

线上体验地址：http://spzx.atguigu.cn/
