<template>

    <!---搜索表单-->
    <div class="search-div">
        <el-form label-width="70px" size="small">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="关键字">
                        <el-input v-model="queryDto.keyword"
                                style="width: 100%"
                                placeholder="用户名"
                                ></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
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
            <el-row style="display:flex">
                <el-button type="primary" size="small" @click="searchUserInfo">
                    搜索
                </el-button>
                <el-button size="small" @click="resetData">重置</el-button>
            </el-row>
        </el-form>
    </div>

    <el-dialog v-model="dialogVisible" title="详情" width="60%">
      <el-form label-width="150px">
        <el-divider role="separator" style="--el-border-style: solid;"/>
            <span>基本信息</span>
        <el-divider role="separator" style="--el-border-style: solid;"/>

        <el-row>
          <el-col :span="12">
            <el-form-item label="头像：" >
                <img :src="userInfo.avatar" width="50" />
            </el-form-item>
          </el-col>
          <el-col :span="12" >
            <el-form-item label="用户名：" width="120" >
              <span>{{ userInfo.username }}</span>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="昵称：" >
                <span>{{ userInfo.nickName }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12" >
            <el-form-item label="性别：" width="120" >
              <span>{{ userInfo.sex == 0 ? '男' : '女' }}</span>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="电话号码：" width="120">
                <span>{{ userInfo.phone }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12" >
            <el-form-item label="备注：" width="120" >
              <span>{{ userInfo.memo == null ? '无' : userInfo.memo }}</span>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="最后一次登录IP：" width="120">
                <span>{{ userInfo.lastLoginIp }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12" >
            <el-form-item label="状态："  >
              <span>{{ userInfo.status == 1 ? '正常' : '停用' }}</span>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="最后一次登录时间：" width="120">
                <span>{{ userInfo.lastLoginTime }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12" >
            <el-form-item label="创建时间：" width="120" >
              <span>{{ userInfo.createTime }}</span>
            </el-form-item>
          </el-col>
        </el-row>

        <el-divider role="separator" style="--el-border-style: solid;"/>
            <span>地址信息</span>
        <el-divider role="separator" style="--el-border-style: solid;"/>

        <el-table :data="addressList" style="width: 100%">
          <el-table-column prop="fullAddress" label="详细地址" width="260" />
          <el-table-column prop="tagName" label="地址标签" />
          <el-table-column prop="isDefault" label="是否默认地址" #default="scope">
            {{ scope.row.isDefault == 1 ? '是' : '否' }}
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间" width="180" />
        </el-table>
        <br/>
        <el-button type="button" style="margin-left: 45%;" @click="closeDetial()">关闭</el-button>
      </el-form>
    </el-dialog>

    <!---数据表格-->
    <el-table :data="list" style="width: 100%">
        <el-table-column prop="username" label="用户名" width="120"/>
        <el-table-column prop="nickName" label="昵称" />
        <el-table-column prop="avatar" label="头像" #default="scope">
            <img :src="scope.row.avatar" width="50" />
        </el-table-column>
        <el-table-column prop="sex" label="性别" #default="scope">
            {{ scope.row.sex == 0 ? '男' : '女' }}
        </el-table-column>
        <el-table-column prop="phone" label="电话号码" width="120"/>
        <el-table-column prop="lastLoginTime" label="最后一次登录时间" width="160" />
        <el-table-column prop="status" label="状态" #default="scope">
            {{ scope.row.status == 1 ? '正常' : '停用' }}
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="160" />
        <el-table-column label="操作" align="center" width="150" #default="scope">
            <el-button type="primary" size="small" @click="showDetail(scope.row)">
                详情
            </el-button>
            <el-button 
                :type="scope.row.status === 1 ? 'danger' : 'warning'" 
                size="small" 
                @click="alterStatus(scope.row)">
                {{ scope.row.status == 1 ? '停用' : '激活' }}
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
import { getPageList, findUserAddressByUserId, updateStatus } from '@/api/userInfo.js'
import { ElMessage, ElMessageBox } from 'element-plus'
///////////////会员停用
const alterStatus = async (row)=>{
    let confirmation = true;

    if (row.status === 1) {
        confirmation = await ElMessageBox.confirm('是否停用此账号?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        });
    }

    if (confirmation) {
        const { code } = await updateStatus(row.id, row.status);

        if (code === 200) {
        ElMessage.success("操作成功");
        fetchData();
        }
    }
}

///////////////会员详情展示
const dialogVisible = ref(false)
const addressList = ref([])

const form = {
    id: '',
    username: '',
    password: '',
    nickName: '',
    avatar: '',
    sex: '',
    phone: '',
    memo: '',
    openId: '',
    unionId: '',
    lastLoginIp: '',
    lastLoginTime: '',
    status: '',
    createTime: ''
}
const userInfo = ref(form)

const showDetail = (row) => {
    userInfo.value = {...row}
    showAddress(row.id)
    dialogVisible.value = true
}

const showAddress = async (userId) => {
    const { data } = await findUserAddressByUserId(userId)
    addressList.value = data
}

///////////////用户列表
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
    keyword:"",
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
    const {data} = await getPageList(pageParams.value.page,
                                pageParams.value.limit,
                                queryDto.value)
    list.value = data.list
    total.value = data.total
}

//搜索方法
const searchUserInfo = ()=>{
    fetchData()
}

//重置方法
const resetData = () => {
    queryDto.value = { keyword: '', createTimeBegin: '', createTimeEnd: '' }
    createTimes.value = []
    fetchData()
}

const closeDetial = () => {
    dialogVisible.value = false
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