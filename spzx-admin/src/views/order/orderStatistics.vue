<template>

  <!---搜索表单-->
  <div class="search-div">
      <el-form label-width="90px" size="small">
          <el-row>
            <el-col :span="8">
              <el-form-item label="订单号">
                      <el-input v-model="queryDto.orderNo"
                              style="width: 100%"
                              placeholder="订单号"
                              ></el-input>
                  </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="订单状态">
                  <el-select
                    class="m-2"
                    v-model="queryDto.orderStatus"
                    placeholder="订单状态"
                    size="small"
                    style="width: 100%"
                  >
                    <el-option
                      v-for="item in orderResVo"
                      :key="item.id"
                      :label="item.status"
                      :value="item.id"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                  <el-form-item label="创建时间">
                      <el-date-picker v-model="createTimes"
                                      type="daterange"
                                      range-separator="To"
                                      start-placeholder="开始时间"
                                      end-placeholder="结束时间"
                                      format="YYYY-MM-DD"
                                      value-format="YYYY-MM-DD"
                                      />
                  </el-form-item>
              </el-col>
          </el-row>
          <el-row>
              <el-col :span="8">
                  <el-form-item label="收货人姓名">
                      <el-input v-model="queryDto.receiverName"
                              style="width: 100%"
                              placeholder="收货人姓名"
                              ></el-input>
                  </el-form-item>
              </el-col>
              <el-col :span="8">
                  <el-form-item label="收货人手机">
                      <el-input v-model="queryDto.receiverPhone"
                              style="width: 100%"
                              placeholder="收货人手机"
                              ></el-input>
                  </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="支付方式">
                  <el-select
                    class="m-2"
                    v-model="queryDto.payType"
                    placeholder="支付方式"
                    size="small"
                    style="width: 100%"
                  >
                    <el-option
                      v-for="item in orderResVo"
                      :key="item.id"
                      :label="item.payType"
                      :value="item.id"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
          </el-row>
          <el-row style="display:flex">
              <el-button type="primary" size="small" @click="searchSysLogs">
                  搜索
              </el-button>
              <el-button size="small" @click="resetData">重置</el-button>
          </el-row>
      </el-form>
  </div>

  <el-dialog v-model="dialogVisible" title="详情" width="60%">
    <span>订单基本信息</span>
    <el-divider role="separator" style="--el-border-style: solid;"/>

      <el-form label-width="120px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="订单号：" >
                <span>{{ orderInfo.orderNo }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="订单总额：" >
                <span>{{ orderInfo.totalAmount }}</span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <el-form label-width="120px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="优惠卷：" >
                <span>{{ orderInfo.couponAmount }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="原价金额：" >
                <span>{{ orderInfo.originalTotalAmount }}</span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <el-form label-width="120px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="运费：" >
                <span>{{ orderInfo.feightFee }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="支付方式：" >
                <span>{{ getOrderPayTypeText(orderInfo.payType) }}</span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <el-form label-width="120px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="订单状态：" >
                <span>{{ getOrderStatusText(orderInfo.orderStatus) }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="创建时间：" >
                <span>{{ orderInfo.createTime }}</span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <el-form label-width="120px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="支付时间：" >
                <span>{{ orderInfo.paymentTime === null ? "暂未支付" : orderInfo.paymentTime }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="订单备注：" >
                <span>{{ orderInfo.remark === null ? "无" : orderInfo.remark }}</span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      
      
      <el-divider role="separator" style="--el-border-style: solid;"/>
      <span>收货人信息</span>
      <el-divider role="separator" style="--el-border-style: solid;"/>

      <el-form label-width="120px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="收货人姓名：" >
                <span>{{ orderInfo.receiverName }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="收货人电话：" >
                <span>{{ orderInfo.receiverPhone }}</span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <el-form label-width="120px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="地址标签：" >
                <span>{{ orderInfo.receiverTagName === null ? "无" : orderInfo.receiverTagName }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12" >
            <el-form-item label="收货人地址：" width="120" >
                <span>{{ orderInfo.receiverAddress }}</span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <el-divider role="separator" style="--el-border-style: solid;"/>
      <span>订单具体信息</span>
      <el-divider role="separator" style="--el-border-style: solid;"/>

  </el-dialog>

  <!---数据表格-->
  <el-table :data="list" style="width: 100%">
      <el-table-column prop="orderNo" label="订单号" width="130" />
      <el-table-column prop="totalAmount" label="订单总额" />
      <el-table-column prop="payType" label="支付方式" #default="scope" >
        {{ getOrderPayTypeText(scope.row.payType) }}
      </el-table-column>
      <el-table-column prop="orderStatus" label="订单状态" #default="scope" >
        {{ getOrderStatusText(scope.row.orderStatus) }}
      </el-table-column>
      <el-table-column prop="receiverName" label="收货人" />
      <el-table-column prop="receiverPhone" label="收货人电话" width="130"/>
      <el-table-column prop="receiverAddress" label="详细地址" width="150" />
      <el-table-column prop="createTime" label="创建时间" width="160"/>
      <el-table-column label="操作" align="center" width="90" #default="scope">
          <el-button type="primary" size="small" @click="showDetial(scope.row)">
              详情
          </el-button>
      </el-table-column>
  </el-table>

  
  <el-pagination
              v-model:current-page="pageParams.page"
              v-model:page-size="pageParams.limit"
              :page-sizes="[10, 20, 50, 100]"
              @size-change="fetchData"
              @current-change="fetchData"
              layout="total, sizes, prev, pager, next"
              :total="total"
              />
</template>

<script setup>
import { ref,onMounted } from 'vue'; 
import { GetOrderInfoByPage } from '@/api/orderInfo.js'
import { ElMessage, ElMessageBox } from 'element-plus'
///////////////////
// 映射关系表
const orderPayType = {
  "1": '微信',
  "2": '支付宝'
}
const orderStatusMap = {
  "0": '待付款',
  "1": '待发货',
  "2": '已发货',
  "3": '待用户收货，已完成',
  "-1": '已取消'
}

// 做映射
const getOrderStatusText = (status) => {
  return orderStatusMap[status] || '未知状态';
}
const getOrderPayTypeText = (type) => {
  return orderPayType[type] || '其它';
}

///////////////
const dialogVisible = ref(false)

const form = {
  title:"",
  operName:"",
  requestMethod:"",
  method:"",
  status:"",
  operParam:"",
  jsonResult:"",
  operUrl:"",
  operIp:"",
  createTime:""
}

const orderInfo = ref(form)

const showDetial = (row) =>{
  orderInfo.value = {...row}
  dialogVisible.value = true
}

///////////////订单详情列表
// 表格数据模型
const list = ref([]);

// 分页条数据模型
const total = ref(0)

//分页
const pageParamsForm = {
  page:1, //当前页
  limit:10 //每页记录数
}
const pageParams = ref(pageParamsForm)

//封装条件数据模型
const queryDto = ref({
  orderNo:"",
  orderStatus:"",
  receiverName:"",
  receiverPhone:"",
  payType:'',
  createTimeBegin:"",
  createTimeEnd:""
})

//开始和结束时间数据模型
const createTimes = ref([])

//钩子函数
onMounted(()=>{
  fetchData()
})

//条件查询方法 axios调用
const fetchData = async ()=>{
  //获取开始和结束时间
  if(createTimes.value.length == 2) {
      queryDto.value.createTimeBegin = createTimes.value[0]
      queryDto.value.createTimeEnd = createTimes.value[1]
  }
  const {data} = await GetOrderInfoByPage(pageParams.value.page,
                              pageParams.value.limit,
                              queryDto.value)
  list.value = data.list
  total.value = data.total
}

//搜索方法
const searchSysLogs = ()=>{
  fetchData()
}

//重置方法
const resetData = () => {
  queryDto.value = { orderNo: '', orderStatus: '', receiverName: '', receiverPhone: '', payType: '', createTimeBegin: '', createTimeEnd: '' }
  createTimes.value = [];
  fetchData()
}

</script>

<style scoped>
.search-div {
margin-bottom: 10px;
padding: 10px;
border: 1px solid #ebeef5;
border-radius: 3px;
background-color: #fff;
}
.tools-div {
margin: 10px 0;
padding: 10px;
border: 1px solid #ebeef5;
border-radius: 3px;
background-color: #fff;
}
.avatar-uploader .avatar {
width: 178px;
height: 178px;
display: block;
}
.avatar-uploader .el-upload {
border: 1px dashed var(--el-border-color);
border-radius: 6px;
cursor: pointer;
position: relative;
overflow: hidden;
transition: var(--el-transition-duration-fast);
}
.avatar-uploader .el-upload:hover {
border-color: var(--el-color-primary);
}
.el-icon.avatar-uploader-icon {
font-size: 28px;
color: #8c939d;
width: 178px;
height: 178px;
text-align: center;
}
</style>