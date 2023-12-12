<template>

    <!---搜索表单-->
    <div class="search-div">
        <el-form label-width="70px" size="small">
            <el-row>
                <el-col :span="8">
                    <el-form-item label="操作模块">
                        <el-input v-model="queryDto.title"
                                style="width: 100%"
                                placeholder="操作模块"
                                ></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="操作人">
                        <el-input v-model="queryDto.operName"
                                style="width: 100%"
                                placeholder="操作人"
                                ></el-input>
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
            <el-row style="display:flex">
                <el-button type="primary" size="small" @click="searchSysLogs">
                    搜索
                </el-button>
                <el-button size="small" @click="resetData">重置</el-button>
            </el-row>
        </el-form>
    </div>

    <el-dialog v-model="dialogVisible" title="详情" width="60%">
        <el-form label-width="120px">
            <el-form-item label="操作模块：" >
                <span>{{ sysOperLog.title }}</span>
            </el-form-item>
        </el-form>
        <el-form label-width="120px">
            <el-form-item label="操作人：" >
                <span>{{ sysOperLog.operName }}</span>
            </el-form-item>
        </el-form>
        <el-form label-width="120px">
            <el-form-item label="请求方式：" >
                <span>{{ sysOperLog.requestMethod }}</span>
            </el-form-item>
        </el-form>
        <el-form label-width="120px">
            <el-form-item label="请求参数：" >
                <span>{{ sysOperLog.operParam ? sysOperLog.operParam : "无" }}</span>
            </el-form-item>
        </el-form>
        <el-form label-width="120px">
            <el-form-item label="响应结果：" >
                <span >{{ sysOperLog.jsonResult ? sysOperLog.jsonResult : "无" }}</span>
            </el-form-item>
        </el-form>
        <el-form label-width="120px">
            <el-form-item label="操作状态：" >
                <span>{{ sysOperLog.status === 0 ? "正常" : "异常" }}</span>
            </el-form-item>
        </el-form>
        <el-form label-width="120px">
            <el-form-item label="请求地址：" >
                <span>{{ sysOperLog.operUrl }}</span>
            </el-form-item>
        </el-form>
        <el-form label-width="120px">
            <el-form-item label="请求IP：" >
                <span>{{ sysOperLog.operIp }}</span>
            </el-form-item>
        </el-form>
        <el-form label-width="120px">
            <el-form-item label="操作时间：" >
                <span>{{ sysOperLog.createTime }}</span>
            </el-form-item>
        </el-form>
        <el-button type="button" style="margin-left: 45%;" @click="closeDetial()">关闭</el-button>
    </el-dialog>

    <!---数据表格-->
    <el-table :data="list" style="width: 100%">
        <el-table-column prop="title" label="系统模块" />
        <el-table-column prop="requestMethod" label="请求方式" />
        <el-table-column prop="operName" label="操作人员" />
        <el-table-column prop="operIp" label="操作IP" />
        <el-table-column prop="method" label="请求方法" />
        <el-table-column prop="status" label="操作状态" #default="scope">
            {{ scope.row.status == 0 ? '正常' : '异常' }}
        </el-table-column>
        <el-table-column prop="createTime" label="操作时间" />
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
import { GetSysLogsListByPage } from '@/api/sysLogs'
import { ElMessage, ElMessageBox } from 'element-plus'
///////////////////
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

const sysOperLog = ref(form)

const showDetial = (row) =>{
    sysOperLog.value = {...row}
    dialogVisible.value = true
}

///////////////操作日志列表
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
    title:"",
    operName:"",
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
    const {data} = await GetSysLogsListByPage(pageParams.value.page,
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
    queryDto.value = { title: '', operName: '', createTimeBegin: '',createTimeEnd: '' }
    createTimes.value = [];
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